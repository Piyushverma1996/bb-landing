import { NextResponse } from "next/server";
import crypto from "crypto";
import { processLead, type LeadPayload } from "../lead/pipeline";

// Meta Lead Ads (Instant Forms) webhook.
// Instagram/Facebook ad -> native in-app form -> Meta calls this -> we fetch the
// answers from the Graph API and push them through the same pipeline as a
// website lead (backup -> WhatsApp alert -> Google Sheet).
//
// Required env:
//   META_VERIFY_TOKEN  - any string you choose; must match the value typed into
//                        the Meta webhook setup screen
//   META_APP_SECRET    - App settings -> Basic -> App secret (verifies each call
//                        genuinely came from Meta)
//   META_LEADS_TOKEN   - a Page access token (or System User token with the Page
//                        assigned) carrying leads_retrieval
const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN ?? "";
const APP_SECRET = process.env.META_APP_SECRET ?? "";
const LEADS_TOKEN = process.env.META_LEADS_TOKEN ?? process.env.WHATSAPP_TOKEN ?? "";
const VER = process.env.WHATSAPP_API_VERSION ?? "v25.0";

/** Meta's subscription handshake: echo hub.challenge when the token matches. */
export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  if (q.get("hub.mode") === "subscribe" && q.get("hub.verify_token") === VERIFY_TOKEN && VERIFY_TOKEN) {
    return new NextResponse(q.get("hub.challenge") ?? "", {
      status: 200, headers: { "Content-Type": "text/plain" },
    });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

/** Constant-time check that the payload was signed with our app secret. */
function signatureValid(raw: string, header: string | null) {
  if (!APP_SECRET || !header?.startsWith("sha256=")) return false;
  const expected = crypto.createHmac("sha256", APP_SECRET).update(raw, "utf8").digest("hex");
  const got = header.slice("sha256=".length);
  if (got.length !== expected.length) return false;
  return crypto.timingSafeEqual(Buffer.from(got, "hex"), Buffer.from(expected, "hex"));
}

/** Indian mobile as 10 digits, stripping +91 / 0 / spaces / dashes. */
function normalisePhone(raw: string) {
  const digits = (raw || "").replace(/\D/g, "");
  return digits.length > 10 ? digits.slice(-10) : digits;
}

const pick = (
  fields: { name: string; values: string[] }[],
  ...keys: string[]
) => {
  for (const k of keys) {
    const f = fields.find((x) => x.name?.toLowerCase().includes(k));
    if (f?.values?.length) return f.values.join(", ").trim();
  }
  return "";
};

/** Fetch the submitted answers for one leadgen_id. */
async function fetchLead(leadgenId: string): Promise<LeadPayload | null> {
  const r = await fetch(
    `https://graph.facebook.com/${VER}/${leadgenId}?fields=field_data,created_time,ad_name,campaign_name,form_name,platform`,
    { headers: { Authorization: `Bearer ${LEADS_TOKEN}` }, signal: AbortSignal.timeout(10000) }
  );
  if (!r.ok) {
    console.error("Meta lead fetch failed:", r.status, (await r.text()).slice(0, 300));
    return null;
  }
  const d = await r.json();
  const fields: { name: string; values: string[] }[] = d.field_data ?? [];

  const full = pick(fields, "full_name", "name");
  const first = pick(fields, "first_name");
  const last = pick(fields, "last_name");
  const name = full || [first, last].filter(Boolean).join(" ") || "Instagram lead";
  const phone = normalisePhone(pick(fields, "phone", "mobile", "whatsapp"));
  if (!/^\d{10}$/.test(phone)) {
    console.error("Meta lead has no usable 10-digit phone; skipping:", JSON.stringify(fields).slice(0, 300));
    return null;
  }

  // Anything the form asked beyond name/phone/service becomes the Details line.
  const known = ["name", "phone", "mobile", "whatsapp", "email", "service", "interested", "looking"];
  const extras = fields
    .filter((f) => !known.some((k) => f.name?.toLowerCase().includes(k)))
    .map((f) => `${f.name.replace(/_/g, " ")}: ${f.values.join(", ")}`)
    .join(" | ");
  const email = pick(fields, "email");

  return {
    name,
    phone,
    course: pick(fields, "service", "interested", "looking") || "Instagram enquiry (service not specified)",
    notes: [extras, email && `Email: ${email}`].filter(Boolean).join(" | "),
    source: ["instagram-ad", d.platform, d.campaign_name || d.ad_name, d.form_name].filter(Boolean).join(" | "),
    timestamp: d.created_time ?? new Date().toISOString(),
  };
}

// Meta retries on any non-200, which would duplicate alerts. Remember recent
// ids for the life of the warm instance to absorb the common repeat.
const seen = new Set<string>();

export async function POST(req: Request) {
  const raw = await req.text();
  if (!signatureValid(raw, req.headers.get("x-hub-signature-256"))) {
    console.warn("Meta webhook: bad or missing signature");
    return new NextResponse("Forbidden", { status: 403 });
  }

  let body: {
    entry?: { changes?: { field?: string; value?: { leadgen_id?: string } }[] }[];
  };
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: true });
  }

  const ids = (body.entry ?? [])
    .flatMap((e) => e.changes ?? [])
    .filter((c) => c.field === "leadgen" && c.value?.leadgen_id)
    .map((c) => c.value!.leadgen_id!);

  let handled = 0;
  for (const id of ids) {
    if (seen.has(id)) continue;
    seen.add(id);
    try {
      const lead = await fetchLead(id);
      if (lead) {
        await processLead(lead);
        handled++;
      }
    } catch (err) {
      console.error("Meta lead processing error:", err);
    }
  }

  // Always 200: a non-200 makes Meta retry the same lead repeatedly, and the
  // lead is already saved locally by this point.
  return NextResponse.json({ ok: true, handled });
}
