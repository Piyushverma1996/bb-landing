import { NextRequest, NextResponse } from "next/server";

// ManyChat sends a webhook here when someone DMs a keyword (NAILS / MAKEUP / COURSE)
// This logs the lead to the same Google Sheet as the landing page form

const SHEET_API = process.env.GSHEET_API_URL ?? "";

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const d = body as Record<string, unknown>;

  // ManyChat sends subscriber info + last keyword
  const name   = (d.first_name ?? d.name ?? "Unknown") as string;
  const phone  = (d.phone ?? d.whatsapp_phone ?? "") as string;
  const keyword = (d.last_keyword ?? d.keyword ?? d.tag ?? "Instagram DM") as string;

  // Map keyword → course interest
  const courseMap: Record<string, string> = {
    NAILS: "Nail Extensions",
    NAIL: "Nail Extensions",
    MAKEUP: "Makeup",
    COURSE: "General Course Inquiry",
    BRIDAL: "Bridal Makeup",
  };
  const course = courseMap[(keyword as string).toUpperCase()] ?? keyword;

  const payload = {
    name,
    phone,
    course,
    source: "instagram-dm",
    timestamp: new Date().toISOString(),
  };

  if (SHEET_API) {
    try {
      await fetch(SHEET_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch { /* sheet failure doesn't block response to ManyChat */ }
  }

  // Return ManyChat-compatible response (it expects an action or message object)
  return NextResponse.json({
    version: "v2",
    content: {
      type: "text",
      text: "Thanks! We've logged your interest. Urvashi will reach out to you shortly 🌸",
    },
  });
}
