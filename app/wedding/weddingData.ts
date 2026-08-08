// Wedding event data. Venues from Piyush, 9 Aug 2026.
// Maps links are the short links Piyush shared, resolved and verified against
// Mosaic Sandoz Banquet Hall, Casa Royal and Hotel Signature Grand.

export const DRIVE_URL = "https://drive.google.com/drive/folders/1CASsf4tDG3E6fDwyPEWlwHYUphMspmvD?usp=sharing";
export const DRIVE_READY = true;

export interface WEvent {
  date: string;
  day: string;
  name: string;
  side: string;
  venue?: string;
  maps?: string;
  dress: string;
  dressNote?: string;
  note: string;
  /** Sagan, Haldi and the Wedding get full tiles; the rest a compact strip. */
  main?: boolean;
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
    date: "10 Dec", day: "Thursday", name: "Sagan", side: "Both families",
    venue: "Mosaic by Sandoz", maps: "https://maps.app.goo.gl/9w258t7E3ktbaegM8",
    dress: "Casual formal",
    dressNote: "Bollywood energy encouraged. Think a film premiere, not a board meeting.",
    note: "There is a drone. Look up occasionally.",
    main: true,
  },
  {
    date: "11 Dec", day: "Friday", name: "Haldi & Mehendi", side: "Both families",
    venue: "Casa Royal, Mayapuri", maps: "https://maps.app.goo.gl/Ms9SihzmUb95xS2s8",
    dress: "Ethnic",
    dressNote: "Yellow if you have it. Wear something you do not mind getting turmeric on.",
    note: "Daytime. Ladies, there is something waiting for you.",
    main: true,
  },
  {
    date: "12 Dec", day: "Saturday", name: "Morning rituals", side: "Both sides",
    dress: "Ethnic",
    note: "Early. Coffee will be provided, we promise.",
  },
  {
    date: "12 Dec", day: "Saturday", name: "The Wedding", side: "Both families",
    venue: "Signature Hotel, Hari Nagar", maps: "https://maps.app.goo.gl/VjUum3VKHE4tyGb26",
    dress: "Your call",
    dressNote: "Genuinely. Wear whatever makes you feel like the best-dressed person there.",
    note: "Including the home entry.",
    main: true,
  },
];

export const mapsLink = (e: WEvent) => e.maps;
