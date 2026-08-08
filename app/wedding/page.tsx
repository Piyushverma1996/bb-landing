import Link from "next/link";
import HaldiRsvp from "./HaldiRsvp";
import Countdown from "./Countdown";
import { Monogram, Divider, Petals } from "./Ornaments";
import { EVENTS, mapsLink, DRIVE_URL } from "./weddingData";

const IG = "https://www.instagram.com/uru_ke_piya/";
const main = EVENTS.filter((e) => e.main);
const minor = EVENTS.filter((e) => !e.main);

const IgIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.05 1.8.25 2.2.42.6.22 1 .48 1.4.9.42.4.68.8.9 1.4.17.4.37 1 .42 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.05 1.2-.25 1.8-.42 2.2-.22.6-.48 1-.9 1.4-.4.42-.8.68-1.4.9-.4.17-1 .37-2.2.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.05-1.8-.25-2.2-.42-.6-.22-1-.48-1.4-.9-.42-.4-.68-.8-.9-1.4-.17-.4-.37-1-.42-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.05-1.2.25-1.8.42-2.2.22-.6.48-1 .9-1.4.4-.42.8-.68 1.4-.9.4-.17 1-.37 2.2-.42C8.4 2.2 8.8 2.2 12 2.2m0 5.86a3.94 3.94 0 1 0 0 7.88 3.94 3.94 0 0 0 0-7.88m6.41-1.68a1.44 1.44 0 1 1 0 2.88 1.44 1.44 0 0 1 0-2.88" /></svg>
);
const Pin = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7m0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5" /></svg>
);

export default function WeddingPage() {
  return (
    <main>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <Petals className="pointer-events-none absolute inset-0 h-full w-full" />
        <div className="relative mx-auto max-w-5xl px-5 pt-10 pb-4">
          <div className="grid items-center gap-8 md:grid-cols-[1.05fr_.95fr]">
            <div className="text-center md:text-left">
              <Monogram className="mx-auto h-16 w-16 text-[#C9A55C] md:mx-0" />
              <a href={IG} target="_blank" rel="noopener"
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#C9A55C]/50 bg-white/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#B8893B]">
                <IgIcon className="h-3.5 w-3.5 fill-current" /> #UruKePiya
              </a>
              <h1 className="mt-4 text-[44px] font-bold leading-[.98] md:text-[68px]"
                style={{ fontFamily: "var(--font-playfair), serif", color: "#0F3D38" }}>
                Urvashi
                <span className="mx-2 align-middle text-[30px] italic text-[#E0932F] md:text-[44px]">&amp;</span>
                Piyush
              </h1>
              <p className="mt-3 text-[12.5px] font-bold tracking-[0.2em] text-[#8C2F39]">
                5 &ndash; 12 DECEMBER 2026 · NEW DELHI
              </p>
              <p className="mt-5 max-w-md text-[14.5px] leading-[1.85] text-[#1A5A54]/85">
                She has spent seven years making other brides look unforgettable. In December she finally gets to be one,
                and <strong className="font-semibold text-[#0F3D38]">Piyush</strong> gets to stand next to her while it happens.
              </p>
              <div className="mt-7"><Countdown /></div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[40px] bg-gradient-to-br from-[#E0932F]/25 via-[#F3CDD3]/40 to-[#2E8B83]/20 blur-xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/uru-ke-piya-caricature.webp" width={1100} height={1366}
                alt="Illustration of Urvashi and Piyush on their wedding day"
                className="relative w-full max-w-[400px] mx-auto drop-shadow-[0_18px_40px_rgba(15,61,56,.18)]" />
            </div>
          </div>
        </div>
      </section>

      <Divider className="my-2" />

      {/* ================= MAIN EVENTS ================= */}
      <section className="mx-auto max-w-5xl px-5 py-10">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#E0932F]">The big three</p>
          <h2 className="mt-2 text-[30px] font-bold md:text-[38px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#0F3D38" }}>
            Where to be, and when
          </h2>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {main.map((e, i) => (
            <article key={i}
              className={`group relative overflow-hidden rounded-[28px] p-6 sm:p-7 shadow-[0_18px_50px_-24px_rgba(15,61,56,.55)] ${i === 2 ? "md:col-span-2" : ""}`}
              style={{
                background:
                  i === 0 ? "linear-gradient(140deg,#0F3D38 0%,#2E8B83 100%)"
                  : i === 1 ? "linear-gradient(140deg,#E0932F 0%,#C9A55C 55%,#F0B357 100%)"
                  : "linear-gradient(120deg,#7B1E2B 0%,#8C2F39 45%,#C9A55C 140%)",
              }}>
              {/* subtle shimmer sweep so the tiles read as celebratory, not flat */}
              <span className="pointer-events-none absolute -left-1/3 top-0 h-full w-1/3 rotate-12 bg-white/15 blur-xl transition-transform duration-1000 group-hover:translate-x-[420%]" />
              <div className="relative">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/75">{e.day} · {e.date}</p>
                <h3 className="mt-1.5 text-[30px] font-bold leading-tight text-white md:text-[34px]" style={{ fontFamily: "var(--font-playfair), serif" }}>
                  {e.name}
                </h3>
                <p className="mt-2 max-w-md text-[13.5px] leading-relaxed text-white/85">{e.note}</p>

                <div className="mt-5 flex flex-wrap items-center gap-2.5">
                  <a href={mapsLink(e)} target="_blank" rel="noopener"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-[12.5px] font-bold text-[#0F3D38] shadow-sm">
                    <Pin className="h-4 w-4 fill-current" />{e.venue}
                  </a>
                  <span className="rounded-full border border-white/45 px-4 py-2.5 text-[12.5px] font-semibold text-white">
                    {e.dress}
                  </span>
                </div>
                {e.dressNote && <p className="mt-3 text-[12.5px] italic leading-relaxed text-white/75">{e.dressNote}</p>}
              </div>
            </article>
          ))}
        </div>

        {/* Supporting events, as a light strip rather than more boxes */}
        <div className="mt-7">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#1A5A54]/45">Also happening</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {minor.map((e, i) => (
              <div key={i} className="border-l-2 border-[#C9A55C]/50 pl-3.5">
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#E0932F]">{e.day} · {e.date}</p>
                <p className="text-[16px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#0F3D38" }}>{e.name}</p>
                <p className="mt-0.5 text-[12px] leading-snug text-[#1A5A54]/65">{e.note}</p>
                <p className="mt-1 text-[11.5px] font-semibold text-[#8C2F39]">{e.dress}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-6 text-center text-[11.5px] text-[#1A5A54]/50">Tap a venue for directions. Timings go out on WhatsApp closer to the date.</p>
      </section>

      <Divider className="my-2" />

      {/* ================= LADIES SURPRISE ================= */}
      <section className="mx-auto max-w-3xl px-5 py-10">
        <div className="relative overflow-hidden rounded-[30px] border-2 border-[#E0932F]/40 bg-gradient-to-br from-[#FFF6E6] via-white to-[#FDECEF] p-7 sm:p-9">
          <span className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#E0932F]/15 blur-2xl" />
          <div className="relative">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E0932F]">Haldi · Friday 11 Dec, daytime</p>
            <h2 className="mt-2 text-[30px] font-bold leading-tight" style={{ fontFamily: "var(--font-playfair), serif", color: "#0F3D38" }}>
              We have planned something for the ladies
            </h2>
            <p className="mt-3 text-[14.5px] leading-[1.85] text-[#1A5A54]/85">
              Urvashi has organised a surprise for every woman who comes to the Haldi. We are not telling you what it is,
              because she would genuinely never forgive us. It is free, it takes about twenty minutes, and you will want to
              be photographed afterwards.
            </p>
            <p className="mt-3 text-[14.5px] leading-[1.85] text-[#1A5A54]/85">
              The only problem is arithmetic. There are a fixed number of places and one afternoon of daylight.
              So tell us how many ladies are coming with you, and we will hold that many.
            </p>
            <div className="mt-6"><HaldiRsvp /></div>
          </div>
        </div>

        {/* Men */}
        <div className="mt-6 rounded-[26px] border-2 border-dashed border-[#0F3D38]/25 bg-[#0F3D38]/[.04] p-6 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#2E8B83]">And for the men</p>
          <h3 className="mt-2 text-[22px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#0F3D38" }}>
            <span className="text-[#8C2F39]">Piyush</span> is planning something too
          </h3>
          <p className="mx-auto mt-2 max-w-md text-[13.5px] leading-relaxed text-[#1A5A54]/75">
            He will not say what, he will not say when, and he has been suspiciously pleased with himself about it for weeks.
            Turn up and find out.
          </p>
        </div>
      </section>

      <Divider className="my-2" />

      {/* ================= PHOTOS ================= */}
      <section className="mx-auto max-w-3xl px-5 py-10">
        <div className="text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#E0932F]">The shared album</p>
          <h2 className="mt-2 text-[30px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#0F3D38" }}>
            Your photos, on our screens
          </h2>
        </div>
        <p className="mx-auto mt-4 max-w-xl text-center text-[14.5px] leading-[1.85] text-[#1A5A54]/85">
          The photographer will get the posed ones. You will get the real ones. Drop anything you take into the shared
          album and we will run them as slides during the events, so the room ends up watching itself. Have an old photo
          of us from before all this? Put that in too. Those are the ones we actually want.
        </p>

        <div className="mx-auto mt-7 flex max-w-lg flex-col items-center gap-5 rounded-[28px] border border-[#C9A55C]/35 bg-white/80 p-6 sm:flex-row sm:text-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/wedding-drive-qr.png" width={742} height={742}
            alt="QR code linking to the UruKePiya 2026 shared photo album"
            className="h-[145px] w-[145px] shrink-0 rounded-2xl border border-[#C9A55C]/25 bg-white p-1.5" />
          <div className="text-center sm:text-left">
            <p className="text-[16px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#0F3D38" }}>UruKePiya 2026</p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[#1A5A54]/65">Point your camera at the code, or tap below. No login needed.</p>
            <a href={DRIVE_URL} target="_blank" rel="noopener"
              className="mt-3 inline-block rounded-full px-6 py-3 text-[12.5px] font-bold uppercase tracking-widest text-white shadow-md"
              style={{ background: "linear-gradient(120deg,#0F3D38,#E0932F)" }}>
              Open the album →
            </a>
          </div>
        </div>
      </section>

      <Divider className="my-2" />

      {/* ================= HER WORK ================= */}
      <section className="mx-auto max-w-3xl px-5 py-10">
        <h2 className="text-[28px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#0F3D38" }}>
          The bride has a day job
        </h2>
        <p className="mt-3 text-[14.5px] leading-[1.85] text-[#1A5A54]/85">
          Some of you have known Urvashi for years and still are not quite sure what she does all day. She runs{" "}
          <Link href="/" className="font-semibold text-[#2E8B83] underline decoration-[#C9A55C]/60 underline-offset-2">Blushes &amp; Brushes</Link>{" "}
          in Ramesh Nagar, and has done the makeup for more than two hundred brides across Delhi NCR since 2019.
          In December she becomes number two hundred and something, which she finds very funny.
        </p>
        <p className="mt-3 text-[14.5px] leading-[1.85] text-[#1A5A54]/85">
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
            <Link key={s.href} href={s.href}
              className="rounded-2xl border border-[#C9A55C]/30 bg-white/75 p-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
              <p className="text-[14px] font-bold text-[#0F3D38]">{s.t} →</p>
              <p className="mt-0.5 text-[12px] text-[#1A5A54]/65">{s.d}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= FOLLOW + CONTACT ================= */}
      <section className="mx-auto max-w-3xl px-5 pb-14">
        <div className="rounded-[30px] p-7 text-center"
          style={{ background: "linear-gradient(135deg,#FFF1DB,#FDE7EC 50%,#E6F1EC)" }}>
          <IgIcon className="mx-auto h-9 w-9 fill-[#E0932F]" />
          <p className="mt-2 text-[21px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#0F3D38" }}>Follow the chaos</p>
          <div className="mt-4 grid gap-2.5 sm:grid-cols-3">
            {[
              { h: "@uru_ke_piya", d: "Us, unfiltered", u: IG },
              { h: "@makeovers_by_urvashitrehan_", d: "Her makeup work", u: "https://www.instagram.com/makeovers_by_urvashitrehan_" },
              { h: "@blushesandbrushes2022", d: "Nails & beauty", u: "https://www.instagram.com/blushesandbrushes2022" },
            ].map((x) => (
              <a key={x.h} href={x.u} target="_blank" rel="noopener"
                className="rounded-2xl border border-[#C9A55C]/35 bg-white/90 p-3.5 transition-transform hover:-translate-y-0.5">
                <b className="block break-all text-[12.5px] text-[#2E8B83]">{x.h}</b>
                <span className="text-[11px] text-[#1A5A54]/65">{x.d}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[30px] p-7 text-center text-white shadow-md"
          style={{ background: "linear-gradient(120deg,#0F3D38,#2E8B83 55%,#C9A55C)" }}>
          <Monogram className="mx-auto h-12 w-12 text-white/70" />
          <p className="mt-2 text-[20px] font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Questions, or lost?</p>
          <p className="mx-auto mt-1 max-w-md text-[12.5px] text-white/90">
            Message <strong>Piyush</strong>. He replies faster than a man getting married in December really should.
          </p>
          <a href="https://wa.me/919899077017?text=Hi%20Piyush%2C%20about%20the%20wedding"
            className="mt-4 inline-block rounded-full bg-white px-7 py-3 text-[12.5px] font-bold uppercase tracking-widest text-[#0F3D38]">
            Message Piyush →
          </a>
        </div>
      </section>
    </main>
  );
}
