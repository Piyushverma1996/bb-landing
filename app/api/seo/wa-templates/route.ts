import { NextResponse } from "next/server";

// TEMPORARY diagnostic: lists template names, locales and approval status for
// the WABA so we can match WHATSAPP_TEMPLATE / WHATSAPP_TEMPLATE_LANG exactly.
// Returns metadata only - never the token. Delete once the alert is working.
const WABA = process.env.WHATSAPP_WABA_ID ?? "2539083589857574";
const TOKEN = process.env.WHATSAPP_TOKEN ?? "";
const VER = process.env.WHATSAPP_API_VERSION ?? "v25.0";

export async function GET() {
  if (!TOKEN) return NextResponse.json({ error: "WHATSAPP_TOKEN not set" }, { status: 400 });
  const r = await fetch(
    `https://graph.facebook.com/${VER}/${WABA}/message_templates?fields=name,language,status,category&limit=50`,
    { headers: { Authorization: `Bearer ${TOKEN}` }, signal: AbortSignal.timeout(10000) }
  );
  const text = await r.text();
  if (!r.ok) return NextResponse.json({ ok: false, status: r.status, error: text.slice(0, 500) });
  const d = JSON.parse(text);
  return NextResponse.json({
    ok: true,
    templates: (d.data ?? []).map((t: { name: string; language: string; status: string; category: string }) => ({
      name: t.name, language: t.language, status: t.status, category: t.category,
    })),
  });
}
