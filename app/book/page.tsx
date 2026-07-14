import Image from "next/image";
import LeadForm from "../components/LeadForm";

const BRIDAL = [
  { title: "HD Bridal Makeup", price: "₹18,000 – 22,000", points: ["Long-lasting waterproof base", "False lashes + premium products", "Customised eye & lip look"] },
  { title: "Airbrush Bridal Makeup", price: "₹25,000 – 30,000", points: ["Lightweight flawless airbrush finish", "Ideal for outdoor / day weddings", "Includes lashes + skincare prep"], featured: true },
  { title: "Engagement / Roka / Sagan", price: "₹10,000 – 15,000", points: ["HD or soft-glam options", "Hairstyling & draping included"] },
  { title: "Reception / Cocktail", price: "₹12,000 – 16,000", points: ["High-glam party look", "Customised glam eyes"] },
];

const NAILS = [
  { title: "Nail Art & Designer Sets", price: "from ₹1,500", note: "Chrome, ombré, French, custom art", img: "/images/nails-1.jpg" },
  { title: "Luxe French & Embellished", price: "from ₹1,200", note: "Pearls, gold detailing, glass finish", img: "/images/nails-2.jpg" },
  { title: "Nail Extensions", price: "₹499 onwards", note: "Includes complimentary nail art", img: "/images/nails-1.jpg" },
];

const BEAUTY = [
  { title: "Glow Cleanup Combo", price: "₹499", points: ["Fruit bleach", "Fruit cleanup", "Arm wax", "Threading"] },
  { title: "De-Tan Glow Combo", price: "₹699", points: ["D-tan bleach", "Glow cleanup", "Arm wax", "Thread + head wash"] },
  { title: "Facial + Pedicure Combo", price: "₹999", points: ["Bleach glow facial", "Pedicure", "Arms + half-leg wax", "Head wash"] },
  { title: "Full Pamper Combo", price: "₹1,499", points: ["Red-wine facial", "Mani + pedicure", "Full-leg + arm wax", "Head wash + threading"] },
];

const OFFER = [
  { emoji: "💅", title: "Nail Extensions", price: "₹499", add: "+ Complimentary Nail Art" },
  { emoji: "🍫", title: "White Chocolate Arms Wax", price: "₹249", add: "+ Complimentary De-Tan Bleach" },
  { emoji: "🦶", title: "Pedicure", price: "₹199", add: "+ Complimentary Permanent Nailpaint" },
  { emoji: "💆‍♀️", title: "Head Wash", price: "₹149", add: "+ Complimentary Head Massage" },
];

const PROOF = [
  { stat: "4.8★", label: "Google Rating" },
  { stat: "200+", label: "Happy Brides & Clients" },
  { stat: "NCR", label: "Travels for Bridal" },
  { stat: "Est. 2019", label: "Ramesh Nagar Studio" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-cream font-sans">

      {/* ── Banner ── */}
      <div className="bg-brand-teal px-4 py-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
          🌸 Booking bridal &amp; party dates for the season — limited slots. Reserve yours today.
        </p>
      </div>

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.jpeg" alt="Blushes and Brushes logo" width={52} height={52} className="rounded-full object-cover" priority />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-teal">Blushes &amp; Brushes</p>
              <p className="text-[10px] text-brand-teal/60">by Urvashi Trehan</p>
            </div>
          </div>
          <a href="#lead-form" className="rounded-full bg-brand-teal px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-gold shadow transition-all hover:bg-brand-teal-light">
            Book Now →
          </a>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="mx-auto max-w-5xl px-4 pt-10 pb-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="flex flex-col gap-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-gold/20 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-teal">Ramesh Nagar, New Delhi · Travels across NCR</span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-brand-teal md:text-5xl">
              Look <span className="text-brand-gold">Flawless</span> on Every Big Day
            </h1>

            <p className="text-base leading-relaxed text-brand-teal/70">
              Bridal &amp; party makeup, nail art, and beauty by <span className="font-semibold text-brand-teal">Urvashi Trehan</span>.
              From bare canvas to bridal brilliance — every brushstroke, a story. Book your look and we&rsquo;ll WhatsApp you to confirm.
            </p>

            <div className="relative h-72 w-full overflow-hidden rounded-2xl shadow-lg ring-1 ring-brand-gold/20">
              <Image src="/images/bridal-hero.jpg" alt="Real bride — bridal makeup by Urvashi Trehan" fill className="object-cover object-top" sizes="(max-width:1024px) 100vw, 45vw" priority />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-3">
                <p className="text-xs font-semibold text-white">&ldquo;Red isn&rsquo;t just a colour — it&rsquo;s a bride&rsquo;s power.&rdquo;</p>
                <p className="text-[10px] text-white/70">Real bride · makeup by Urvashi</p>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {PROOF.map((p) => (
                <div key={p.label} className="flex flex-col items-center rounded-xl bg-brand-teal/5 py-3 ring-1 ring-brand-teal/10">
                  <span className="text-lg font-extrabold text-brand-teal">{p.stat}</span>
                  <span className="mt-0.5 text-center text-[10px] leading-tight text-brand-teal/60">{p.label}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-brand-teal px-5 py-4">
              <div className="flex items-center gap-2 text-sm text-white">
                <span className="text-brand-gold">📞</span>
                <a href="tel:7678446364" className="font-semibold hover:underline">76784 46364</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
                <span className="text-brand-gold">📍</span>
                <span>B 1/1 Double Storey, Ramesh Nagar, Opp. Subway, New Delhi – 110015</span>
              </div>
            </div>
          </div>

          <div id="lead-form" className="w-full">
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ── Real Brides Gallery ── */}
      <section className="mx-auto max-w-5xl px-4 pt-10">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Real Brides · Real Glow</p>
          <h2 className="mt-1 text-3xl font-extrabold text-brand-teal">Looks that turn heads on the big day</h2>
          <p className="mt-2 text-sm text-brand-teal/60">Every face below is a real Blushes &amp; Brushes client — no filters, no stock photos.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { src: "/images/bridal-1.jpg", cap: "Glowing in signature bridal glam ✨" },
            { src: "/images/bridal-2.jpg", cap: "A royal bride isn’t subtle — she’s unforgettable 👑" },
            { src: "/images/party-glam.jpg", cap: "Soft glam, flawless skin, picture-perfect finish" },
            { src: "/images/new-bridal-peach.jpg", cap: "Every ceremony, picture-perfect" },
          ].map((g) => (
            <figure key={g.src} className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-md ring-1 ring-brand-cream-dark">
              <Image src={g.src} alt={g.cap} fill className="object-cover object-top transition-transform duration-500 group-hover:scale-105" sizes="(max-width:768px) 50vw, 25vw" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-[10px] font-medium leading-tight text-white">{g.cap}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-5 text-center">
          <a href="#lead-form" className="inline-block rounded-full bg-brand-teal px-6 py-3 text-xs font-bold uppercase tracking-widest text-brand-gold shadow hover:bg-brand-teal-light">Book your look →</a>
        </div>
      </section>

      {/* ── Offer of the Week ── */}
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl p-6" style={{ background: "linear-gradient(135deg,#FBEFE7,#F3CDD3 60%,#DFD5EE)" }}>
          <div className="text-center mb-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#B05A68]">Offer of the Week ✨</p>
            <h2 className="mt-1 text-2xl font-extrabold text-brand-teal">Walk-in Specials · 11:30 AM – 3:00 PM</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {OFFER.map((o) => (
              <div key={o.title} className="rounded-2xl bg-white/80 p-4 text-center shadow-sm">
                <div className="text-2xl">{o.emoji}</div>
                <p className="mt-1 text-[12px] font-bold text-brand-teal leading-tight">{o.title}</p>
                <p className="mt-1 text-xl font-extrabold text-brand-gold">{o.price}</p>
                <p className="mt-1 text-[10px] text-brand-teal/60 leading-tight">{o.add}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bridal & Party Makeup ── */}
      <section className="bg-brand-teal py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Bridal &amp; Party Makeup</p>
            <h2 className="mt-1 text-3xl font-extrabold text-white">Your most beautiful day, done right</h2>
            <p className="mt-2 text-sm text-white/60">HD &amp; airbrush · lashes &amp; skincare prep · Urvashi travels across Delhi NCR</p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {BRIDAL.map((b) => (
              <div key={b.title} className={`rounded-2xl bg-white p-6 shadow-xl ${b.featured ? "ring-2 ring-brand-gold" : ""}`}>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-brand-teal">{b.title}</h3>
                  {b.featured && <span className="rounded-full bg-brand-gold/20 px-3 py-1 text-[10px] font-bold uppercase text-brand-gold">Most loved</span>}
                </div>
                <p className="mt-1 text-xl font-extrabold text-brand-gold">{b.price}</p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {b.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2 text-sm text-brand-teal/75">
                      <span className="mt-0.5 text-brand-gold">✓</span>{pt}
                    </li>
                  ))}
                </ul>
                <a href="#lead-form" className="mt-4 inline-block rounded-full bg-brand-teal px-5 py-2 text-[11px] font-bold uppercase tracking-wide text-brand-gold hover:bg-brand-teal-light">Enquire / Book →</a>
              </div>
            ))}
          </div>
          <p className="mt-5 text-center text-xs text-white/50">Add-ons: Hairstyling ₹2,000–4,000 · Saree/dupatta draping · Nail extensions ₹1,500 · Trial makeup ₹2,000–3,000 (adjustable on booking). Travel charges apply by location.</p>
        </div>
      </section>

      {/* ── Nail Art & Extensions ── */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Nail Art &amp; Extensions</p>
          <h2 className="mt-1 text-3xl font-extrabold text-brand-teal">Nails that turn heads</h2>
          <p className="mt-2 text-sm text-brand-teal/60">Studio in Ramesh Nagar · gel, extensions, chrome &amp; custom art</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {NAILS.map((n) => (
            <div key={n.title} className="overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-brand-cream-dark">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image src={n.img} alt={n.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
              </div>
              <div className="p-5 text-center">
                <h3 className="text-base font-bold text-brand-teal">{n.title}</h3>
                <p className="mt-1 text-2xl font-extrabold text-brand-gold">{n.price}</p>
                <p className="mt-2 text-sm text-brand-teal/60">{n.note}</p>
                <a href="#lead-form" className="mt-4 inline-block rounded-full bg-brand-teal px-5 py-2 text-[11px] font-bold uppercase tracking-wide text-brand-gold hover:bg-brand-teal-light">Book →</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Beauty Combos ── */}
      <section className="py-12" style={{ background: "linear-gradient(135deg,#E8F0EB,#CFE9DF)" }}>
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2E7D6E]">Beauty Studio</p>
            <h2 className="mt-1 text-3xl font-extrabold text-brand-teal">Salon combos that pamper</h2>
            <p className="mt-2 text-sm text-brand-teal/60">Facials · cleanups · waxing · keratin · hair spa · threading</p>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {BEAUTY.map((c) => (
              <div key={c.title} className="flex flex-col rounded-2xl bg-white p-5 shadow-md">
                <p className="text-2xl font-extrabold text-brand-gold">{c.price}</p>
                <h3 className="mt-1 text-sm font-bold text-brand-teal">{c.title}</h3>
                <ul className="mt-2 flex flex-col gap-1">
                  {c.points.map((pt) => (
                    <li key={pt} className="text-[12px] text-brand-teal/70">• {pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Second CTA ── */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-extrabold text-brand-teal">Ready to book your look?</h2>
            <p className="text-sm leading-relaxed text-brand-teal/70">
              Tell us what you need — bridal, party, nails, or beauty — and Urvashi&rsquo;s team will WhatsApp you to confirm your date, share options, and lock your slot.
            </p>
            <ul className="flex flex-col gap-2">
              {["Quick WhatsApp confirmation", "Bridal trials available", "Urvashi travels across Delhi NCR", "4.8★ rated, 200+ happy clients"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-brand-teal/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-[10px] font-bold text-brand-gold">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <LeadForm compact />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-brand-dark py-8 text-center">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col items-center gap-2">
            <Image src="/images/logo.jpeg" alt="Blushes and Brushes" width={44} height={44} className="rounded-full opacity-80" />
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Blushes &amp; Brushes</p>
            <p className="text-[11px] text-white/40">by Urvashi Trehan</p>
            <p className="mt-2 text-[11px] text-white/40">B 1/1 Double Storey, Ramesh Nagar, Opp. Subway, New Delhi – 110015</p>
            <a href="tel:7678446364" className="text-xs font-semibold text-brand-gold hover:underline">📞 76784 46364</a>
            <a href="/courses" className="mt-2 text-[10px] text-white/30 hover:text-white/50 underline">Beauty courses &amp; academy →</a>
            <p className="mt-3 text-[10px] text-white/20">© {new Date().getFullYear()} Blushes &amp; Brushes. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
