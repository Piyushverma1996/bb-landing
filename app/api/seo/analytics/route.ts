import { NextResponse } from "next/server";
import { getAccessToken, SCOPES, GOOGLE_SA_CONFIGURED } from "../googleAuth";

// GA4 Data API - traffic summary for the dashboard.
// Requires: GOOGLE_SA_EMAIL, GOOGLE_SA_PRIVATE_KEY, GA4_PROPERTY_ID
// The service account must be added as a Viewer on the GA4 property.
const PROPERTY_ID = process.env.GA4_PROPERTY_ID ?? "";

const empty = (reason: string) => ({
  configured: false,
  reason,
  totals: { sessions: 0, users: 0, newUsers: 0, leads: 0, whatsappClicks: 0 },
  byChannel: [] as { channel: string; sessions: number }[],
  topPages: [] as { page: string; views: number }[],
  daily: [] as { date: string; sessions: number }[],
});

async function runReport(token: string, body: unknown) {
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${PROPERTY_ID}:runReport`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000),
    }
  );
  if (!res.ok) throw new Error(`GA4 ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function GET(req: Request) {
  const days = Number(new URL(req.url).searchParams.get("days") ?? 28);
  const dateRanges = [{ startDate: `${days}daysAgo`, endDate: "today" }];

  if (!GOOGLE_SA_CONFIGURED) return NextResponse.json(empty("Service account not configured - set GOOGLE_SA_EMAIL and GOOGLE_SA_PRIVATE_KEY"));
  if (!PROPERTY_ID) return NextResponse.json(empty("GA4_PROPERTY_ID not set"));

  const token = await getAccessToken(SCOPES.analytics);
  if (!token) return NextResponse.json(empty("Could not obtain Google access token - check the private key"));

  try {
    const [totals, channels, pages, daily, events] = await Promise.all([
      runReport(token, { dateRanges, metrics: [{ name: "sessions" }, { name: "totalUsers" }, { name: "newUsers" }] }),
      runReport(token, { dateRanges, dimensions: [{ name: "sessionDefaultChannelGroup" }], metrics: [{ name: "sessions" }], limit: 10 }),
      runReport(token, { dateRanges, dimensions: [{ name: "pagePath" }], metrics: [{ name: "screenPageViews" }], limit: 12,
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }] }),
      runReport(token, { dateRanges, dimensions: [{ name: "date" }], metrics: [{ name: "sessions" }],
        orderBys: [{ dimension: { dimensionName: "date" } }] }),
      runReport(token, { dateRanges, dimensions: [{ name: "eventName" }], metrics: [{ name: "eventCount" }], limit: 25 }),
    ]);

    const row0 = totals.rows?.[0]?.metricValues ?? [];
    const evRows: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }[] = events.rows ?? [];
    const evCount = (name: string) =>
      Number(evRows.find((r) => r.dimensionValues[0].value === name)?.metricValues[0].value ?? 0);

    return NextResponse.json({
      configured: true,
      days,
      totals: {
        sessions: Number(row0[0]?.value ?? 0),
        users: Number(row0[1]?.value ?? 0),
        newUsers: Number(row0[2]?.value ?? 0),
        leads: evCount("generate_lead"),
        whatsappClicks: evCount("whatsapp_click"),
      },
      byChannel: (channels.rows ?? []).map((r: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }) => ({
        channel: r.dimensionValues[0].value, sessions: Number(r.metricValues[0].value),
      })),
      topPages: (pages.rows ?? []).map((r: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }) => ({
        page: r.dimensionValues[0].value, views: Number(r.metricValues[0].value),
      })),
      daily: (daily.rows ?? []).map((r: { dimensionValues: { value: string }[]; metricValues: { value: string }[] }) => ({
        date: r.dimensionValues[0].value, sessions: Number(r.metricValues[0].value),
      })),
    });
  } catch (err) {
    console.error("GA4 report failed:", err);
    return NextResponse.json(empty(String(err instanceof Error ? err.message : err)));
  }
}
