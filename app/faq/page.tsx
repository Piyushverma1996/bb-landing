import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Bridal Makeup, Party, Nails & Beauty in West Delhi | Blushes & Brushes",
  description:
    "Answers to common questions about bridal & party makeup, nail extensions and beauty at Blushes & Brushes, Ramesh Nagar — prices, HD vs airbrush, travel, trials, booking.",
  alternates: { canonical: "https://blushesnbrushes.com/faq" },
};

const GROUPS: { title: string; qa: { q: string; a: string }[] }[] = [
  {
    title: "Bridal makeup",
    qa: [
      { q: "How much does bridal makeup cost in West Delhi?", a: "At Blushes & Brushes in Ramesh Nagar: HD bridal ₹18,000–22,000, airbrush ₹25,000–30,000, engagement/Roka/Sagan ₹10,000–15,000, reception ₹12,000–16,000. Every quote includes hairstyling, draping, lashes and a touch-up kit — no hidden charges, no GST." },
      { q: "Should I choose HD or airbrush bridal makeup?", a: "Airbrush lasts 10–14 hours and is best for long summer wedding days; HD gives a soft, dewy finish ideal for winter weddings or a natural look. At your trial, both are tested on your skin in daylight so you can decide with confidence." },
      { q: "Do you offer a bridal trial?", a: "Yes — trials are ₹3,000 at the Ramesh Nagar studio and are adjusted against your final booking. We recommend the trial 4–8 weeks before the wedding." },
      { q: "How early should I book my wedding date?", a: "For Delhi's November–February peak season, book 3–4 months ahead — the best dates fill fast. A small refundable advance holds your date." },
      { q: "Do you travel to the wedding venue?", a: "Yes — bridal and occasion makeup are done on location. Urvashi travels across West Delhi and Delhi NCR (Gurgaon, Noida, Faridabad, Ghaziabad) with a written arrival time; travel is quoted at cab actuals." },
    ],
  },
  {
    title: "Party & occasion makeup",
    qa: [
      { q: "How much is party makeup in West Delhi?", a: "₹2,500 for Signature, ₹3,500 for HD (HD Forever 52), and ₹4,500 for Celebrity tier (NARS, Huda Beauty). Hairstyling, draping and lashes are included in every tier." },
      { q: "Will party makeup last through a sangeet or cocktail?", a: "Yes — for dance-heavy functions we use a long-wear or airbrush base, waterproof liner and lashes, and a transfer-proof lip, plus a touch-up kit for 5+ hour events." },
      { q: "What's the difference between Roka, Sagan and engagement makeup?", a: "Roka is soft and natural for an intimate daytime event; Sagan/engagement steps up the glam for a bigger evening function. We plan each function's look so no two photos repeat." },
    ],
  },
  {
    title: "Nails & beauty",
    qa: [
      { q: "How much do nail extensions cost in Ramesh Nagar?", a: "Gel nail extensions start at ₹499 with complimentary nail art. Luxe French from ₹1,200 and designer sets (ombré, chrome) from ₹1,500, at the Ramesh Nagar studio." },
      { q: "How long do gel nail extensions last?", a: "3–4 weeks before a refill, depending on nail growth and aftercare. Daily cuticle oil and gloves for housework help a set last its full life." },
      { q: "Do nail extensions damage your natural nails?", a: "Not with professional application and soak-off removal. Damage usually comes from peeling extensions off yourself." },
      { q: "How much is a facial in Ramesh Nagar?", a: "Glow Cleanup ₹499, De-Tan ₹699, Facial + Pedicure ₹999, and a Full Pamper Day at ₹1,499 — premium products, hygienic studio, no up-selling." },
    ],
  },
  {
    title: "Booking, location & areas",
    qa: [
      { q: "Where is the Blushes & Brushes studio?", a: "B 1/1 Double Storey, opposite Subway, Ramesh Nagar, New Delhi 110015 — a two-minute walk from Ramesh Nagar metro station (Blue Line)." },
      { q: "Which areas do you serve?", a: "The Ramesh Nagar studio serves nails and beauty on-site; makeup travels to Rajouri Garden, Tilak Nagar, Janakpuri, Subhash Nagar, Kirti Nagar, Moti Nagar, Punjabi Bagh, Paschim Vihar, Hari Nagar, Uttam Nagar, Vikaspuri, Naraina, Patel Nagar, Karol Bagh, Dwarka and across Delhi NCR." },
      { q: "How do I book or get a quote?", a: "Use the free consultation form at blushesnbrushes.com/book-now or WhatsApp 76784 46364 with your date and function — Urvashi replies personally within the hour, no pressure." },
      { q: "What payment methods do you accept?", a: "Cash, UPI and bank transfer. Bridal bookings are held with a small refundable advance." },
    ],
  },
];

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: GROUPS.flatMap((g) => g.qa).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <nav className="text-[11px] text-[#1A5A54]/55"><Link href="/" className="hover:text-[#C9A55C]">Home</Link> · <span className="text-[#1A5A54]/80">FAQ</span></nav>
      <h1 className="mt-3 text-[28px] font-bold leading-tight md:text-[34px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
        Frequently Asked Questions
      </h1>
      <p className="mt-2 text-[13px] text-[#1A5A54]/70">Everything about bridal &amp; party makeup, nails and beauty at Blushes &amp; Brushes, Ramesh Nagar, West Delhi. Can&rsquo;t find your answer? WhatsApp <a href="https://wa.me/917678446364" className="font-semibold text-[#C9A55C]">76784 46364</a>.</p>

      {GROUPS.map((g) => (
        <section key={g.title} className="mt-8">
          <h2 className="mb-3 text-[18px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#2E8B83" }}>{g.title}</h2>
          <div className="space-y-3">
            {g.qa.map((f, i) => (
              <details key={i} className="group rounded-2xl border border-[#C9A55C]/25 bg-white/80 p-4">
                <summary className="cursor-pointer list-none text-[14px] font-semibold text-[#1A5A54]">{f.q}</summary>
                <p className="mt-2 text-[13px] leading-relaxed text-[#1A5A54]/80">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      ))}

      <div className="mt-10 rounded-3xl p-6 text-center text-white shadow-md" style={{ background: "linear-gradient(120deg,#2E8B83,#5FB3A3 55%,#C9A55C)" }}>
        <p className="text-[17px] font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Still have a question?</p>
        <p className="mx-auto mt-1 max-w-md text-[12px] text-white/90">Get a free consultation — Urvashi answers personally within the hour.</p>
        <a href="/book-now" className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-[#1A5A54]">Get my free consultation →</a>
      </div>
    </main>
  );
}
