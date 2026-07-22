import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES, getService, type Block } from "../serviceData";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return { title: "Not found | Blushes & Brushes" };
  const url = `https://blushesnbrushes.com/services/${s.slug}`;
  return {
    title: s.title,
    description: s.description,
    keywords: s.keywords.join(", "),
    alternates: { canonical: url },
    openGraph: { title: s.h1, description: s.description, url, type: "website", images: [{ url: s.cover, alt: s.h1 }], siteName: "Blushes & Brushes by Urvashi Trehan" },
    twitter: { card: "summary_large_image", title: s.h1, description: s.description, images: [s.cover] },
  };
}

function Blocks({ body }: { body: Block[] }) {
  return (
    <>
      {body.map((b, i) => {
        if ("h" in b) return <h2 key={i} className="mt-8 mb-2 text-[21px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>{b.h}</h2>;
        if ("ul" in b) return (
          <ul key={i} className="my-3 space-y-2 pl-1">
            {b.ul.map((li, j) => (
              <li key={j} className="flex gap-2.5 text-[14px] leading-relaxed text-[#1A5A54]/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A55C]" />
                <span>{li}</span>
              </li>
            ))}
          </ul>
        );
        return <p key={i} className="my-3 text-[14px] leading-[1.75] text-[#1A5A54]/85">{b.p}</p>;
      })}
    </>
  );
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const url = `https://blushesnbrushes.com/services/${s.slug}`;

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.h1,
    description: s.description,
    serviceType: s.nav,
    areaServed: ["Ramesh Nagar", "West Delhi", "Delhi NCR"],
    provider: {
      "@type": "BeautySalon",
      name: "Blushes & Brushes",
      image: `https://blushesnbrushes.com${s.cover}`,
      telephone: "+917678446364",
      address: { "@type": "PostalAddress", streetAddress: "B 1/1 Double Storey, Ramesh Nagar, Opp. Subway", addressLocality: "New Delhi", postalCode: "110015", addressCountry: "IN" },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "200" },
    },
    url,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const crumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://blushesnbrushes.com/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://blushesnbrushes.com/services" },
      { "@type": "ListItem", position: 3, name: s.nav, item: url },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />

      <nav className="text-[11px] text-[#1A5A54]/55">
        <Link href="/" className="hover:text-[#C9A55C]">Home</Link> · <Link href="/services" className="hover:text-[#C9A55C]">Services</Link> · <span className="text-[#1A5A54]/80">{s.nav}</span>
      </nav>

      <h1 className="mt-3 text-[28px] font-bold leading-tight md:text-[36px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>{s.h1}</h1>
      <div className="mt-2 flex items-center gap-2 text-[11px] font-semibold text-[#C9A55C]"><span>★ 4.8 Google</span><span className="text-[#1A5A54]/40">· 200+ brides · Ramesh Nagar, West Delhi</span></div>

      <div className="mt-5 overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={s.cover} alt={s.h1} className="w-full object-cover" style={{ maxHeight: 420, objectPosition: "50% 18%" }} />
      </div>

      <div className="mt-6">
        {s.intro.map((p, i) => <p key={i} className="my-3 text-[14.5px] leading-[1.75] text-[#1A5A54]/90">{p}</p>)}
        {/* Soft inline nudge — guides without hard-selling */}
        <div className="my-5 flex flex-wrap items-center gap-3 rounded-2xl border border-[#C9A55C]/30 bg-[#CFE9DF]/25 px-4 py-3">
          <span className="text-[13px] text-[#1A5A54]/85">Not sure where to start? Urvashi will advise you personally — free, no pressure.</span>
          <a href="/#book" className="ml-auto whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-bold text-white" style={{ background: "linear-gradient(120deg,#2E8B83,#C9A55C)" }}>Get free advice →</a>
        </div>
        <Blocks body={s.sections} />
      </div>

      {/* Gallery */}
      {s.gallery.length > 1 && (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {s.gallery.map((g, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img key={i} src={g} alt={`${s.nav} ${i + 1}`} className="aspect-[3/4] w-full rounded-2xl object-cover" style={{ objectPosition: "50% 18%" }} loading="lazy" />
          ))}
        </div>
      )}

      {/* Pricing */}
      {s.pricing && (
        <section className="mt-10 rounded-3xl border border-[#C9A55C]/25 bg-white/70 p-6">
          <h2 className="text-[19px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>{s.pricing.heading}</h2>
          <div className="mt-4 space-y-1">
            {s.pricing.rows.map((r, i) => (
              <div key={i} className="flex items-baseline justify-between gap-3 border-b border-dashed border-[#2E8B83]/15 py-2.5">
                <span className="text-[14px] font-semibold text-[#1A5A54]">{r.name}{r.note && <span className="ml-2 text-[11px] font-normal text-[#1A5A54]/50">{r.note}</span>}</span>
                <span className="whitespace-nowrap text-[14px] font-bold text-[#B8893B]">{r.price}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-[#1A5A54]/55">Prices include premium products. No GST. Ask about multi-function &amp; package rates.</p>
        </section>
      )}

      {/* CTA */}
      <div className="mt-10 rounded-3xl p-6 text-center text-white shadow-md" style={{ background: "linear-gradient(120deg,#2E8B83,#5FB3A3 55%,#C9A55C)" }}>
        <p className="text-[17px] font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>{s.ctaLine}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
          <a href="/#book" className="rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-[#1A5A54]">Free consultation →</a>
          <a href="https://wa.me/917678446364?text=Hi%20Urvashi%2C%20I%27d%20like%20a%20free%20consultation" className="rounded-full border border-white/70 px-6 py-2.5 text-[13px] font-bold text-white">WhatsApp us</a>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-[20px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Frequently asked questions</h2>
        <div className="mt-4 space-y-3">
          {s.faq.map((f, i) => (
            <details key={i} className="group rounded-2xl border border-[#C9A55C]/25 bg-white/80 p-4">
              <summary className="cursor-pointer list-none text-[14px] font-semibold text-[#1A5A54]">{f.q}</summary>
              <p className="mt-2 text-[13px] leading-relaxed text-[#1A5A54]/80">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Related reads + other services */}
      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="mb-3 text-[13px] font-bold uppercase tracking-widest text-[#C9A55C]">Read more</h2>
          <ul className="space-y-2">
            {s.relatedBlog.map((r) => (
              <li key={r.slug}><Link href={`/blog/${r.slug}`} className="text-[13px] font-semibold text-[#1A5A54] hover:text-[#C9A55C]">→ {r.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-[13px] font-bold uppercase tracking-widest text-[#C9A55C]">Other services</h2>
          <ul className="space-y-2">
            {SERVICES.filter((o) => o.slug !== s.slug).map((o) => (
              <li key={o.slug}><Link href={`/services/${o.slug}`} className="text-[13px] font-semibold text-[#1A5A54] hover:text-[#C9A55C]">→ {o.nav}</Link></li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
