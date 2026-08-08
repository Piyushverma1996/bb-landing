import Link from "next/link";
import HaldiRsvp from "./HaldiRsvp";

// Event schedule taken from the photographer's booking sheet so the two never
// disagree. Venues are deliberately left as TBC rather than guessed.
const EVENTS = [
  { date: "Sat 5 Dec", name: "Chowki", side: "Groom's side", note: "Where it properly begins." },
  { date: "Sun 6 Dec", name: "Chowki", side: "Bride's side", note: "Round two, louder." },
  { date: "Wed 9 Dec", name: "Mehendi shots", side: "Bride", note: "Urvashi, being photographed instead of doing the photographing for once." },
  { date: "Thu 10 Dec", name: "Sagan", side: "Both", note: "Dress up. There is a drone." },
  { date: "Fri 11 Dec", name: "Haldi & Mehendi", side: "Both", note: "Daytime. This is the one with the nail bar.", highlight: true },
  { date: "Sat 12 Dec", name: "Morning rituals", side: "Both sides", note: "Early. Coffee will be provided." },
  { date: "Sat 12 Dec", name: "The Wedding", side: "Both", note: "Including the home entry.", highlight: true },
];

export default function WeddingPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C9A55C]">#UruKePiya</p>
        <h1 className="mt-3 text-[38px] font-bold leading-[1.1] md:text-[54px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
          Urvashi <span className="text-[#C9A55C]">&amp;</span> Piyush
        </h1>
        <p className="mt-3 text-[13px] font-semibold tracking-[0.14em] text-[#2E8B83]">12 DECEMBER 2026 · DELHI</p>
        <p className="mx-auto mt-5 max-w-lg text-[14.5px] leading-[1.8] text-[#1A5A54]/85">
          She has spent seven years making other brides look unforgettable. In December she finally gets to be one.
          You are invited to all of it.
        </p>
      </div>

      {/* Events */}
      <h2 className="mt-12 text-[24px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
        The week
      </h2>
      <div className="mt-4 space-y-2.5">
        {EVENTS.map((e, i) => (
          <div key={i}
            className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 rounded-2xl border px-4 py-3.5 ${
              e.highlight ? "border-[#C9A55C]/50 bg-[#F7D6C6]/40" : "border-[#C9A55C]/20 bg-white/60"
            }`}>
            <span className="w-[74px] shrink-0 text-[12px] font-bold text-[#C9A55C]">{e.date}</span>
            <span className="text-[15px] font-bold text-[#1A5A54]" style={{ fontFamily: "var(--font-playfair), serif" }}>{e.name}</span>
            <span className="text-[11px] font-semibold uppercase tracking-wide text-[#2E8B83]/70">{e.side}</span>
            <span className="w-full pl-[74px] text-[12.5px] text-[#1A5A54]/65 sm:w-auto sm:pl-0">{e.note}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[11.5px] text-[#1A5A54]/50">Venues and timings go out on WhatsApp closer to the date.</p>

      {/* The Haldi surprise - the reason this page exists */}
      <section className="mt-12 rounded-3xl border border-[#C9A55C]/35 bg-white/70 p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A55C]">Only at the Haldi · 11 Dec, daytime</p>
        <h2 className="mt-2 text-[26px] font-bold leading-tight" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
          There is a nail bar. It is free.
        </h2>
        <p className="mt-3 text-[14px] leading-[1.8] text-[#1A5A54]/85">
          The bride runs a salon, so of course there is a nail bar at her own Haldi. Kukkie and the Blushes &amp; Brushes team
          will be set up through the afternoon doing nail art for anyone who wants it. Chrome, French, ombre, or something
          matched to what you are wearing. No charge, no catch, it is a wedding gift to the people who turned up.
        </p>
        <p className="mt-3 text-[14px] leading-[1.8] text-[#1A5A54]/85">
          One catch, actually: there are only so many chairs and only so many hours of daylight.
          Tell us how many of you want it and we will keep the slots.
        </p>

        <div className="mt-6">
          <HaldiRsvp />
        </div>
      </section>

      {/* Soft, honest plug */}
      <section className="mt-12">
        <h2 className="text-[24px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
          While you are here
        </h2>
        <p className="mt-3 text-[14px] leading-[1.8] text-[#1A5A54]/85">
          Some of you have known Urvashi for years and still have no idea what she actually does all day. She runs{" "}
          <Link href="/" className="font-semibold text-[#2E8B83] underline decoration-[#C9A55C]/50 underline-offset-2">Blushes &amp; Brushes</Link>{" "}
          in Ramesh Nagar, and has done the makeup for over two hundred brides across Delhi NCR since 2019.
        </p>
        <p className="mt-3 text-[14px] leading-[1.8] text-[#1A5A54]/85">
          Not asking you to book anything. But if someone in your family is getting married, or somebody you love badly needs
          an afternoon to herself, this is what she offers:
        </p>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {[
            { t: "Bridal makeup", d: "HD and airbrush, travels to your venue", href: "/services/bridal-makeup" },
            { t: "Party & Roka looks", d: "For the functions you are attending, not hosting", href: "/services/party-makeup" },
            { t: "Nails", d: "From ₹499, if the Haldi one leaves you wanting more", href: "/services/nail-extensions" },
            { t: "An afternoon off", d: "Facials, hair spa, pedicure. The good kind of quiet.", href: "/services/beauty-services" },
          ].map((s) => (
            <Link key={s.href} href={s.href}
              className="rounded-2xl border border-[#C9A55C]/25 bg-white/70 p-4 transition-all hover:shadow-md">
              <p className="text-[14px] font-bold text-[#1A5A54]">{s.t} →</p>
              <p className="mt-0.5 text-[12px] text-[#1A5A54]/65">{s.d}</p>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-[13px] leading-relaxed text-[#1A5A54]/70">
          Her work is on <Link href="/gallery" className="font-semibold text-[#2E8B83] underline decoration-[#C9A55C]/50 underline-offset-2">the gallery page</Link>{" "}
          and on Instagram at{" "}
          <a href="https://www.instagram.com/makeovers_by_urvashitrehan_" target="_blank" rel="noopener"
            className="font-semibold text-[#2E8B83] underline decoration-[#C9A55C]/50 underline-offset-2">@makeovers_by_urvashitrehan_</a>.
          Our own nonsense lives at{" "}
          <a href="https://www.instagram.com/uru_ke_piya/" target="_blank" rel="noopener"
            className="font-semibold text-[#2E8B83] underline decoration-[#C9A55C]/50 underline-offset-2">@uru_ke_piya</a>.
        </p>
      </section>

      <div className="mt-12 rounded-3xl p-6 text-center text-white shadow-md" style={{ background: "linear-gradient(120deg,#2E8B83,#5FB3A3 55%,#C9A55C)" }}>
        <p className="text-[19px] font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Questions, or lost?</p>
        <p className="mx-auto mt-1 max-w-md text-[12.5px] text-white/90">
          WhatsApp Piyush. He will answer faster than he should, given he is getting married.
        </p>
        <a href="https://wa.me/919899077017?text=Hi%20Piyush%2C%20about%20the%20wedding"
          className="mt-4 inline-block rounded-full bg-white px-7 py-2.5 text-[13px] font-bold text-[#1A5A54]">
          Message Piyush →
        </a>
      </div>
    </main>
  );
}
