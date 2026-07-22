// Area / location landing pages — the local-SEO multiplier (Tarya's biggest tactic).
// One page per neighbourhood BB serves, each with UNIQUE local context (landmarks,
// metro, distance) so they are NOT thin doorway pages. Shared service/pricing blocks
// live in the template; the per-area unique copy lives here.

export interface Area {
  slug: string;
  area: string;              // "Rajouri Garden"
  distance: string;          // "~2 km from the Ramesh Nagar studio"
  metro?: string;
  // 2-3 genuinely area-specific sentences (landmarks, character, why BB serves it)
  localIntro: string;
  landmarks: string[];       // used in copy + FAQ
  nearby: string[];          // slugs of nearby areas for internal linking
  // one area-specific FAQ (plus shared FAQs added in the template)
  localFaqQ: string;
  localFaqA: string;
}

export const AREAS: Area[] = [
  {
    slug: "makeup-artist-in-ramesh-nagar",
    area: "Ramesh Nagar",
    distance: "at our Ramesh Nagar studio",
    metro: "Ramesh Nagar (Blue Line)",
    localIntro:
      "Blushes & Brushes is based right here in Ramesh Nagar — our studio is at B 1/1 Double Storey, opposite Subway, a two-minute walk from Ramesh Nagar metro station. This is home: bridal and party makeup, nail extensions and beauty rituals, all under one roof with a 4.8★ Google rating from 200+ clients across West Delhi.",
    landmarks: ["Ramesh Nagar Metro Station", "opposite Subway", "Double Storey Market"],
    nearby: ["makeup-artist-in-rajouri-garden", "makeup-artist-in-subhash-nagar", "makeup-artist-in-kirti-nagar"],
    localFaqQ: "Where is the Blushes & Brushes studio in Ramesh Nagar?",
    localFaqA: "B 1/1 Double Storey, opposite Subway, Ramesh Nagar, New Delhi 110015 — a two-minute walk from Ramesh Nagar metro station (Blue Line). Nails and beauty are done here; bridal makeup travels to your venue.",
  },
  {
    slug: "makeup-artist-in-rajouri-garden",
    area: "Rajouri Garden",
    distance: "~2 km from our Ramesh Nagar studio",
    metro: "Rajouri Garden (Blue Line)",
    localIntro:
      "Rajouri Garden is one of West Delhi's most vibrant markets — TDI Mall, the Ring Road boutiques and endless dining. For brides shopping their lehenga here, Urvashi Trehan is just two metro stops away in Ramesh Nagar, and travels to Rajouri Garden homes and banquets for wedding-morning makeup.",
    landmarks: ["TDI Mall", "Rajouri Garden Market", "Ring Road"],
    nearby: ["makeup-artist-in-ramesh-nagar", "makeup-artist-in-tilak-nagar", "makeup-artist-in-kirti-nagar"],
    localFaqQ: "Do you do bridal makeup in Rajouri Garden?",
    localFaqA: "Yes — Urvashi travels to Rajouri Garden homes and banquet venues for bridal and party makeup, and it's only ~2 km (two metro stops) from the Ramesh Nagar studio for trials, nails and beauty.",
  },
  {
    slug: "makeup-artist-in-tilak-nagar",
    area: "Tilak Nagar",
    distance: "~2 km from our Ramesh Nagar studio",
    metro: "Tilak Nagar (Blue Line)",
    localIntro:
      "Tilak Nagar's tight-knit Punjabi community means weddings are frequent and grand. Blushes & Brushes serves Tilak Nagar brides and party guests with HD and airbrush makeup that holds through the longest of celebrations — with the studio just one metro stop away for trials.",
    landmarks: ["Tilak Nagar Market", "Khyber Pass"],
    nearby: ["makeup-artist-in-subhash-nagar", "makeup-artist-in-janakpuri", "makeup-artist-in-ramesh-nagar"],
    localFaqQ: "Is there a good bridal makeup artist near Tilak Nagar?",
    localFaqA: "Yes — Blushes & Brushes by Urvashi Trehan is one metro stop from Tilak Nagar in Ramesh Nagar, with a 4.8★ rating, and travels to Tilak Nagar venues for wedding-day makeup.",
  },
  {
    slug: "makeup-artist-in-janakpuri",
    area: "Janakpuri",
    distance: "~5 km from our Ramesh Nagar studio",
    metro: "Janakpuri West (Blue/Magenta Line)",
    localIntro:
      "Janakpuri's District Centre and its many banquet halls host countless West Delhi weddings. Urvashi travels across Janakpuri's blocks for bridal and engagement makeup, bringing HD and airbrush artistry that photographs beautifully under banquet lighting.",
    landmarks: ["Janakpuri District Centre", "Pankha Road", "C4E Market"],
    nearby: ["makeup-artist-in-tilak-nagar", "makeup-artist-in-vikaspuri", "makeup-artist-in-uttam-nagar"],
    localFaqQ: "Do you travel to Janakpuri for wedding makeup?",
    localFaqA: "Yes — Urvashi travels to Janakpuri homes and banquet venues for bridal, engagement and party makeup (about 5 km from the Ramesh Nagar studio). Trials happen at the studio.",
  },
  {
    slug: "makeup-artist-in-subhash-nagar",
    area: "Subhash Nagar",
    distance: "~1.5 km from our Ramesh Nagar studio",
    metro: "Subhash Nagar (Blue Line)",
    localIntro:
      "Subhash Nagar sits right beside Ramesh Nagar — practically our backyard. It's the easiest area for a quick nail appointment, a pre-function facial or a bridal trial, and Urvashi reaches Subhash Nagar venues in minutes for makeup bookings.",
    landmarks: ["Subhash Nagar Market", "Metro Pillar area"],
    nearby: ["makeup-artist-in-ramesh-nagar", "makeup-artist-in-tilak-nagar", "makeup-artist-in-hari-nagar"],
    localFaqQ: "How far is the studio from Subhash Nagar?",
    localFaqA: "About 1.5 km — one metro stop or a short auto ride. Subhash Nagar clients pop in for nails, beauty and trials, and Urvashi travels there for makeup bookings.",
  },
  {
    slug: "makeup-artist-in-kirti-nagar",
    area: "Kirti Nagar",
    distance: "~3 km from our Ramesh Nagar studio",
    metro: "Kirti Nagar (Blue/Green Line)",
    localIntro:
      "Known for its furniture market and easy Blue Line connectivity, Kirti Nagar is a short hop from our Ramesh Nagar studio. Brides and party-goers here book Urvashi for makeup that lasts through long Delhi functions, with trials just three stops away.",
    landmarks: ["Kirti Nagar Furniture Market", "Moti Nagar border"],
    nearby: ["makeup-artist-in-moti-nagar", "makeup-artist-in-ramesh-nagar", "makeup-artist-in-naraina"],
    localFaqQ: "Is Blushes & Brushes near Kirti Nagar?",
    localFaqA: "Yes — about 3 km (a few minutes on the Blue Line) from Kirti Nagar. Studio services in Ramesh Nagar; makeup travels to Kirti Nagar venues.",
  },
  {
    slug: "makeup-artist-in-moti-nagar",
    area: "Moti Nagar",
    distance: "~2 km from our Ramesh Nagar studio",
    metro: "Moti Nagar (Blue Line)",
    localIntro:
      "Moti Nagar's residential blocks and banquet venues keep West Delhi's wedding calendar busy. Blushes & Brushes serves Moti Nagar with bridal, engagement and party makeup, plus studio nails and beauty just two metro stops away.",
    landmarks: ["Moti Nagar Metro", "Najafgarh Road"],
    nearby: ["makeup-artist-in-kirti-nagar", "makeup-artist-in-ramesh-nagar", "makeup-artist-in-punjabi-bagh"],
    localFaqQ: "Do you serve Moti Nagar for party and bridal makeup?",
    localFaqA: "Yes — Urvashi travels to Moti Nagar (about 2 km from the studio) for bridal, engagement and party makeup, with trials and nails at the Ramesh Nagar studio.",
  },
  {
    slug: "makeup-artist-in-punjabi-bagh",
    area: "Punjabi Bagh",
    distance: "~4 km from our Ramesh Nagar studio",
    metro: "Punjabi Bagh (Pink Line)",
    localIntro:
      "Punjabi Bagh is one of West Delhi's most affluent addresses, famous for grand weddings along Club Road and the West Avenue farmhouses. Urvashi Trehan brings premium HD and airbrush bridal makeup to Punjabi Bagh homes and venues, matched to big-wedding photography.",
    landmarks: ["Punjabi Bagh Club Road", "West Avenue", "Punjabi Bagh Flyover"],
    nearby: ["makeup-artist-in-moti-nagar", "makeup-artist-in-paschim-vihar", "makeup-artist-in-ramesh-nagar"],
    localFaqQ: "Do you do luxury bridal makeup in Punjabi Bagh?",
    localFaqA: "Yes — Urvashi offers premium HD and airbrush bridal makeup for Punjabi Bagh weddings, travelling to homes, farmhouses and banquets (about 4 km from the Ramesh Nagar studio).",
  },
  {
    slug: "makeup-artist-in-paschim-vihar",
    area: "Paschim Vihar",
    distance: "~6 km from our Ramesh Nagar studio",
    metro: "Paschim Vihar East/West (Green Line)",
    localIntro:
      "Paschim Vihar's leafy residential blocks and community centres see plenty of weddings and functions. Blushes & Brushes travels here for bridal, engagement and party makeup, bringing salon-grade products and long-wear finishes to your doorstep.",
    landmarks: ["Paschim Vihar Community Centres", "Outer Ring Road"],
    nearby: ["makeup-artist-in-punjabi-bagh", "makeup-artist-in-vikaspuri", "makeup-artist-in-ramesh-nagar"],
    localFaqQ: "Do you travel to Paschim Vihar for makeup?",
    localFaqA: "Yes — Urvashi travels to Paschim Vihar (about 6 km) for bridal and party makeup. Trials, nails and beauty are at the Ramesh Nagar studio.",
  },
  {
    slug: "makeup-artist-in-hari-nagar",
    area: "Hari Nagar",
    distance: "~3 km from our Ramesh Nagar studio",
    metro: "Tilak Nagar / Janakpuri (Blue Line)",
    localIntro:
      "Hari Nagar's DDA colonies and Clock Tower market anchor a close community where word-of-mouth weddings are the norm. Blushes & Brushes serves Hari Nagar with bridal and party makeup that travels to you, plus studio nails and beauty a short ride away.",
    landmarks: ["Hari Nagar Clock Tower", "DDA Market", "Fateh Nagar"],
    nearby: ["makeup-artist-in-subhash-nagar", "makeup-artist-in-tilak-nagar", "makeup-artist-in-ramesh-nagar"],
    localFaqQ: "Is there a bridal makeup artist who serves Hari Nagar?",
    localFaqA: "Yes — Blushes & Brushes by Urvashi Trehan serves Hari Nagar (about 3 km from the Ramesh Nagar studio) for bridal, engagement and party makeup, travelling to your home or venue.",
  },
  {
    slug: "makeup-artist-in-uttam-nagar",
    area: "Uttam Nagar",
    distance: "~8 km from our Ramesh Nagar studio",
    metro: "Uttam Nagar East/West (Blue Line)",
    localIntro:
      "One of West Delhi's most densely populated hubs, Uttam Nagar has a wedding almost every week. Urvashi travels to Uttam Nagar for bridal, engagement and party makeup, bringing HD and airbrush artistry that holds up in busy, warm venues.",
    landmarks: ["Uttam Nagar Metro", "Nawada", "Bindapur"],
    nearby: ["makeup-artist-in-vikaspuri", "makeup-artist-in-janakpuri", "makeup-artist-in-dwarka"],
    localFaqQ: "Do you do makeup in Uttam Nagar?",
    localFaqA: "Yes — Urvashi travels to Uttam Nagar (about 8 km, direct on the Blue Line) for bridal and party makeup. Trials and nails are at the Ramesh Nagar studio.",
  },
  {
    slug: "makeup-artist-in-vikaspuri",
    area: "Vikaspuri",
    distance: "~6 km from our Ramesh Nagar studio",
    metro: "Nearest: Janakpuri West (Blue/Magenta)",
    localIntro:
      "Vikaspuri's residential blocks and banquet lawns host West Delhi families year-round. Blushes & Brushes travels to Vikaspuri for wedding-morning and party makeup, with premium products and a look tailored to your outfit and skin tone.",
    landmarks: ["Vikaspuri District Centre", "Pankha Road"],
    nearby: ["makeup-artist-in-janakpuri", "makeup-artist-in-uttam-nagar", "makeup-artist-in-paschim-vihar"],
    localFaqQ: "Do you travel to Vikaspuri for bridal makeup?",
    localFaqA: "Yes — Urvashi travels to Vikaspuri (about 6 km) for bridal, engagement and party makeup. Studio trials and nails are in Ramesh Nagar.",
  },
  {
    slug: "makeup-artist-in-naraina",
    area: "Naraina",
    distance: "~4 km from our Ramesh Nagar studio",
    metro: "Nearest: Kirti Nagar (Blue/Green)",
    localIntro:
      "Between the Ring Road and the industrial belt, Naraina's residential pockets and Vihar blocks are an easy reach from Ramesh Nagar. Blushes & Brushes serves Naraina with party and bridal makeup that travels to you, plus studio nails and beauty close by.",
    landmarks: ["Naraina Vihar", "Ring Road", "Naraina Industrial Area"],
    nearby: ["makeup-artist-in-kirti-nagar", "makeup-artist-in-patel-nagar", "makeup-artist-in-ramesh-nagar"],
    localFaqQ: "Do you serve Naraina?",
    localFaqA: "Yes — Naraina is about 4 km from the Ramesh Nagar studio. Urvashi travels there for makeup; nails and beauty are at the studio.",
  },
  {
    slug: "makeup-artist-in-patel-nagar",
    area: "Patel Nagar",
    distance: "~4 km from our Ramesh Nagar studio",
    metro: "Patel Nagar (Blue Line)",
    localIntro:
      "On the edge of Central Delhi, Patel Nagar blends residential blocks with easy metro access. Brides and party guests here book Urvashi for HD and airbrush makeup, with the Ramesh Nagar studio a straight ride down the Blue Line for trials.",
    landmarks: ["Patel Nagar Metro", "Central Market", "Pusa Road"],
    nearby: ["makeup-artist-in-karol-bagh", "makeup-artist-in-naraina", "makeup-artist-in-ramesh-nagar"],
    localFaqQ: "Is Blushes & Brushes near Patel Nagar?",
    localFaqA: "Yes — about 4 km down the Blue Line. Urvashi travels to Patel Nagar for makeup; trials, nails and beauty are at the Ramesh Nagar studio.",
  },
  {
    slug: "makeup-artist-in-karol-bagh",
    area: "Karol Bagh",
    distance: "~7 km from our Ramesh Nagar studio",
    metro: "Karol Bagh (Blue Line)",
    localIntro:
      "Karol Bagh is Delhi's bridal-shopping heartland — Ajmal Khan Road and Bank Street are where half of West Delhi buys its wedding lehengas and jewellery. After the shopping, brides book Urvashi Trehan for the makeup, with HD and airbrush looks that match the outfits found right here.",
    landmarks: ["Ajmal Khan Road", "Bank Street", "Karol Bagh Market"],
    nearby: ["makeup-artist-in-patel-nagar", "makeup-artist-in-ramesh-nagar", "makeup-artist-in-rajouri-garden"],
    localFaqQ: "Do you do bridal makeup for Karol Bagh weddings?",
    localFaqA: "Yes — Urvashi travels to Karol Bagh for bridal and party makeup (about 7 km, direct on the Blue Line). Trials happen at the Ramesh Nagar studio.",
  },
  {
    slug: "makeup-artist-in-dwarka",
    area: "Dwarka",
    distance: "~12 km from our Ramesh Nagar studio",
    metro: "Dwarka (Blue Line)",
    localIntro:
      "Dwarka's sub-city sectors and banquet venues host some of South-West Delhi's biggest weddings. For destination-style bookings within the city, Urvashi travels to Dwarka with a full bridal kit and an early arrival, so your wedding morning stays calm.",
    landmarks: ["Dwarka Sector Markets", "Dwarka banquets", "Pacific Mall"],
    nearby: ["makeup-artist-in-uttam-nagar", "makeup-artist-in-janakpuri", "makeup-artist-in-vikaspuri"],
    localFaqQ: "Do you travel to Dwarka for bridal makeup?",
    localFaqA: "Yes — Urvashi travels to Dwarka (about 12 km) for bridal bookings, arriving early with a full kit. Travel is quoted at cab actuals and confirmed upfront.",
  },
];

export const getArea = (slug: string) => AREAS.find((a) => a.slug === slug);
