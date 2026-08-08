import { NextResponse } from "next/server";

// Recent posts from Urvashi's own Instagram Business account, via the official
// Graph API. Deliberately not a scraper: scraping Instagram breaches their
// terms, gets blocked, and would break silently every few weeks.
//
// Env:
//   IG_USER_ID - Instagram Business account id (not the @handle)
//   IG_TOKEN   - long-lived access token with instagram_basic
//                (falls back to WHATSAPP_TOKEN if that system user has IG assigned)
//
// Cached for an hour: a new post appears on the site within the hour with no
// deploy, which is the point.
const IG_USER_ID = process.env.IG_USER_ID ?? "";
const IG_TOKEN = process.env.IG_TOKEN ?? process.env.WHATSAPP_TOKEN ?? "";
const VER = process.env.WHATSAPP_API_VERSION ?? "v25.0";

export const revalidate = 3600;

type Media = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
};

export async function GET() {
  if (!IG_USER_ID || !IG_TOKEN) {
    return NextResponse.json({
      configured: false,
      reason: "Set IG_USER_ID and IG_TOKEN to show live posts",
      posts: [],
    });
  }

  try {
    const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
    const r = await fetch(
      `https://graph.facebook.com/${VER}/${IG_USER_ID}/media?fields=${fields}&limit=12&access_token=${encodeURIComponent(IG_TOKEN)}`,
      { next: { revalidate: 3600 }, signal: AbortSignal.timeout(10000) }
    );
    if (!r.ok) {
      const detail = (await r.text()).slice(0, 300);
      console.error("Instagram fetch failed:", r.status, detail);
      return NextResponse.json({ configured: true, ok: false, reason: detail, posts: [] });
    }
    const d = await r.json();
    const posts = ((d.data ?? []) as Media[])
      // Videos expose a thumbnail rather than an image; skip anything with neither.
      .map((m) => ({
        id: m.id,
        img: m.media_type === "VIDEO" ? m.thumbnail_url : m.media_url,
        permalink: m.permalink,
        isVideo: m.media_type === "VIDEO",
        caption: (m.caption ?? "").split("\n")[0].slice(0, 90),
      }))
      .filter((m) => m.img)
      .slice(0, 8);

    return NextResponse.json({ configured: true, ok: true, count: posts.length, posts });
  } catch (err) {
    console.error("Instagram error:", err);
    return NextResponse.json({ configured: true, ok: false, reason: String(err), posts: [] });
  }
}
