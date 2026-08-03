import type { Metadata } from "next";
import Link from "next/link";
import { beautySalonLd } from "../../lib/business";

export const metadata: Metadata = {
  title: "Contact & Studio Location | Blushes & Brushes, Ramesh Nagar West Delhi",
  description:
    "Visit Blushes & Brushes at B 1/1 Double Storey, Ramesh Nagar, opposite Subway, New Delhi 110015. WhatsApp 76784 46364. Open Mon–Sat 10:30 AM–8 PM. Free consultation.",
  alternates: { canonical: "https://blushesnbrushes.com/contact" },
};

const WA = "https://wa.me/917678446364?text=" + encodeURIComponent("Hi Urvashi!\nI'd like a free consultation. Could you please share the details?");

export default function ContactPage() {
  // Same entity as every other page: shared node, plus the contact-only email.
  const ld = { ...beautySalonLd({ url: "https://blushesnbrushes.com/contact", image: "https://blushesnbrushes.com/images/bridal-hero.webp" }), email: "bookings@blushesnbrushes.com" };

  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <nav className="text-[11px] text-[#1A5A54]/55"><Link href="/" className="hover:text-[#C9A55C]">Home</Link> · <span className="text-[#1A5A54]/80">Contact</span></nav>

      <h1 className="mt-3 text-[28px] font-bold leading-tight md:text-[34px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
        Contact Blushes &amp; Brushes
      </h1>
      <p className="mt-2 text-[14px] leading-relaxed text-[#1A5A54]/80">
        Studio in Ramesh Nagar, West Delhi - and we travel across Delhi NCR for bridal &amp; party makeup. The fastest way to reach Urvashi is WhatsApp; she replies personally, usually within the hour.
      </p>

      {/* Primary CTAs */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <a href={WA} className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-4 text-[15px] font-bold text-white shadow-sm">
          <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.7 1-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.6 15l-1.3 4.7 4.9-1.3A10 10 0 1012 2z"/></svg>
          WhatsApp us
        </a>
        <a href="tel:+917678446364" className="flex items-center justify-center gap-2 rounded-2xl py-4 text-[15px] font-bold text-white shadow-sm" style={{ background: "linear-gradient(120deg,#2E8B83,#C9A55C)" }}>
          📞 Call 76784 46364
        </a>
      </div>

      {/* Details */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-[#C9A55C]/25 bg-white/70 p-5">
          <h2 className="text-[16px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Studio address</h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-[#1A5A54]/85">
            B 1/1 Double Storey<br />Ramesh Nagar, Opposite Subway<br />New Delhi 110015
          </p>
          <p className="mt-2 text-[12px] text-[#1A5A54]/60">2 min walk from Ramesh Nagar metro station (Blue Line)</p>
          <a href="https://maps.google.com/?cid=2332371947944609004" target="_blank" rel="noopener" className="mt-3 inline-block text-[12.5px] font-semibold text-[#C9A55C]">Open in Google Maps →</a>
        </div>
        <div className="rounded-2xl border border-[#C9A55C]/25 bg-white/70 p-5">
          <h2 className="text-[16px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Opening hours</h2>
          <ul className="mt-2 space-y-1 text-[13.5px] text-[#1A5A54]/85">
            <li className="flex justify-between"><span>Monday – Saturday</span><span className="font-semibold">10:30 AM – 8:00 PM</span></li>
            <li className="flex justify-between"><span>Sunday</span><span className="font-semibold">By appointment</span></li>
          </ul>
          <p className="mt-3 text-[12px] text-[#1A5A54]/60">Bridal &amp; party makeup travels to your venue across Delhi NCR. Nails &amp; beauty at the studio.</p>
        </div>
      </div>

      {/* Map */}
      <div className="mt-6 overflow-hidden rounded-2xl border border-[#C9A55C]/25">
        <iframe
          title="Blushes & Brushes studio location, Ramesh Nagar"
          src="https://www.google.com/maps?q=Blushes+and+Brushes+by+Urvashi+Trehan,+Ramesh+Nagar,+New+Delhi&output=embed"
          width="100%" height="320" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Areas + CTA */}
      <div className="mt-8 rounded-3xl p-6 text-center text-white shadow-md" style={{ background: "linear-gradient(120deg,#2E8B83,#5FB3A3 55%,#C9A55C)" }}>
        <p className="text-[17px] font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Not in Ramesh Nagar?</p>
        <p className="mx-auto mt-1 max-w-md text-[12px] text-white/90">We travel across West Delhi and Delhi NCR for bridal and party makeup - Rajouri Garden, Janakpuri, Punjabi Bagh, Karol Bagh, Dwarka and more.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2.5">
          <Link href="/areas" className="rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-[#1A5A54]">See all areas →</Link>
          <Link href="/book-now" className="rounded-full border border-white/70 px-6 py-2.5 text-[13px] font-bold text-white">Free consultation</Link>
        </div>
      </div>
    </main>
  );
}
