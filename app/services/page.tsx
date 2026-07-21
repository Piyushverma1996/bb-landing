import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "./serviceData";

export const metadata: Metadata = {
  title: "Services — Bridal, Party Makeup, Nails & Beauty in Ramesh Nagar | Blushes & Brushes",
  description:
    "Makeup, nail art and beauty services by Urvashi Trehan in Ramesh Nagar, West Delhi — bridal & party makeup, nail extensions, facials. Prices, details & booking.",
  alternates: { canonical: "https://blushesnbrushes.com/services" },
};

export default function ServicesIndex() {
  return (
    <main className="mx-auto max-w-5xl px-5 py-12">
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A55C]">Our services</p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
          Makeup, Nails &amp; Beauty in Ramesh Nagar, West Delhi
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-[#1A5A54]/70">
          Premium bridal &amp; party makeup, nail extensions and beauty rituals by Urvashi Trehan — at the Ramesh Nagar studio and on location across Delhi NCR. Transparent prices, premium products, 4.8★ from 200+ brides.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {SERVICES.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`} className="group overflow-hidden rounded-3xl border border-[#C9A55C]/20 bg-white/80 shadow-sm transition-all hover:shadow-lg">
            <div className="aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.cover} alt={s.h1} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ objectPosition: "50% 20%" }} />
            </div>
            <div className="p-5">
              <h2 className="text-[19px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>{s.nav}</h2>
              <p className="mt-2 text-[12.5px] leading-relaxed text-[#1A5A54]/70">{s.description}</p>
              <span className="mt-3 inline-block text-[12px] font-semibold text-[#C9A55C] group-hover:underline">View details &amp; pricing →</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-3xl p-6 text-center text-white shadow-md" style={{ background: "linear-gradient(120deg,#2E8B83,#5FB3A3 55%,#C9A55C)" }}>
        <p className="text-[18px] font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Not sure what you need?</p>
        <p className="mx-auto mt-1 max-w-md text-[12px] text-white/90">Get a free consultation — tell us your date &amp; budget and Urvashi will message you honest advice within the hour.</p>
        <a href="/#book" className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-[#1A5A54]">Get my free consultation →</a>
      </div>
    </main>
  );
}
