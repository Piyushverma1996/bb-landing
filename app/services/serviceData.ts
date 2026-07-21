// Service landing pages — deep, keyword-optimised, one page per search intent.
// Mirrors the ranking architecture of taryasalonstudio.com. Add services here;
// the index, dynamic route, and sitemap pick them up automatically.

export type Block = { h: string } | { p: string } | { ul: string[] };
export interface FAQ { q: string; a: string }
export interface PriceRow { name: string; price: string; note?: string }

export interface Service {
  slug: string;
  nav: string;                // short nav label
  title: string;              // <title>
  h1: string;
  description: string;        // meta description
  keywords: string[];
  cover: string;
  gallery: string[];          // 3-4 images shown on the page
  intro: string[];            // opening paragraphs
  sections: Block[];
  pricing?: { heading: string; rows: PriceRow[] };
  faq: FAQ[];
  relatedBlog: { slug: string; label: string }[];
  ctaLine: string;
}

const NCR = "across Delhi NCR";

export const SERVICES: Service[] = [
  {
    slug: "bridal-makeup",
    nav: "Bridal Makeup",
    title: "Bridal Makeup in Ramesh Nagar & West Delhi | HD & Airbrush — Blushes & Brushes",
    h1: "Bridal Makeup in Ramesh Nagar & West Delhi",
    description:
      "Bridal makeup by Urvashi Trehan in Ramesh Nagar, West Delhi — HD from ₹18K, airbrush from ₹25K. Trials available, travels across Delhi NCR. 4.8★, 200+ brides.",
    keywords: ["bridal makeup ramesh nagar", "bridal makeup west delhi", "bridal makeup artist delhi", "hd bridal makeup", "airbrush bridal makeup delhi", "wedding makeup ramesh nagar"],
    cover: "/images/bridal-real-1.jpg",
    gallery: ["/images/bridal-real-1.jpg", "/images/bridal-real-2.jpg", "/images/new-bridal-red.jpg", "/images/new-bridal-purple.jpg"],
    intro: [
      "Your wedding day is the most photographed day of your life — and your makeup has to hold from the morning pheras to the last dance of the reception. Blushes & Brushes, run by makeup artist Urvashi Trehan from her Ramesh Nagar studio in West Delhi, has done exactly that for 200+ brides across Delhi NCR, with a 4.8★ Google rating.",
      "We offer both HD and airbrush bridal makeup, matched to your skin, your function and Delhi's weather — with trials so you decide with total confidence before the day.",
    ],
    sections: [
      { h: "HD vs Airbrush bridal makeup — which is right for you?" },
      { p: "HD (high-definition) makeup is hand-blended for a soft, dewy, richly-pigmented finish that photographs beautifully — ideal for winter weddings and brides who want a radiant, natural look. Airbrush makeup is sprayed in a fine, weightless mist that lasts 10–14 hours through heat, hugs and tears — the choice for long summer wedding days and multi-function schedules. At your trial, Urvashi tests both against your skin in daylight and helps you choose (many brides do an airbrush base with HD detailing)." },
      { h: "What every bridal booking includes" },
      { ul: [
        "Detailed skin prep + colour correction matched to your undertone",
        "HD or airbrush base built for your function's length and lighting",
        "Eye look, individual lashes, contour and a long-wear lip",
        "Hairstyling of your choice + dupatta / lehenga draping + jewellery setting",
        "A touch-up kit for the day and a written arrival-time commitment",
      ] },
      { h: "Bridal trials — book with confidence" },
      { p: "A trial is an audition, not a preview — you test the artist, the products and the wear, not just the mirror moment. We recommend your trial 4–8 weeks before the wedding, at the Ramesh Nagar studio. It's adjusted against your final booking if you go ahead." },
      { h: "Travels across Delhi NCR" },
      { p: "For bridal and occasion makeup, Urvashi comes to you — West Delhi, Gurgaon, Noida, Faridabad and Ghaziabad. Arrival time is confirmed in writing at booking, and travel terms are transparent (cab actuals for the venue). Nail and beauty services are done at the Ramesh Nagar studio." },
    ],
    pricing: {
      heading: "Bridal makeup pricing (2026)",
      rows: [
        { name: "HD Bridal Makeup", price: "₹18,000 – 22,000" },
        { name: "Airbrush Bridal Makeup", price: "₹25,000 – 30,000" },
        { name: "Engagement / Roka / Sagan", price: "₹10,000 – 15,000" },
        { name: "Reception Makeup", price: "₹12,000 – 16,000" },
        { name: "Bridal Trial", price: "₹3,000", note: "adjusted against booking" },
      ],
    },
    faq: [
      { q: "How much does bridal makeup cost in West Delhi?", a: "At Blushes & Brushes in Ramesh Nagar: HD bridal ₹18,000–22,000, airbrush ₹25,000–30,000, engagement/Roka ₹10,000–15,000, reception ₹12,000–16,000. Every quote includes hair, draping, lashes and a touch-up kit — no hidden charges." },
      { q: "Do you travel for the wedding, or is it at the studio?", a: "Bridal and occasion makeup is done on location — Urvashi travels across Delhi NCR to your venue. Trials, nails and beauty services happen at the Ramesh Nagar studio." },
      { q: "Should I choose HD or airbrush for my wedding?", a: "Airbrush for long summer days and maximum staying power (10–14 hours); HD for a soft dewy finish, winter weddings, or easy touch-ups. At your trial we test both on your skin and recommend honestly." },
      { q: "How early should I book my bridal date?", a: "For peak season (Nov–Feb) in Delhi, book 3–4 months ahead — established dates fill fast. A small refundable advance holds your date." },
      { q: "Is a trial included?", a: "Trials are ₹3,000 at the Ramesh Nagar studio and are adjusted against your final booking if you proceed. We recommend it 4–8 weeks before the wedding." },
    ],
    relatedBlog: [
      { slug: "bridal-makeup-hd-vs-airbrush-delhi", label: "HD vs Airbrush: which lasts longer?" },
      { slug: "bridal-makeup-cost-delhi-price-guide", label: "Bridal makeup cost in Delhi 2026" },
      { slug: "bridal-makeup-trial-checklist", label: "Bridal trial checklist — 12 tests" },
    ],
    ctaLine: "Ready to plan your bridal look? Get a free consultation — Urvashi replies within the hour.",
  },
  {
    slug: "party-makeup",
    nav: "Party Makeup",
    title: "Party Makeup in West Delhi | Sangeet & Cocktail Looks — Blushes & Brushes",
    h1: "Party & Occasion Makeup in West Delhi",
    description:
      "Party, sangeet & cocktail makeup in Ramesh Nagar, West Delhi from ₹2,500. Signature, HD Forever 52 & celebrity (NARS, Huda) tiers. Lashes & hair included.",
    keywords: ["party makeup west delhi", "party makeup ramesh nagar", "sangeet makeup delhi", "cocktail makeup artist", "hd party makeup delhi"],
    cover: "/images/party-glam.jpg",
    gallery: ["/images/party-glam.jpg", "/images/party-1.jpg", "/images/new-occasion-green.jpg"],
    intro: [
      "Whether it's a sangeet, cocktail night, engagement guest look or a family function, party makeup should look flawless in every photo and survive hours of dancing. Blushes & Brushes in Ramesh Nagar, West Delhi offers three clear party makeup tiers so you choose exactly the finish — and budget — you want.",
      "Every party look includes hairstyling, draping and individual lashes, with premium products matched to your skin tone and outfit.",
    ],
    sections: [
      { h: "Three party makeup tiers — pick your finish" },
      { ul: [
        "Signature (₹2,500) — premium studio products, a beautiful photograph-ready look for family functions and daytime events.",
        "HD Forever 52 (₹3,500) — high-definition base with a flawless, long-wearing finish for evening functions and heavy photography.",
        "Celebrity — NARS & Huda Beauty (₹4,500) — international luxury products for a magazine-cover finish on your biggest nights.",
      ] },
      { h: "Built to survive the dance floor" },
      { p: "Sangeet and cocktail makeup gets a sweat-proof, transfer-resistant brief: long-wear or airbrush base, waterproof liner and lashes, and a lip that lasts through dinner. Ask for a touch-up kit for events that cross five hours." },
      { h: "What's always included" },
      { ul: ["Skin prep + primer matched to your undertone", "Hairstyling of your choice", "Draping / dupatta setting", "Individual lashes"] },
      { h: "Studio or on-location" },
      { p: "Party makeup is done at the Ramesh Nagar studio, or on location across West Delhi and NCR (cab charges at actuals for venue visits)." },
    ],
    pricing: {
      heading: "Party makeup pricing",
      rows: [
        { name: "Signature Party Makeup", price: "₹2,500", note: "studio products" },
        { name: "HD Party Makeup (HD Forever 52)", price: "₹3,500" },
        { name: "Celebrity Party Makeup (NARS, Huda)", price: "₹4,500", note: "international brands" },
      ],
    },
    faq: [
      { q: "How much is party makeup in West Delhi?", a: "₹2,500 for Signature, ₹3,500 for HD (HD Forever 52), and ₹4,500 for Celebrity tier (NARS, Huda Beauty). Hair, draping and lashes are included in every tier." },
      { q: "Will party makeup last through a sangeet or cocktail?", a: "Yes — for dance-heavy functions we use a long-wear or airbrush base, waterproof liner and lashes, and a transfer-proof lip, plus a touch-up kit for 5+ hour events." },
      { q: "Do you come to my venue for party makeup?", a: "Yes, on location across West Delhi and Delhi NCR (cab actuals for the venue), or at the Ramesh Nagar studio." },
    ],
    relatedBlog: [
      { slug: "party-makeup-price-west-delhi", label: "Party makeup prices in West Delhi" },
      { slug: "makeup-for-indian-skin-tones-delhi", label: "Makeup for Indian skin tones" },
    ],
    ctaLine: "Have a function coming up? Get a free consultation and quote on WhatsApp.",
  },
  {
    slug: "nail-extensions",
    nav: "Nail Extensions",
    title: "Nail Extensions & Nail Art in Ramesh Nagar | From ₹499 — Blushes & Brushes",
    h1: "Nail Extensions & Nail Art in Ramesh Nagar",
    description:
      "Gel nail extensions from ₹499 with free nail art in Ramesh Nagar, West Delhi. French, ombré, chrome & designer sets. Hygienic tools, careful application.",
    keywords: ["nail extensions ramesh nagar", "nail art west delhi", "gel nails delhi", "nail salon ramesh nagar", "nail extensions ₹499 delhi"],
    cover: "/images/nails-1.jpg",
    gallery: ["/images/nails-1.jpg", "/images/nails-2.jpg"],
    intro: [
      "Blushes & Brushes in Ramesh Nagar is West Delhi's go-to studio for gel nail extensions and custom nail art — currently from ₹499 with complimentary nail art. Clean tools, gentle cuticle work and careful application mean beautiful nails without damage to your natural nail underneath.",
      "From everyday French to statement chrome and designer sets for weddings, we build a shape and style that fits your lifestyle.",
    ],
    sections: [
      { h: "Nail services at the studio" },
      { ul: [
        "Gel nail extensions + complimentary nail art — from ₹499",
        "Luxe French — from ₹1,200",
        "Designer sets (ombré, chrome, embellished) — from ₹1,500",
        "Gel polish, refills and safe removal",
      ] },
      { h: "Hygiene you can see" },
      { p: "Every tool is sanitised between clients and the station is cleaned before your session. Careful, professional application and removal keeps your natural nails healthy set after set." },
      { h: "How long do extensions last?" },
      { p: "Typically 3–4 weeks before a refill, depending on your nail growth and aftercare. We explain simple aftercare (cuticle oil, gloves for housework) so your set lasts its full life." },
    ],
    pricing: {
      heading: "Nail pricing",
      rows: [
        { name: "Gel Extensions + free nail art", price: "₹499+", note: "current offer" },
        { name: "Luxe French", price: "₹1,200+" },
        { name: "Designer Sets (ombré / chrome)", price: "₹1,500+" },
      ],
    },
    faq: [
      { q: "How much do nail extensions cost in Ramesh Nagar?", a: "Gel extensions start at ₹499 with complimentary nail art at Blushes & Brushes. Luxe French from ₹1,200 and designer sets from ₹1,500." },
      { q: "How long do gel nail extensions last?", a: "3–4 weeks before a refill, depending on nail growth and aftercare. With daily cuticle oil and gloves for housework, a well-applied set comfortably reaches four weeks." },
      { q: "Do nail extensions damage your natural nails?", a: "Not with professional application and removal. Damage almost always comes from peeling extensions off yourself — our soak-off removal keeps the natural nail intact." },
    ],
    relatedBlog: [
      { slug: "how-long-do-nail-extensions-last-aftercare", label: "How long do nail extensions last?" },
      { slug: "gel-vs-acrylic-nail-extensions", label: "Gel vs acrylic — which to get?" },
    ],
    ctaLine: "Want the ₹499 nail offer? Message us on WhatsApp to book your slot.",
  },
  {
    slug: "beauty-services",
    nav: "Beauty & Skin",
    title: "Facials, Cleanups & Beauty Services in Ramesh Nagar | Blushes & Brushes",
    h1: "Facials & Beauty Services in Ramesh Nagar",
    description:
      "Facials, glow cleanups, de-tan & full-pamper beauty rituals in Ramesh Nagar, West Delhi from ₹499. Hygienic studio, premium products, honest advice.",
    keywords: ["facial ramesh nagar", "beauty parlour ramesh nagar", "cleanup west delhi", "de-tan facial delhi", "pre-bridal skin delhi"],
    cover: "/images/new-beauty-glam.jpg",
    gallery: ["/images/new-beauty-glam.jpg", "/images/new-natural.jpg"],
    intro: [
      "Blushes & Brushes in Ramesh Nagar offers skin and beauty rituals that leave you genuinely glowing — from a quick glow cleanup to a full pamper day. Every service uses premium products in a spotless studio, with honest advice about what your skin actually needs (and what it doesn't).",
      "Whether it's monthly self-care or pre-wedding skin prep, we keep it simple, effective and affordable.",
    ],
    sections: [
      { h: "Beauty & skin menu" },
      { ul: [
        "Glow Cleanup — ₹499",
        "De-Tan Ritual — ₹699",
        "Facial + Pedicure combo — ₹999",
        "Full Pamper Day — ₹1,499",
      ] },
      { h: "Pre-bridal skin prep" },
      { p: "Getting married? Start your skin runway early — monthly facials ending two weeks before the wedding, with honest advice on what suits your skin. Great skin under makeup is what makes bridal photos glow." },
      { h: "Hygiene first" },
      { p: "Tools sanitised between clients, single-use disposables where it matters, and a genuinely clean studio. We never up-sell services your skin doesn't need." },
    ],
    pricing: {
      heading: "Beauty pricing",
      rows: [
        { name: "Glow Cleanup", price: "₹499" },
        { name: "De-Tan Ritual", price: "₹699" },
        { name: "Facial + Pedicure", price: "₹999" },
        { name: "Full Pamper Day", price: "₹1,499" },
      ],
    },
    faq: [
      { q: "How much is a facial in Ramesh Nagar?", a: "Glow Cleanup ₹499, De-Tan ₹699, Facial + Pedicure ₹999, and a Full Pamper Day at ₹1,499 — premium products, hygienic studio, no up-selling." },
      { q: "Do you do pre-bridal skin treatments?", a: "Yes — we plan a pre-bridal skin runway with monthly facials ending about two weeks before the wedding, tailored honestly to your skin type." },
      { q: "Is the studio hygienic?", a: "Yes — tools are sanitised between every client, we use single-use disposables where needed, and we're happy to walk you through our process." },
    ],
    relatedBlog: [
      { slug: "salon-hygiene-checklist-delhi", label: "Salon hygiene checklist" },
      { slug: "makeup-for-indian-skin-tones-delhi", label: "Makeup for Indian skin tones" },
    ],
    ctaLine: "Book a facial or pamper day — message us on WhatsApp for slots.",
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
void NCR;
