// Blushes & Brushes — Journal content.
// Each post is an SEO-targeted, genuinely useful article that ends with a soft CTA to /book.
// Add new posts here; the index, article route, and sitemap pick them up automatically.

export type Block =
  | { h: string }
  | { p: string }
  | { ul: string[] };

export interface Post {
  slug: string;
  title: string;          // <title> + H1
  description: string;    // meta description (~150 chars, keyword-rich)
  category: string;
  date: string;           // ISO — publish date
  updated?: string;
  readMins: number;
  cover: string;          // /images/... path
  keywords: string[];
  body: Block[];
}

export const POSTS: Post[] = [
  {
    slug: "bridal-makeup-hd-vs-airbrush-delhi",
    title: "HD vs Airbrush Bridal Makeup: Which Lasts Longer for a Delhi Wedding?",
    description:
      "HD or airbrush for your Delhi bridal look? A working makeup artist breaks down longevity, finish, cost and which suits your skin, weather and wedding function.",
    category: "Bridal",
    date: "2026-07-08",
    readMins: 6,
    cover: "/images/bridal-hero.jpg",
    keywords: ["bridal makeup delhi", "hd vs airbrush makeup", "airbrush bridal makeup", "wedding makeup west delhi"],
    body: [
      { p: "Every bride who books a trial asks the same first question: HD or airbrush? Both give a flawless finish in photos — the real difference shows up eight hours later, on a Delhi wedding day that runs from a morning Sagan to a midnight reception. Here is the honest, artist's-eye comparison." },
      { h: "What HD makeup actually is" },
      { p: "HD (high-definition) makeup uses finely-milled, light-reflecting products applied by hand with brushes and sponges. It's buildable, richly pigmented and photographs beautifully under both natural light and flash. Because it's hand-blended, it gives the artist total control over contour, colour correction and that soft, dewy 'lit-from-within' look many brides want." },
      { h: "What airbrush makeup does differently" },
      { p: "Airbrush foundation is sprayed on in a fine mist using an air-gun, building an even, weightless, second-skin layer. It's silicone- or water-based and famous for staying put through heat, tears and hours of hugging relatives. On camera it reads as an ultra-smooth, matte-satin finish with no visible product texture." },
      { h: "Longevity: the part that matters in Delhi heat" },
      { ul: [
        "Airbrush wins on sheer staying power — 10–14 hours through summer humidity and sweat, with minimal touch-ups. Ideal for peak-summer or outdoor day functions.",
        "HD holds beautifully for 8–10 hours and is easier to touch up on the go, since it's applied with familiar products.",
        "For a multi-function day (Haldi to reception), many brides do airbrush base for the long haul and HD detailing on eyes and lips.",
      ] },
      { h: "Which finish suits your skin" },
      { p: "Oily or combination skin in a humid month tends to love airbrush's matte hold. Dry or mature skin often looks more radiant in HD, which can be layered with hydrating primers and cream products for a natural glow. This is exactly what a trial is for — we test a small area under real light before your day." },
      { h: "So which should you book?" },
      { p: "There is no single winner — there's a right choice for your skin, your weather and your function. As a rule of thumb: airbrush for endurance and a matte-satin look; HD for a soft, dewy, easily-refreshed finish. A skilled artist will often blend both. What never changes is prep: hydrated, well-primed skin outlasts any technique." },
      { p: "Blushes & Brushes offers both HD and airbrush bridal makeup, travelling across Delhi NCR for weddings, with trials so you decide with confidence." },
    ],
  },
  {
    slug: "how-long-do-nail-extensions-last-aftercare",
    title: "How Long Do Nail Extensions Last? Aftercare Tips from a Ramesh Nagar Studio",
    description:
      "Nail extensions typically last 3–4 weeks. Learn what makes them last longer, how to avoid lifting and chipping, and simple aftercare from a West Delhi nail studio.",
    category: "Nails",
    date: "2026-07-11",
    readMins: 5,
    cover: "/images/nails-1.jpg",
    keywords: ["nail extensions", "how long do nail extensions last", "gel nail aftercare", "nail extensions west delhi", "nail art ramesh nagar"],
    body: [
      { p: "You've just left the studio with a fresh set of extensions and one question in mind: how long will these actually last? The short answer is three to four weeks before a refill — but how well they wear depends almost entirely on aftercare. Here's how to get the full life out of your set." },
      { h: "What determines longevity" },
      { ul: [
        "Prep quality: proper cuticle work and dehydration before application is 80% of how long a set lasts.",
        "Your nail growth: fast natural growth means an earlier refill (that visible gap at the base).",
        "Daily habits: using nails as tools, hot water, and harsh cleaning are the top three culprits behind lifting.",
      ] },
      { h: "The first 24 hours" },
      { p: "Avoid long, hot showers and dishwashing right after application — the bond is still settling. Skip acetone-based removers and heavy hand sanitiser near the cuticle for the first day." },
      { h: "Simple aftercare that actually works" },
      { ul: [
        "Oil your cuticles daily — flexible nails chip far less than dry, brittle ones.",
        "Wear gloves for cleaning and gardening; water and detergents are the enemy of the seal.",
        "Don't pick or peel. If a nail lifts, book a fix — pulling it off takes your natural nail layer with it.",
        "Book a refill at 2–3 weeks rather than waiting for breakage.",
      ] },
      { h: "Signs it's time for a refill" },
      { p: "A visible growth gap at the base, any lifting at the edges, or a nail that snags on fabric are all cues to come in. A timely refill is quicker and cheaper than a full new set — and keeps your natural nails healthy underneath." },
      { p: "Blushes & Brushes in Ramesh Nagar does gel extensions, French, ombré and chrome nail art — currently from ₹499 with complimentary nail art. Book a slot and we'll help you choose a shape that fits your lifestyle." },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
