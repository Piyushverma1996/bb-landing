import { NextResponse } from "next/server";

// Dual gamified quest system — Urvashi 🌸 and Piyush 🚀 each have their own track.
// Urvashi's rewards = shaadi shopping. Piyush's rewards = couple milestones / treats.

export interface Quest {
  id: string;
  track: "urvashi" | "piyush";
  phase: number;
  title: string;
  desc: string;
  who: string;
  points: number;
  category: string;
  est: string;
}

export interface Phase {
  track: "urvashi" | "piyush";
  phase: number;
  name: string;
  theme: string;
  reward: string;
  rewardEmoji: string;
  unlockAt: number;
}

const PHASES: Phase[] = [
  // ── URVASHI 🌸 ──
  { track: "urvashi", phase: 1, name: "Foundation", theme: "Get the engine running", reward: "1 suit of her choice (under ₹1K) 🪡", rewardEmoji: "🪡", unlockAt: 5 },
  { track: "urvashi", phase: 2, name: "Content Queen", theme: "First videos + reviews flowing", reward: "A honeymoon dress 👗", rewardEmoji: "✨", unlockAt: 5 },
  { track: "urvashi", phase: 3, name: "Lead Magnet", theme: "Ads live, leads coming in", reward: "A designer purse 👜", rewardEmoji: "👜", unlockAt: 5 },
  { track: "urvashi", phase: 4, name: "Local Legend", theme: "Dominating West Delhi search", reward: "A full lehenga shopping trip 👑", rewardEmoji: "👑", unlockAt: 5 },
  // ── PIYUSH 🚀 ──
  { track: "piyush", phase: 1, name: "Launch Pad", theme: "Both engines live tonight", reward: "A dinner date with Urvashi 🍽️", rewardEmoji: "🚀", unlockAt: 5 },
  { track: "piyush", phase: 2, name: "First Rupee", theme: "First income from each stream", reward: "That gadget/upgrade he's eyeing 🎧", rewardEmoji: "💰", unlockAt: 5 },
  { track: "piyush", phase: 3, name: "Momentum", theme: "Repeatable clients + leads", reward: "A weekend getaway together 🏔️", rewardEmoji: "📈", unlockAt: 5 },
  { track: "piyush", phase: 4, name: "Scale", theme: "Retainer + course income", reward: "Honeymoon fund boost ✈️", rewardEmoji: "✈️", unlockAt: 5 },
];

const QUESTS: Quest[] = [
  // ═══ URVASHI 🌸 ═══
  // Phase 1 — Foundation
  { id: "u1-1", track: "urvashi", phase: 1, title: "Give Piyush admin on both Instagram accounts", desc: "5 min on your phone — unlocks all the auto-magic", who: "urvashi", points: 100, category: "setup", est: "5 min" },
  { id: "u1-2", track: "urvashi", phase: 1, title: "Shoot your first 3 clips (1 nail + 2 makeup)", desc: "Close-ups, good light, vertical. Send on WhatsApp.", who: "urvashi", points: 150, category: "content", est: "15 min" },
  { id: "u1-3", track: "urvashi", phase: 1, title: "Activate WhatsApp lead alerts (CallMeBot)", desc: "Send one message — get pinged for every new lead", who: "urvashi", points: 50, category: "setup", est: "3 min" },
  { id: "u1-4", track: "urvashi", phase: 1, title: "Approve your first auto-made Reel", desc: "Piyush sends it, you thumbs-up or ask for changes", who: "urvashi", points: 100, category: "content", est: "5 min" },
  { id: "u1-5", track: "urvashi", phase: 1, title: "Get 5 Google reviews using the QR card", desc: "Show the QR after every appointment — review drafts are ready to share", who: "urvashi", points: 150, category: "reputation", est: "ongoing" },
  { id: "u1-6", track: "urvashi", phase: 1, title: "Get 5 WRITTEN Justdial reviews (top priority)", desc: "Text reviews, not just stars — this buries the one negative review Google shows", who: "urvashi", points: 200, category: "reputation", est: "1 week" },
  { id: "u1-7", track: "urvashi", phase: 1, title: "Reply to the negative Justdial review", desc: "Calm, professional reply from the business account — Piyush has a draft", who: "urvashi", points: 100, category: "reputation", est: "5 min" },
  // Phase 2 — Content Queen
  { id: "u2-1", track: "urvashi", phase: 2, title: "Shoot a full bridal look start-to-finish", desc: "Goes on @makeovers as a premium reel + ad", who: "urvashi", points: 200, category: "content", est: "during work" },
  { id: "u2-2", track: "urvashi", phase: 2, title: "Post 4 reels in one week", desc: "Captions auto-written — just post", who: "urvashi", points: 150, category: "content", est: "20 min total" },
  { id: "u2-3", track: "urvashi", phase: 2, title: "Hit 10 Google + 10 written Justdial reviews", desc: "Consistent ratings across platforms is what AI assistants & Google trust", who: "urvashi", points: 150, category: "reputation", est: "ongoing" },
  { id: "u2-6", track: "urvashi", phase: 2, title: "Get 5 magicpin reviews + send 3 real client quotes", desc: "WhatsApp screenshots work — they go on the website as testimonials", who: "urvashi", points: 100, category: "reputation", est: "1 week" },
  { id: "u2-4", track: "urvashi", phase: 2, title: "Record one nail-art process video", desc: "Satisfying close-ups perform best on @blushes", who: "urvashi", points: 100, category: "content", est: "10 min" },
  { id: "u2-5", track: "urvashi", phase: 2, title: "Reply to every DM within a day for a week", desc: "Fast replies = more bookings", who: "urvashi", points: 100, category: "growth", est: "5 min/day" },
  // Phase 3 — Lead Magnet
  { id: "u3-1", track: "urvashi", phase: 3, title: "Approve first paid ad to go live", desc: "Piyush sets it up, you give the green light", who: "both", points: 150, category: "ads", est: "5 min" },
  { id: "u3-2", track: "urvashi", phase: 3, title: "Convert 3 ad leads into bookings", desc: "Call back fast, use the WhatsApp opener script", who: "urvashi", points: 250, category: "growth", est: "ongoing" },
  { id: "u3-3", track: "urvashi", phase: 3, title: "Shoot 5 clips for an ad-creative bank", desc: "More clips = more ad variations to test", who: "urvashi", points: 150, category: "content", est: "20 min" },
  { id: "u3-4", track: "urvashi", phase: 3, title: "Get one 5-star review with a photo", desc: "Photo reviews convert browsers to bookers", who: "urvashi", points: 100, category: "reputation", est: "ongoing" },
  { id: "u3-5", track: "urvashi", phase: 3, title: "Do one collab reel with a local vendor", desc: "Boutique, photographer, mehndi artist — shared audience", who: "urvashi", points: 150, category: "growth", est: "30 min" },
  // Phase 4 — Local Legend
  { id: "u4-1", track: "urvashi", phase: 4, title: "Reach 25 Google reviews at 4.8★+", desc: "Top of local 'makeup near me'", who: "urvashi", points: 200, category: "reputation", est: "ongoing" },
  { id: "u4-2", track: "urvashi", phase: 4, title: "Provide photos + story for a blog feature", desc: "Piyush pitches, you supply the visuals", who: "both", points: 200, category: "growth", est: "30 min" },
  { id: "u4-3", track: "urvashi", phase: 4, title: "Film the Nail Extensions course content", desc: "Turn your skill into passive income", who: "urvashi", points: 300, category: "growth", est: "2 hours" },
  { id: "u4-4", track: "urvashi", phase: 4, title: "Hit 1,000 Instagram followers", desc: "The compounding milestone", who: "urvashi", points: 250, category: "content", est: "ongoing" },
  { id: "u4-5", track: "urvashi", phase: 4, title: "Run a referral offer with past clients", desc: "Bring a friend, both get 15% off", who: "urvashi", points: 150, category: "growth", est: "ongoing" },

  // ═══ PIYUSH 🚀 ═══
  // Phase 1 — Launch Pad
  { id: "p1-1", track: "piyush", phase: 1, title: "Deploy Google Apps Script webhook", desc: "Fix the broken lead funnel — leads stop getting lost", who: "piyush", points: 150, category: "setup", est: "15 min" },
  { id: "p1-2", track: "piyush", phase: 1, title: "Deploy dashboard live to Vercel tonight", desc: "npm install + git push → both go live", who: "piyush", points: 200, category: "setup", est: "15 min" },
  { id: "p1-3", track: "piyush", phase: 1, title: "Wire Meta token + IG IDs for both pages", desc: "@makeovers (makeup) + @blushes (nails/beauty)", who: "piyush", points: 150, category: "setup", est: "20 min" },
  { id: "p1-4", track: "piyush", phase: 1, title: "Publish all 5 NorthPilot Fiverr gigs", desc: "Copy is 100% done — just press Publish", who: "piyush", points: 250, category: "income", est: "2 hours" },
  { id: "p1-5", track: "piyush", phase: 1, title: "Run BB's first Meta ad (₹150/day nails)", desc: "West Delhi women, lead-gen objective", who: "piyush", points: 150, category: "ads", est: "30 min" },
  // Phase 2 — First Rupee
  { id: "p2-1", track: "piyush", phase: 2, title: "Land first Fiverr/Upwork order", desc: "Even an intro-priced one — first review matters most", who: "piyush", points: 300, category: "income", est: "ongoing" },
  { id: "p2-2", track: "piyush", phase: 2, title: "Create Upwork profile (copy is ready)", desc: "Second channel for the same gigs", who: "piyush", points: 100, category: "income", est: "1 hour" },
  { id: "p2-3", track: "piyush", phase: 2, title: "Get BB's first 5 ad leads", desc: "Validate the funnel end-to-end", who: "piyush", points: 150, category: "ads", est: "1 week" },
  { id: "p2-4", track: "piyush", phase: 2, title: "Set up ManyChat on @blushes (NAILS/COURSE)", desc: "Auto-reply DM keywords → logged leads", who: "piyush", points: 150, category: "setup", est: "30 min" },
  { id: "p2-5", track: "piyush", phase: 2, title: "Send 10 LinkedIn outreach DMs", desc: "Direct consulting leads for NorthPilot", who: "piyush", points: 100, category: "income", est: "30 min" },
  // Phase 3 — Momentum
  { id: "p3-1", track: "piyush", phase: 3, title: "Deliver first NorthPilot project", desc: "Claude drafts 70%, you review — get the 5-star", who: "piyush", points: 300, category: "income", est: "varies" },
  { id: "p3-2", track: "piyush", phase: 3, title: "Get BB ad CPL under ₹400", desc: "Use auto-optimize, scale the winner", who: "piyush", points: 150, category: "ads", est: "2 weeks" },
  { id: "p3-3", track: "piyush", phase: 3, title: "Create WedMeGood bridal vendor profile", desc: "Bridal leads worth ₹15-25K each", who: "piyush", points: 150, category: "growth", est: "30 min" },
  { id: "p3-4", track: "piyush", phase: 3, title: "Pitch Urvashi's story to 3 blogs/portals", desc: "Claude drafts the pitches, you send", who: "piyush", points: 150, category: "growth", est: "1 hour" },
  { id: "p3-5", track: "piyush", phase: 3, title: "Land NorthPilot client #2 and #3", desc: "Repeatability = real business", who: "piyush", points: 250, category: "income", est: "ongoing" },
  // Phase 4 — Scale
  { id: "p4-1", track: "piyush", phase: 4, title: "Sign one fractional/retainer client", desc: "Recurring monthly income — the goal", who: "piyush", points: 350, category: "income", est: "ongoing" },
  { id: "p4-2", track: "piyush", phase: 4, title: "Launch + sell BB Nail Extensions course", desc: "Razorpay checkout, first batch", who: "both", points: 300, category: "growth", est: "varies" },
  { id: "p4-3", track: "piyush", phase: 4, title: "Hit ₹50K combined side income in a month", desc: "Halfway to the ₹2.6L household target", who: "piyush", points: 300, category: "income", est: "milestone" },
  { id: "p4-4", track: "piyush", phase: 4, title: "Automate weekly reporting fully", desc: "Both businesses report themselves Monday 9am", who: "piyush", points: 100, category: "setup", est: "done-ish" },
  { id: "p4-5", track: "piyush", phase: 4, title: "Run 3 BB ad creatives at once", desc: "Find the winner, kill the rest", who: "piyush", points: 150, category: "ads", est: "ongoing" },
];

// Server-logged completions (updated by Piyush/Claude as work ships).
// The dashboard marks these done by default; users can still toggle their own.
const COMPLETED: string[] = [
  "p1-1", // Google Apps Script webhook deployed
  "p1-2", // Dashboard + site live on Vercel
];

export async function GET() {
  return NextResponse.json({ phases: PHASES, quests: QUESTS, completed: COMPLETED });
}
