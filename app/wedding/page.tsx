import Link from "next/link";
import HaldiRsvp from "./HaldiRsvp";
import Countdown from "./Countdown";
import { EVENTS, mapsLink, DRIVE_URL, DRIVE_READY } from "./weddingData";

const IG = "https://www.instagram.com/uru_ke_piya/";

export default function WeddingPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      {/* ---------- Hero ---------- */}
      <div className="text-center">
        <a href={IG} target="_blank" rel="noopener"
          className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A55C]/40 bg-white/60 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C9A55C]">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.42.4.68.8.9 1.4.17.4.37 1 .42 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.4.42-.8.68-1.4.9-.4.17-1 .37-2.2.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.22-1-.48-1.4-.9-.42-.4-.68-.8-.9-1.4-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.4-.42.8-.68 1.4-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2m0 5.86a3.94 3.94 0 1 0 0 7.88 3.94 3.94 0 0 0 0-7.88m6.41-1.68a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88"/></svg>
          #UruKePiya
        </a>
        <h1 className="mt-4 text-[40px] font-bold leading-[1.05] md:text-[58px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
          Urvashi <span className="text-[#C9A55C]">&amp;</span> Piyush
        </h1>
        <p className="mt-3 text-[13px] font-semibold tracking-[0.16em] text-[#2E8B83]">5 &ndash; 12 DECEMBER 2026 · NEW DELHI</p>
        <div className="mt-6"><Countdown /></div>
        <p className="mx-auto mt-6 max-w-lg text-[14.5px] leading-[1.8] text-[#1A5A54]/85">
          She has spent seven years making other brides look unforgettable. In December she finally gets to be one,
          and <strong className="font-semibold text-[#1A5A54]">Piyush</strong> gets to stand next to her while it happens.
          You are invited to every bit of it.
        </p>
      </div>

      {/* ---------- Events ---------- */}
      <section className="mt-14">
        <h2 className="text-[26px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>The week</h2>
        <p className="mt-1.5 text-[12.5px] text-[#1A5A54]/60">Tap a venue for directions. Timings go out on WhatsApp closer to the date.</p>

        <div className="mt-5 space-y-3">
          {EVENTS.map((e, i) => {
            const m = mapsLink(e);
            return (
              <div key={i}
                className={`rounded-2xl border p-4 sm:p-5 ${e.highlight ? "border-[#C9A55C]/55 bg-[#F7D6C6]/40" : "border-[#C9A55C]/20 bg-white/65"}`}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[12px] font-bold uppercase tracking-wide text-[#C9A55C]">{e.day} · {e.date}</span>
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[#2E8B83]/70">{e.side}</span>
                </div>
                <h3 className="mt-1 text-[19px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>{e.name}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#1A5A54]/70">{e.note}</p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {e.venue ? (
                    <a href={m} target="_blank" rel="noopener"
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#2E8B83] px-3.5 py-2 text-[12px] font-semibold text-white">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7m0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5"/></svg>
                      {e.venue}
                    </a>
                  ) : (
                    <span className="rounded-full border border-dashed border-[#C9A55C]/50 px-3.5 py-2 text-[12px] font-semibold text-[#1A5A54]/55">Venue to be confirmed</span>
                  )}
                  <span className="rounded-full bg-[#DFD5EE]/70 px-3.5 py-2 text-[12px] font-semibold text-[#5d4e80]">Dress: {e.dress}</span>
                </div>
                {e.dressNote && <p className="mt-2 text-[12px] italic text-[#1A5A54]/60">{e.dressNote}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------- Photos ---------- */}
      <section className="mt-14 rounded-3xl border border-[#C9A55C]/30 bg-white/70 p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A55C]">The shared album</p>
        <h2 className="mt-2 text-[24px] font-bold leading-tight" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
          Your photos, on our screens
        </h2>
        <p className="mt-3 text-[14px] leading-[1.8] text-[#1A5A54]/85">
          The photographer will get the posed ones. You will get the real ones. Drop anything you take straight into the
          shared album and we will run them as slides during the events, so the room is watching itself.
        </p>
        <p className="mt-3 text-[14px] leading-[1.8] text-[#1A5A54]/85">
          Already have a photo of us from before all this? Put that in too. Those are the ones we actually want.
        </p>

        <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          {DRIVE_READY ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/wedding-drive-qr.png" alt="QR code to the shared wedding photo album"
                width={150} height={150} className="h-[150px] w-[150px] rounded-2xl border border-[#C9A55C]/30 bg-white p-2" />
              <div>
                <a href={DRIVE_URL} target="_blank" rel="noopener"
                  className="inline-block rounded-full px-6 py-3 text-[13px] font-bold uppercase tracking-widest text-white"
                  style={{ background: "linear-gradient(120deg,#2E8B83,#C9A55C)" }}>
                  Open the album →
                </a>
                <p className="mt-2 text-[12px] text-[#1A5A54]/60">Or point your camera at the code. No login needed.</p>
              </div>
            </>
          ) : (
            <p className="text-[13px] text-[#1A5A54]/60">
              The album link and QR code go live here shortly. Take photos anyway.
            </p>
          )}
        </div>
      </section>

      {/* ---------- Haldi surprise (ladies) ---------- */}
      <section className="mt-8 rounded-3xl border border-[#C9A55C]/35 bg-white/70 p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A55C]">Haldi · Friday 11 Dec, daytime</p>
        <h2 className="mt-2 text-[26px] font-bold leading-tight" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
          We have planned something for the ladies
        </h2>
        <p className="mt-3 text-[14px] leading-[1.8] text-[#1A5A54]/85">
          Urvashi has organised a surprise for every woman who comes to the Haldi. We are not telling you what it is,
          because she would genuinely never forgive us. It is free, it takes about twenty minutes, and you will want to
          be photographed afterwards.
        </p>
        <p className="mt-3 text-[14px] leading-[1.8] text-[#1A5A54]/85">
          The only problem is arithmetic. There are a fixed number of places and one afternoon of daylight.
          So tell us how many ladies are coming with you, and we will hold that many.
        </p>
        <div className="mt-6"><HaldiRsvp /></div>
      </section>

      {/* ---------- Men ---------- */}
      <section className="mt-8 rounded-3xl border border-dashed border-[#2E8B83]/40 bg-[#CFE9DF]/25 p-6 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2E8B83]">And for the men</p>
        <h2 className="mt-2 text-[22px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
          <strong className="text-[#2E8B83]">Piyush</strong> is planning something too
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-[#1A5A54]/75">
          He will not say what, he will not say when, and he has been suspiciously pleased with himself about it for weeks.
          Turn up and find out.
        </p>
      </section>

      {/* ---------- Blushes & Brushes, placed away from the RSVP ---------- */}
      <section className="mt-14">
        <h2 className="text-[24px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
          The bride has a day job
        </h2>
        <p className="mt-3 text-[14px] leading-[1.8] text-[#1A5A54]/85">
          Some of you have known Urvashi for years and still are not quite sure what she does all day. She runs{" "}
          <Link href="/" className="font-semibold text-[#2E8B83] underline decoration-[#C9A55C]/50 underline-offset-2">Blushes &amp; Brushes</Link>{" "}
          in Ramesh Nagar, and has done the makeup for more than two hundred brides across Delhi NCR since 2019.
          In December she becomes number two hundred and something, which she finds very funny.
        </p>
        <p className="mt-3 text-[14px] leading-[1.8] text-[#1A5A54]/85">
          Nobody is asking you to book anything. But weddings have a way of producing more weddings, and if somebody in
          your family is next, she would love the call.
        </p>
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {[
            { t: "Bridal makeup", d: "HD and airbrush, travels to your venue", href: "/services/bridal-makeup" },
            { t: "Party & Roka looks", d: "For the functions you attend, not host", href: "/services/party-makeup" },
            { t: "Nails", d: "Extensions and art from ₹499, at the studio", href: "/services/nail-extensions" },
            { t: "An afternoon off", d: "Facials, hair spa, pedicure. The good kind of quiet.", href: "/services/beauty-services" },
          ].map((s) => (
            <Link key={s.href} href={s.href} className="rounded-2xl border border-[#C9A55C]/25 bg-white/70 p-4 transition-all hover:shadow-md">
              <p className="text-[14px] font-bold text-[#1A5A54]">{s.t} →</p>
              <p className="mt-0.5 text-[12px] text-[#1A5A54]/65">{s.d}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- Follow ---------- */}
      <section className="mt-12 rounded-3xl p-6 text-center"
        style={{ background: "linear-gradient(135deg, rgba(247,214,198,.6), rgba(223,213,238,.6) 55%, rgba(207,233,223,.6))" }}>
        <svg viewBox="0 0 24 24" className="mx-auto h-9 w-9 fill-[#C9A55C]" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.42.4.68.8.9 1.4.17.4.37 1 .42 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.4.42-.8.68-1.4.9-.4.17-1 .37-2.2.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.22-1-.48-1.4-.9-.42-.4-.68-.8-.9-1.4-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.4-.42.8-.68 1.4-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2m0 5.86a3.94 3.94 0 1 0 0 7.88 3.94 3.94 0 0 0 0-7.88m6.41-1.68a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88"/></svg>
        <p className="mt-2 text-[20px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Follow the chaos</p>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
          <a href={IG} target="_blank" rel="noopener" className="rounded-2xl border border-[#C9A55C]/30 bg-white/85 p-3.5">
            <b className="block break-all text-[12.5px] text-[#2E8B83]">@uru_ke_piya</b>
            <span className="text-[11px] text-[#1A5A54]/65">Us, unfiltered</span>
          </a>
          <a href="https://www.instagram.com/makeovers_by_urvashitrehan_" target="_blank" rel="noopener" className="rounded-2xl border border-[#C9A55C]/30 bg-white/85 p-3.5">
            <b className="block break-all text-[12.5px] text-[#2E8B83]">@makeovers_by_urvashitrehan_</b>
            <span className="text-[11px] text-[#1A5A54]/65">Her makeup work</span>
          </a>
          <a href="https://www.instagram.com/blushesandbrushes2022" target="_blank" rel="noopener" className="rounded-2xl border border-[#C9A55C]/30 bg-white/85 p-3.5">
            <b className="block break-all text-[12.5px] text-[#2E8B83]">@blushesandbrushes2022</b>
            <span className="text-[11px] text-[#1A5A54]/65">Nails &amp; beauty</span>
          </a>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <div className="mt-12 rounded-3xl p-6 text-center text-white shadow-md" style={{ background: "linear-gradient(120deg,#2E8B83,#5FB3A3 55%,#C9A55C)" }}>
        <p className="text-[19px] font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Questions, or lost?</p>
        <p className="mx-auto mt-1 max-w-md text-[12.5px] text-white/90">
          Message <strong>Piyush</strong>. He replies faster than a man getting married in December really should.
        </p>
        <a href="https://wa.me/919899077017?text=Hi%20Piyush%2C%20about%20the%20wedding"
          className="mt-4 inline-block rounded-full bg-white px-7 py-2.5 text-[13px] font-bold text-[#1A5A54]">
          Message Piyush →
        </a>
      </div>
    </main>
  );
}
