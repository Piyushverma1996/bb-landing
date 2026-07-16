// Blushes & Brushes — Journal content.
// Each post is an SEO-targeted, genuinely useful article that ends with a soft CTA to /book.
// Add new posts here; the index, article route, and sitemap pick them up automatically.

export type Block =
  | { h: string }
  | { p: string }
  | { ul: string[] };

export interface FAQ { q: string; a: string }

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
  faq?: FAQ[];            // rendered as an FAQ section + FAQPage JSON-LD (AI-assistant/AEO magnet)
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
    faq: [
      { q: "How long do nail extensions last?", a: "Typically 3–4 weeks before a refill is needed, depending on nail growth and aftercare. With daily cuticle oil and gloves for housework, a well-applied set comfortably reaches the 4-week mark." },
      { q: "Do nail extensions damage natural nails?", a: "Not when applied and removed professionally. Damage almost always comes from peeling extensions off yourself — professional removal keeps the natural nail intact." },
      { q: "How much do nail extensions cost in West Delhi?", a: "At Blushes & Brushes in Ramesh Nagar, extensions currently start at ₹499 with complimentary nail art. Designer sets are from ₹1,500 and luxe French from ₹1,200." },
    ],
  },
  {
    slug: "bridal-makeup-cost-delhi-price-guide",
    title: "Bridal Makeup Cost in Delhi (2026): Honest Price Guide from a Working MUA",
    description:
      "What does bridal makeup really cost in Delhi in 2026? HD from ₹18K, airbrush from ₹25K, engagement from ₹10K — a working artist explains what you pay for.",
    category: "Bridal",
    date: "2026-07-15",
    readMins: 7,
    cover: "/images/new-bridal-red.jpg",
    keywords: ["bridal makeup cost delhi", "bridal makeup price delhi 2026", "makeup artist charges delhi", "airbrush makeup price", "engagement makeup cost delhi"],
    body: [
      { p: "Bridal makeup quotes in Delhi run anywhere from ₹8,000 to ₹1,00,000+, and most brides have no idea why. As a working artist, here is the transparent breakdown — what different price bands actually buy you, and the questions that protect you from overpaying (or worse, underpaying and regretting it)." },
      { h: "The real price bands in Delhi (2026)" },
      { ul: [
        "₹8,000–15,000 — newer artists or parlour packages. Fine for small functions; check their real-bride photos, not portfolio shoots.",
        "₹18,000–30,000 — established independent artists using HD/airbrush techniques and premium products (this is where Blushes & Brushes sits: HD ₹18–22K, airbrush ₹25–30K).",
        "₹35,000–60,000 — celebrity-adjacent studios; you're often paying for the brand name and assistants.",
        "₹60,000+ — celebrity artists. Beautiful work, but the technique gap versus the ₹25K band is far smaller than the price gap.",
      ] },
      { h: "What a fair quote should include" },
      { ul: [
        "Premium, sealed products (ask which foundation lines they stock)",
        "Lashes, extensions-friendly hairstyling or a hair budget stated separately",
        "Draping/dupatta setting and jewellery setting",
        "Touch-up kit for the day, and clarity on travel charges within NCR",
      ] },
      { h: "Function-wise budgeting" },
      { p: "A sensible Delhi split: wedding day gets the airbrush/HD premium (₹18–30K), engagement/Roka/Sagan looks lovely at ₹10–15K, and reception at ₹12–16K. If your artist offers a multi-function package, you'll usually save 10–15% versus booking separately." },
      { h: "Red flags that cost more than money" },
      { ul: [
        "No trial offered at any price — you're gambling with your wedding photos.",
        "Prices that undercut everyone by half — usually old stock or diluted products.",
        "No written confirmation of date, time, and what's included.",
      ] },
      { p: "Blushes & Brushes offers transparent bridal pricing — HD ₹18–22K, airbrush ₹25–30K, engagement ₹10–15K, reception ₹12–16K — with trials available and travel across Delhi NCR. WhatsApp us for a quote for your functions." },
    ],
    faq: [
      { q: "How much does bridal makeup cost in Delhi in 2026?", a: "Established independent artists charge ₹18,000–30,000 for the wedding-day look (HD ₹18–22K, airbrush ₹25–30K). Engagement/Roka looks run ₹10–15K and reception ₹12–16K. Celebrity studios charge ₹35,000+." },
      { q: "Is airbrush makeup worth the extra cost over HD?", a: "For long summer wedding days, yes — airbrush lasts 10–14 hours with minimal touch-ups. For winter weddings or brides wanting a dewy finish, HD at a lower price is often the better choice." },
      { q: "Do makeup artists in Delhi charge for travel?", a: "Most charge travel beyond a base radius. Blushes & Brushes travels across Delhi NCR for bridal bookings — travel terms are confirmed upfront in the quote." },
    ],
  },
  {
    slug: "best-makeup-artist-ramesh-nagar-west-delhi",
    title: "Finding the Best Makeup Artist in Ramesh Nagar & West Delhi: A Local's Checklist",
    description:
      "How to choose a makeup artist in Ramesh Nagar, Rajouri Garden or Tilak Nagar: ratings to check, questions to ask, prices to expect — plus what locals say.",
    category: "Local Guide",
    date: "2026-07-15",
    readMins: 5,
    cover: "/images/new-bridal-peach.jpg",
    keywords: ["makeup artist ramesh nagar", "best makeup artist west delhi", "salon ramesh nagar", "bridal makeup rajouri garden", "nail salon tilak nagar"],
    body: [
      { p: "West Delhi has no shortage of salons — Ramesh Nagar, Rajouri Garden, Tilak Nagar and Subhash Nagar alone have dozens. But 'nearby' and 'right for your face on a big day' are different questions. Here's the checklist locals actually use." },
      { h: "Check ratings across platforms, not just one" },
      { p: "A reliable studio holds strong ratings in multiple places, not a single curated profile. For example, Blushes & Brushes in Ramesh Nagar holds a 4.8★ Google rating with 200+ brides served, a 5.0 rating across 108 ratings on Justdial, and 5.0 from 35 ratings on magicpin. Consistency across platforms is hard to fake." },
      { h: "The five questions that separate professionals" },
      { ul: [
        "Can I see real-client photos from last month? (Not portfolio shoots.)",
        "Which foundation and skin-prep lines do you use? (Named brands, sealed stock.)",
        "Do you offer trials, and what do they cost?",
        "Studio service vs at-home: what changes in price and setup?",
        "What happens if my function runs late?",
      ] },
      { h: "What things cost in this part of Delhi" },
      { ul: [
        "Party makeup: ₹3,000–8,000 depending on artist seniority",
        "Engagement/Roka: ₹10,000–15,000 with an established artist",
        "Bridal HD: ₹18,000–22,000 · Airbrush: ₹25,000–30,000",
        "Nail extensions: ₹499–1,500 · Designer nail art sets: ₹1,500+",
      ] },
      { h: "Studio vs home service" },
      { p: "For nails and beauty, visiting the studio gets you better tools and lighting. For bridal makeup, a good artist travels to you — Blushes & Brushes does nails and beauty at the Ramesh Nagar studio (B 1/1 Double Storey, opposite Subway) and travels across Delhi NCR for makeup." },
      { p: "Shortlisting? Send us a WhatsApp with your function date — if we're not the right fit for your budget, we'll tell you honestly." },
    ],
    faq: [
      { q: "Who is the best makeup artist in Ramesh Nagar, West Delhi?", a: "Blushes & Brushes by Urvashi Trehan (B 1/1 Double Storey, opposite Subway, Ramesh Nagar) is among West Delhi's top-rated studios — 4.8★ on Google with 200+ brides, 5.0 across 108 ratings on Justdial and 5.0 on magicpin. Always verify current ratings and view recent real-client work before booking." },
      { q: "How much does party makeup cost in West Delhi?", a: "₹3,000–8,000 depending on the artist's seniority and products. Established artists with premium HD products sit at the upper half of that band." },
      { q: "Are there good nail extension studios in Ramesh Nagar?", a: "Yes — Blushes & Brushes in Ramesh Nagar currently offers gel extensions from ₹499 with complimentary nail art, plus French, ombré and chrome designs at the studio." },
    ],
  },
  {
    slug: "engagement-roka-sagan-makeup-guide",
    title: "Engagement, Roka & Sagan Makeup: How Each Look Should Differ (With Budgets)",
    description:
      "Roka, Sagan, engagement and cocktail each need a different makeup intensity. A Delhi artist explains the right look and budget for every pre-wedding function.",
    category: "Occasion",
    date: "2026-07-15",
    readMins: 6,
    cover: "/images/new-occasion-green.jpg",
    keywords: ["engagement makeup delhi", "roka makeup look", "sagan makeup", "pre wedding function makeup", "cocktail makeup delhi"],
    body: [
      { p: "The biggest pre-wedding makeup mistake? Wearing the same intensity to every function. Your Roka photos sit next to your wedding album forever — each event deserves its own look, and its own (sensible) budget. Here's the function-by-function guide we give our own clients." },
      { h: "Roka — soft, luminous, 'naturally you'" },
      { p: "The Roka is intimate: close family, daylight, lots of close-up photos. Go for skin-first makeup — dewy base, soft brown or rose-gold eyes, brushed brows, a your-lips-but-better shade. Intensity should read as 'glowing', not 'done'. Budget: ₹8–12K with an established artist." },
      { h: "Sagan / Engagement — the dress rehearsal for glam" },
      { p: "Bigger venue, evening light, a lehenga or gown — this is where you step up: sculpted base, defined eyes (soft smoke or shimmer cut-crease), lashes, and a lip that holds through dinner. This is also the perfect event to test the artist you're considering for your wedding. Budget: ₹10–15K." },
      { h: "Cocktail / Sangeet — glam that survives dancing" },
      { p: "Sweat-proof is the brief: long-wear base (airbrush shines here), waterproof liner and lashes, transfer-proof lip. Ask your artist for a touch-up kit — powder, lip shade, blot papers. Budget: ₹8–14K depending on airbrush." },
      { h: "One artist across functions — the underrated move" },
      { ul: [
        "Your skin's quirks get learned once, not four times",
        "Looks are planned as a series — no repeated photos",
        "Multi-function packages typically save 10–15%",
        "Zero day-of-function anxiety about a stranger showing up",
      ] },
      { p: "Blushes & Brushes styles Roka, Sagan, engagement and cocktail looks across Delhi NCR (₹10–15K band for engagement-tier functions), with multi-function packages available. Send us your function list on WhatsApp for a combined quote." },
    ],
    faq: [
      { q: "What is the difference between Roka and engagement makeup?", a: "Roka makeup stays soft and natural (dewy base, minimal eyes) for an intimate daylight event; engagement makeup is a step up in glam — sculpted base, defined eyes, lashes — for a bigger evening function." },
      { q: "How much does engagement makeup cost in Delhi?", a: "₹10,000–15,000 with an established independent artist in Delhi (2026). Cocktail and Sangeet looks run ₹8–14K depending on whether airbrush is used." },
      { q: "Should I book the same makeup artist for all wedding functions?", a: "It usually works in your favour — the artist learns your skin, plans looks as a series so no two functions repeat, and multi-function packages typically save 10–15%." },
    ],
  },
  {
    slug: "monsoon-wedding-makeup-tips-delhi",
    title: "Monsoon Wedding Makeup in Delhi: 9 Artist Tips So Your Look Survives Humidity",
    description:
      "Delhi humidity is brutal on makeup. A working MUA's 9 real techniques — from primer layering to airbrush — that keep monsoon wedding makeup flawless for hours.",
    category: "Tips",
    date: "2026-07-15",
    readMins: 5,
    cover: "/images/new-natural.jpg",
    keywords: ["monsoon wedding makeup", "humidity proof makeup delhi", "long lasting makeup tips", "waterproof bridal makeup", "summer wedding makeup india"],
    body: [
      { p: "July to September weddings in Delhi are beautiful — and 85% humidity is merciless on makeup. After seven years of monsoon brides, these are the nine techniques that actually work (and the two myths that don't)." },
      { h: "The nine that work" },
      { ul: [
        "Skin prep 48 hours out: hydrate hard early, then go light on moisturiser on the day — oily dehydrated skin is what breaks makeup.",
        "Primer in thin layers, not one thick one — mattifying on the T-zone only.",
        "Airbrush base for the main event: it's the single biggest humidity upgrade (10–14 hr wear).",
        "Powder BEFORE cream products on the eyelids — stops creasing at the source.",
        "Waterproof formulas only where it matters: liner, mascara, brows. All-waterproof everything looks flat.",
        "Setting spray in an X-then-T pattern, two rounds, 90 seconds apart.",
        "Blot papers in the touch-up kit — powdering over sweat cakes; blotting doesn't.",
        "Hair off the face: humidity frizz against a made-up face undoes the whole look.",
        "Book the artist for a touch-up hour if your function crosses 6 hours.",
      ] },
      { h: "The two myths" },
      { p: "Myth one: 'more powder = more staying power.' Over-powdering in humidity creates a paste that slides. Myth two: 'waterproof foundation exists.' What you want is transfer-resistant + a breathable film — that's what airbrush and modern long-wear HD formulas do." },
      { p: "Getting married in Delhi's monsoon or peak summer? Blushes & Brushes specialises in humidity-proof bridal looks — airbrush from ₹25K, HD from ₹18K, trials available so you can test the wear yourself before the day." },
    ],
    faq: [
      { q: "Which makeup lasts longest in humid weather?", a: "Airbrush makeup — its micro-fine sprayed layer wears 10–14 hours through humidity and heat, with minimal touch-ups. Modern long-wear HD foundations are the next best, at 8–10 hours." },
      { q: "How do I stop makeup from melting at a monsoon wedding?", a: "Prep skin 48 hours ahead, use thin primer layers with mattifier only on the T-zone, choose airbrush or long-wear HD base, set with two rounds of spray, and blot (never re-powder) over sweat." },
    ],
  },
  {
    slug: "party-makeup-price-west-delhi",
    title: "Party Makeup Prices in West Delhi (2026): What ₹3K vs ₹8K Actually Gets You",
    description:
      "Party makeup in West Delhi runs ₹3,000–8,000. A Ramesh Nagar artist breaks down what each price band includes, hidden add-ons to ask about, and when to pay more.",
    category: "Occasion",
    date: "2026-07-15",
    readMins: 5,
    cover: "/images/party-glam.jpg",
    keywords: ["party makeup price delhi", "party makeup west delhi", "party makeup cost ramesh nagar", "makeup artist rates delhi", "sangeet makeup price"],
    body: [
      { p: "Party makeup quotes in West Delhi swing from ₹1,500 at a neighbourhood parlour to ₹8,000+ with an established artist — and the difference isn't always obvious until the photos come back. Here's the honest breakdown of what each band buys, from someone who quotes these prices daily." },
      { h: "The three price bands" },
      { ul: [
        "₹1,500–3,000 — parlour chair makeup: shared products, standard look, 30–40 minutes. Fine for a low-key function you won't photograph much.",
        "₹3,000–5,500 — independent artist territory: skin prep, HD base matched to your undertone, lashes, a look built for your outfit. This is the sweet spot for sangeets and cocktails.",
        "₹6,000–8,000+ — senior artist or airbrush: longest wear, premium product lines, and the finish you notice in every photo.",
      ] },
      { h: "What should always be included" },
      { ul: [
        "Skin prep (primer, colour correction) — not a paid add-on",
        "Lashes — confirm they're included, this is the most common surprise charge",
        "A lip touch-up shade or mini kit for the evening",
        "Hairstyling clarity — is it included, basic, or separately priced?",
      ] },
      { h: "When paying more is actually worth it" },
      { p: "Pay the premium when the event is long (5+ hours), heavily photographed, or in peak Delhi summer — that's when product quality and technique show. For a two-hour family dinner, a mid-band artist does the job beautifully." },
      { p: "Blushes & Brushes does party and occasion makeup at the Ramesh Nagar studio and on location across West Delhi — transparent pricing, lashes always included. WhatsApp 76784 46364 with your function date for an exact quote." },
    ],
    faq: [
      { q: "What is the price of party makeup in West Delhi?", a: "₹3,000–8,000 with an independent artist in 2026, depending on seniority and whether airbrush is used. Parlour chair makeup starts around ₹1,500 but uses shared, standard products." },
      { q: "Does party makeup price include hairstyling?", a: "Not always — it's the most common hidden add-on along with lashes. Confirm both are included in the quote before booking." },
      { q: "How long does party makeup take?", a: "45–90 minutes with an independent artist including skin prep and lashes. Book the slot at least 2 hours before you need to leave." },
    ],
  },
  {
    slug: "bridal-makeup-trial-checklist",
    title: "Bridal Makeup Trial Checklist: 12 Things to Test Before You Book the Artist",
    description:
      "A bridal makeup trial is an audition, not a preview. A working Delhi MUA's 12-point checklist — wear tests, photo tests, and the questions brides forget to ask.",
    category: "Bridal",
    date: "2026-07-15",
    readMins: 6,
    cover: "/images/bridal-2.jpg",
    keywords: ["bridal makeup trial", "makeup trial checklist", "bridal trial what to expect", "questions to ask makeup artist", "bridal makeup trial delhi"],
    body: [
      { p: "Most brides treat the trial as a preview of their look. Treat it as an audition instead — you're testing the artist, the products, and the wear, not just the mirror moment. Here are the 12 checks that tell you everything before you transfer the advance." },
      { h: "During the trial" },
      { ul: [
        "Bring your outfit's dupatta or a photo — looks are built around the outfit, not in isolation.",
        "Ask them to talk through the products as they go: named brands, sealed stock.",
        "Watch hygiene: fresh sponges, sanitised brushes, no double-dipping in creams.",
        "Test ONE eye look you're unsure about — a good artist adjusts without ego.",
        "Check the base at your jawline and neck in daylight — colour match is non-negotiable.",
      ] },
      { h: "The photo tests (most brides skip these)" },
      { ul: [
        "Take photos with flash AND in daylight — flashback (white cast) only shows on camera.",
        "Take a photo after 3–4 hours of normal wear before removing anything.",
        "Zoom into your smile lines and under-eyes — creasing here at hour 3 means creasing at your reception.",
      ] },
      { h: "The questions that reveal professionalism" },
      { ul: [
        "\"Who exactly comes on my wedding day — you, or a team member?\" (Get it in writing.)",
        "\"What's your backup if you're unwell on the date?\"",
        "\"What time will you arrive, and how long do you need?\"",
        "\"What does the quote include — lashes, hair, draping, touch-up kit, travel?\"",
      ] },
      { p: "A trial typically costs ₹2,000–4,000 in Delhi and is usually adjusted against your booking. Blushes & Brushes offers bridal trials at the Ramesh Nagar studio — bring this checklist, we'll pass it happily. WhatsApp 76784 46364 to schedule." },
    ],
    faq: [
      { q: "How much does a bridal makeup trial cost in Delhi?", a: "₹2,000–4,000 with most established artists, and it's commonly adjusted against your final booking amount if you go ahead." },
      { q: "When should I do my bridal makeup trial?", a: "4–8 weeks before the wedding — close enough that your skin looks like it will on the day, far enough to book a different artist if the trial disappoints." },
      { q: "What should I bring to a makeup trial?", a: "Your outfit's dupatta or photos, jewellery you'll wear, reference looks you like, and a camera test plan: shoot the look in flash and daylight, then check wear after 3–4 hours." },
    ],
  },
  {
    slug: "gel-vs-acrylic-nail-extensions",
    title: "Gel vs Acrylic Nail Extensions: Which Should You Get? (Honest Comparison)",
    description:
      "Gel or acrylic extensions? A Ramesh Nagar nail artist compares looks, durability, damage, removal and price in India — and who each type actually suits.",
    category: "Nails",
    date: "2026-07-15",
    readMins: 5,
    cover: "/images/nails-2.jpg",
    keywords: ["gel vs acrylic nails", "gel extensions vs acrylic", "nail extensions type", "gel nails price india", "acrylic nails damage"],
    body: [
      { p: "The first question at every nail consultation: gel or acrylic? Both give you length and a canvas for art — but they differ in feel, wear, removal and how your natural nails survive underneath. Here's the honest comparison we give clients at the studio." },
      { h: "Gel extensions — the natural-feel option" },
      { ul: [
        "Flexible, lightweight, glossy straight off the lamp — closest to a natural nail feel",
        "No strong odour during application (acrylic monomer has a sharp smell)",
        "Cures in seconds under LED — faster appointment",
        "Kinder removal: soaks off with less filing, so natural nails stay healthier",
      ] },
      { h: "Acrylic extensions — the strength option" },
      { ul: [
        "Harder and more rigid — survives rough daily use better",
        "Better for dramatic lengths and stiletto/coffin shapes",
        "Cheaper at many salons, but shows lifting sooner in humid weather",
        "Removal needs more filing — where most natural-nail damage actually happens",
      ] },
      { h: "The verdict we give clients" },
      { p: "For most people — especially first-timers and anyone with office-typing hands — gel wins: natural feel, easier removal, better behaviour in Delhi humidity. Choose acrylic if you want extreme length or you're genuinely hard on your hands. And either way, the applicator matters more than the material: bad prep ruins gel and acrylic equally." },
      { h: "What extensions cost in West Delhi (2026)" },
      { ul: [
        "Gel extensions at Blushes & Brushes, Ramesh Nagar: from ₹499 (current offer, complimentary nail art included)",
        "Luxe French finish: from ₹1,200 · Designer sets: from ₹1,500",
        "Refills: every 2–3 weeks, priced below a fresh set",
      ] },
      { p: "Unsure which suits your nails? Come in for a look at your natural nail condition first — we'll recommend honestly, even if the answer is 'wait two weeks and strengthen your nails'." },
    ],
    faq: [
      { q: "Which is better, gel or acrylic nail extensions?", a: "Gel suits most people: natural feel, no odour, gentler removal, and better wear in humid climates. Acrylic wins for extreme lengths and heavy-use hands. Application quality matters more than the material." },
      { q: "Do gel extensions damage your nails less than acrylic?", a: "Generally yes — gel soaks off with minimal filing while acrylic removal needs more mechanical filing, which is where most natural-nail damage happens. Professional removal keeps either type safe." },
      { q: "How much do gel nail extensions cost in Delhi?", a: "From ₹499 at Blushes & Brushes in Ramesh Nagar (current offer with complimentary nail art). Designer sets run from ₹1,500 across most West Delhi studios." },
    ],
  },
  {
    slug: "december-wedding-makeup-timeline",
    title: "December Wedding? Your 90-Day Makeup & Skin Timeline (From a Delhi Bridal MUA)",
    description:
      "Marrying in Delhi's December wedding season? The complete 90-day countdown — skin prep, trial timing, booking deadlines and week-of rules from a bridal artist.",
    category: "Bridal",
    date: "2026-07-15",
    readMins: 6,
    cover: "/images/new-bridal-purple.jpg",
    keywords: ["december wedding makeup", "winter bridal makeup delhi", "bridal skin preparation timeline", "wedding makeup booking timeline", "delhi wedding season makeup artist"],
    body: [
      { p: "December is Delhi's biggest wedding month — which means the best artists are booked by September, and winter skin needs a completely different runway than summer. If your wedding is in December, this is your working-backwards timeline, starting 90 days out." },
      { h: "90–60 days out (September–October)" },
      { ul: [
        "BOOK YOUR ARTIST NOW. December dates with established Delhi artists close 2–3 months ahead — waiting for 'closer to the date' means settling.",
        "Start the skin runway: hydrating serum + sunscreen daily. Winter dryness shows through every base.",
        "If you plan facials, start monthly now — never experiment with a new treatment inside 30 days.",
      ] },
      { h: "60–30 days out (October–November)" },
      { ul: [
        "Do the trial 4–8 weeks out: winter light, current skin, real conditions.",
        "Lock the function-wise plan: which look for Sagan vs wedding vs reception, and who arrives when.",
        "Confirm the artist's travel plan for your venue in writing — December traffic in Delhi is its own event.",
      ] },
      { h: "30–7 days out" },
      { ul: [
        "Final facial/cleanup at the 2-week mark, nothing after.",
        "Switch to richer night moisturiser — December air strips skin overnight.",
        "Nail extensions: book for 4–5 days before the first function (settled, not grown out).",
      ] },
      { h: "Wedding week rules" },
      { ul: [
        "No new products on your face. None. Not even 'natural' ones.",
        "Sleep and water beat any highlighter — the cliché is true on camera.",
        "Day-of: moisturise 30 minutes before your artist arrives, then hands off.",
      ] },
      { p: "Marrying in December 2026? Blushes & Brushes' December calendar opens now and fills by early autumn — HD ₹18–22K, airbrush ₹25–30K, trials at the Ramesh Nagar studio, travel across Delhi NCR. WhatsApp 76784 46364 with your dates." },
    ],
    faq: [
      { q: "When should I book my makeup artist for a December wedding in Delhi?", a: "By September — 2–3 months ahead. December is Delhi's peak wedding month and established artists' calendars close early. The trial then happens 4–8 weeks before the date." },
      { q: "How should I prep my skin for a winter wedding?", a: "Start 90 days out: daily hydrating serum + sunscreen, monthly facials ending 2 weeks before the wedding, richer night moisturiser from November, and absolutely no new products in the final week." },
      { q: "When should a bride get nail extensions before the wedding?", a: "4–5 days before the first function — recent enough to be fresh, settled enough that any lifting would already have shown and been fixed." },
    ],
  },
  {
    slug: "makeup-for-indian-skin-tones-delhi",
    title: "Makeup for Indian Skin Tones: A Delhi Artist's Guide to Base, Blush & Lip Matching",
    description:
      "Foundation matching, blush and lip shades for Indian skin tones from a working Delhi makeup artist. What actually suits warm, olive and deep undertones — with examples.",
    category: "Bridal",
    date: "2026-07-16",
    readMins: 6,
    cover: "/images/new-bridal-red.jpg",
    keywords: ["makeup for indian skin", "foundation shade indian skin", "makeup artist delhi indian skin", "blush shades brown skin", "lip colour indian skin tone"],
    body: [
      { p: "Most bad wedding makeup in India isn't 'too much' — it's the wrong colour. Foundation too fair, blush that reads chalky, lipstick that fights the outfit. After seven years of Delhi brides across every skin tone, here's the shade-matching guide I wish more artists shared." },
      { h: "Read the undertone first, always" },
      { p: "Undertone (the base heat of your skin) matters more than 'fair vs medium vs deep'. Indian skin lands mostly in warm, olive and neutral-warm — cool undertones are rarer than makeup brands assume. Match undertone in daylight, on your jaw and neck, not on the back of your hand." },
      { h: "Foundation matching that actually works" },
      { ul: [
        "Test three shades vertically on the jaw — the invisible one is yours.",
        "Warm undertones love golden/yellow-based foundations; olive skin needs a touch of green to cancel red.",
        "Airbrush shades often run cooler than the same brand's HD — swatch before wedding day, never assume.",
        "A cool-toned foundation on warm skin reads grey in photos. This is the #1 fixable mistake.",
      ] },
      { h: "Blush shades by undertone" },
      { ul: [
        "Warm / golden: peach, terracotta, warm coral — never cool pink.",
        "Olive: rose-brown, brick, mauve with warmth — cool pink turns ashy.",
        "Deeper skin: berry, plum, deep rose — pigmented, not sheer.",
      ] },
      { h: "Lip colours that flatter, not fight" },
      { ul: [
        "Warm undertone brides: brick red, rust, warm nude, mahogany.",
        "Olive skin: mauve pink, dusty rose, brown-red, wine.",
        "Deeper skin: berry, plum, bold red, deep chocolate nude.",
        "Match lip warmth to the outfit's undertone — a cool-red lip against a warm-gold lehenga looks off in every photo.",
      ] },
      { p: "This is exactly the consultation you get before booking at Blushes & Brushes — Urvashi shade-matches on your jaw in daylight, and every product used is named and shown. WhatsApp 76784 46364 to book a trial in Ramesh Nagar." },
    ],
    faq: [
      { q: "What foundation shade suits Indian skin?", a: "For most Indian skin tones, foundations with warm/golden undertones flatter best. Olive undertones benefit from a hint of green to neutralise redness. Test three shades vertically on your jaw in daylight — the invisible one is correct." },
      { q: "Which blush colour suits Indian brides?", a: "Warm undertones: peach, terracotta, warm coral. Olive: rose-brown, brick, warm mauve. Deeper skin: berry, plum, deep rose. Cool pink blush on warm/olive skin reads ashy." },
      { q: "How do I pick a lip colour for my wedding outfit?", a: "Match the warmth of the lip to the warmth of the outfit — warm-gold lehengas pair with brick, rust or warm nude; cool-toned outfits handle mauve, wine or berry. Always test in the same light as the venue." },
    ],
  },
  {
    slug: "salon-hygiene-checklist-delhi",
    title: "Salon Hygiene Checklist: 8 Things to Check Before You Sit Down (Delhi Guide)",
    description:
      "Not every 'clean-looking' salon is actually hygienic. A West Delhi studio owner's 8-point hygiene checklist — what to spot in 30 seconds before your appointment.",
    category: "Tips",
    date: "2026-07-16",
    readMins: 5,
    cover: "/images/nails-2.jpg",
    keywords: ["salon hygiene checklist", "hygienic salon delhi", "clean nail salon ramesh nagar", "salon infection risk", "safe beauty salon delhi"],
    body: [
      { p: "Delhi has thousands of salons and honestly, most look clean. Actual hygiene is a different question — and the difference shows up as infections, nail damage and skin reactions. Here are the 8 things a professional would spot in the first 30 seconds walking in." },
      { h: "The 30-second walk-in test" },
      { ul: [
        "Tools out of sealed pouches or a UV sterilizer — visible for you, not hidden in a drawer.",
        "Fresh towel per client (colour-coded is a great sign).",
        "Cuticle nippers replaced or sterilised between clients — this is where infections start.",
        "Trash bin actually has a lid — an open bin next to a station is a red flag.",
      ] },
      { h: "For nail services specifically" },
      { ul: [
        "No pre-mixed acrylic sitting exposed — that's cross-contamination.",
        "Files: single-use, or clearly sanitised. Ask if unsure.",
        "Foot baths lined with disposable film for pedicures — not just wiped down.",
      ] },
      { h: "One question that reveals everything" },
      { p: "\"Can I see your tool sterilisation setup?\" A professional salon happily walks you through it. A hesitant answer tells you what you need to know — and it's fine to leave. Blushes & Brushes in Ramesh Nagar walks every client through our setup on request, no shortcuts." },
    ],
    faq: [
      { q: "How do I know if a salon is actually hygienic?", a: "Look for tools out of sealed pouches or a UV sterilizer, fresh towels per client, cuticle nippers sterilised between clients, disposable liners on foot baths, and a lidded trash bin. If the salon hesitates to walk you through its sterilisation process, leave." },
      { q: "Can nail salons cause infections?", a: "Yes — most nail-salon infections come from shared, unsterilised cuticle nippers or files. Choose a salon that visibly sterilises tools between clients or uses single-use disposables." },
    ],
  },
  {
    slug: "wedding-makeup-timeline-day-of",
    title: "Wedding Day Makeup Timeline: The Hour-by-Hour Schedule a Delhi Bride Needs",
    description:
      "Exactly when the artist arrives, when hair starts, when photos begin — a working Delhi MUA's hour-by-hour wedding-morning schedule so nothing runs late.",
    category: "Bridal",
    date: "2026-07-16",
    readMins: 6,
    cover: "/images/new-bridal-purple.jpg",
    keywords: ["wedding day makeup timeline", "bridal morning schedule delhi", "makeup artist arrival time", "how long does bridal makeup take", "wedding morning timeline india"],
    body: [
      { p: "The single biggest wedding-day stressor isn't the makeup — it's the *clock*. Photographer waiting, family standing around, dupatta pinning at the last minute. This is the timeline I share with every bride whose wedding I book, working backwards from her first-look moment." },
      { h: "The working-backwards principle" },
      { p: "Fix ONE anchor first: when do you need to be photo-ready? Everything else counts backwards from that. For most Delhi weddings the anchor is the pheras/mandap time or the first-look shoot — everything upstream is math." },
      { h: "Standard 4-hour bridal morning (single-artist)" },
      { ul: [
        "T-4 hrs — Artist arrives, unpacks and sets up (15 min).",
        "T-3 hrs 45 min — Skin prep, primer, colour correction (30 min).",
        "T-3 hrs 15 min — Base + contour + eyes (75–90 min for HD, 60 min for airbrush).",
        "T-1 hr 45 min — Hair start (parallel with lip/lashes if two artists).",
        "T-45 min — Draping, jewellery setting, final touch-ups.",
        "T-0 — Photo-ready. First-look or family portraits.",
      ] },
      { h: "If there are 3+ people to be made up" },
      { p: "Book a two-artist team. The bride gets undivided time; a second artist runs mother/sisters in parallel. This is the difference between finishing at 10 AM and finishing at 12:30 PM in a house full of relatives." },
      { h: "The three timing questions to ask before booking" },
      { ul: [
        "\"What time will you arrive on my day?\" (Get it in writing, not 'we'll figure it out'.)",
        "\"How long do you need for my look specifically?\"",
        "\"Are you doing anyone else that same morning?\" (You want to be the priority booking.)",
      ] },
      { p: "Blushes & Brushes locks arrival time in writing at booking and travels across Delhi NCR. WhatsApp 76784 46364 with your function timings and we'll send back a shared timeline." },
    ],
    faq: [
      { q: "How long does bridal makeup take?", a: "60 minutes for airbrush base, 75–90 minutes for HD, plus 30 minutes for skin prep and 30–45 minutes for hair. Total: 3–4 hours for a solo bride with one artist." },
      { q: "What time should a bridal makeup artist arrive?", a: "Four hours before you need to be photo-ready. Get the arrival time in writing at the time of booking — a professional artist will commit to a specific time, not a range." },
      { q: "Should we book two artists for the wedding morning?", a: "Yes if three or more people (bride, mother, sisters) need makeup and hair. A two-artist team runs bride and family in parallel and finishes 2+ hours faster." },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);
