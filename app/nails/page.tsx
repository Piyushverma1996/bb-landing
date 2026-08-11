import type { Metadata } from "next";
import Link from "next/link";
import { VERIFIED, bookLook, TIER_LABEL } from "./looksData";
import { dims } from "../lib/imageSizes";
import { beautySalonLd, PHONE, PHONE_DISPLAY } from "../lib/business";

const url = "https://blushesnbrushes.com/nails";

export const metadata: Metadata = {
  title: "Nail Looks Gallery - Pick Your Design | Blushes & Brushes, Ramesh Nagar",
  description:
    "Real nail sets by Urvashi Trehan in Ramesh Nagar, West Delhi. Chrome, hand-painted art, bridal French and more. Pick a look, send its code on WhatsApp, book it.",
  keywords:
    "nail art designs delhi, nail extensions ramesh nagar, chrome nails west delhi, bridal nails delhi, nail look catalogue",
  alternates: { canonical: url },
  openGraph: {
    title: "Nail Looks - Blushes & Brushes",
    description: "Real nail sets by Urvashi Trehan. Pick a look, send the code, book it.",
    url,
    type: "website",
    images: [{ url: "/images/gallery/bb-nail-art-chrome-gold-01.webp" }],
    siteName: "Blushes & Brushes by Urvashi Trehan",
  },
};

export default function NailLooksPage() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Blushes & Brushes nail look catalogue",
    description: "Real nail sets by Urvashi Trehan, Ramesh Nagar, West Delhi.",
    url,
    provider: beautySalonLd({ url: "https://blushesnbrushes.com/" }),
    image: VERIFIED.map((l) => `https://blushesnbrushes.com${l.image}`),
  };
  const crumb = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://blushesnbrushes.com/" },
      { "@type": "ListItem", position: 2, name: "Nail Looks", item: url },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl px-5 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumb) }} />

      <nav className="text-[11px] text-[#1A5A54]/55">
        <Link href="/" className="hover:text-[#C9A55C]">Home</Link> ·{" "}
        <Link href="/services/nail-extensions" className="hover:text-[#C9A55C]">Nails</Link> ·{" "}
        <span className="text-[#1A5A54]/80">Look book</span>
      </nav>

      <header className="mt-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#E0932F]">Every set below is our own work</p>
        <h1 className="mt-2 text-[32px] font-bold leading-tight md:text-[42px]"
          style={{ fontFamily: "var(--font-playfair), serif", color: "#0F3D38" }}>
          Pick your nail look
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[14.5px] leading-[1.8] text-[#1A5A54]/85">
          No stock photos, no Pinterest borrowings. Find a set you like, send us its code on WhatsApp,
          and we will tell you honestly whether it suits your nails and how long it will hold.
        </p>
      </header>

      {/* How it works - three steps, because the code is the whole point */}
      <ol className="mx-auto mt-7 grid max-w-2xl gap-2.5 sm:grid-cols-3">
        {[
          ["1", "Find a look", "Scroll and pick one you would actually wear"],
          ["2", "Send the code", "Tap the button. It sends the code for you."],
          ["3", "We reply", "Honest advice on shape, length and upkeep"],
        ].map(([n, t, d]) => (
          <li key={n} className="rounded-2xl border border-[#C9A55C]/30 bg-white/70 p-3.5 text-center">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#0F3D38] text-[12px] font-bold text-white">{n}</span>
            <p className="mt-1.5 text-[13px] font-bold text-[#0F3D38]">{t}</p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-[#1A5A54]/65">{d}</p>
          </li>
        ))}
      </ol>

      {/* Looks */}
      <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {VERIFIED.map((l) => (
          <article key={l.id} className="group overflow-hidden rounded-3xl border border-[#C9A55C]/25 bg-white/80 shadow-sm transition-all hover:shadow-lg">
            <div className="relative aspect-[3/4] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.image} {...dims(l.image)} alt={`${l.name} nail set by Blushes & Brushes, Ramesh Nagar`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              <span className="absolute left-3 top-3 rounded-full bg-[#0F3D38]/90 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white">
                {l.id}
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide text-[#8C2F39]">
                {TIER_LABEL[l.tier]}
              </span>
            </div>

            <div className="p-4">
              <h2 className="text-[18px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#0F3D38" }}>{l.name}</h2>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#1A5A54]/75">{l.finish}</p>
              <p className="mt-2 text-[12px] italic leading-relaxed text-[#1A5A54]/60">{l.suits}</p>

              <dl className="mt-3 space-y-1 text-[11.5px] text-[#1A5A54]/70">
                <div className="flex justify-between gap-2"><dt>Shape</dt><dd className="font-semibold text-[#1A5A54]">{l.shape}</dd></div>
                <div className="flex justify-between gap-2"><dt>Length</dt><dd className="font-semibold text-[#1A5A54]">{l.length}</dd></div>
                <div className="flex justify-between gap-2">
                  <dt>From</dt>
                  <dd className="font-semibold text-[#B8893B]">{l.priceFrom ? `₹${l.priceFrom.toLocaleString("en-IN")}` : "On request"}</dd>
                </div>
              </dl>

              <a href={bookLook(l)} target="_blank" rel="noopener"
                className="mt-4 block rounded-full py-3 text-center text-[12px] font-bold uppercase tracking-widest text-white"
                style={{ background: "linear-gradient(120deg,#0F3D38,#2E8B83 60%,#C9A55C)" }}>
                Send {l.id} on WhatsApp →
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Honest note + CTA */}
      <section className="mt-12 rounded-3xl border border-[#C9A55C]/30 bg-white/70 p-6 sm:p-8">
        <h2 className="text-[22px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#0F3D38" }}>
          Do not see what you want?
        </h2>
        <p className="mt-2.5 text-[14px] leading-[1.8] text-[#1A5A54]/85">
          This is a working look book, not the whole portfolio. Send a reference photo and Urvashi will tell you honestly
          whether it can be done on your nails, at what length, and how it will wear with your daily routine.
          If a design will not last on you, she will say so rather than take the booking.
        </p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          <a href="https://wa.me/917678446364?text=Hi%20Urvashi%2C%20I%20have%20a%20nail%20design%20in%20mind%20-%20can%20I%20send%20you%20a%20photo%3F"
            target="_blank" rel="noopener"
            className="rounded-full px-6 py-3 text-[12.5px] font-bold uppercase tracking-widest text-white"
            style={{ background: "linear-gradient(120deg,#0F3D38,#2E8B83)" }}>
            Send a reference photo →
          </a>
          <a href={`tel:${PHONE}`}
            className="rounded-full border border-[#0F3D38]/30 px-6 py-3 text-[12.5px] font-bold uppercase tracking-widest text-[#0F3D38]">
            Call {PHONE_DISPLAY}
          </a>
        </div>
        <p className="mt-4 text-[12.5px] text-[#1A5A54]/60">
          Gel extensions start at ₹499 including nail art.{" "}
          <Link href="/services/nail-extensions" className="font-semibold text-[#2E8B83] underline decoration-[#C9A55C]/50 underline-offset-2">
            Full nail pricing and details
          </Link>
        </p>
      </section>
    </main>
  );
}
