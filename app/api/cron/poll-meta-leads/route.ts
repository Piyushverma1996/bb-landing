import { NextResponse } from "next/server";
import { processLead, type LeadPayload } from "../../lead/pipeline";

// Polling fallback for Meta Instant Forms.
//
// Why this exists: Page webhooks only deliver production data once the Meta app
// is PUBLISHED. Publishing needs business verification and App Review for
// leads_retrieval, which takes weeks. Polling the Graph API with a System User
// token that already owns the Page works today, so leads reach Urvashi from the
// first ad rather than after review.
//
// Runs every 15 minutes. Slower than a webhook, fast enough for a salon.
// If the webhook is later approved, both can run - `seen` de-duplication means
// a lead arriving twice is only processed once.
const TOKEN = process.env.META_LEADS_TOKEN ?? "";
const VER = process.env.WHATSAPP_API_VERSION ?? "v25.0";
const PAGE_ID = process.env.META_PAGE_ID ?? "744524935408492";

// Leads already pushed through the pipeline. In-memory, so a cold start could
// in principle re-send; the created_time window below bounds that damage.
const seen = new Set<string>();

const g = async (path: string, token = TOKEN) => {
  const r = await fetch(`https://graph.facebook.com/${VER}/${path}${path.includes("?") ? "&" : "?"}access_token=${encodeURIComponent(token)}`,
    { signal: AbortSignal.timeout(15000) });
  const d = await r.json();
  if (!r.ok) throw new Error(JSON.stringify(d).slice(0, 240));
  return d;
};

/** leadgen_forms and leads require a PAGE access token, not the System User
 *  token. /me/accounts returns one per Page, so exchange it rather than asking
 *  anyone to paste a second credential that would then need rotating too. */
async function pageToken(): Promise<{ token: string; id: string; name: string }> {
  const d = await g("me/accounts?fields=id,name,access_token&limit=25");
  const pages: { id: string; name: string; access_token?: string }[] = d.data ?? [];
  const match = pages.find((p) => p.id === PAGE_ID) ?? pages[0];
  if (!match?.access_token) throw new Error("No Page access token available - check the System User has the Page assigned");
  return { token: match.access_token, id: match.id, name: match.name };
}

const pick = (fields: { name: string; values: string[] }[], ...keys: string[]) => {
  for (const k of keys) {
    const f = fields.find((x) => x.name?.toLowerCase().includes(k));
    if (f?.values?.length) return f.values.join(", ").trim();
  }
  return "";
};

const normalisePhone = (raw: string) => {
  const d = (raw || "").replace(/\D/g, "");
  return d.length > 10 ? d.slice(-10) : d;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret") ?? req.headers.get("authorization")?.replace("Bearer ", "");

  // Two accepted credentials on purpose. POLL_SECRET is handed to the external
  // cron service, so a third party never holds CRON_SECRET, which also guards
  // the weekly report. Rotating one does not break the other.
  const allowed = [process.env.POLL_SECRET, process.env.CRON_SECRET].filter(Boolean);
  if (allowed.length && !allowed.includes(secret ?? "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!TOKEN) return NextResponse.json({ ok: false, reason: "META_LEADS_TOKEN not set" });

  // Only look at the last 24h, so a cold start cannot replay months of leads.
  const since = Math.floor(Date.now() / 1000) - 86400;
  const report: Record<string, unknown> = { forms: 0, found: 0, processed: 0, skipped: 0 };

  try {
    const pg = await pageToken();
    report.page = pg.name;
    const forms = (await g(`${pg.id}/leadgen_forms?fields=id,name,status&limit=50`, pg.token)).data ?? [];
    report.forms = forms.length;

    for (const f of forms as { id: string; name: string }[]) {
      let leads: { id: string; created_time: string; field_data: { name: string; values: string[] }[] }[] = [];
      try {
        leads = (await g(`${f.id}/leads?fields=id,created_time,field_data&limit=50&filtering=[{"field":"time_created","operator":"GREATER_THAN","value":${since}}]`, pg.token)).data ?? [];
      } catch (err) {
        report[`form_${f.id}`] = `read failed: ${String(err).slice(0, 160)}`;
        continue;
      }
      report.found = (report.found as number) + leads.length;

      for (const l of leads) {
        if (seen.has(l.id)) { report.skipped = (report.skipped as number) + 1; continue; }
        seen.add(l.id);

        const fd = l.field_data ?? [];
        const full = pick(fd, "full_name", "name");
        const name = full || [pick(fd, "first_name"), pick(fd, "last_name")].filter(Boolean).join(" ") || "Instagram lead";
        const phone = normalisePhone(pick(fd, "phone", "mobile", "whatsapp"));
        if (!/^\d{10}$/.test(phone)) {
          report.skipped = (report.skipped as number) + 1;
          console.error("Polled lead has no usable phone, skipping:", l.id);
          continue;
        }

        const known = ["name", "phone", "mobile", "whatsapp", "email", "service", "interested", "looking"];
        const extras = fd.filter((x) => !known.some((k) => x.name?.toLowerCase().includes(k)))
          .map((x) => `${x.name.replace(/_/g, " ")}: ${x.values.join(", ")}`).join(" | ");
        const email = pick(fd, "email");

        const payload: LeadPayload = {
          name,
          phone,
          course: pick(fd, "service", "interested", "looking") || "Instagram enquiry (service not specified)",
          notes: [extras, email && `Email: ${email}`].filter(Boolean).join(" | "),
          source: `instagram-ad | polled | ${f.name}`,
          timestamp: l.created_time ?? new Date().toISOString(),
        };
        await processLead(payload);
        report.processed = (report.processed as number) + 1;
      }
    }
    return NextResponse.json({ ok: true, ...report });
  } catch (err) {
    console.error("Meta lead poll failed:", err);
    return NextResponse.json({ ok: false, error: String(err).slice(0, 300), ...report });
  }
}
