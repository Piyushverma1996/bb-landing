import Image from "next/image";
import LeadForm from "../components/LeadForm";

const COURSES = [
  {
    src: "/images/makeup-course.png",
    alt: "Professional Makeup Course – Bridal, Fashion & HD Makeup",
    title: "Makeup Course",
    tagline: "Bridal · Fashion · HD Makeup",
    fee: "₹20,000",
  },
  {
    src: "/images/nails-course.png",
    alt: "Nail Extensions & Nail Art Course – Beginner to Advanced",
    title: "Nail Extensions & Art",
    tagline: "Beginner to Advanced",
    fee: "₹20,000",
  },
  {
    src: "/images/beauty-course.png",
    alt: "Beauty Master Course – Professional Salon Training Program",
    title: "Beauty Master Course",
    tagline: "Professional Salon Training",
    fee: "₹20,000",
  },
];

const USPS = [
  {
    icon: "💄",
    title: "Real Salon Environment",
    desc: "Train on live models with professional-grade tools in an actual working salon — not a classroom.",
  },
  {
    icon: "👥",
    title: "Micro-Batches (Max 5 Students)",
    desc: "Small batches mean undivided attention, faster skill progression, and zero waiting for a station.",
  },
  {
    icon: "🏆",
    title: "Direct Mentorship by Founder",
    desc: "Learn directly from Urvashi Trehan — not a junior instructor. Her expertise, her standards, your growth.",
  },
];

const PROOF_POINTS = [
  { stat: "500+", label: "Students Trained" },
  { stat: "5★", label: "Google Rating" },
  { stat: "100%", label: "Hands-On Training" },
  { stat: "3", label: "Specializations" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-brand-cream font-sans">

      {/* ── Urgency Banner ── */}
      <div className="bg-brand-teal px-4 py-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
          🔥 Next Micro-Batch Starting Soon — Only 2 Seats Left! Book Your Free Trial Today.
        </p>
      </div>

      {/* ── Header / Nav ── */}
      <header className="sticky top-0 z-40 bg-brand-cream/95 backdrop-blur-sm shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Image
              src="/images/logo.jpeg"
              alt="Blushes and Brushes logo"
              width={52}
              height={52}
              className="rounded-full object-cover"
              priority
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-teal">
                Blushes &amp; Brushes
              </p>
              <p className="text-[10px] text-brand-teal/60">by Urvashi Trehan</p>
            </div>
          </div>
          <a
            href="#lead-form"
            className="rounded-full bg-brand-teal px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-gold shadow transition-all hover:bg-brand-teal-light"
          >
            Free Trial →
          </a>
        </div>
      </header>

      {/* ── Hero Section ── */}
      <section className="mx-auto max-w-5xl px-4 pt-10 pb-4">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">

          {/* Left: Copy */}
          <div className="flex flex-col gap-5">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-gold/20 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-teal">
                Ramesh Nagar, New Delhi
              </span>
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-brand-teal md:text-5xl">
              Start Your Career in{" "}
              <span className="text-brand-gold">Beauty &amp; Makeup</span>{" "}
              with a Free Trial Class
            </h1>

            <p className="text-base leading-relaxed text-brand-teal/70">
              Visit Blushes &amp; Brushes, experience our real-salon setup, meet
              Urvashi Trehan personally, and decide if it&rsquo;s right for you —
              completely free, zero commitment.
            </p>

            {/* Proof points */}
            <div className="grid grid-cols-4 gap-3">
              {PROOF_POINTS.map((p) => (
                <div
                  key={p.stat}
                  className="flex flex-col items-center rounded-xl bg-brand-teal/5 py-3 ring-1 ring-brand-teal/10"
                >
                  <span className="text-xl font-extrabold text-brand-teal">{p.stat}</span>
                  <span className="mt-0.5 text-center text-[10px] leading-tight text-brand-teal/60">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact strip */}
            <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-brand-teal px-5 py-4">
              <div className="flex items-center gap-2 text-sm text-white">
                <span className="text-brand-gold">📞</span>
                <a href="tel:7678446364" className="font-semibold hover:underline">
                  76784 46364
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-white">
                <span className="text-brand-gold">📍</span>
                <span>B 1/1 Double Storey, Ramesh Nagar, Opp. Subway, New Delhi – 110015</span>
              </div>
            </div>
          </div>

          {/* Right: Lead Form */}
          <div id="lead-form" className="w-full">
            <LeadForm variant="course" />
          </div>

        </div>
      </section>

      {/* ── Divider ── */}
      <div className="mx-auto my-10 max-w-5xl px-4">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-brand-gold/30" />
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
            Why Choose Us
          </span>
          <div className="h-px flex-1 bg-brand-gold/30" />
        </div>
      </div>

      {/* ── USP Section ── */}
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="grid gap-4 md:grid-cols-3">
          {USPS.map((usp) => (
            <div
              key={usp.title}
              className="flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-md ring-1 ring-brand-cream-dark"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal/10 text-2xl">
                {usp.icon}
              </div>
              <h3 className="text-base font-bold text-brand-teal">{usp.title}</h3>
              <p className="text-sm leading-relaxed text-brand-teal/65">{usp.desc}</p>
            </div>
          ))}
        </div>

        {/* Certifications strip */}
        <div className="mt-6 flex flex-wrap justify-center gap-6 rounded-2xl bg-brand-teal/5 px-6 py-5 ring-1 ring-brand-teal/10">
          {[
            { icon: "🎓", label: "Certificate Included" },
            { icon: "🪄", label: "Hands-On Practical Training" },
            { icon: "💼", label: "Placement Support" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-sm font-semibold text-brand-teal">
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Courses Section ── */}
      <section className="bg-brand-teal py-12">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              Our Courses
            </p>
            <h2 className="mt-1 text-3xl font-extrabold text-white">
              3 Professional Programs. One Academy.
            </h2>
            <p className="mt-2 text-sm text-white/60">
              Each course includes certificate, hands-on practice &amp; placement support.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {COURSES.map((course) => (
              <div
                key={course.title}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-xl transition-transform hover:-translate-y-1"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={course.src}
                    alt={course.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-col gap-1 px-4 py-4">
                  <h3 className="text-sm font-bold text-brand-teal">{course.title}</h3>
                  <p className="text-xs text-brand-teal/60">{course.tagline}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-base font-extrabold text-brand-gold">{course.fee}</span>
                    <a
                      href="#lead-form"
                      className="rounded-full bg-brand-teal px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-brand-gold transition-all hover:bg-brand-teal-light"
                    >
                      Free Trial
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Second CTA ── */}
      <section className="mx-auto max-w-5xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-extrabold text-brand-teal">
              Ready to take the first step?
            </h2>
            <p className="text-sm leading-relaxed text-brand-teal/70">
              Fill out the form and we&rsquo;ll WhatsApp you to schedule your free
              1-day trial class and studio tour. Come see the space, meet the team,
              and decide for yourself.
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "No fees to attend the trial",
                "Tour the real working salon",
                "Meet Urvashi Trehan personally",
                "Get your questions answered",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-brand-teal/80">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-[10px] font-bold text-brand-gold">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <LeadForm compact variant="course" />
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-brand-dark py-8 text-center">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex flex-col items-center gap-2">
            <Image
              src="/images/logo.jpeg"
              alt="Blushes and Brushes"
              width={44}
              height={44}
              className="rounded-full opacity-80"
            />
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
              Blushes &amp; Brushes
            </p>
            <p className="text-[11px] text-white/40">by Urvashi Trehan</p>
            <p className="mt-2 text-[11px] text-white/40">
              B 1/1 Double Storey, Ramesh Nagar, Opp. Subway, New Delhi – 110015
            </p>
            <a
              href="tel:7678446364"
              className="text-xs font-semibold text-brand-gold hover:underline"
            >
              📞 76784 46364
            </a>
            <p className="mt-4 text-[10px] text-white/20">
              © {new Date().getFullYear()} Blushes &amp; Brushes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
