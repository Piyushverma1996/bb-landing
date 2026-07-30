import { appendFileSync, mkdirSync } from "fs";
import { join } from "path";

// Shared lead pipeline: local backup -> WhatsApp alert -> Google Sheet.
// Used by the website form (/api/lead) and Meta Instant Forms (/api/meta-leads)
// so an Instagram lead is handled identically to a website one.

const WEBHOOK_URL = process.env.WEBHOOK_URL ?? "";

// Provider 1 - CallMeBot
const CALLMEBOT_URVASHI_PHONE = process.env.CALLMEBOT_URVASHI_PHONE ?? "";
const CALLMEBOT_KEY = process.env.CALLMEBOT_KEY ?? "";
const CALLMEBOT_PHONE = process.env.CALLMEBOT_PHONE ?? "";
const CALLMEBOT_KEY_2 = process.env.CALLMEBOT_KEY_2 ?? "";

// Provider 2 - WhatsApp Cloud API (Meta)
const WA_TOKEN = process.env.WHATSAPP_TOKEN ?? "";
const WA_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID ?? "";
const WA_TO = process.env.WHATSAPP_TO ?? "";
const WA_TEMPLATE = process.env.WHATSAPP_TEMPLATE ?? "";
const WA_LANG = process.env.WHATSAPP_TEMPLATE_LANG ?? "en";
const WA_VER = process.env.WHATSAPP_API_VERSION ?? "v25.0";

export interface LeadPayload {
  name: string;
  phone: string;
  course: string;
  notes: string;
  source: string;
  timestamp: string;
}

export const istTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit",
  });

export function saveLocally(payload: LeadPayload) {
  try {
    const dir = join(process.cwd(), ".lead-backup");
    mkdirSync(dir, { recursive: true });
    appendFileSync(join(dir, "leads.ndjson"), JSON.stringify(payload) + "\n", "utf8");
  } catch { /* non-critical - best effort */ }
}

/** Human-readable alert. Includes a wa.me deep link so Urvashi replies in one tap. */
export function buildMessage(p: LeadPayload) {
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
    `Time: ${istTime(p.timestamp)}`,
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
// spaces (error 132000), so each field is its own {{n}} and gets flattened.
const cleanParam = (s: string) => s.replace(/\s+/g, " ").trim().slice(0, 900) || "-";

async function postCloudApi(body: unknown) {
  const r = await fetch(`https://graph.facebook.com/${WA_VER}/${WA_PHONE_ID}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${WA_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(8000),
  });
  if (r.ok) return { ok: true, err: "" };
  return { ok: false, err: await r.text().catch(() => "") };
}

async function sendCloudApi(p: LeadPayload) {
  if (!WA_TOKEN || !WA_PHONE_ID || !WA_TO) return false;

  if (!WA_TEMPLATE) {
    const res = await postCloudApi({
      messaging_product: "whatsapp", to: WA_TO, type: "text", text: { body: buildMessage(p) },
    }).catch(() => ({ ok: false, err: "network error" }));
    if (!res.ok) console.error("WhatsApp Cloud API (text) failed:", res.err);
    return res.ok;
  }

  const bodyComponent = {
    type: "body",
    parameters: [p.name, `+91 ${p.phone}`, p.course, p.notes || "Not specified", `${p.source} | ${istTime(p.timestamp)}`]
      .map((v) => ({ type: "text", text: cleanParam(v) })),
  };
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
    if (!res.ok && /button/i.test(res.err)) res = await send([bodyComponent]);
    if (!res.ok) console.error("WhatsApp Cloud API (template) failed:", res.err);
    return res.ok;
  } catch (err) {
    console.error("WhatsApp Cloud API error:", err);
    return false;
  }
}

/** Fire every configured WhatsApp channel. Never throws - a failed alert must not lose the lead. */
export async function notifyWhatsApp(p: LeadPayload) {
  const text = buildMessage(p);
  const results = await Promise.allSettled([
    sendCallMeBot(CALLMEBOT_URVASHI_PHONE, CALLMEBOT_KEY, text),
    sendCallMeBot(CALLMEBOT_PHONE, CALLMEBOT_KEY_2 || CALLMEBOT_KEY, text),
    sendCloudApi(p),
  ]);
  const sent = results.filter((r) => r.status === "fulfilled" && r.value).length;
  if (sent === 0) console.warn("Lead saved but NO WhatsApp channel is configured/working.");
  return sent;
}

export async function sendToSheet(payload: LeadPayload) {
  if (!WEBHOOK_URL || WEBHOOK_URL.includes("your-webhook-url")) return false;
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) console.error("Sheet webhook responded", res.status);
    return res.ok;
  } catch (err) {
    console.error("Sheet webhook failed (lead saved locally):", err);
    return false;
  }
}

/** Backup -> WhatsApp -> Sheet. Returns how many WhatsApp channels fired. */
export async function processLead(payload: LeadPayload) {
  saveLocally(payload);
  const notified = await notifyWhatsApp(payload);
  await sendToSheet(payload);
  return notified;
}
