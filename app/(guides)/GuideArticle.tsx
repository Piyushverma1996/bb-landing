import Link from "next/link";
import type { Metadata } from "next";
import { getGuide, GUIDES, type Block } from "./guidesData";

export function guideMetadata(slug: string): Metadata {
  const g = getGuide(slug);
  if (!g) return { title: "Blushes & Brushes" };
  const url = `https://blushesnbrushes.com/${g.slug}`;
  return {
    title: g.title,
    description: g.description,
    keywords: g.keywords.join(", "),
    alternates: { canonical: url },
    openGraph: { title: g.h1, description: g.description, url, type: "article", images: [{ url: g.cover }], siteName: "Blushes & Brushes by Urvashi Trehan" },
    twitter: { card: "summary_large_image", title: g.h1, description: g.description, images: [g.cover] },
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
              <li key={j} className="flex gap-2.5 text-[14px] leading-relaxed text-[#1A5A54]/85"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A55C]" /><span>{li}</span></li>
            ))}
          </ul>
        );
        return <p key={i} className="my-3 text-[14px] leading-[1.75] text-[#1A5A54]/85">{b.p}</p>;
      })}
    </>
  );
}

export default function GuideArticle({ slug }: { slug: string }) {
  const g = getGuide(slug);
  if (!g) return null;
  const url = `https://blushesnbrushes.com/${g.slug}`;

  const articleLd = {
    "@context": "https://schema.org", "@type": "Article", headline: g.h1, description: g.description,
    image: `https://blushesnbrushes.com${g.cover}`, datePublished: "2026-07-16", dateModified: "2026-07-23",
    author: { "@type": "Person", name: "Urvashi Trehan", jobTitle: "Makeup Artist", worksFor: { "@type": "BeautySalon", name: "Blushes & Brushes" } },
    publisher: { "@type": "Organization", name: "Blushes & Brushes", logo: { "@type": "ImageObject", url: "https://blushesnbrushes.com/images/logo.jpeg" } },
    mainEntityOfPage: url,
  };
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: g.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  const crumbLd = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://blushesnbrushes.com/" },
    { "@type": "ListItem", position: 2, name: g.nav, item: url },
  ] };

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />

      <h1 className="text-[27px] font-bold leading-tight md:text-[35px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>{g.h1}</h1>
      <p className="mt-2 text-[12px] font-semibold text-[#C9A55C]">By Urvashi Trehan · Blushes &amp; Brushes · 4.8★ · 200+ brides</p>

      <div className="mt-5 overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={g.cover} alt={g.h1} className="w-full object-cover" style={{ maxHeight: 400, objectPosition: "50% 16%" }} />
      </div>

      <div className="mt-6">
        {g.intro.map((p, i) => <p key={i} className="my-3 text-[14.5px] leading-[1.75] text-[#1A5A54]/90">{p}</p>)}
        {/* soft inline nudge */}
        <div className="my-5 flex flex-wrap items-center gap-3 rounded-2xl border border-[#C9A55C]/30 bg-[#CFE9DF]/25 px-4 py-3">
          <span className="text-[13px] text-[#1A5A54]/85">Want a personal recommendation for your date &amp; budget? It&rsquo;s free.</span>
          <a href="/#book" className="ml-auto whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-bold text-white" style={{ background: "linear-gradient(120deg,#2E8B83,#C9A55C)" }}>Ask Urvashi →</a>
        </div>
        <Blocks body={g.sections} />
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-3xl p-6 text-center text-white shadow-md" style={{ background: "linear-gradient(120deg,#2E8B83,#5FB3A3 55%,#C9A55C)" }}>
        <p className="text-[17px] font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>{g.ctaLine}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
          <a href="/#book" className="rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-[#1A5A54]">Free consultation →</a>
          <a href="https://wa.me/917678446364?text=Hi%20Urvashi%2C%20I%27d%20like%20a%20free%20consultation" className="rounded-full border border-white/70 px-6 py-2.5 text-[13px] font-bold text-white">WhatsApp us</a>
        </div>
      </div>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-[20px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Frequently asked questions</h2>
        <div className="mt-4 space-y-3">
          {g.faq.map((f, i) => (
            <details key={i} className="group rounded-2xl border border-[#C9A55C]/25 bg-white/80 p-4">
              <summary className="cursor-pointer list-none text-[14px] font-semibold text-[#1A5A54]">{f.q}</summary>
              <p className="mt-2 text-[13px] leading-relaxed text-[#1A5A54]/80">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Internal links */}
      <section className="mt-10 grid gap-6 sm:grid-cols-2">
        <div>
          <h2 className="mb-3 text-[13px] font-bold uppercase tracking-widest text-[#C9A55C]">Explore</h2>
          <ul className="space-y-2 text-[13px] font-semibold text-[#1A5A54]">
            <li><Link href="/services" className="hover:text-[#C9A55C]">→ Services &amp; pricing</Link></li>
            <li><Link href="/gallery" className="hover:text-[#C9A55C]">→ Portfolio gallery</Link></li>
            <li><Link href="/areas" className="hover:text-[#C9A55C]">→ Areas we serve</Link></li>
            <li><Link href="/blog" className="hover:text-[#C9A55C]">→ Bridal &amp; beauty journal</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="mb-3 text-[13px] font-bold uppercase tracking-widest text-[#C9A55C]">More guides</h2>
          <ul className="space-y-2 text-[13px] font-semibold text-[#1A5A54]">
            {GUIDES.filter((o) => o.slug !== g.slug).map((o) => (
              <li key={o.slug}><Link href={`/${o.slug}`} className="hover:text-[#C9A55C]">→ {o.nav}</Link></li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
