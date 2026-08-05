import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES } from "./serviceData";
import { dims } from "../lib/imageSizes";

export const metadata: Metadata = {
  title: "Services - Bridal, Party Makeup, Nails & Beauty in Ramesh Nagar | Blushes & Brushes",
  description:
    "Makeup, nail art and beauty services by Urvashi Trehan in Ramesh Nagar, West Delhi - bridal & party makeup, nail extensions, facials. Prices, details & booking.",
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
          Premium bridal &amp; party makeup, nail extensions and beauty rituals by Urvashi Trehan - at the Ramesh Nagar studio and on location across Delhi NCR. Transparent prices, premium products, 4.8★ from 200+ brides.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {SERVICES.map((s) => (
          <Link key={s.slug} href={`/services/${s.slug}`} className="group overflow-hidden rounded-3xl border border-[#C9A55C]/20 bg-white/80 shadow-sm transition-all hover:shadow-lg">
            <div className="aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.cover} {...dims(s.cover)} alt={s.h1} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ objectPosition: "50% 20%" }} />
            </div>
            <div className="p-5">
              <h2 className="text-[19px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>{s.nav}</h2>
              <p className="mt-2 text-[12.5px] leading-relaxed text-[#1A5A54]/70">{s.description}</p>
              <span className="mt-3 inline-block text-[12px] font-semibold text-[#C9A55C] group-hover:underline">View details &amp; pricing →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* The hub was 253 words - the thinnest page on the site, and the parent
          of four pages Google had never crawled. A hub that says nothing gives
          Google no reason to follow its links. */}
      <section className="mt-12">
        <h2 className="text-[22px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>What it costs</h2>
        <p className="mt-2 text-[13.5px] leading-[1.75] text-[#1A5A54]/85">
          Every price below includes hair, draping, lashes and a touch-up kit. There is no GST and no travel charge anywhere in West Delhi. Full breakdowns sit on each service page.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-[13.5px]">
            <tbody>
              {[
                ["HD bridal makeup", "₹18,000 - 22,000", "/services/bridal-makeup"],
                ["Airbrush bridal makeup", "₹25,000 - 30,000", "/services/bridal-makeup"],
                ["Engagement / Roka / Sagan", "₹10,000 - 15,000", "/services/party-makeup"],
                ["Reception / cocktail", "₹12,000 - 16,000", "/services/party-makeup"],
                ["Bridal trial (adjusted against booking)", "₹3,000", "/services/bridal-makeup"],
                ["Nail extensions, with free nail art", "from ₹499", "/services/nail-extensions"],
                ["Glow cleanup combo", "₹499", "/services/beauty-services"],
                ["Full pamper combo", "₹1,499", "/services/beauty-services"],
              ].map(([name, price, href]) => (
                <tr key={name} className="border-b border-dashed border-[#2E8B83]/15">
                  <td className="py-2.5 pr-3"><Link href={href} className="text-[#1A5A54] hover:text-[#C9A55C]">{name}</Link></td>
                  <td className="whitespace-nowrap py-2.5 text-right font-bold text-[#B8893B]">{price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-[22px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Where each service happens</h2>
        <p className="mt-2 text-[13.5px] leading-[1.75] text-[#1A5A54]/85">
          Not everything happens in the same place, and it is worth knowing before you book. <strong className="font-semibold">Nail extensions, facials, waxing, hair spa and every bridal trial</strong> happen at the Ramesh Nagar studio, on the ground floor a few steps from Metro Gate 3. <strong className="font-semibold">Bridal and party makeup on the day itself</strong> travels to your home or venue - Urvashi arrives with a hair stylist and the full kit, because moving a bride mid-look has never improved the result.
        </p>
        <p className="mt-3 text-[13.5px] leading-[1.75] text-[#1A5A54]/85">
          Travel is free across West Delhi. Beyond that, Blushes &amp; Brushes takes destination bookings to Sonipat, Panipat, Nainital, Rishikesh, Shimla, Manali and Kasauli, quoted with a travel charge. Read more <Link href="/about" className="font-medium text-[#2E8B83] underline decoration-[#C9A55C]/50 underline-offset-2">about how Urvashi works</Link>.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-[22px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Which service is right for you</h2>
        <ul className="mt-3 space-y-2.5">
          {[
            <>Getting married and want the base to survive a 14-hour Delhi function: <Link href="/services/bridal-makeup" className="font-medium text-[#2E8B83] underline decoration-[#C9A55C]/50 underline-offset-2">bridal makeup</Link>, HD or airbrush. Which one suits you depends on your skin and the weather, not on price.</>,
            <>Attending rather than marrying - a Roka, sangeet, cocktail or a friend&apos;s wedding: <Link href="/services/party-makeup" className="font-medium text-[#2E8B83] underline decoration-[#C9A55C]/50 underline-offset-2">party and occasion makeup</Link>.</>,
            <>Nails for a function, or a set you want to keep up every few weeks: <Link href="/services/nail-extensions" className="font-medium text-[#2E8B83] underline decoration-[#C9A55C]/50 underline-offset-2">nail extensions and nail art</Link>.</>,
            <>Skin and grooming in the weeks before an event: <Link href="/services/beauty-services" className="font-medium text-[#2E8B83] underline decoration-[#C9A55C]/50 underline-offset-2">facials and beauty services</Link>.</>,
            <>Wanting to learn rather than book: the <Link href="/courses" className="font-medium text-[#2E8B83] underline decoration-[#C9A55C]/50 underline-offset-2">Academy</Link> trains in micro-batches of five.</>,
          ].map((t, i) => (
            <li key={i} className="flex gap-2.5 text-[13.5px] leading-relaxed text-[#1A5A54]/85">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A55C]" /><span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10 rounded-3xl p-6 text-center text-white shadow-md" style={{ background: "linear-gradient(120deg,#2E8B83,#5FB3A3 55%,#C9A55C)" }}>
        <p className="text-[18px] font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Not sure what you need?</p>
        <p className="mx-auto mt-1 max-w-md text-[12px] text-white/90">Get a free consultation - tell us your date &amp; budget and Urvashi will message you honest advice within the hour.</p>
        <a href="/#book" className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-[#1A5A54]">Get my free consultation →</a>
      </div>
    </main>
  );
}
