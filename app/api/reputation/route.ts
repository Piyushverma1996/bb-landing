import { NextResponse } from "next/server";

// Reputation & online-presence audit aggregator
// Pulls Google Business reviews + checks presence across key platforms.
// Where an API isn't configured, returns the manual-audit checklist item instead.

const GOOGLE_PLACES_KEY = process.env.GOOGLE_PLACES_API_KEY ?? "";
const GOOGLE_PLACE_ID   = process.env.GOOGLE_PLACE_ID ?? "";   // BB's Google Business place_id
const IG_TOKEN          = process.env.META_ACCESS_TOKEN ?? "";
const IG_ID_BB          = process.env.META_IG_ID_BB ?? "";

interface PlatformPresence {
  platform: string;
  status: "strong" | "weak" | "missing" | "unknown";
  detail: string;
  action: string;
}

async function fetchGoogleReviews() {
  if (!GOOGLE_PLACES_KEY || !GOOGLE_PLACE_ID) {
    return { rating: 4.8, total: 67, recent: [], configured: false };
  }
  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=rating,user_ratings_total,reviews&key=${GOOGLE_PLACES_KEY}`;
    const res = await fetch(url, { next: { revalidate: 21600 } });
    const d = await res.json();
    const r = d.result ?? {};
    return {
      rating: r.rating ?? 0,
      total: r.user_ratings_total ?? 0,
      recent: (r.reviews ?? []).slice(0, 5).map((rev: { author_name: string; rating: number; text: string; relative_time_description: string }) => ({
        author: rev.author_name, rating: rev.rating, text: rev.text, when: rev.relative_time_description,
      })),
      configured: true,
    };
  } catch {
    return { rating: 4.8, total: 67, recent: [], configured: false };
  }
}

async function fetchIGProfile() {
  if (!IG_TOKEN || !IG_ID_BB) return { followers: 280, posts: 0, configured: false };
  try {
    const url = `https://graph.facebook.com/v21.0/${IG_ID_BB}?fields=followers_count,media_count&access_token=${IG_TOKEN}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const d = await res.json();
    return { followers: d.followers_count ?? 0, posts: d.media_count ?? 0, configured: true };
  } catch {
    return { followers: 280, posts: 0, configured: false };
  }
}

// Reputation health score (0-100)
function computeScore(google: { rating: number; total: number }, ig: { followers: number; posts: number }, presence: PlatformPresence[]) {
  let score = 0;
  // Google: rating quality (25) + review volume (15)
  score += Math.min((google.rating / 5) * 25, 25);
  score += Math.min((google.total / 150) * 15, 15);
  // Instagram: followers (15) + posting activity (10)
  score += Math.min((ig.followers / 2000) * 15, 15);
  score += Math.min((ig.posts / 100) * 10, 10);
  // Platform coverage (30)
  const strong = presence.filter(p => p.status === "strong").length;
  score += Math.min((strong / presence.length) * 30, 30);
  return Math.round(score);
}

export async function GET() {
  const [google, ig] = await Promise.all([fetchGoogleReviews(), fetchIGProfile()]);

  // Platform presence map — what BB needs to dominate locally + build authority
  const presence: PlatformPresence[] = [
    { platform: "Google Business Profile", status: google.total > 50 ? "strong" : "weak", detail: `${google.rating}★ · ${google.total} reviews`, action: google.total < 100 ? "Push to 100+ reviews — ask every happy client" : "Maintain — reply to all reviews within 24h" },
    { platform: "Instagram (@blushesandbrushes2022)", status: ig.followers > 1000 ? "strong" : "weak", detail: `${ig.followers} followers · ${ig.posts} posts`, action: "Post 4x/week, run Reels, use local hashtags #rameshnagar #westdelhimakeup" },
    { platform: "Instagram (@makeovers_by_urvashitrehan_)", status: "weak", detail: "Makeup artist profile", action: "Cross-promote with main page, tag location on every bridal post" },
    { platform: "Justdial", status: "strong", detail: "Listed · opp Subway, Ramesh Nagar", action: "Add photos monthly, respond to every enquiry, get JD Verified badge" },
    { platform: "Sulekha", status: "unknown", detail: "Beauty parlour directory", action: "Claim/create listing — high local intent traffic" },
    { platform: "UrbanCompany / nearby", status: "missing", detail: "Premium service marketplace", action: "Apply as bridal artist — high-ticket inbound" },
    { platform: "WeddingWire / WedMeGood", status: "missing", detail: "Bridal portals — high LTV", action: "Create vendor profile — bridal makeup leads worth ₹15-25K each" },
    { platform: "Google Maps photos", status: "weak", detail: "Visual proof for walk-ins", action: "Upload 20+ work photos geotagged to studio" },
    { platform: "Blogs / editorial", status: "missing", detail: "Authority + backlinks + story", action: "Get featured — see Organic Growth plan" },
    { platform: "YouTube", status: "missing", detail: "Tutorial SEO — long-tail discovery", action: "Repurpose Reels as Shorts, full tutorials for course funnel" },
  ];

  const score = computeScore(google, ig, presence);

  // Prioritized reputation actions this week
  const priorityActions = [
    { title: "Reply to every Google review", impact: "high", effort: "low", why: "Signals active business to Google ranking algorithm" },
    { title: "Get 5 new Google reviews", impact: "high", effort: "low", why: "Volume gap vs target (100+). Ask happy clients with a QR code" },
    { title: "Create WedMeGood vendor profile", impact: "high", effort: "medium", why: "Bridal leads worth ₹15-25K each, premium intent" },
    { title: "Upload 20 geotagged photos to Google Maps", impact: "medium", effort: "low", why: "Walk-in conversion — people judge salons by photos" },
    { title: "Claim Sulekha + UrbanCompany listings", impact: "medium", effort: "medium", why: "Local high-intent search traffic" },
  ];

  return NextResponse.json({
    score,
    grade: score >= 75 ? "Strong" : score >= 50 ? "Growing" : score >= 30 ? "Emerging" : "Needs Work",
    google,
    instagram: ig,
    presence,
    priorityActions,
    configured: { google: google.configured, instagram: ig.configured },
  });
}
