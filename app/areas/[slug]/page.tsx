import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AREAS, getArea } from "../areaData";

export function generateStaticParams() {
  return AREAS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) return { title: "Not found | Blushes & Brushes" };
  const url = `https://blushesnbrushes.com/areas/${a.slug}`;
  const title = `Best Makeup Artist in ${a.area} — Bridal, Party & Nails | Blushes & Brushes`;
  const description = `Bridal, party & engagement makeup in ${a.area}, West Delhi by Urvashi Trehan. HD & airbrush, travels to your venue (${a.distance}). 4.8★, 200+ brides. Free consultation.`;
  return {
    title,
    description,
    keywords: [`makeup artist ${a.area.toLowerCase()}`, `bridal makeup ${a.area.toLowerCase()}`, `party makeup ${a.area.toLowerCase()}`, `beauty parlour ${a.area.toLowerCase()}`, "makeup artist west delhi"].join(", "),
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", images: [{ url: "/images/bridal-real-1.jpg" }], siteName: "Blushes & Brushes by Urvashi Trehan" },
  };
}

const SHARED_FAQ = [
  { q: "How much does bridal makeup cost?", a: "HD bridal ₹18,000–22,000, airbrush ₹25,000–30,000, engagement/Roka ₹10,000–15,000, reception ₹12,000–16,000. Every quote includes hair, draping, lashes and a touch-up kit." },
  { q: "Do you offer a trial before the wedding?", a: "Yes — trials are ₹3,000 at the Ramesh Nagar studio, adjusted against your booking, recommended 4–8 weeks before the wedding." },
];

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArea(slug);
  if (!a) notFound();
  const url = `https://blushesnbrushes.com/areas/${a.slug}`;
  const h1 = `Best Makeup Artist in ${a.area}`;

  const faqs = [{ q: a.localFaqQ, a: a.localFaqA }, ...SHARED_FAQ];

  const bizLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: `Blushes & Brushes — Makeup Artist serving ${a.area}`,
    image: "https://blushesnbrushes.com/images/bridal-real-1.jpg",
    url,
    telephone: "+917678446364",
    priceRange: "₹₹",
    address: { "@type": "PostalAddress", streetAddress: "B 1/1 Double Storey, Ramesh Nagar, Opp. Subway", addressLocality: "New Delhi", postalCode: "110015", addressCountry: "IN" },
    areaServed: { "@type": "Place", name: `${a.area}, West Delhi` },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "200" },
  };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  const crumbLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://blushesnbrushes.com/" },
      { "@type": "ListItem", position: 2, name: "Areas", item: "https://blushesnbrushes.com/areas" },
      { "@type": "ListItem", position: 3, name: a.area, item: url },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(bizLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />

      <nav className="text-[11px] text-[#1A5A54]/55">
        <Link href="/" className="hover:text-[#C9A55C]">Home</Link> · <Link href="/areas" className="hover:text-[#C9A55C]">Areas</Link> · <span className="text-[#1A5A54]/80">{a.area}</span>
      </nav>

      <h1 className="mt-3 text-[27px] font-bold leading-tight md:text-[34px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
        {h1} <span className="text-[#C9A55C]">— West Delhi</span>
      </h1>
      <p className="mt-2 text-[12px] font-semibold text-[#C9A55C]">★ 4.8 Google · 200+ brides · {a.distance}{a.metro ? ` · Metro: ${a.metro}` : ""}</p>

      <div className="mt-5 overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/bridal-real-1.jpg" alt={`Bridal makeup artist in ${a.area}`} className="w-full object-cover" style={{ maxHeight: 380, objectPosition: "50% 14%" }} />
      </div>

      <p className="mt-6 text-[14.5px] leading-[1.75] text-[#1A5A54]/90">{a.localIntro}</p>

      <h2 className="mt-8 mb-2 text-[20px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Makeup &amp; beauty services in {a.area}</h2>
      <p className="text-[14px] leading-[1.75] text-[#1A5A54]/85">Urvashi Trehan offers the full Blushes &amp; Brushes menu to {a.area} clients — bridal and occasion makeup travels to your venue, while nails and beauty are done at the Ramesh Nagar studio:</p>
      <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
        {[
          { t: "Bridal Makeup", d: "HD ₹18–22K · Airbrush ₹25–30K", href: "/services/bridal-makeup" },
          { t: "Party & Engagement", d: "From ₹2,500 · Roka/Sagan ₹10–15K", href: "/services/party-makeup" },
          { t: "Nail Extensions", d: "From ₹499 + free nail art", href: "/services/nail-extensions" },
          { t: "Facials & Beauty", d: "Cleanup ₹499 · Pamper ₹1,499", href: "/services/beauty-services" },
        ].map((s) => (
          <Link key={s.href} href={s.href} className="rounded-2xl border border-[#C9A55C]/25 bg-white/70 p-4 transition-all hover:shadow-md">
            <p className="text-[14px] font-bold text-[#1A5A54]">{s.t} →</p>
            <p className="mt-0.5 text-[11.5px] text-[#1A5A54]/65">{s.d}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-8 mb-2 text-[20px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Why {a.area} brides choose Blushes &amp; Brushes</h2>
      <ul className="my-3 space-y-2 pl-1">
        {["200+ brides served across West Delhi with a 4.8★ Google rating", "HD & airbrush makeup that lasts through long Delhi functions", "Premium products — HD Forever 52, NARS, Huda Beauty", "Transparent pricing with hair, lashes & draping included", `Travels to ${a.area} venues with a written arrival time`].map((li, i) => (
          <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-[#1A5A54]/85"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A55C]" /><span>{li}</span></li>
        ))}
      </ul>

      {/* CTA */}
      <div className="mt-8 rounded-3xl p-6 text-center text-white shadow-md" style={{ background: "linear-gradient(120deg,#2E8B83,#5FB3A3 55%,#C9A55C)" }}>
        <p className="text-[17px] font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Booking makeup in {a.area}?</p>
        <p className="mx-auto mt-1 max-w-md text-[12px] text-white/90">Get a free consultation — tell us your date &amp; venue and Urvashi replies within the hour.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
          <a href="/#book" className="rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-[#1A5A54]">Free consultation →</a>
          <a href={`https://wa.me/917678446364?text=${encodeURIComponent(`Hi Urvashi, I'm in ${a.area} and would like a free consultation`)}`} className="rounded-full border border-white/70 px-6 py-2.5 text-[13px] font-bold text-white">WhatsApp us</a>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-[20px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>{a.area} — frequently asked</h2>
        <div className="mt-4 space-y-3">
          {faqs.map((f, i) => (
            <details key={i} className="group rounded-2xl border border-[#C9A55C]/25 bg-white/80 p-4">
              <summary className="cursor-pointer list-none text-[14px] font-semibold text-[#1A5A54]">{f.q}</summary>
              <p className="mt-2 text-[13px] leading-relaxed text-[#1A5A54]/80">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Nearby areas */}
      <section className="mt-10">
        <h2 className="mb-3 text-[13px] font-bold uppercase tracking-widest text-[#C9A55C]">Nearby areas we serve</h2>
        <div className="flex flex-wrap gap-2">
          {a.nearby.map((slug) => {
            const n = getArea(slug);
            if (!n) return null;
            return <Link key={slug} href={`/areas/${slug}`} className="rounded-full border border-[#C9A55C]/30 bg-white/60 px-3.5 py-1.5 text-[12px] font-semibold text-[#1A5A54] hover:border-[#C9A55C]">{n.area}</Link>;
          })}
          <Link href="/areas" className="rounded-full border border-[#C9A55C]/30 bg-white/60 px-3.5 py-1.5 text-[12px] font-semibold text-[#C9A55C]">All areas →</Link>
        </div>
      </section>
    </main>
  );
}
