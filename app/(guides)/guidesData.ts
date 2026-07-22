// Editorial "best of" head-term pages — buyer's guides that genuinely help the
// searcher AND position Blushes & Brushes as the top pick. Flat URLs (route group
// (guides) doesn't affect the path) mirror taryasalonstudio.com's /best-salon-in-dehradun/.

export type Block = { h: string } | { p: string } | { ul: string[] };
export interface FAQ { q: string; a: string }

export interface Guide {
  slug: string;              // = the flat URL path
  nav: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  cover: string;
  intro: string[];
  sections: Block[];
  faq: FAQ[];
  ctaLine: string;
}

const PROOF = "Blushes & Brushes by Urvashi Trehan holds a 4.8★ Google rating from 200+ brides, uses HD Forever 52, NARS and Huda Beauty, offers both HD and airbrush finishes, and travels across Delhi NCR with transparent, no-hidden-charge pricing.";

export const GUIDES: Guide[] = [
  {
    slug: "best-bridal-makeup-artist-in-delhi",
    nav: "Best Bridal MUA in Delhi",
    title: "Best Bridal Makeup Artist in Delhi (2026): How to Choose + Top Pick",
    h1: "Best Bridal Makeup Artist in Delhi (2026)",
    description:
      "How to choose the best bridal makeup artist in Delhi — HD vs airbrush, real prices, red flags, and questions to ask. Plus a top-rated West Delhi pick: Blushes & Brushes.",
    keywords: ["best bridal makeup artist in delhi", "top bridal makeup artist delhi", "bridal makeup artist near me delhi", "best hd makeup artist delhi", "airbrush bridal makeup delhi"],
    cover: "/images/gallery/bb-bridal-makeup-red-01.jpeg",
    intro: [
      "Searching for the best bridal makeup artist in Delhi is overwhelming — hundreds of pages, wildly different prices, and everyone claims to be the best. This is an honest guide from a working artist's perspective: what actually separates a great bridal MUA from an average one, what you should pay in 2026, and how to shortlist with confidence.",
      "We'll also be upfront: Blushes & Brushes is one such studio (based in West Delhi), and we'll show you exactly why — but the criteria below apply whoever you choose.",
    ],
    sections: [
      { h: "What makes a great bridal makeup artist in Delhi" },
      { ul: [
        "Longevity: your look must survive 10–14 hours through Delhi heat, hugs and tears — ask specifically about airbrush and long-wear HD.",
        "Skin-first technique: great artists spend as long on skin prep and shade-matching as on the eyes. A base that greys in photos is the #1 avoidable mistake.",
        "Real-client photos, not portfolio shoots: ask to see last month's actual brides, in daylight and flash.",
        "A proper trial: a good artist welcomes a trial and adjusts without ego.",
        "Transparent pricing: hair, lashes, draping and touch-up kit should be included — surprises on the wedding morning are a red flag.",
      ] },
      { h: "How much should bridal makeup cost in Delhi (2026)?" },
      { ul: [
        "₹8,000–15,000 — newer/parlour artists. Fine for small functions; verify real-bride photos.",
        "₹18,000–30,000 — established independent artists using HD/airbrush and premium products. The value sweet spot.",
        "₹35,000–60,000+ — celebrity-adjacent studios; you're often paying for the brand name.",
      ] },
      { p: "The technique gap between the ₹25K band and the ₹60K band is far smaller than the price gap. Most Delhi brides get their best value in the ₹18–30K range." },
      { h: "Red flags to avoid" },
      { ul: [
        "No trial offered at any price — you're gambling with your wedding photos.",
        "Prices that undercut everyone by half — usually old stock or diluted products.",
        "No written confirmation of date, arrival time, and what's included.",
        "Only filtered Instagram reels, never a real unedited bride.",
      ] },
      { h: "A top-rated pick in West Delhi: Blushes & Brushes" },
      { p: PROOF + " Bridal is HD ₹18–22K or airbrush ₹25–30K, with trials at the Ramesh Nagar studio and travel to venues across Delhi NCR. If you're in West Delhi — Ramesh Nagar, Rajouri Garden, Janakpuri, Punjabi Bagh, Karol Bagh and beyond — it's worth a free consultation." },
    ],
    faq: [
      { q: "Who is the best bridal makeup artist in Delhi?", a: "There's no single 'best' — the right artist depends on your budget, skin and function. Shortlist by real-client photos, a proper trial, long-wear technique (airbrush/HD) and transparent pricing. In West Delhi, Blushes & Brushes by Urvashi Trehan is a top-rated option (4.8★, 200+ brides)." },
      { q: "How much does a good bridal makeup artist cost in Delhi?", a: "Established independent artists charge ₹18,000–30,000 for the wedding look (HD ₹18–22K, airbrush ₹25–30K). Below ₹15K is usually newer artists; above ₹35K is celebrity-brand pricing." },
      { q: "Should I book HD or airbrush for a Delhi wedding?", a: "Airbrush for long summer days and maximum staying power; HD for a soft dewy finish or winter weddings. A trial lets you test both on your skin before deciding." },
      { q: "How early should I book my bridal makeup artist?", a: "For Delhi's Nov–Feb peak season, 3–4 months ahead — the best artists' dates fill fast." },
    ],
    ctaLine: "Planning your Delhi wedding? Get a free, no-pressure consultation with Urvashi.",
  },
  {
    slug: "best-makeup-artist-in-west-delhi",
    nav: "Best MUA in West Delhi",
    title: "Best Makeup Artist in West Delhi (2026): Bridal, Party & Nails Guide",
    h1: "Best Makeup Artist in West Delhi (2026)",
    description:
      "Finding the best makeup artist in West Delhi — Ramesh Nagar, Rajouri Garden, Janakpuri, Tilak Nagar & more. Prices, what to check, and a 4.8★ local pick: Blushes & Brushes.",
    keywords: ["best makeup artist in west delhi", "makeup artist west delhi", "makeup artist ramesh nagar", "bridal makeup west delhi", "party makeup west delhi"],
    cover: "/images/gallery/bb-party-makeup-gold-01.jpeg",
    intro: [
      "West Delhi — from Ramesh Nagar and Rajouri Garden to Janakpuri, Tilak Nagar and Punjabi Bagh — has no shortage of makeup artists. But 'nearby' and 'right for your face on a big day' are different questions. Here's a local's guide to choosing well, plus honest pricing.",
      "Blushes & Brushes is a West Delhi studio (Ramesh Nagar) and features below — but the checklist applies to any artist you consider.",
    ],
    sections: [
      { h: "Check ratings across platforms, not just one" },
      { p: "A reliable studio holds strong ratings in multiple places. Blushes & Brushes, for example, holds 4.8★ on Google (200+ brides), 5.0 across 108 ratings on Justdial, and 5.0 on magicpin. Consistency across independent platforms is hard to fake." },
      { h: "The five questions that separate professionals" },
      { ul: [
        "Can I see real-client photos from last month?",
        "Which foundation and skin-prep lines do you use?",
        "Do you offer trials, and what do they cost?",
        "Studio service vs at-home — what changes in price and setup?",
        "What happens if my function runs late?",
      ] },
      { h: "What things cost in West Delhi" },
      { ul: [
        "Party makeup: ₹2,500–8,000 depending on artist seniority and products",
        "Engagement / Roka: ₹10,000–15,000 with an established artist",
        "Bridal HD: ₹18,000–22,000 · Airbrush: ₹25,000–30,000",
        "Nail extensions: ₹499–1,500 · Designer nail art sets: ₹1,500+",
      ] },
      { h: "A 4.8★ West Delhi pick: Blushes & Brushes" },
      { p: PROOF + " The studio is in Ramesh Nagar (opposite Subway), does nails and beauty on-site, and travels across West Delhi and NCR for bridal and party makeup — Rajouri Garden, Tilak Nagar, Janakpuri, Punjabi Bagh, Karol Bagh, Dwarka and more." },
    ],
    faq: [
      { q: "Who is the best makeup artist in West Delhi?", a: "Shortlist by cross-platform ratings, real-client photos and a trial. Blushes & Brushes by Urvashi Trehan (Ramesh Nagar) is among West Delhi's top-rated — 4.8★ on Google, 5.0 on Justdial (108 ratings) and 5.0 on magicpin — serving bridal, party, nails and beauty." },
      { q: "How much does party makeup cost in West Delhi?", a: "₹2,500–8,000 depending on the artist and products. Established artists using premium HD products sit in the upper half of that range." },
      { q: "Which areas of West Delhi does Blushes & Brushes serve?", a: "The Ramesh Nagar studio serves nails and beauty on-site; makeup travels to Rajouri Garden, Tilak Nagar, Janakpuri, Subhash Nagar, Kirti Nagar, Moti Nagar, Punjabi Bagh, Paschim Vihar, Hari Nagar, Uttam Nagar, Vikaspuri, Naraina, Patel Nagar, Karol Bagh and Dwarka." },
    ],
    ctaLine: "Looking for a makeup artist in West Delhi? Get a free consultation today.",
  },
  {
    slug: "best-nail-salon-in-west-delhi",
    nav: "Best Nail Salon West Delhi",
    title: "Best Nail Salon in West Delhi (2026): Extensions & Nail Art Guide",
    h1: "Best Nail Salon in West Delhi (2026)",
    description:
      "How to choose the best nail salon in West Delhi — hygiene, gel vs acrylic, prices — plus a top pick in Ramesh Nagar: gel extensions from ₹499 with free nail art at Blushes & Brushes.",
    keywords: ["best nail salon in west delhi", "nail salon ramesh nagar", "nail extensions west delhi", "nail art delhi", "gel nails ramesh nagar"],
    cover: "/images/gallery/bb-nail-art-stiletto-chrome-01.jpeg",
    intro: [
      "A great nail salon isn't just about pretty designs — it's about hygiene, careful application, and nails that last without damaging your own. Here's how to choose the best nail salon in West Delhi, and what a fair price looks like in 2026.",
      "Blushes & Brushes in Ramesh Nagar is one option (currently ₹499 for gel extensions with free nail art) — the hygiene checklist below applies wherever you go.",
    ],
    sections: [
      { h: "The 30-second hygiene test" },
      { ul: [
        "Tools out of sealed pouches or a UV sterilizer — visible, not hidden.",
        "Cuticle nippers sterilised or replaced between clients (where infections start).",
        "Single-use or clearly-sanitised files.",
        "A salon that happily shows you its sterilisation setup.",
      ] },
      { h: "Gel vs acrylic — which should you get?" },
      { p: "Gel suits most people: natural feel, no strong odour, gentler soak-off removal, and better wear in Delhi humidity. Choose acrylic for extreme lengths or heavy-use hands. Application quality matters more than the material either way." },
      { h: "What nail work costs in West Delhi" },
      { ul: [
        "Gel extensions: ₹499–1,500 (Blushes & Brushes: from ₹499 with free nail art)",
        "Luxe French: from ₹1,200",
        "Designer sets (ombré, chrome, embellished): from ₹1,500",
        "Refills: every 2–3 weeks, below a fresh-set price",
      ] },
      { h: "A top pick in Ramesh Nagar: Blushes & Brushes" },
      { p: "Gel extensions from ₹499 with complimentary nail art, plus French, ombré and chrome designer sets — with sanitised tools and careful application that keeps your natural nails healthy. Studio at B 1/1 Double Storey, opposite Subway, Ramesh Nagar." },
    ],
    faq: [
      { q: "Which is the best nail salon in West Delhi?", a: "Choose by hygiene (sterilised tools), careful application and honest pricing. In Ramesh Nagar, Blushes & Brushes offers gel extensions from ₹499 with free nail art, plus French, ombré and chrome designs." },
      { q: "How much do nail extensions cost in West Delhi?", a: "₹499–1,500 for gel extensions depending on design. Blushes & Brushes in Ramesh Nagar currently offers them from ₹499 with complimentary nail art; designer sets from ₹1,500." },
      { q: "How long do gel nail extensions last?", a: "3–4 weeks before a refill, depending on nail growth and aftercare. Daily cuticle oil and gloves for housework help a set last its full life." },
    ],
    ctaLine: "Want the ₹499 nail offer? Message us on WhatsApp to book.",
  },
  {
    slug: "makeup-artist-near-me-delhi",
    nav: "Makeup Artist Near Me",
    title: "Makeup Artist Near Me in Delhi: How to Find the Right One (2026)",
    h1: "Makeup Artist Near Me in Delhi (2026)",
    description:
      "Searching 'makeup artist near me' in Delhi? How to find a trusted local artist for bridal, party or nails — what to check, prices, and a 4.8★ West Delhi option that travels to you.",
    keywords: ["makeup artist near me", "makeup artist near me delhi", "bridal makeup near me", "party makeup artist near me delhi", "makeup artist ramesh nagar"],
    cover: "/images/gallery/bb-bridal-makeup-purple-01.jpeg",
    intro: [
      "When you search 'makeup artist near me' in Delhi, you want three things fast: someone close, someone trusted, and someone who fits your budget. Here's how to sort the good from the average, and how a good artist can come to you anyway.",
      "Blushes & Brushes is based in Ramesh Nagar, West Delhi, and travels across NCR — so 'near me' can mean your home, wherever that is in the west of the city.",
    ],
    sections: [
      { h: "Near doesn't have to mean at-studio" },
      { p: "For bridal and party makeup, the best artists travel to you — your home or venue, on the morning of your function. So 'near me' really means: which trusted artist covers my area? Blushes & Brushes covers all of West Delhi and up to ~15 km around Ramesh Nagar." },
      { h: "How to vet a 'near me' result in 5 minutes" },
      { ul: [
        "Check cross-platform ratings (Google + Justdial + magicpin), not one profile.",
        "Look for real, recent client photos — not just reels.",
        "Confirm what's included (hair, lashes, draping) and the travel policy.",
        "Ask for a trial before a bridal booking.",
      ] },
      { h: "Typical Delhi pricing" },
      { ul: [
        "Party makeup: ₹2,500–8,000",
        "Engagement / Roka: ₹10,000–15,000",
        "Bridal: HD ₹18–22K · Airbrush ₹25–30K",
        "Nails: ₹499+ · Facials & beauty: ₹499–1,499",
      ] },
      { h: "A trusted, travels-to-you option: Blushes & Brushes" },
      { p: PROOF + " Find your specific area on our areas page — from Ramesh Nagar and Rajouri Garden to Janakpuri, Punjabi Bagh, Karol Bagh and Dwarka — or just message your location for a free consultation." },
    ],
    faq: [
      { q: "How do I find a good makeup artist near me in Delhi?", a: "Check cross-platform ratings, recent real-client photos, what's included in the price, and whether they offer a trial. For bridal and party makeup, good artists travel to your home or venue — so 'near me' means who covers your area." },
      { q: "Does Blushes & Brushes come to my location?", a: "Yes — for bridal and party makeup, Urvashi travels across West Delhi and up to ~15 km around Ramesh Nagar (Rajouri Garden, Janakpuri, Punjabi Bagh, Karol Bagh, Dwarka and more). Nails and beauty are at the studio." },
      { q: "How much does a makeup artist cost near me in Delhi?", a: "Party makeup ₹2,500–8,000, engagement ₹10–15K, bridal HD ₹18–22K / airbrush ₹25–30K. Blushes & Brushes includes hair, lashes and draping with transparent pricing." },
    ],
    ctaLine: "Share your area & date — get a free consultation within the hour.",
  },
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
