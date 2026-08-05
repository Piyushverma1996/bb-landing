import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Urvashi Trehan - Bridal Makeup Artist, Ramesh Nagar West Delhi",
  description:
    "Meet Urvashi Trehan, founder of Blushes & Brushes in Ramesh Nagar, West Delhi. VLCC-certified HD & airbrush artist, 200+ brides, 5am starts, destination weddings across Delhi NCR, Uttarakhand and Himachal.",
  keywords:
    "urvashi trehan makeup artist, about blushes and brushes, bridal makeup artist west delhi, makeup artist ramesh nagar, vlcc certified makeup artist delhi, destination wedding makeup artist delhi",
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

// Direct-answer FAQs. Every one is a real question brides ask, answered from
// Urvashi's own operating detail - which is what AI search can actually cite.
const FAQ = [
  { q: "How far in advance should I book bridal makeup in Delhi?",
    a: "Four to five months ahead for a November or December wedding, which are the hardest dates to get. Outside peak season there is more flexibility. Dates sometimes reopen after a cancellation, so it is worth asking even at short notice." },
  { q: "What is the earliest Urvashi can start on the wedding morning?",
    a: "The earliest booking done so far started at 5 am, leaving the Ramesh Nagar studio at 4 am. If your muhurat needs you ready before sunrise, mention it at the enquiry stage so the timing can be planned properly." },
  { q: "Does Blushes & Brushes do destination weddings?",
    a: "Yes. Beyond Delhi NCR, Urvashi travels to Sonipat and Panipat in Haryana, Nainital and Rishikesh in Uttarakhand, and Shimla, Manali and Kasauli in Himachal Pradesh. A travel charge applies and stay is arranged by the client." },
  { q: "How many people come for a bridal booking?",
    a: "Two - Urvashi on makeup and a dedicated hair stylist. There is no rotating team of assistants." },
  { q: "What does the venue need to provide?",
    a: "A power point, air conditioning, a chair, a table, a mirror and space to set up a vanity. Where a venue is short on sockets or has dim lighting, we bring our own extension cords and professional ring lights." },
  { q: "Where is the Blushes & Brushes studio?",
    a: "B 1/1 Double Storey, opposite Subway, Ramesh Nagar, New Delhi 110015 - ground floor, second shop in the lane, with a photographer's studio on one side and a stationery shop on the other. Come out of Ramesh Nagar metro at Gate 3. Parking is directly in front. Open Monday to Saturday, 10:30 am to 8:00 pm." },
  { q: "Is Urvashi Trehan a certified makeup artist?",
    a: "Yes - formally trained and certified at VLCC Institute, working in both HD and airbrush, with 200+ brides across Delhi NCR and a 4.8 star Google rating." },
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
    knowsAbout: ["Bridal Makeup", "HD Makeup", "Airbrush Makeup", "Party Makeup", "Nail Art", "Nail Extensions", "Beauty Therapy", "Makeup Education", "Destination Wedding Makeup"],
    areaServed: ["West Delhi", "Delhi NCR", "Sonipat", "Panipat", "Nainital", "Rishikesh", "Shimla", "Manali", "Kasauli"].map((n) => ({ "@type": "Place", name: n })),
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
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
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

      <h2 className="mt-10 mb-3 text-[21px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Where Urvashi travels</h2>
      <p className="text-[14px] leading-[1.8] text-[#1A5A54]/90">
        Most weddings are across West Delhi and Delhi NCR, and there is no travel charge inside West Delhi. Beyond that, Blushes &amp; Brushes takes destination bookings across North India - <strong className="font-semibold">Sonipat and Panipat</strong> in Haryana, <strong className="font-semibold">Nainital and Rishikesh</strong> in Uttarakhand, and <strong className="font-semibold">Shimla, Manali and Kasauli</strong> in Himachal Pradesh.
      </p>
      <p className="mt-3 text-[14px] leading-[1.8] text-[#1A5A54]/90">
        Destination bookings are quoted with a travel charge and stay arranged by the client. Hill-station weddings need more lead time than Delhi ones, so it is worth asking early rather than late.
      </p>

      <h2 className="mt-10 mb-3 text-[21px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>What a wedding morning actually looks like</h2>
      <p className="text-[14px] leading-[1.8] text-[#1A5A54]/90">
        Two people arrive: Urvashi on makeup and a dedicated hair stylist. No rotating team of assistants, and no handing your face to somebody you have not met.
      </p>
      <p className="mt-3 text-[14px] leading-[1.8] text-[#1A5A54]/90">
        Early starts are normal. <strong className="font-semibold">The earliest slot done so far began at 5 am</strong>, leaving Ramesh Nagar at 4 am to reach Hauz Khas in time. If your muhurat needs you ready before sunrise, say so at the enquiry stage and it can be planned properly.
      </p>
      <p className="mt-3 text-[14px] leading-[1.8] text-[#1A5A54]/90">
        At the venue we need very little, but we do need it: a working power point, air conditioning, a chair, a table, a mirror and room to set up a vanity. Where a venue is short on any of these - older club rooms with few sockets, banquets with dim warm lighting - we carry our own extension cords and professional ring lights rather than compromise the base.
      </p>

      <h2 className="mt-10 mb-3 text-[21px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>How far ahead to book</h2>
      <p className="text-[14px] leading-[1.8] text-[#1A5A54]/90">
        <strong className="font-semibold">November and December are the hardest months to get a date.</strong> For a peak-season wedding, brides book roughly <strong className="font-semibold">four to five months ahead</strong>. Dates do occasionally reopen when a booking cancels, so it is always worth asking even at short notice - but that is luck, not a plan.
      </p>

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

      <blockquote className="mt-10 rounded-3xl border-l-4 border-[#C9A55C] bg-white/70 p-6">
        <p className="text-[15.5px] italic leading-relaxed" style={{ fontFamily: "var(--font-playfair), serif", color: "#2E8B83" }}>
          &ldquo;Based right in the heart of West Delhi at Ramesh Nagar, my studio is designed for a stress-free bridal experience. We are on the ground floor, just steps from Metro Gate 3 and the main road. I love that my brides and their families can reach us effortlessly, completely avoiding the usual narrow-lane Delhi traffic on their biggest day.&rdquo;
        </p>
        <footer className="mt-3 text-[12px] font-semibold text-[#1A5A54]/70">- Urvashi Trehan</footer>
      </blockquote>

      <h2 className="mt-10 mb-3 text-[21px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Frequently asked questions</h2>
      <div className="space-y-3">
        {FAQ.map((f, i) => (
          <details key={i} className="group rounded-2xl border border-[#C9A55C]/25 bg-white/80 p-4">
            <summary className="cursor-pointer list-none">
              <h3 className="inline text-[14px] font-semibold text-[#1A5A54]">{f.q}</h3>
            </summary>
            <p className="mt-2 text-[13px] leading-relaxed text-[#1A5A54]/80">{f.a}</p>
          </details>
        ))}
      </div>

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
