import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "./Gallery";
import { SHOTS } from "./galleryData";

export const metadata: Metadata = {
  title: "Portfolio & Gallery — Real Bridal, Party & Nail Work | Blushes & Brushes",
  description:
    "Real client work by Urvashi Trehan — bridal & party makeup, nail art and hairstyling in Ramesh Nagar, West Delhi. No stock, no filters. Browse the gallery.",
  alternates: { canonical: "https://blushesnbrushes.com/gallery" },
};

export default function GalleryPage() {
  const imageLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Blushes & Brushes Portfolio — Bridal, Party, Nails & Hair",
    about: "Makeup, nail art and beauty work by Urvashi Trehan in Ramesh Nagar, West Delhi",
    url: "https://blushesnbrushes.com/gallery",
    image: SHOTS.slice(0, 12).map((s) => `https://blushesnbrushes.com${s.src}`),
  };
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(imageLd) }} />
      <div className="mb-8 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A55C]">Real work · Real clients</p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Portfolio &amp; Gallery</h1>
        <p className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-[#1A5A54]/70">
          Every look here is Urvashi Trehan&rsquo;s own work — no stock, no filters. Bridal &amp; party makeup, nail art and hairstyling from the Ramesh Nagar studio and weddings across Delhi NCR.
        </p>
      </div>

      <Gallery />

      <div className="mt-12 rounded-3xl p-6 text-center text-white shadow-md" style={{ background: "linear-gradient(120deg,#2E8B83,#5FB3A3 55%,#C9A55C)" }}>
        <p className="text-[18px] font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Love a look you see here?</p>
        <p className="mx-auto mt-1 max-w-md text-[12px] text-white/90">Get a free consultation — tell us the look you want and Urvashi will recreate it for your day.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
          <a href="/#book" className="rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-[#1A5A54]">Free consultation →</a>
          <Link href="/services" className="rounded-full border border-white/70 px-6 py-2.5 text-[13px] font-bold text-white">View services &amp; pricing</Link>
        </div>
      </div>
    </main>
  );
}
