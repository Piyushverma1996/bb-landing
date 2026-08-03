// Single source of truth for the business entity used in JSON-LD.
// NAP drift between pages is a top local-SEO fault, and Google consolidates
// entities by @id - so every page must emit identical values and the same @id.

export const BUSINESS_ID = "https://blushesnbrushes.com/#business";
export const PHONE = "+917678446364";
export const PHONE_DISPLAY = "76784 46364";

export const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "B 1/1 Double Storey, Ramesh Nagar, Opp. Subway",
  addressLocality: "New Delhi",
  addressRegion: "Delhi",
  postalCode: "110015",
  addressCountry: "IN",
} as const;

// Exact pin from the Google Business Profile listing (CID 2332371947944609004).
// Taken from the !3d/!4d values in the Maps URL - the @lat,lng in that URL is
// the map viewport centre, which sits ~250 m away.
export const GEO = { "@type": "GeoCoordinates", latitude: 28.6516807, longitude: 77.1296873 } as const;

export const OPENING_HOURS = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:30",
    closes: "20:00",
  },
] as const;

// Authoritative profiles for this entity only. Never list code repos, staging
// hosts or anything that is not a public profile of the business.
export const SAME_AS = [
  "https://www.instagram.com/makeovers_by_urvashitrehan_",
  "https://www.instagram.com/blushesandbrushes2022",
  "https://maps.google.com/?cid=2332371947944609004",
  "https://www.justdial.com/Delhi/Blushes-Brushes-Opposite-Subway-Ramesh-Nagar/011PXX11-XX11-221126120209-G2C5_BZDET",
];

export const RATING = {
  "@type": "AggregateRating",
  ratingValue: "4.8",
  reviewCount: "200",
  bestRating: "5",
} as const;

/** BeautySalon node. Pass an area to scope the name and areaServed. */
export function beautySalonLd(opts: { url: string; area?: string; image?: string } ) {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": BUSINESS_ID,
    name: opts.area
      ? `Blushes & Brushes - Makeup Artist serving ${opts.area}`
      : "Blushes & Brushes by Urvashi Trehan",
    image: opts.image ?? "https://blushesnbrushes.com/images/bridal-real-1.webp",
    url: opts.url,
    telephone: PHONE,
    priceRange: "₹₹",
    address: ADDRESS,
    geo: GEO,
    openingHoursSpecification: OPENING_HOURS,
    areaServed: opts.area
      ? { "@type": "Place", name: `${opts.area}, West Delhi` }
      : { "@type": "Place", name: "West Delhi and Delhi NCR" },
    sameAs: SAME_AS,
    aggregateRating: RATING,
  };
}
