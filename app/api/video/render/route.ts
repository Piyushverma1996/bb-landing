import { NextRequest, NextResponse } from "next/server";

// Shotstack API — automated video rendering
// Docs: https://shotstack.io/docs/api/
// Plan: $39/month Indie (1,000 renders). Cost: ~₹0.25 per 15-sec render.

const SHOTSTACK_KEY = process.env.SHOTSTACK_API_KEY ?? "";
const SHOTSTACK_ENV = process.env.SHOTSTACK_ENV ?? "stage"; // "stage" for testing, "production" for live
const SHOTSTACK_BASE = `https://api.shotstack.io/${SHOTSTACK_ENV}/render`;

const BB_BRAND = {
  teal: "#1E4A3A",
  gold: "#C9A066",
  cream: "#F5EDD8",
  dark: "#12291F",
  font_bold: "Montserrat",      // Free Google Font — bold caps text overlays
  font_script: "Great Vibes",   // Free Google Font — handwriting accent
};

// Build a Shotstack render payload from script + video clips
function buildShotstackPayload(opts: {
  clips: { url: string; duration: number }[];
  script: {
    hook_text: string;
    hook_sub?: string;
    overlay_1: string;
    overlay_2: string;
    overlay_3: string;
    end_card_line1: string;
    end_card_line2: string;
    end_card_cta: string;
  };
  music_url?: string;
}) {
  const { clips, script, music_url } = opts;

  // Ensure we have enough clips (pad/loop if needed)
  const c = [...clips];
  while (c.length < 3) c.push(c[c.length - 1] ?? { url: "", duration: 5 });

  const timeline = {
    soundtrack: music_url ? {
      src: music_url,
      effect: "fadeOut",
      volume: 0.6,
    } : undefined,
    tracks: [
      // Track 0 — text overlays (top layer)
      {
        clips: [
          // Hook text — 0 to 4s
          {
            asset: {
              type: "html",
              html: `<p style="font-family:Montserrat;font-size:52px;font-weight:800;color:white;text-align:center;text-transform:uppercase;letter-spacing:3px;line-height:1.1;">${script.hook_text}</p>`,
              width: 720, height: 300,
            },
            start: 0.5, length: 3, position: "center",
            transition: { in: "fadeIn", out: "fadeOut" },
          },
          // Hook sub (script font)
          ...(script.hook_sub ? [{
            asset: {
              type: "html",
              html: `<p style="font-family:'Great Vibes';font-size:68px;color:${BB_BRAND.gold};text-align:center;">${script.hook_sub}</p>`,
              width: 720, height: 120,
            },
            start: 1.5, length: 2.5, position: "center", offset: { y: 0.12 },
            transition: { in: "fadeIn", out: "fadeOut" },
          }] : []),
          // Overlay 1 — 5 to 12s
          {
            asset: {
              type: "html",
              html: `<p style="font-family:Montserrat;font-size:56px;font-weight:800;color:white;text-transform:uppercase;letter-spacing:2px;">${script.overlay_1}</p>`,
              width: 720, height: 160,
            },
            start: 5, length: 6, position: "center",
            transition: { in: "slideUp", out: "fadeOut" },
          },
          // Overlay 2 — 12 to 22s
          {
            asset: {
              type: "html",
              html: `<p style="font-family:Montserrat;font-size:56px;font-weight:800;color:white;text-transform:uppercase;letter-spacing:2px;">${script.overlay_2}</p>`,
              width: 720, height: 160,
            },
            start: 12, length: 9, position: "center",
            transition: { in: "slideUp", out: "fadeOut" },
          },
          // Overlay 3 — 22 to 32s
          {
            asset: {
              type: "html",
              html: `<p style="font-family:Montserrat;font-size:56px;font-weight:800;color:white;text-transform:uppercase;letter-spacing:2px;">${script.overlay_3}</p>`,
              width: 720, height: 160,
            },
            start: 22, length: 9, position: "center",
            transition: { in: "slideUp", out: "fadeOut" },
          },
          // End card — 32 to 40s
          {
            asset: {
              type: "html",
              html: `
                <div style="text-align:center;padding:40px;">
                  <p style="font-family:Montserrat;font-size:46px;font-weight:800;color:white;text-transform:uppercase;letter-spacing:3px;margin:0;">${script.end_card_line1}</p>
                  <p style="font-family:'Great Vibes';font-size:64px;color:${BB_BRAND.gold};margin:8px 0;">${script.end_card_line2}</p>
                  <p style="font-family:Montserrat;font-size:22px;color:${BB_BRAND.cream};letter-spacing:1px;margin-top:16px;">${script.end_card_cta}</p>
                </div>`,
              width: 720, height: 400,
            },
            start: 32, length: 8, position: "center",
            transition: { in: "fadeIn" },
          },
          // Bottom ticker — full video
          {
            asset: {
              type: "html",
              html: `<p style="font-family:Montserrat;font-size:18px;color:${BB_BRAND.cream};background:${BB_BRAND.teal}CC;padding:8px 20px;letter-spacing:1px;">BOOK NOW · RAMESH NAGAR, WEST DELHI · 76784 46364</p>`,
              width: 720, height: 48,
            },
            start: 4, length: 36, position: "bottom",
          },
        ],
      },
      // Track 1 — end card dark overlay (behind text, over footage)
      {
        clips: [{
          asset: { type: "html", html: `<div style="background:${BB_BRAND.dark}CC;width:720px;height:1280px;"></div>`, width: 720, height: 1280 },
          start: 32, length: 8, position: "center",
        }],
      },
      // Track 2 — footage clips
      {
        clips: [
          // Hook dark bg
          {
            asset: { type: "html", html: `<div style="background:#1a1a1a;background-image:repeating-linear-gradient(45deg,#222 0px,#222 2px,transparent 2px,transparent 12px);width:720px;height:1280px;"></div>`, width: 720, height: 1280 },
            start: 0, length: 5,
          },
          // Clip 1
          { asset: { type: "video", src: c[0].url }, start: 5, length: Math.min(c[0].duration, 7), fit: "cover", scale: 1.05, filter: "contrast" },
          // Clip 2
          { asset: { type: "video", src: c[1].url }, start: 12, length: Math.min(c[1].duration, 10), fit: "cover", scale: 1.05, filter: "contrast" },
          // Clip 3
          { asset: { type: "video", src: c[2].url }, start: 22, length: Math.min(c[2].duration, 10), fit: "cover", scale: 1.05, filter: "contrast" },
        ],
      },
    ],
  };

  return {
    timeline,
    output: {
      format: "mp4",
      resolution: "hd",          // 1080p
      aspectRatio: "9:16",        // Vertical Reel
      fps: 30,
      quality: "high",
    },
  };
}

// POST /api/video/render
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));

  if (!SHOTSTACK_KEY) {
    return NextResponse.json({ error: "Add SHOTSTACK_API_KEY to .env.local. Sign up at shotstack.io — free stage environment available." }, { status: 400 });
  }

  const payload = buildShotstackPayload({
    clips: body.clips ?? [],
    script: body.script ?? {},
    music_url: body.music_url,
  });

  try {
    const res = await fetch(SHOTSTACK_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": SHOTSTACK_KEY },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    // Returns { response: { id, message, status } }
    return NextResponse.json({ render_id: data.response?.id, status: data.response?.status });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

// GET /api/video/render?id=RENDER_ID — poll render status
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  if (!SHOTSTACK_KEY) return NextResponse.json({ error: "Shotstack not configured" }, { status: 400 });

  const res = await fetch(`${SHOTSTACK_BASE}/${id}`, {
    headers: { "x-api-key": SHOTSTACK_KEY },
  });
  const data = await res.json();
  // data.response.status: "queued" | "fetching" | "rendering" | "saving" | "done" | "failed"
  return NextResponse.json({
    status: data.response?.status,
    url: data.response?.url,  // final MP4 URL when status === "done"
    duration: data.response?.data?.output?.duration,
  });
}
