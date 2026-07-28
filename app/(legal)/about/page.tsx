import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Urvashi Trehan - Bridal Makeup Artist, Ramesh Nagar West Delhi",
  description:
    "Meet Urvashi Trehan, founder of Blushes & Brushes in Ramesh Nagar, West Delhi. VLCC-certified, HD & airbrush specialist, 200+ brides, featured in The Beauty Insider magazine.",
  keywords:
    "urvashi trehan makeup artist, about blushes and brushes, bridal makeup artist west delhi, makeup artist ramesh nagar, vlcc certified makeup artist delhi",
  alternates: { canonical: "https://blushesnbrushes.com/about" },
  openGraph: {
    title: "About Urvashi Trehan - Blushes & Brushes, Ramesh Nagar",
    description: "VLCC-certified makeup artist, HD & airbrush specialist, 200+ brides across Delhi NCR. Featured in The Beauty Insider magazine.",
    url: "https://blushesnbrushes.com/about",
    type: "profile",
    images: [{ url: "/images/urvashi-artist.webp" }],
    siteName: "Blushes & Brushes by Urvashi Trehan",
  },
};

const MILESTONES = [
  { year: "2019", text: "Blushes & Brushes opens in Ramesh Nagar, West Delhi - starting with nails and beauty from a small studio." },
  { year: "2021", text: "Bridal makeup becomes the core of the business as word-of-mouth spreads across West Delhi." },
  { year: "2023", text: "Crosses 100 brides. Adds airbrush makeup and expands travel across Delhi NCR." },
  { year: "2025", text: "Launches the Academy - training the next generation of artists in micro-batches of five." },
  { year: "2026", text: "200+ brides served, 4.8★ on Google, featured in The Beauty Insider international beauty magazine." },
];

const CREDENTIALS = [
  { icon: "🎓", title: "VLCC Certified", desc: "Formally trained at VLCC Institute, one of India's most established beauty education brands." },
  { icon: "✨", title: "HD & Airbrush Specialist", desc: "Trained in both techniques, so the recommendation is based on your skin and function - not on what she can only do." },
  { icon: "📖", title: "Published & Featured", desc: "Featured in The Beauty Insider, an international beauty magazine, in its relaunch edition celebrating exceptional talent." },
  { icon: "👑", title: "200+ Brides", desc: "Seven years of real wedding-day work across Delhi NCR, holding a 4.8★ Google rating." },
];

export default function AboutPage() {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://blushesnbrushes.com/about#urvashi",
    name: "Urvashi Trehan",
    jobTitle: "Bridal Makeup Artist & Founder",
    image: "https://blushesnbrushes.com/images/urvashi-artist.webp",
    url: "https://blushesnbrushes.com/about",
    telephone: "+917678446364",
    knowsAbout: ["Bridal Makeup", "HD Makeup", "Airbrush Makeup", "Party Makeup", "Nail Art", "Nail Extensions", "Beauty Therapy", "Makeup Education"],
    alumniOf: { "@type": "EducationalOrganization", name: "VLCC Institute" },
    worksFor: {
      "@type": "BeautySalon",
      name: "Blushes & Brushes",
      "@id": "https://blushesnbrushes.com/#business",
      url: "https://blushesnbrushes.com",
      address: { "@type": "PostalAddress", streetAddress: "B 1/1 Double Storey, Ramesh Nagar, Opposite Subway", addressLocality: "New Delhi", addressRegion: "Delhi", postalCode: "110015", addressCountry: "IN" },
    },
    sameAs: [
      "https://www.instagram.com/makeovers_by_urvashitrehan_",
      "https://www.instagram.com/blushesandbrushes2022",
    ],
  };
  const crumbLd = {
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://blushesnbrushes.com/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://blushesnbrushes.com/about" },
    ],
  };

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }} />

      <nav className="text-[11px] text-[#1A5A54]/55"><Link href="/" className="hover:text-[#C9A55C]">Home</Link> · <span className="text-[#1A5A54]/80">About</span></nav>

      <h1 className="mt-3 text-[28px] font-bold leading-tight md:text-[36px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
        Meet Urvashi Trehan
      </h1>
      <p className="mt-2 text-[12px] font-semibold text-[#C9A55C]">Founder &amp; Lead Artist, Blushes &amp; Brushes · Ramesh Nagar, West Delhi</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-[1fr_1.3fr] sm:items-start">
        <div className="overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/urvashi-artist.webp" alt="Urvashi Trehan, bridal makeup artist and founder of Blushes & Brushes, Ramesh Nagar" className="w-full object-cover" style={{ objectPosition: "50% 12%", maxHeight: 400 }} width={1400} height={2100} />
        </div>
        <div>
          <p className="text-[14.5px] leading-[1.8] text-[#1A5A54]/90">
            Urvashi Trehan started Blushes &amp; Brushes in 2019 with a simple conviction: makeup should look like <em>you</em>, on your most radiant day. Not a mask. Not a template applied to every face that sits in the chair.
          </p>
          <p className="mt-3 text-[14.5px] leading-[1.8] text-[#1A5A54]/90">
            Seven years and 200+ brides later, that conviction still shapes every booking. She trained formally at VLCC Institute, works in both HD and airbrush, and spends as long on skin prep and shade-matching as most artists spend on the entire face - because a base that greys in photographs is the one mistake you cannot fix on a wedding day.
          </p>
        </div>
      </div>

      <blockquote className="mt-8 rounded-3xl border-l-4 border-[#C9A55C] bg-white/70 p-6">
        <p className="text-[17px] italic leading-relaxed" style={{ fontFamily: "var(--font-playfair), serif", color: "#2E8B83" }}>
          &ldquo;Makeup should look like you - on your most radiant day. My job is to make sure it lasts from the first photo to the last dance.&rdquo;
        </p>
        <footer className="mt-3 text-[12px] font-semibold text-[#1A5A54]/70">- Urvashi Trehan</footer>
      </blockquote>

      <h2 className="mt-10 mb-3 text-[21px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Credentials &amp; recognition</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {CREDENTIALS.map((c) => (
          <div key={c.title} className="rounded-2xl border border-[#C9A55C]/25 bg-white/70 p-4">
            <p className="text-[20px]">{c.icon}</p>
            <p className="mt-1 text-[14px] font-bold text-[#1A5A54]">{c.title}</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[#1A5A54]/75">{c.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 mb-3 text-[21px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>The journey</h2>
      <div className="space-y-3">
        {MILESTONES.map((m) => (
          <div key={m.year} className="flex gap-4">
            <span className="w-12 shrink-0 pt-0.5 text-[13px] font-bold text-[#C9A55C]">{m.year}</span>
            <p className="text-[13.5px] leading-relaxed text-[#1A5A54]/85">{m.text}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-10 mb-3 text-[21px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>How we work</h2>
      <ul className="space-y-2">
        {[
          "Nails, beauty and bridal trials happen at the Ramesh Nagar studio, two minutes from the metro station.",
          "Bridal and party makeup travels to you - across West Delhi and Delhi NCR, with arrival time committed in writing.",
          "Only sealed, professional products: HD Forever 52 for HD work, NARS and Huda Beauty for celebrity-tier looks.",
          "Transparent pricing with hair, draping, lashes and a touch-up kit included. No GST, no surprises.",
          "Honest advice, even when it costs us the booking - if airbrush isn't right for your function, we'll say so.",
        ].map((t, i) => (
          <li key={i} className="flex gap-2.5 text-[14px] leading-relaxed text-[#1A5A54]/85">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A55C]" /><span>{t}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-3xl p-6 text-center text-white shadow-md" style={{ background: "linear-gradient(120deg,#2E8B83,#5FB3A3 55%,#C9A55C)" }}>
        <p className="text-[17px] font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Let&rsquo;s plan your look together</p>
        <p className="mx-auto mt-1 max-w-md text-[12px] text-white/90">Get a free consultation - tell Urvashi your date and budget, and she&rsquo;ll reply personally within the hour.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
          <Link href="/book-now" className="rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-[#1A5A54]">Free consultation →</Link>
          <Link href="/gallery" className="rounded-full border border-white/70 px-6 py-2.5 text-[13px] font-bold text-white">See her work</Link>
        </div>
      </div>
    </main>
  );
}
