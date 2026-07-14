import { NextRequest, NextResponse } from "next/server";

// Receives leads from Meta Lead Gen Forms (via Meta webhook subscription)
// Meta sends a GET for verification and POST with actual leads

const VERIFY_TOKEN = process.env.META_WEBHOOK_VERIFY_TOKEN ?? "bb_webhook_2026";
const SHEET_API    = process.env.GSHEET_API_URL ?? "";
const CALLMEBOT_PHONE = process.env.CALLMEBOT_URVASHI_PHONE ?? "";
const CALLMEBOT_KEY   = process.env.CALLMEBOT_KEY ?? "";

// Meta webhook verification (GET)
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  if (
    params.get("hub.mode") === "subscribe" &&
    params.get("hub.verify_token") === VERIFY_TOKEN
  ) {
    return new Response(params.get("hub.challenge") ?? "OK", { status: 200 });
  }
  return NextResponse.json({ error: "Verification failed" }, { status: 403 });
}

// Lead received (POST)
export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: true }); } // always 200 to Meta

  const data = body as Record<string, unknown>;
  const entries = (data.entry as Record<string, unknown>[]) ?? [];

  for (const entry of entries) {
    const changes = (entry.changes as Record<string, unknown>[]) ?? [];
    for (const change of changes) {
      if (change.field !== "leadgen") continue;
      const val = change.value as Record<string, unknown>;
      const formData = (val.field_data as { name: string; values: string[] }[]) ?? [];

      const get = (key: string) => formData.find(f => f.name === key)?.values?.[0] ?? "";
      const name   = get("full_name") || get("first_name") || "Meta Lead";
      const phone  = get("phone_number") || get("phone") || "";
      const course = get("course") || val.form_name as string || "Meta Lead Gen Ad";

      const payload = { name, phone, course, source: "meta-lead-gen-ad", timestamp: new Date().toISOString() };

      // Log to Google Sheet
      if (SHEET_API) {
        fetch(SHEET_API, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }).catch(() => {});
      }

      // WhatsApp alert to Urvashi
      if (CALLMEBOT_PHONE && CALLMEBOT_KEY) {
        const msg = encodeURIComponent(`🎯 New Meta Ad Lead!\nName: ${name}\nPhone: ${phone}\nInterest: ${course}\n\nCall them back within 1 hour 📞`);
        fetch(`https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${msg}&apikey=${CALLMEBOT_KEY}`).catch(() => {});
      }
    }
  }

  return NextResponse.json({ ok: true }); // Meta requires 200 immediately
}
