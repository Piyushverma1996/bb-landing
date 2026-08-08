"use client";

import { useEffect } from "react";

// Behaviour tracking that GA4 does not give you out of the box. All of it is
// free and first-party; the point is to know WHY a page fails, not just that
// it did.
//
// Fires:
//   scroll_depth      25/50/75/100% - shows where people stop reading
//   time_on_page      15/30/60/120s buckets - separates a read from a bounce
//   cta_click         any button or pill CTA, with its label and page
//   outbound_click    Instagram, Maps, Google reviews
//   rage_click        3+ clicks in one spot in 1s: something looks tappable
//                     and is not, which is the most common silent UX fault
type G = (...a: unknown[]) => void;
const gtag = (): G | undefined => (window as unknown as { gtag?: G }).gtag;

export default function Engagement() {
  useEffect(() => {
    const g = () => gtag();
    const page = window.location.pathname;
    const sent = new Set<string>();
    const once = (key: string, name: string, params: Record<string, unknown>) => {
      if (sent.has(key)) return;
      sent.add(key);
      g()?.("event", name, { page, ...params });
    };

    // --- scroll depth ---
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (h <= 0) return;
      const pct = Math.round((window.scrollY / h) * 100);
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark) once(`s${mark}`, "scroll_depth", { percent: mark });
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // --- dwell time ---
    const timers = [15, 30, 60, 120].map((s) =>
      window.setTimeout(() => once(`t${s}`, "time_on_page", { seconds: s }), s * 1000)
    );

    // --- clicks: CTAs, outbound, and rage ---
    let last = { x: 0, y: 0, t: 0, n: 0 };
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest?.("a,button") as HTMLElement | null;

      if (el) {
        const label = (el.textContent || "").trim().slice(0, 48);
        const href = el.getAttribute("href") || "";
        if (/^https?:/.test(href) && !href.includes("blushesnbrushes.com")) {
          const host = (() => { try { return new URL(href).hostname; } catch { return "unknown"; } })();
          g()?.("event", "outbound_click", { page, host, label });
        }
        if (/btn|cta|svc-ask|book|wa-|duo/i.test(el.className || "")) {
          g()?.("event", "cta_click", { page, label });
        }
      }

      // rage click: same 40px area, 3 hits inside a second
      const now = Date.now();
      const near = Math.abs(e.clientX - last.x) < 40 && Math.abs(e.clientY - last.y) < 40;
      last = near && now - last.t < 1000
        ? { x: e.clientX, y: e.clientY, t: now, n: last.n + 1 }
        : { x: e.clientX, y: e.clientY, t: now, n: 1 };
      if (last.n === 3) {
        g()?.("event", "rage_click", { page, label: (el?.textContent || "").trim().slice(0, 48) || "non-interactive" });
      }
    };
    document.addEventListener("click", onClick, { capture: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick, { capture: true });
      timers.forEach(clearTimeout);
    };
  }, []);

  return null;
}
