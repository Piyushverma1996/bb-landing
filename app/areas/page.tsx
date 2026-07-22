import Link from "next/link";
import type { Metadata } from "next";
import { AREAS } from "./areaData";

export const metadata: Metadata = {
  title: "Makeup Artist in West Delhi — Areas We Serve | Blushes & Brushes",
  description:
    "Bridal & party makeup artist serving all of West Delhi — Ramesh Nagar, Rajouri Garden, Tilak Nagar, Janakpuri, Punjabi Bagh, Karol Bagh, Dwarka & more. Travels to your venue.",
  alternates: { canonical: "https://blushesnbrushes.com/areas" },
};

export default function AreasIndex() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A55C]">Areas we serve</p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
          Makeup Artist Serving All of West Delhi
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-[#1A5A54]/70">
          Our studio is in Ramesh Nagar — and Urvashi Trehan travels across West Delhi and up to 15 km around for bridal, engagement and party makeup. Find your area below.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {AREAS.map((a) => (
          <Link key={a.slug} href={`/areas/${a.slug}`} className="rounded-2xl border border-[#C9A55C]/25 bg-white/70 p-4 text-center transition-all hover:shadow-md hover:border-[#C9A55C]/50">
            <p className="text-[14px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>{a.area}</p>
            <p className="mt-1 text-[10px] text-[#1A5A54]/55">{a.distance.replace("from our Ramesh Nagar studio", "away")}</p>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-3xl p-6 text-center text-white shadow-md" style={{ background: "linear-gradient(120deg,#2E8B83,#5FB3A3 55%,#C9A55C)" }}>
        <p className="text-[18px] font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Don&apos;t see your area?</p>
        <p className="mx-auto mt-1 max-w-md text-[12px] text-white/90">Urvashi travels across Delhi NCR for bridal bookings. Message us your venue and date for a free consultation.</p>
        <a href="/#book" className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-[#1A5A54]">Get my free consultation →</a>
      </div>
    </main>
  );
}
