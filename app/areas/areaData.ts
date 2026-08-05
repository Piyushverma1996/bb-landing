// Area / location landing pages - the local-SEO multiplier (Tarya's biggest tactic).
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

  // --- Below: first-hand detail from Urvashi (Jul 2026). This is what makes a
  // page non-duplicable. Pages without it are noindexed rather than published
  // thin, because near-identical location pages suppress the whole domain.
  /** Real venues worked, with one practical line each. */
  venues?: { name: string; note?: string }[];
  /** Honest travel time, including the bad case. */
  travelNote?: string;
  /** Volume of real work done here. */
  experience?: string;
  /** Operational knowledge: access, power, lifts, parking, lighting. */
  accessNote?: string;
  /** Whether clients from here travel in to the studio for nails/beauty. */
  studioNote?: string;
  /** Some areas are party-makeup territory, not bridal. Do not claim otherwise. */
  focus?: "bridal" | "party";
  /** Extra charge applies (distance). */
  travelCharge?: boolean;
  /** No first-hand experience yet -> keep the page out of the index. */
  noindex?: boolean;
}

export const AREAS: Area[] = [
  {
    slug: "makeup-artist-in-ramesh-nagar",
    experience: "The studio itself - most of the 200+ clients behind our 4.8 Google rating have sat in this chair.",
    venues: [
      { name: "The Oliver Space, Mayapuri Industrial Area", note: "A short run from the studio, so we can set up unhurried." },
      { name: "Flavours from Heavens, Moti Nagar", note: "Straight down Najafgarh Road from us." },
      { name: "Euphoria, Peeragarhi", note: "There is a mirror, but we still carry our own ring light - the vanity lighting is not reliable enough for a bridal base." },
    ],
    accessNote: "Come out of Ramesh Nagar metro at Gate 3. We are in the lane opposite Subway, second shop, ground floor - a photographer's studio on the right and a stationery shop on the left. Park directly in front of the salon.",
    travelNote: "You are already here. Most Ramesh Nagar clients walk in or reach in under five minutes.",
    studioNote: "Walk in or message first, both work. Waiting is normal-length, not long, even on a Saturday.",
    area: "Ramesh Nagar",
    distance: "at our Ramesh Nagar studio",
    metro: "Ramesh Nagar (Blue Line)",
    localIntro:
      "Blushes & Brushes is based right here in Ramesh Nagar - our studio is at B 1/1 Double Storey, opposite Subway, a two-minute walk from Ramesh Nagar metro station. This is home: bridal and party makeup, nail extensions and beauty rituals, all under one roof with a 4.8★ Google rating from 200+ clients across West Delhi.",
    landmarks: ["Ramesh Nagar Metro Station", "opposite Subway", "Double Storey Market"],
    nearby: ["makeup-artist-in-rajouri-garden", "makeup-artist-in-subhash-nagar", "makeup-artist-in-kirti-nagar"],
    localFaqQ: "Where is the Blushes & Brushes studio in Ramesh Nagar?",
    localFaqA: "B 1/1 Double Storey, opposite Subway, Ramesh Nagar, New Delhi 110015 - a two-minute walk from Ramesh Nagar metro station (Blue Line). Nails and beauty are done here; bridal makeup travels to your venue.",
  },
  {
    slug: "makeup-artist-in-rajouri-garden",
    experience: "Easily 15-20 brides a season - our single busiest area outside Ramesh Nagar itself, for both venue visits and studio makeups.",
    venues: [
      { name: "The Maiden Crown", note: "Good natural space in the getting-ready room." },
      { name: "Surya Grand", note: "A regular for us." },
      { name: "Smaller boutique banquets in Rajouri", note: "We bring our own professional ring lights - the bridal vanity rooms tend to be dim and warm-lit." },
    ],
    travelNote: "A 10-15 minute drive from the studio on a calm wedding morning. On a Saturday evening in peak season, budget 30-40 minutes just to cross the main market traffic.",
    accessNote: "We travel by cab with heavy vanity cases, hair tools and ring lights, so drop-off access matters here more than anywhere. The main market gridlocks on weekend evenings. We confirm with the bride in advance exactly which gate or service lift the cab should pull up to, so we are not carrying equipment through the market crowd on foot.",
    studioNote: "A lot of brides finish buying their lehenga and jewellery in the main market and come straight to the studio for a trial the same day, while the look is still fresh in their head.",
    area: "Rajouri Garden",
    distance: "~2 km from our Ramesh Nagar studio",
    metro: "Rajouri Garden (Blue Line)",
    localIntro:
      "Rajouri Garden is one of West Delhi's most vibrant markets - TDI Mall, the Ring Road boutiques and endless dining. For brides shopping their lehenga here, Urvashi Trehan is just two metro stops away in Ramesh Nagar, and travels to Rajouri Garden homes and banquets for wedding-morning makeup.",
    landmarks: ["TDI Mall", "Rajouri Garden Market", "Ring Road"],
    nearby: ["makeup-artist-in-ramesh-nagar", "makeup-artist-in-tilak-nagar", "makeup-artist-in-kirti-nagar"],
    localFaqQ: "Do you do bridal makeup in Rajouri Garden?",
    localFaqA: "Yes - Urvashi travels to Rajouri Garden homes and banquet venues for bridal and party makeup, and it's only ~2 km (two metro stops) from the Ramesh Nagar studio for trials, nails and beauty.",
  },
  {
    slug: "makeup-artist-in-tilak-nagar",
    noindex: true,
    area: "Tilak Nagar",
    distance: "~2 km from our Ramesh Nagar studio",
    metro: "Tilak Nagar (Blue Line)",
    localIntro:
      "Tilak Nagar's tight-knit Punjabi community means weddings are frequent and grand. Blushes & Brushes serves Tilak Nagar brides and party guests with HD and airbrush makeup that holds through the longest of celebrations - with the studio just one metro stop away for trials.",
    landmarks: ["Tilak Nagar Market", "Khyber Pass"],
    nearby: ["makeup-artist-in-subhash-nagar", "makeup-artist-in-janakpuri", "makeup-artist-in-ramesh-nagar"],
    localFaqQ: "Is there a good bridal makeup artist near Tilak Nagar?",
    localFaqA: "Yes - Blushes & Brushes by Urvashi Trehan is one metro stop from Tilak Nagar in Ramesh Nagar, with a 4.8★ rating, and travels to Tilak Nagar venues for wedding-day makeup.",
  },
  {
    slug: "makeup-artist-in-janakpuri",
    focus: "party",
    travelCharge: true,
    experience: "Party and occasion makeup rather than bridal - that is honestly where our Janakpuri work sits today.",
    venues: [
      { name: "Hyatt Centric Janakpuri", note: "" },
      { name: "Five Elements by Sandoz", note: "" },
      { name: "Janakpuri Club", note: "One of the older club venues where power points near the vanity are limited." },
      { name: "Palazzo Inn", note: "" },
      { name: "SK Precious Banquet", note: "" },
      { name: "Venues near Mata Chanan Devi Hospital", note: "" },
    ],
    travelNote: "Further out than the rest of West Delhi, so a travel charge applies and the exact timing depends on traffic on the day.",
    accessNote: "Janakpuri runs from five-star hotels like Hyatt Centric down to local clubs and large residential homes. For residential venues we sort gate entry passes with the family in advance, and we always carry heavy-duty extension cords - several of the older club venues have very few power points near the vanity mirrors.",
    studioNote: "Janakpuri clients do travel in to the Ramesh Nagar studio for nails and beauty.",
    area: "Janakpuri",
    distance: "~5 km from our Ramesh Nagar studio",
    metro: "Janakpuri West (Blue/Magenta Line)",
    localIntro:
      "Janakpuri's District Centre and its many banquet halls host countless West Delhi weddings. Urvashi travels across Janakpuri's blocks for bridal and engagement makeup, bringing HD and airbrush artistry that photographs beautifully under banquet lighting.",
    landmarks: ["Janakpuri District Centre", "Pankha Road", "C4E Market"],
    nearby: ["makeup-artist-in-tilak-nagar", "makeup-artist-in-vikaspuri", "makeup-artist-in-uttam-nagar"],
    localFaqQ: "Do you travel to Janakpuri for wedding makeup?",
    localFaqA: "Yes - Urvashi travels to Janakpuri homes and banquet venues for bridal, engagement and party makeup (about 5 km from the Ramesh Nagar studio). Trials happen at the studio.",
  },
  {
    slug: "makeup-artist-in-subhash-nagar",
    travelNote: "The closest area to the studio at roughly 1.5 km - about 10 minutes on a wedding morning, and rarely more than 20 even in evening traffic. Close enough that we can return to the studio mid-day if a second look is needed between functions.",
    accessNote: "Subhash Nagar sits one metro stop from us on the Blue Line, so most bookings here are straightforward: we reach early, set up without rushing, and there is no realistic scenario where traffic threatens the schedule. For flat and DDA-block addresses we confirm the floor and lift situation in advance, since vanity cases and hair tools are heavy to carry up.",
    studioNote: "Being the nearest catchment, Subhash Nagar clients treat the studio as their local salon - nail refills and beauty appointments here are usually walk-in distance rather than a planned trip.",
    area: "Subhash Nagar",
    distance: "~1.5 km from our Ramesh Nagar studio",
    metro: "Subhash Nagar (Blue Line)",
    localIntro:
      "Subhash Nagar sits right beside Ramesh Nagar - practically our backyard. It's the easiest area for a quick nail appointment, a pre-function facial or a bridal trial, and Urvashi reaches Subhash Nagar venues in minutes for makeup bookings.",
    landmarks: ["Subhash Nagar Market", "Metro Pillar area"],
    nearby: ["makeup-artist-in-ramesh-nagar", "makeup-artist-in-tilak-nagar", "makeup-artist-in-hari-nagar"],
    localFaqQ: "How far is the studio from Subhash Nagar?",
    localFaqA: "About 1.5 km - one metro stop or a short auto ride. Subhash Nagar clients pop in for nails, beauty and trials, and Urvashi travels there for makeup bookings.",
  },
  {
    slug: "makeup-artist-in-kirti-nagar",
    experience: "2-3 brides so far - less bridal volume than neighbouring Moti Nagar, more commercial territory.",
    venues: [
      { name: "Oreanns", note: "" },
      { name: "Invitation Banquet", note: "" },
      { name: "Ayraa Banquet", note: "" },
    ],
    travelNote: "20-30 minutes, though daytime traffic is heavy with commercial vehicles.",
    accessNote: "Kirti Nagar is a furniture and commercial hub, and the inner blocks confuse cab drivers. We ask brides to share a live location or an exact Maps pin for venues like Oreanns or Ayraa, so the cab drops us at the door rather than leaving us to carry makeup and hair equipment across busy industrial roads.",
    area: "Kirti Nagar",
    distance: "~3 km from our Ramesh Nagar studio",
    metro: "Kirti Nagar (Blue/Green Line)",
    localIntro:
      "Known for its furniture market and easy Blue Line connectivity, Kirti Nagar is a short hop from our Ramesh Nagar studio. Brides and party-goers here book Urvashi for makeup that lasts through long Delhi functions, with trials just three stops away.",
    landmarks: ["Kirti Nagar Furniture Market", "Moti Nagar border"],
    nearby: ["makeup-artist-in-moti-nagar", "makeup-artist-in-ramesh-nagar", "makeup-artist-in-naraina"],
    localFaqQ: "Is Blushes & Brushes near Kirti Nagar?",
    localFaqA: "Yes - about 3 km (a few minutes on the Blue Line) from Kirti Nagar. Studio services in Ramesh Nagar; makeup travels to Kirti Nagar venues.",
  },
  {
    slug: "makeup-artist-in-moti-nagar",
    experience: "8-10 brides, at venues and at the studio.",
    venues: [
      { name: "La Stella", note: "" },
      { name: "Majestic Crown", note: "" },
      { name: "Zion Banquet", note: "" },
      { name: "Florence Banquet", note: "" },
    ],
    travelNote: "20-30 minutes at most, straight down Najafgarh Road.",
    studioNote: "Plenty of Moti Nagar regulars come to the studio for nails and beauty rather than booking at home.",
    area: "Moti Nagar",
    distance: "~2 km from our Ramesh Nagar studio",
    metro: "Moti Nagar (Blue Line)",
    localIntro:
      "Moti Nagar's residential blocks and banquet venues keep West Delhi's wedding calendar busy. Blushes & Brushes serves Moti Nagar with bridal, engagement and party makeup, plus studio nails and beauty just two metro stops away.",
    landmarks: ["Moti Nagar Metro", "Najafgarh Road"],
    nearby: ["makeup-artist-in-kirti-nagar", "makeup-artist-in-ramesh-nagar", "makeup-artist-in-punjabi-bagh"],
    localFaqQ: "Do you serve Moti Nagar for party and bridal makeup?",
    localFaqA: "Yes - Urvashi travels to Moti Nagar (about 2 km from the studio) for bridal, engagement and party makeup, with trials and nails at the Ramesh Nagar studio.",
  },
  {
    slug: "makeup-artist-in-punjabi-bagh",
    experience: "6-8 brides, split between venues and the studio. Multi-function bookings are common here.",
    venues: [
      { name: "Opulence Banquet", note: "Spacious, well-cooled getting-ready room." },
      { name: "Symphony Banquet", note: "Another regular for multi-function weddings." },
    ],
    travelNote: "15-20 minutes on a wedding morning. We add 20-30 minutes of buffer on evening saayas, when Ring Road near Club Road backs up badly.",
    accessNote: "Punjabi Bagh has some of the most luxurious banquets and farmhouses in West Delhi. The getting-ready rooms are usually spacious with proper air conditioning, which makes a real difference to how a base sets over a long function.",
    area: "Punjabi Bagh",
    distance: "~4 km from our Ramesh Nagar studio",
    metro: "Punjabi Bagh (Pink Line)",
    localIntro:
      "Punjabi Bagh is one of West Delhi's most affluent addresses, famous for grand weddings along Club Road and the West Avenue farmhouses. Urvashi Trehan brings premium HD and airbrush bridal makeup to Punjabi Bagh homes and venues, matched to big-wedding photography.",
    landmarks: ["Punjabi Bagh Club Road", "West Avenue", "Punjabi Bagh Flyover"],
    nearby: ["makeup-artist-in-moti-nagar", "makeup-artist-in-paschim-vihar", "makeup-artist-in-ramesh-nagar"],
    localFaqQ: "Do you do luxury bridal makeup in Punjabi Bagh?",
    localFaqA: "Yes - Urvashi offers premium HD and airbrush bridal makeup for Punjabi Bagh weddings, travelling to homes, farmhouses and banquets (about 4 km from the Ramesh Nagar studio).",
  },
  {
    slug: "makeup-artist-in-paschim-vihar",
    travelNote: "Roughly 6 km and 20-30 minutes on a wedding morning via Outer Ring Road. Evening saayas in peak season can push it past 40 minutes, so we leave with a buffer rather than cutting it fine.",
    accessNote: "Paschim Vihar is well supplied with hotels and community centres, and the larger venues here have proper bridal rooms with air conditioning and space to set up. The community-centre venues are more variable - some have very little lighting near the vanity - so we carry ring lights as standard. Parking is generally easier here than in the market-heavy areas closer to the studio.",
    studioNote: "A comfortable run on the Green Line, and Paschim Vihar brides often come to the studio for the trial even when the wedding-day makeup happens at their venue.",
    area: "Paschim Vihar",
    distance: "~6 km from our Ramesh Nagar studio",
    metro: "Paschim Vihar East/West (Green Line)",
    localIntro:
      "Paschim Vihar's leafy residential blocks and community centres see plenty of weddings and functions. Blushes & Brushes travels here for bridal, engagement and party makeup, bringing salon-grade products and long-wear finishes to your doorstep.",
    landmarks: ["Paschim Vihar Community Centres", "Outer Ring Road"],
    nearby: ["makeup-artist-in-punjabi-bagh", "makeup-artist-in-vikaspuri", "makeup-artist-in-ramesh-nagar"],
    localFaqQ: "Do you travel to Paschim Vihar for makeup?",
    localFaqA: "Yes - Urvashi travels to Paschim Vihar (about 6 km) for bridal and party makeup. Trials, nails and beauty are at the Ramesh Nagar studio.",
  },
  {
    slug: "makeup-artist-in-hari-nagar",
    noindex: true,
    area: "Hari Nagar",
    distance: "~3 km from our Ramesh Nagar studio",
    metro: "Tilak Nagar / Janakpuri (Blue Line)",
    localIntro:
      "Hari Nagar's DDA colonies and Clock Tower market anchor a close community where word-of-mouth weddings are the norm. Blushes & Brushes serves Hari Nagar with bridal and party makeup that travels to you, plus studio nails and beauty a short ride away.",
    landmarks: ["Hari Nagar Clock Tower", "DDA Market", "Fateh Nagar"],
    nearby: ["makeup-artist-in-subhash-nagar", "makeup-artist-in-tilak-nagar", "makeup-artist-in-ramesh-nagar"],
    localFaqQ: "Is there a bridal makeup artist who serves Hari Nagar?",
    localFaqA: "Yes - Blushes & Brushes by Urvashi Trehan serves Hari Nagar (about 3 km from the Ramesh Nagar studio) for bridal, engagement and party makeup, travelling to your home or venue.",
  },
  {
    slug: "makeup-artist-in-uttam-nagar",
    noindex: true,
    area: "Uttam Nagar",
    distance: "~8 km from our Ramesh Nagar studio",
    metro: "Uttam Nagar East/West (Blue Line)",
    localIntro:
      "One of West Delhi's most densely populated hubs, Uttam Nagar has a wedding almost every week. Urvashi travels to Uttam Nagar for bridal, engagement and party makeup, bringing HD and airbrush artistry that holds up in busy, warm venues.",
    landmarks: ["Uttam Nagar Metro", "Nawada", "Bindapur"],
    nearby: ["makeup-artist-in-vikaspuri", "makeup-artist-in-janakpuri", "makeup-artist-in-dwarka"],
    localFaqQ: "Do you do makeup in Uttam Nagar?",
    localFaqA: "Yes - Urvashi travels to Uttam Nagar (about 8 km, direct on the Blue Line) for bridal and party makeup. Trials and nails are at the Ramesh Nagar studio.",
  },
  {
    slug: "makeup-artist-in-vikaspuri",
    travelNote: "Around 6 km, usually 20-30 minutes along Pankha Road. The stretch past Janakpuri District Centre is the slow part, particularly on weekend evenings.",
    accessNote: "Vikaspuri is largely residential, so most bookings happen at home rather than at a banquet. That changes what matters: we confirm which gate the cab should use, whether there is a lift, and where we can set up with a mirror and a power point. Home bookings are often the most comfortable to work in, provided the room has been cleared before we arrive - it is worth asking the family to do that the night before.",
    studioNote: "Far enough that most Vikaspuri clients plan a studio visit rather than dropping in, but close enough that trials and nail appointments are a regular trip.",
    area: "Vikaspuri",
    distance: "~6 km from our Ramesh Nagar studio",
    metro: "Nearest: Janakpuri West (Blue/Magenta)",
    localIntro:
      "Vikaspuri's residential blocks and banquet lawns host West Delhi families year-round. Blushes & Brushes travels to Vikaspuri for wedding-morning and party makeup, with premium products and a look tailored to your outfit and skin tone.",
    landmarks: ["Vikaspuri District Centre", "Pankha Road"],
    nearby: ["makeup-artist-in-janakpuri", "makeup-artist-in-uttam-nagar", "makeup-artist-in-paschim-vihar"],
    localFaqQ: "Do you travel to Vikaspuri for bridal makeup?",
    localFaqA: "Yes - Urvashi travels to Vikaspuri (about 6 km) for bridal, engagement and party makeup. Studio trials and nails are in Ramesh Nagar.",
  },
  {
    slug: "makeup-artist-in-naraina",
    travelNote: "About 4 km via Ring Road, typically 15-25 minutes. Naraina Industrial Area moves freely early in the morning, which suits pre-dawn bridal starts.",
    accessNote: "Naraina splits between Naraina Vihar homes and the industrial-area banquets. The industrial stretch is easy to reach but poorly signposted after dark, so we ask for a Maps pin rather than an address. Banquet halls converted from industrial plots often have large but sparsely furnished getting-ready rooms - we plan on bringing our own lighting and check the power point situation before the day.",
    studioNote: "Close enough on the Ring Road that Naraina clients regularly come to the studio rather than booking at home.",
    area: "Naraina",
    distance: "~4 km from our Ramesh Nagar studio",
    metro: "Nearest: Kirti Nagar (Blue/Green)",
    localIntro:
      "Between the Ring Road and the industrial belt, Naraina's residential pockets and Vihar blocks are an easy reach from Ramesh Nagar. Blushes & Brushes serves Naraina with party and bridal makeup that travels to you, plus studio nails and beauty close by.",
    landmarks: ["Naraina Vihar", "Ring Road", "Naraina Industrial Area"],
    nearby: ["makeup-artist-in-kirti-nagar", "makeup-artist-in-patel-nagar", "makeup-artist-in-ramesh-nagar"],
    localFaqQ: "Do you serve Naraina?",
    localFaqA: "Yes - Naraina is about 4 km from the Ramesh Nagar studio. Urvashi travels there for makeup; nails and beauty are at the studio.",
  },
  {
    slug: "makeup-artist-in-patel-nagar",
    travelNote: "Around 4 km and 15-25 minutes depending on Pusa Road. The stretch near Patel Nagar metro slows noticeably in the evening rush, so evening functions get an extra buffer.",
    accessNote: "Patel Nagar mixes older residential blocks with hotels along Pusa Road. For residential bookings we check parking and lift access when confirming, because the inner lanes are narrow and a cab cannot always reach the door. For hotel bookings the getting-ready rooms are usually well equipped, though we still carry ring lights - hotel bathroom lighting is rarely right for a bridal base.",
    studioNote: "A straight run along the Blue Line, so Patel Nagar clients do come in to the studio for nails, beauty and bridal trials.",
    area: "Patel Nagar",
    distance: "~4 km from our Ramesh Nagar studio",
    metro: "Patel Nagar (Blue Line)",
    localIntro:
      "On the edge of Central Delhi, Patel Nagar blends residential blocks with easy metro access. Brides and party guests here book Urvashi for HD and airbrush makeup, with the Ramesh Nagar studio a straight ride down the Blue Line for trials.",
    landmarks: ["Patel Nagar Metro", "Central Market", "Pusa Road"],
    nearby: ["makeup-artist-in-karol-bagh", "makeup-artist-in-naraina", "makeup-artist-in-ramesh-nagar"],
    localFaqQ: "Is Blushes & Brushes near Patel Nagar?",
    localFaqA: "Yes - about 4 km down the Blue Line. Urvashi travels to Patel Nagar for makeup; trials, nails and beauty are at the Ramesh Nagar studio.",
  },
  {
    slug: "makeup-artist-in-karol-bagh",
    travelNote: "About 7 km and 25-35 minutes, and the honest answer is that Karol Bagh traffic is the least predictable of any area we serve. Ajmal Khan Road and Bank Street can be at a standstill through the day, not only in the evening, so we build in significantly more buffer here than for West Delhi bookings.",
    accessNote: "Karol Bagh is one of Delhi's densest shopping districts, which makes drop-off the main planning problem rather than the makeup itself. We agree the exact gate or service entrance in advance, because carrying vanity cases and hair equipment on foot through the market is not realistic. Hotel venues here are well equipped; the older guesthouse and banquet rooms are not, so we plan for our own lighting and extension cords.",
    studioNote: "Karol Bagh is a major bridal shopping destination, and brides buying lehengas and jewellery here often travel out to the Ramesh Nagar studio for the trial - a straight run on the Blue Line.",
    area: "Karol Bagh",
    distance: "~7 km from our Ramesh Nagar studio",
    metro: "Karol Bagh (Blue Line)",
    localIntro:
      "Karol Bagh is Delhi's bridal-shopping heartland - Ajmal Khan Road and Bank Street are where half of West Delhi buys its wedding lehengas and jewellery. After the shopping, brides book Urvashi Trehan for the makeup, with HD and airbrush looks that match the outfits found right here.",
    landmarks: ["Ajmal Khan Road", "Bank Street", "Karol Bagh Market"],
    nearby: ["makeup-artist-in-patel-nagar", "makeup-artist-in-ramesh-nagar", "makeup-artist-in-rajouri-garden"],
    localFaqQ: "Do you do bridal makeup for Karol Bagh weddings?",
    localFaqA: "Yes - Urvashi travels to Karol Bagh for bridal and party makeup (about 7 km, direct on the Blue Line). Trials happen at the Ramesh Nagar studio.",
  },
  {
    slug: "makeup-artist-in-dwarka",
    noindex: true,
    area: "Dwarka",
    distance: "~12 km from our Ramesh Nagar studio",
    metro: "Dwarka (Blue Line)",
    localIntro:
      "Dwarka's sub-city sectors and banquet venues host some of South-West Delhi's biggest weddings. For destination-style bookings within the city, Urvashi travels to Dwarka with a full bridal kit and an early arrival, so your wedding morning stays calm.",
    landmarks: ["Dwarka Sector Markets", "Dwarka banquets", "Pacific Mall"],
    nearby: ["makeup-artist-in-uttam-nagar", "makeup-artist-in-janakpuri", "makeup-artist-in-vikaspuri"],
    localFaqQ: "Do you travel to Dwarka for bridal makeup?",
    localFaqA: "Yes - Urvashi travels to Dwarka (about 12 km) for bridal bookings, arriving early with a full kit. Travel is quoted at cab actuals and confirmed upfront.",
  },
];

export const getArea = (slug: string) => AREAS.find((a) => a.slug === slug);
