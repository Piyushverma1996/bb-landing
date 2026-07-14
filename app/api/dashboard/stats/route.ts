import { NextResponse } from "next/server";

// Fetches stats from: Google Sheet (leads), Meta Graph API (IG), Meta Marketing API (ads)
// Falls back to zeros gracefully when tokens aren't set up yet.

const SHEET_API = process.env.GSHEET_API_URL ?? "";          // Google Apps Script web app URL
const IG_TOKEN  = process.env.META_ACCESS_TOKEN ?? "";        // Long-lived page/user token
const IG_ID_BB  = process.env.META_IG_ID_BB ?? "";           // @blushesandbrushes2022 IG Business ID
const IG_ID_MBU = process.env.META_IG_ID_MBU ?? "";          // @makeovers_by_urvashitrehan_ IG Business ID
const AD_ACCOUNT = process.env.META_AD_ACCOUNT_ID ?? "";      // act_XXXXXXXXXX

async function fetchLeads() {
  if (!SHEET_API) return { total: 0, byWeek: 0, byService: { Makeup: 0, "Nail Art": 0, Beauty: 0 }, bySegment: { makeup_bridal: 0, makeup_party: 0, nails: 0, beauty: 0, other: 0 }, funnel: { leads: 0, contacted: 0, booked: 0, served: 0 }, revenue: { services: 0, total: 0 } };
  try {
    const res = await fetch(`${SHEET_API}?action=stats`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("Sheet API error");
    return await res.json();
  } catch {
    return { total: 0, byWeek: 0, byService: { Makeup: 0, "Nail Art": 0, Beauty: 0 }, bySegment: { makeup_bridal: 0, makeup_party: 0, nails: 0, beauty: 0, other: 0 }, funnel: { leads: 0, contacted: 0, booked: 0, served: 0 }, revenue: { services: 0, total: 0 } };
  }
}

async function fetchIGFollowers(igId: string): Promise<number> {
  if (!IG_TOKEN || !igId) return 0;
  try {
    const url = `https://graph.facebook.com/v21.0/${igId}?fields=followers_count&access_token=${IG_TOKEN}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const d = await res.json();
    return d.followers_count ?? 0;
  } catch { return 0; }
}

async function fetchIGReach(igId: string): Promise<number> {
  if (!IG_TOKEN || !igId) return 0;
  try {
    const since = Math.floor((Date.now() - 7 * 86400000) / 1000);
    const url = `https://graph.facebook.com/v21.0/${igId}/insights?metric=reach&period=week&since=${since}&access_token=${IG_TOKEN}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const d = await res.json();
    return d.data?.[0]?.values?.slice(-1)?.[0]?.value ?? 0;
  } catch { return 0; }
}

async function fetchAdStats() {
  if (!IG_TOKEN || !AD_ACCOUNT) return { spend: 0, leads_from_ads: 0, cpl: 0 };
  try {
    const since = new Date(Date.now() - 30 * 86400000).toISOString().split("T")[0];
    const until = new Date().toISOString().split("T")[0];
    const url = `https://graph.facebook.com/v21.0/${AD_ACCOUNT}/insights?fields=spend,actions&time_range[since]=${since}&time_range[until]=${until}&access_token=${IG_TOKEN}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    const d = await res.json();
    const row = d.data?.[0];
    const spend = Math.round(parseFloat(row?.spend ?? "0") * 83); // USD→INR approx
    const leads = (row?.actions ?? []).find((a: {action_type: string}) => a.action_type === "lead")?.value ?? 0;
    const cpl = leads > 0 ? Math.round(spend / leads) : 0;
    return { spend, leads_from_ads: Number(leads), cpl };
  } catch { return { spend: 0, leads_from_ads: 0, cpl: 0 }; }
}

export async function GET() {
  const [leadsData, followers_bb, followers_mbu, reach_7d, adsData] = await Promise.all([
    fetchLeads(),
    fetchIGFollowers(IG_ID_BB),
    fetchIGFollowers(IG_ID_MBU),
    fetchIGReach(IG_ID_BB),
    fetchAdStats(),
  ]);

  return NextResponse.json({
    leads: {
      total: leadsData.total,
      byWeek: leadsData.byWeek,
      byService: leadsData.byService ?? { Makeup: 0, "Nail Art": 0, Beauty: 0 },
      bySegment: leadsData.bySegment ?? { makeup_bridal: 0, makeup_party: 0, nails: 0, beauty: 0, other: 0 },
    },
    instagram: { followers_bb, followers_mbu, reach_7d },
    ads: adsData,
    revenue: leadsData.revenue ?? { services: 0, total: 0 },
    funnel: leadsData.funnel ?? { leads: 0, contacted: 0, booked: 0, served: 0 },
  });
}
