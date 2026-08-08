// Wedding event data. Venues from Piyush, 9 Aug 2026.
// Maps links are Google Maps *searches* rather than invented place IDs, so they
// resolve correctly without us guessing a pin we have not verified.

export const DRIVE_URL = "https://drive.google.com/drive/folders/REPLACE_ME";
export const DRIVE_READY = !DRIVE_URL.includes("REPLACE_ME");

const maps = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export interface WEvent {
  date: string;
  day: string;
  name: string;
  side: string;
  venue?: string;
  mapsQuery?: string;
  dress: string;
  dressNote?: string;
  note: string;
  highlight?: boolean;
}

export const EVENTS: WEvent[] = [
  {
    date: "5 Dec", day: "Saturday", name: "Chowki", side: "Groom's side",
    dress: "Comfortable ethnic",
    note: "Where it properly begins. Venue confirmed closer to the date.",
  },
  {
    date: "6 Dec", day: "Sunday", name: "Chowki", side: "Bride's side",
    dress: "Comfortable ethnic",
    note: "Round two, louder. Venue confirmed closer to the date.",
  },
  {
    date: "9 Dec", day: "Wednesday", name: "Mehendi shoot", side: "Bride",
    dress: "Family only",
    note: "Urvashi in front of the camera for once, instead of behind it.",
  },
  {
    date: "10 Dec", day: "Thursday", name: "Sagan", side: "Both families",
    venue: "Mosaic by Sandoz", mapsQuery: "Mosaic by Sandoz Delhi",
    dress: "Casual formal",
    dressNote: "Bollywood energy encouraged. Think a film premiere, not a board meeting.",
    note: "There is a drone. Look up occasionally.",
  },
  {
    date: "11 Dec", day: "Friday", name: "Haldi & Mehendi", side: "Both families",
    venue: "Casa Royal, Mayapuri", mapsQuery: "Casa Royal Mayapuri Delhi",
    dress: "Ethnic",
    dressNote: "Yellow if you have it. Wear something you do not mind getting turmeric on.",
    note: "Daytime. Ladies, there is something waiting for you.",
    highlight: true,
  },
  {
    date: "12 Dec", day: "Saturday", name: "Morning rituals", side: "Both sides",
    dress: "Ethnic",
    note: "Early. Coffee will be provided, we promise.",
  },
  {
    date: "12 Dec", day: "Saturday", name: "The Wedding", side: "Both families",
    venue: "Signature Hotel, Hari Nagar", mapsQuery: "Signature Hotel Hari Nagar Delhi",
    dress: "Your call",
    dressNote: "Genuinely. Wear whatever makes you feel like the best-dressed person there.",
    note: "Including the home entry.",
    highlight: true,
  },
];

export const mapsLink = (e: WEvent) => (e.mapsQuery ? maps(e.mapsQuery) : undefined);
