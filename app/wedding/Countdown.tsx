"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2026-12-12T00:00:00+05:30").getTime();

// Rendered client-side only. Computing this on the server produces a number
// that is already stale by the time it reaches the guest, and mismatches on
// hydration.
export default function Countdown() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setLeft(TARGET - Date.now());
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);

  if (left === null) return <div className="h-[86px]" aria-hidden="true" />;
  if (left <= 0) {
    return (
      <p className="text-[16px] font-semibold text-[#2E8B83]">
        Married. Thank you for being there.
      </p>
    );
  }

  const days = Math.floor(left / 86_400_000);
  const hours = Math.floor((left % 86_400_000) / 3_600_000);
  const mins = Math.floor((left % 3_600_000) / 60_000);

  return (
    <div className="flex items-end justify-center gap-5">
      {[
        [days, days === 1 ? "day" : "days"],
        [hours, hours === 1 ? "hour" : "hours"],
        [mins, mins === 1 ? "minute" : "minutes"],
      ].map(([v, label]) => (
        <div key={String(label)} className="text-center">
          <div className="text-[34px] font-bold leading-none" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
            {v}
          </div>
          <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C9A55C]">{label}</div>
        </div>
      ))}
    </div>
  );
}
