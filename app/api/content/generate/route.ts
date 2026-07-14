import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY ?? "" });

const SYSTEM = `You are the creative director for Blushes & Brushes, a premium beauty salon in Ramesh Nagar, West Delhi (opposite Subway, PIN 110015) run by Urvashi Trehan.

Services:
- Nail extensions, nail art, gel nails (at studio — Ramesh Nagar)
- Bridal makeup, party makeup (Urvashi travels to client)
- Beauty courses: Makeup ₹20,000 | Nail Extensions ₹20,000 | Beauty Master ₹20,000

INSTAGRAM ROUTING (important):
- @makeovers_by_urvashitrehan_ → ALL MAKEUP content (bridal, party, engagement, reception). This is Urvashi's artist brand.
- @blushesandbrushes2022 → ALL NAILS + BEAUTY content (nail extensions, nail art, facials, waxing, salon services, courses).
Always reference the correct handle in the caption based on the content type.
Phone: 76784 46364 | Studio: B1/1 opp Subway, Ramesh Nagar, Delhi 110015

Brand: Premium but approachable. Delhi-warm. Occasionally Hindi words (yaar, bilkul, kya baat hai). NOT luxury-cold.
Target audience: Women 20–40, West Delhi / NCR, aspirational, value-conscious but want the best.`;

// Route content type → correct Instagram handle
function igHandle(type: string) {
  const t = type.toLowerCase();
  if (t.includes("makeup") || t.includes("bridal") || t.includes("party") || t.includes("engagement") || t.includes("reception")) {
    return "@makeovers_by_urvashitrehan_";
  }
  return "@blushesandbrushes2022"; // nails, beauty, courses, salon
}

// Video script generator — Square Salon style
async function generateVideoScript(type: string, look: string) {
  const msg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 600,
    system: SYSTEM,
    messages: [{
      role: "user",
      content: `Generate a complete 40-second Instagram Reel / Facebook Ad video script for: ${type} — ${look}.
This content goes on ${igHandle(type)} (route makeup→@makeovers, nails/beauty→@blushes).

Output EXACTLY this JSON structure:
{
  "hook_text": "3-5 word question or statement for dark opening frame (e.g. WHAT MAKES A BRIDE GLOW?)",
  "hook_sub": "optional script/handwriting font accent word (e.g. perfectly?)",
  "overlay_1": "bold caps text for clip 1 (e.g. THE RIGHT ARTIST.)",
  "overlay_2": "bold caps text for clip 2 (e.g. BRIDAL MAKEUP)",
  "overlay_3": "bold caps text for clip 3 (e.g. YOUR BEST LOOK YET)",
  "end_card_line1": "service name for end card (e.g. BRIDAL MAKEUP)",
  "end_card_line2": "brand line (e.g. at Blushes & Brushes)",
  "end_card_cta": "bottom CTA text (e.g. Book via WhatsApp · 76784 46364)",
  "ad_headline": "Facebook ad headline under 40 chars",
  "ad_body": "Facebook ad body copy 2 sentences max",
  "whatsapp_opener": "First message Urvashi sends when lead replies on WhatsApp (warm, 1 sentence)",
  "instagram_caption": "Full Instagram caption with CTA and hashtags"
}`
    }]
  });

  const text = msg.content[0].type === "text" ? msg.content[0].text : "{}";
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  return jsonMatch ? JSON.parse(jsonMatch[0]) : {};
}

// Caption-only generator for weekly posting
async function generateCaption(day: string, focus: string) {
  const msg = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 400,
    system: SYSTEM,
    messages: [{
      role: "user",
      content: `Write a ${day} Instagram caption. Focus: ${focus}. Max 120 words. End with CTA: DM NAILS / DM MAKEUP / DM COURSE. Include hashtags.`
    }]
  });
  return msg.content[0].type === "text" ? msg.content[0].text : "";
}

const WEEKLY_POSTS = [
  { day: "Monday", focus: "Nail art showcase — aspirational close-up, desire-inducing" },
  { day: "Wednesday", focus: "Makeup transformation — before/after or tutorial-style" },
  { day: "Friday", focus: "Course or offer with urgency — seats filling, July batch" },
  { day: "Sunday", focus: "Behind the scenes — Urvashi's story, warm and personal" },
];

const VIDEO_TEMPLATES = [
  { type: "Bridal Makeup", look: "Full bridal look — lehenga, jewellery, traditional" },
  { type: "Party Makeup", look: "Evening glam — smoky eye, highlighted skin, modern" },
  { type: "Nail Extensions", look: "Long almond nails with nail art — ombre or chrome" },
  { type: "Nail Art", look: "Detailed nail art — florals, French tip with design" },
];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const mode = body.mode ?? "captions"; // "captions" | "video_scripts" | "single_video"

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({
      captions: ["Add ANTHROPIC_API_KEY to .env.local to enable AI content generation."],
      video_scripts: [],
    });
  }

  try {
    if (mode === "single_video") {
      const script = await generateVideoScript(body.type ?? "Bridal Makeup", body.look ?? "");
      return NextResponse.json({ script });
    }

    if (mode === "video_scripts") {
      const scripts = await Promise.all(
        VIDEO_TEMPLATES.map(t => generateVideoScript(t.type, t.look).then(s => ({ ...s, type: t.type })))
      );
      return NextResponse.json({ video_scripts: scripts });
    }

    // Default: weekly captions
    const captions: string[] = [];
    for (const post of WEEKLY_POSTS) {
      const cap = await generateCaption(post.day, post.focus);
      captions.push(`📅 ${post.day}\n\n${cap}`);
    }
    return NextResponse.json({ captions });

  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
