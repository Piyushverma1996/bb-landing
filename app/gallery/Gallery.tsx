"use client";
import { useEffect, useState, useCallback } from "react";
import { SHOTS, CATS } from "./galleryData";

export default function Gallery() {
  const [cat, setCat] = useState<string>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);

  const shots = cat === "All" ? SHOTS : SHOTS.filter((s) => s.cat === cat);

  const close = useCallback(() => setLightbox(null), []);
  const go = useCallback((dir: number) => {
    setLightbox((i) => (i === null ? null : (i + dir + shots.length) % shots.length));
  }, [shots.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [lightbox, close, go]);

  return (
    <>
      {/* Filter tabs */}
      <div className="mb-6 flex flex-wrap justify-center gap-2">
        {CATS.map((c) => {
          const n = c === "All" ? SHOTS.length : SHOTS.filter((s) => s.cat === c).length;
          const on = cat === c;
          return (
            <button key={c} onClick={() => setCat(c)}
              className="rounded-full px-4 py-2 text-[12px] font-bold transition-all"
              style={on ? { background: "linear-gradient(135deg,#2E8B83,#C9A55C)", color: "#fff" } : { background: "rgba(255,255,255,.7)", color: "#1A5A54", border: "1px solid rgba(201,165,92,.3)" }}>
              {c} <span className="opacity-70 font-normal">({n})</span>
            </button>
          );
        })}
      </div>

      {/* Masonry (CSS columns) */}
      <div style={{ columnGap: "12px", columnCount: 2 }} className="[column-count:2] sm:[column-count:3] lg:[column-count:4]">
        {shots.map((s, i) => (
          <button key={s.src} onClick={() => setLightbox(i)} className="mb-3 block w-full overflow-hidden rounded-2xl" style={{ breakInside: "avoid" }} aria-label={`Open ${s.alt}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={s.alt} loading="lazy" className="w-full rounded-2xl object-cover transition-transform duration-500 hover:scale-[1.04]" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && shots[lightbox] && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4" onClick={close}>
          <button onClick={close} className="absolute right-4 top-4 z-10 text-3xl text-white/80 hover:text-white" aria-label="Close">×</button>
          <button onClick={(e) => { e.stopPropagation(); go(-1); }} className="absolute left-2 z-10 px-3 text-4xl text-white/70 hover:text-white sm:left-6" aria-label="Previous">‹</button>
          <button onClick={(e) => { e.stopPropagation(); go(1); }} className="absolute right-2 z-10 px-3 text-4xl text-white/70 hover:text-white sm:right-6" aria-label="Next">›</button>
          <figure className="max-h-[90vh] max-w-3xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shots[lightbox].src} alt={shots[lightbox].alt} className="mx-auto max-h-[78vh] w-auto rounded-2xl object-contain" />
            <figcaption className="mt-3 flex flex-wrap items-center justify-center gap-3 text-center text-[12px] text-white/70">
              <span>{shots[lightbox].cat} · {lightbox + 1} / {shots.length}</span>
              <a href="/#book" onClick={(e) => e.stopPropagation()} className="rounded-full px-4 py-1.5 text-[12px] font-bold text-white" style={{ background: "linear-gradient(120deg,#2E8B83,#C9A55C)" }}>Book this look — free consultation →</a>
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
