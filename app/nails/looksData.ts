// Nail Look catalogue.
//
// PROVENANCE RULE: only looks with `verified: true` render on the site. Every
// verified image was opened and described from the photograph itself, not from
// its filename - filenames proved unreliable (bb-nail-art-french-red-01 is not
// a French at all, it is a nude base with burgundy floral art).
//
// Provenance confirmed by Piyush on 12 Aug 2026: every image in the gallery is
// Urvashi's own work. An earlier pass wrongly flagged three of them as possible
// stock based on file size and backdrop; that inference was wrong and has been
// reversed. Descriptions below still come from the photographs themselves.

export type Tier = "good" | "better" | "best";

export interface NailLook {
  id: string;
  name: string;
  image: string;
  /** Confirmed as Blushes & Brushes' own work. Unverified looks do not render. */
  verified: boolean;
  tier: Tier;
  shape: string;
  length: string;
  finish: string;
  /** Plain-language "who this suits", used by staff and on the card. */
  suits: string;
  tags: string[];
  /** Locations that can currently deliver it. Damini added only once staff pass. */
  locations: ("ramesh-nagar" | "hari-nagar")[];
  /** Price only where owner-approved. null renders as "on request". */
  priceFrom: number | null;
}

export const LOOKS: NailLook[] = [
  {
    id: "N01",
    name: "Mocha Gold Chrome",
    image: "/images/gallery/bb-nail-art-chrome-gold-01.webp",
    verified: true,
    tier: "better",
    shape: "Almond / stiletto",
    length: "Medium to long",
    finish: "Mocha nude with gold glitter tips, gold chrome accent nails",
    suits: "Anyone who wants a warm neutral that still reads as done. Photographs beautifully.",
    tags: ["chrome", "glitter", "nude", "accent nails"],
    locations: ["ramesh-nagar"],
    priceFrom: 1500,
  },
  {
    id: "N02",
    name: "Gold Chrome Stiletto",
    image: "/images/gallery/bb-nail-art-stiletto-chrome-02.webp",
    verified: true,
    tier: "best",
    shape: "Stiletto",
    length: "Long",
    finish: "Mocha base, gold glitter cuticle line, full gold chrome accents",
    suits: "A statement set. Not for heavy kitchen or keyboard work.",
    tags: ["chrome", "stiletto", "glitter", "statement"],
    locations: ["ramesh-nagar"],
    priceFrom: 1500,
  },
  {
    id: "N03",
    name: "Burgundy Vine",
    image: "/images/gallery/bb-nail-art-french-red-01.webp",
    verified: true,
    tier: "better",
    shape: "Almond",
    length: "Short to medium",
    finish: "Sheer nude base with hand-painted burgundy petals and fine gold linework",
    suits: "Office-safe but not boring. Works with almost any outfit colour.",
    tags: ["hand-painted", "floral", "nude", "gold detail", "office"],
    locations: ["ramesh-nagar"],
    priceFrom: 1500,
  },
  {
    id: "N04",
    name: "Peacock Feather",
    image: "/images/gallery/bb-nail-art-peacock-01.webp",
    verified: true,
    tier: "best",
    shape: "Almond / coffin",
    length: "Medium to long",
    finish: "Hand-painted peacock feather, teal chrome accents, rhinestones",
    suits: "Sangeet, mehendi, festive. Pairs with teal, gold and jewel-tone outfits.",
    tags: ["hand-painted", "chrome", "stones", "occasion", "festive"],
    locations: ["ramesh-nagar"],
    priceFrom: null,
  },
  {
    id: "N05",
    name: "Bridal Pearl French",
    image: "/images/gallery/bb-nail-art-french-white-01.webp",
    verified: true,
    tier: "best",
    shape: "Square / coffin",
    length: "Medium",
    finish: "White French with silver rim, gold glitter, 3D white florals and stones",
    suits: "Brides, and anyone whose outfit is already heavy. Sits beside jewellery without competing.",
    tags: ["bridal", "french", "3d art", "stones", "glitter"],
    locations: ["ramesh-nagar"],
    priceFrom: null,
  },
  {
    id: "N06",
    name: "Polka French",
    image: "/images/gallery/bb-nail-art-french-polka-01.webp",
    verified: true,
    tier: "good",
    shape: "Almond",
    length: "Short to medium",
    finish: "Black and white polka-dot French tips with matching polka accent nails",
    suits: "Everyday wear with personality. Office-safe, and it goes with black or white anything.",
    tags: ["french", "monochrome", "everyday", "office", "polka"],
    locations: ["ramesh-nagar"],
    priceFrom: 1200,
  },
  {
    id: "N07",
    name: "Navy Bloom French",
    image: "/images/gallery/bb-nail-art-french-blue-01.webp",
    verified: true,
    tier: "better",
    shape: "Almond",
    length: "Medium",
    finish: "Navy and white French tips, polka detailing, hand-sculpted 3D white lily accents",
    suits: "Anyone in navy, white or pastel. The 3D flowers sit high, so not for typing all day.",
    tags: ["french", "3d art", "hand-painted", "navy", "occasion"],
    locations: ["ramesh-nagar"],
    priceFrom: 1500,
  },
  {
    id: "N08",
    name: "White Marble & Gold",
    image: "/images/gallery/bb-nail-art-floral-white-01.webp",
    verified: true,
    tier: "better",
    shape: "Square / coffin",
    length: "Medium",
    finish: "White marble with hand-drawn gold foil veining",
    suits: "Understated but expensive-looking. Excellent with gold jewellery and neutral outfits.",
    tags: ["marble", "gold foil", "neutral", "office", "bridal"],
    locations: ["ramesh-nagar"],
    priceFrom: 1500,
  },
  {
    id: "N09",
    name: "Maroon Rose",
    image: "/images/gallery/bb-nail-art-maroon-nude-01.webp",
    verified: true,
    tier: "best",
    shape: "Square / coffin",
    length: "Medium",
    finish: "Maroon chrome alternating with nude, hand-sculpted 3D gold roses, pearls and stones",
    suits: "Sagan, reception, festive. Made for maroon, wine and gold outfits.",
    tags: ["3d art", "chrome", "maroon", "pearls", "occasion", "bridal"],
    locations: ["ramesh-nagar"],
    priceFrom: null,
  },
  {
    id: "N10",
    name: "Teal Chrome",
    image: "/images/gallery/bb-nail-art-chrome-teal-01.webp",
    verified: false, // not yet opened and confirmed
    tier: "better",
    shape: "Almond",
    length: "Medium",
    finish: "Teal chrome",
    suits: "TBC",
    tags: ["chrome"],
    locations: [],
    priceFrom: null,
  },
];

export const VERIFIED = LOOKS.filter((l) => l.verified);

/** WhatsApp deep link carrying the Look ID, so nobody has to exchange photos. */
export function bookLook(l: NailLook) {
  const msg = `Hi Urvashi, I want Nail Look ${l.id} (${l.name}). Is it available?`;
  return `https://wa.me/917678446364?text=${encodeURIComponent(msg)}`;
}

export const TIER_LABEL: Record<Tier, string> = {
  good: "Clean",
  better: "Signature",
  best: "Occasion",
};
