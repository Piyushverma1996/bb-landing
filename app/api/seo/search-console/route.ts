import { NextResponse } from "next/server";
import { getAccessToken, SCOPES, GOOGLE_SA_CONFIGURED, lastAuthError } from "../googleAuth";

// Search Console API - performance (impressions/clicks/position/queries) + per-URL index status.
// Requires: GOOGLE_SA_EMAIL, GOOGLE_SA_PRIVATE_KEY, GSC_SITE_URL
// The service account email must be added as a user in Search Console (Settings -> Users and permissions).
// GSC_SITE_URL is either "https://blushesnbrushes.com/" (URL-prefix) or "sc-domain:blushesnbrushes.com" (Domain property).
const SITE = process.env.GSC_SITE_URL ?? "sc-domain:blushesnbrushes.com";

const empty = (reason: string) => ({
  configured: false,
  reason,
  totals: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
  topQueries: [] as { query: string; clicks: number; impressions: number; position: number }[],
  topPages: [] as { page: string; clicks: number; impressions: number; position: number }[],
  daily: [] as { date: string; clicks: number; impressions: number }[],
});

async function query(token: string, body: unknown) {
  const res = await fetch(
    `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    }
  );
  if (!res.ok) throw new Error(`GSC ${res.status}: ${await res.text()}`);
  return res.json();
}

const iso = (d: Date) => d.toISOString().slice(0, 10);

export async function GET(req: Request) {
  const days = Number(new URL(req.url).searchParams.get("days") ?? 28);
  // GSC data lags ~2 days
  const endDate = iso(new Date(Date.now() - 2 * 86400000));
  const startDate = iso(new Date(Date.now() - (days + 2) * 86400000));

  if (!GOOGLE_SA_CONFIGURED) return NextResponse.json(empty("Service account not configured - set GOOGLE_SA_EMAIL and GOOGLE_SA_PRIVATE_KEY"));

  const token = await getAccessToken(SCOPES.searchConsole);
  if (!token) return NextResponse.json(empty(lastAuthError || "Could not obtain Google access token"));

  try {
    const [totals, queries, pages, daily] = await Promise.all([
      query(token, { startDate, endDate }),
      query(token, { startDate, endDate, dimensions: ["query"], rowLimit: 20 }),
      query(token, { startDate, endDate, dimensions: ["page"], rowLimit: 20 }),
      query(token, { startDate, endDate, dimensions: ["date"] }),
    ]);

    const t = totals.rows?.[0] ?? { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    type Row = { keys: string[]; clicks: number; impressions: number; ctr: number; position: number };

    return NextResponse.json({
      configured: true,
      site: SITE,
      range: { startDate, endDate, days },
      totals: {
        clicks: t.clicks ?? 0,
        impressions: t.impressions ?? 0,
        ctr: Number(((t.ctr ?? 0) * 100).toFixed(2)),
        position: Number((t.position ?? 0).toFixed(1)),
      },
      topQueries: (queries.rows ?? []).map((r: Row) => ({
        query: r.keys[0], clicks: r.clicks, impressions: r.impressions, position: Number(r.position.toFixed(1)),
      })),
      topPages: (pages.rows ?? []).map((r: Row) => ({
        page: r.keys[0].replace("https://blushesnbrushes.com", "") || "/",
        clicks: r.clicks, impressions: r.impressions, position: Number(r.position.toFixed(1)),
      })),
      daily: (daily.rows ?? []).map((r: Row) => ({ date: r.keys[0], clicks: r.clicks, impressions: r.impressions })),
    });
  } catch (err) {
    console.error("GSC query failed:", err);
    return NextResponse.json(empty(String(err instanceof Error ? err.message : err)));
  }
}

// POST { urls: string[] } -> inspect index status of specific URLs (URL Inspection API, 2000/day quota)
export async function POST(req: Request) {
  if (!GOOGLE_SA_CONFIGURED) return NextResponse.json({ error: "Service account not configured" }, { status: 400 });
  const token = await getAccessToken(SCOPES.searchConsole);
  if (!token) return NextResponse.json({ error: "Auth failed" }, { status: 500 });

  let urls: string[] = [];
  try { urls = ((await req.json())?.urls ?? []).slice(0, 20); } catch { /* ignore */ }
  if (!urls.length) return NextResponse.json({ error: "Provide { urls: [...] }" }, { status: 422 });

  const results = await Promise.all(urls.map(async (u) => {
    try {
      const res = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ inspectionUrl: u, siteUrl: SITE }),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) return { url: u, status: `error ${res.status}` };
      const d = await res.json();
      const r = d.inspectionResult?.indexStatusResult ?? {};
      return {
        url: u,
        status: r.verdict ?? "UNKNOWN",          // PASS = indexed
        coverage: r.coverageState ?? "",          // e.g. "Submitted and indexed"
        lastCrawl: r.lastCrawlTime ?? null,
        robotsState: r.robotsTxtState ?? "",
      };
    } catch { return { url: u, status: "error" }; }
  }));

  return NextResponse.json({
    checked: results.length,
    indexed: results.filter((r) => r.status === "PASS").length,
    results,
  });
}
