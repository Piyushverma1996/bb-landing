"use client";

import { useEffect } from "react";

// Every wa.me link on the site is a potential lead, but only the homepage float
// and /book-now were firing an event - so a WhatsApp enquiry from a service or
// area page was invisible in GA4. One delegated listener covers every link that
// exists now and any added later, instead of remembering to wire each one.
export default function WhatsAppTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest?.("a[href*='wa.me']") as HTMLAnchorElement | null;
      if (!link) return;
      const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
      if (!g) return;
      g("event", "whatsapp_click", {
        source: window.location.pathname,
        link_text: (link.textContent || "").trim().slice(0, 60),
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
