import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, mkdirSync } from "fs";
import { join } from "path";

// Lead intake: saves locally -> WhatsApp alert to Urvashi -> Google Sheet.
// WhatsApp supports TWO providers so it keeps working if one is down:
//   1. CallMeBot  (free, 2-min setup, no approval) - set CALLMEBOT_* env vars
//   2. WhatsApp Cloud API (Meta, official) - set WHATSAPP_* env vars
// If both are configured, both fire. If neither is, the lead still saves.
const WEBHOOK_URL = process.env.WEBHOOK_URL ?? "";

// Provider 1 - CallMeBot
const CALLMEBOT_URVASHI_PHONE = process.env.CALLMEBOT_URVASHI_PHONE ?? "";
const CALLMEBOT_KEY = process.env.CALLMEBOT_KEY ?? "";
// Optional second recipient (Piyush) so leads are never missed
const CALLMEBOT_PHONE = process.env.CALLMEBOT_PHONE ?? "";
const CALLMEBOT_KEY_2 = process.env.CALLMEBOT_KEY_2 ?? "";

// Provider 2 - WhatsApp Cloud API (Meta)
const WA_TOKEN = process.env.WHATSAPP_TOKEN ?? "";
const WA_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID ?? "";
const WA_TO = process.env.WHATSAPP_TO ?? ""; // e.g. 917678446364
const WA_TEMPLATE = process.env.WHATSAPP_TEMPLATE ?? ""; // approved template name
// Locale must match the template exactly: "English" = en, "English (US)" = en_US.
const WA_LANG = process.env.WHATSAPP_TEMPLATE_LANG ?? "en";
// Graph API version. v21.0 is near sunset; override here if Meta moves on.
const WA_VER = process.env.WHATSAPP_API_VERSION ?? "v25.0";

interface LeadPayload {
  name: string;
  phone: string;
  course: string;
  notes: string;
  source: string;
  timestamp: string;
}

function saveLocally(payload: LeadPayload) {
  try {
    const dir = join(process.cwd(), ".lead-backup");
    mkdirSync(dir, { recursive: true });
    appendFileSync(join(dir, "leads.ndjson"), JSON.stringify(payload) + "\n", "utf8");
  } catch { /* non-critical - best effort */ }
}

const istTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
  });

/** Human-readable alert. Includes a wa.me deep link so Urvashi replies in one tap. */
function buildMessage(p: LeadPayload) {
  const when = istTime(p.timestamp);
  const reply = `https://wa.me/91${p.phone}?text=${encodeURIComponent(
    `Hi ${p.name}! This is Urvashi from Blushes & Brushes. Thank you for your enquiry about ${p.course} - I'd love to help. Could you share your event date?`
  )}`;
  return [
    "NEW LEAD - Blushes & Brushes",
    "",
    `Name: ${p.name}`,
    `Phone: +91 ${p.phone}`,
    `Service: ${p.course}`,
    p.notes ? `Notes: ${p.notes}` : "",
    `Source: ${p.source}`,
    `Time: ${when}`,
    "",
    "Reply to her now:",
    reply,
  ].filter(Boolean).join("\n");
}

async function sendCallMeBot(phone: string, key: string, text: string) {
  if (!phone || !key) return false;
  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(key)}`;
    const r = await fetch(url, { signal: AbortSignal.timeout(8000) });
    return r.ok;
  } catch { return false; }
}

// Meta rejects template parameters containing newlines, tabs or 4+ consecutive
// spaces (error 132000). So each field goes in its own {{n}} and gets flattened.
const cleanParam = (s: string) => s.replace(/\s+/g, " ").trim().slice(0, 900) || "-";

async function postCloudApi(body: unknown) {
  const r = await fetch(`https://graph.facebook.com/${WA_VER}/${WA_PHONE_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${WA_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });
  if (r.ok) return { ok: true, err: "" };
  const err = await r.text().catch(() => "");
  return { ok: false, err };
}

async function sendCloudApi(p: LeadPayload, when: string) {
  if (!WA_TOKEN || !WA_PHONE_ID || !WA_TO) return false;

  // No template configured -> plain text. Only delivers inside the 24h
  // customer-service window, so it is a fallback, not the main path.
  if (!WA_TEMPLATE) {
    const { ok, err } = await postCloudApi({
      messaging_product: "whatsapp", to: WA_TO, type: "text", text: { body: buildMessage(p) },
    }).catch(() => ({ ok: false, err: "network error" }));
    if (!ok) console.error("WhatsApp Cloud API (text) failed:", err);
    return ok;
  }

  const bodyComponent = {
    type: "body",
    parameters: [p.name, `+91 ${p.phone}`, p.course, p.notes || "Not specified", `${p.source} | ${when}`]
      .map((v) => ({ type: "text", text: cleanParam(v) })),
  };
  // Dynamic URL button -> https://wa.me/91XXXXXXXXXX, one tap to reply.
  const buttonComponent = {
    type: "button", sub_type: "url", index: "0",
    parameters: [{ type: "text", text: `91${p.phone}` }],
  };
  const send = (components: unknown[]) =>
    postCloudApi({
      messaging_product: "whatsapp", to: WA_TO, type: "template",
      template: { name: WA_TEMPLATE, language: { code: WA_LANG }, components },
    });

  try {
    let res = await send([bodyComponent, buttonComponent]);
    // If the approved template has no URL button, Meta rejects the button
    // component. Retry body-only rather than losing the alert.
    if (!res.ok && /button/i.test(res.err)) res = await send([bodyComponent]);
    if (!res.ok) console.error("WhatsApp Cloud API (template) failed:", res.err);
    return res.ok;
  } catch (err) {
    console.error("WhatsApp Cloud API error:", err);
    return false;
  }
}

/** Fire every configured WhatsApp channel. Never throws - a failed alert must not lose the lead. */
async function notifyWhatsApp(p: LeadPayload) {
  const text = buildMessage(p);
  const results = await Promise.allSettled([
    sendCallMeBot(CALLMEBOT_URVASHI_PHONE, CALLMEBOT_KEY, text),            // Urvashi
    sendCallMeBot(CALLMEBOT_PHONE, CALLMEBOT_KEY_2 || CALLMEBOT_KEY, text), // Piyush (optional)
    sendCloudApi(p, istTime(p.timestamp)),
  ]);
  const sent = results.filter((r) => r.status === "fulfilled" && r.value).length;
  if (sent === 0) console.warn("Lead saved but NO WhatsApp channel is configured/working.");
  return sent;
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, phone, course, notes, source } = body as Record<string, string>;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Full name is required" }, { status: 422 });
  }
  if (!/^\d{10}$/.test(phone?.trim() ?? "")) {
    return NextResponse.json({ error: "A valid 10-digit WhatsApp number is required" }, { status: 422 });
  }

  const payload: LeadPayload = {
    name: name.trim(),
    phone: phone.trim(),
    // Service is optional - "Not sure yet" is a valid, high-intent answer
    course: course?.trim() || "Free consultation (service not specified)",
    notes: notes?.trim() ?? "",
    // Preserve the real source the form sent (premium-home-consult, book-now-instagram, book-now-gbp...)
    source: source?.trim() || "website",
    timestamp: new Date().toISOString(),
  };

  // 1. Local backup first - zero lead loss even if everything downstream fails
  saveLocally(payload);

  // 2. WhatsApp alert (awaited so serverless doesn't kill it mid-flight)
  const notified = await notifyWhatsApp(payload);

  // 3. Google Sheet
  if (WEBHOOK_URL && !WEBHOOK_URL.includes("your-webhook-url")) {
    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });
      if (!res.ok) console.error("Sheet webhook responded", res.status);
    } catch (err) {
      console.error("Sheet webhook failed (lead saved locally):", err);
    }
  }

  return NextResponse.json({ ok: true, notified }, { status: 200 });
}
