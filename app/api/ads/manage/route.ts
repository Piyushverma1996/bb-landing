import { NextRequest, NextResponse } from "next/server";

// Meta Marketing API — campaign creation, ad management, auto-optimization
// Docs: https://developers.facebook.com/docs/marketing-apis

const TOKEN       = process.env.META_ACCESS_TOKEN ?? "";
const AD_ACCOUNT  = process.env.META_AD_ACCOUNT_ID ?? "";   // act_XXXXXXXXXX
const FB_PAGE_ID  = process.env.META_FB_PAGE_ID ?? "";
const IG_ID_BB    = process.env.META_IG_ID_BB ?? "";
const GRAPH       = "https://graph.facebook.com/v21.0";

// West Delhi hyper-local targeting spec
const WEST_DELHI_TARGETING = {
  geo_locations: {
    custom_locations: [
      { latitude: 28.6576, longitude: 77.1026, radius: 5, distance_unit: "kilometer" }, // Ramesh Nagar
      { latitude: 28.6392, longitude: 77.0878, radius: 3, distance_unit: "kilometer" }, // Subhash Nagar
      { latitude: 28.6289, longitude: 77.0856, radius: 3, distance_unit: "kilometer" }, // Tilak Nagar
      { latitude: 28.6512, longitude: 77.1156, radius: 3, distance_unit: "kilometer" }, // Rajouri Garden
    ],
  },
  age_min: 20,
  age_max: 45,
  genders: [2], // women only
  locales: [5, 6], // Hindi + English
};

// High-intent interest targeting per service type
const INTERESTS: Record<string, number[]> = {
  bridal:  [6003232235769, 6003397425735, 6003232234321], // Bridal, Wedding, Makeup Artist
  party:   [6003232235769, 6003005655235, 6003023463479], // Makeup, Beauty Salon, Cosmetics
  nails:   [6003101461699, 6003232235769, 6003107902433], // Nail art, Beauty, Manicure
  course:  [6003397425735, 6003232234321, 6004854415373], // Makeup Artist, Beauty, Vocational
};

async function graphPost(path: string, data: Record<string, unknown>) {
  const res = await fetch(`${GRAPH}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, access_token: TOKEN }),
  });
  return res.json();
}

async function graphGet(path: string, fields: string) {
  const res = await fetch(`${GRAPH}/${path}?fields=${fields}&access_token=${TOKEN}`);
  return res.json();
}

// Create a full campaign → ad set → ad in one call
async function createCampaign(opts: {
  name: string;
  service: "bridal" | "party" | "nails" | "course";
  dailyBudget: number; // INR
  videoId?: string;    // Meta video ID if already uploaded
  imageUrl?: string;   // fallback image
  headline: string;
  body: string;
  landingPage: string;
}) {
  const budgetPaise = Math.round(opts.dailyBudget * 100); // Meta uses paise for INR

  // 1. Campaign
  const campaign = await graphPost(`${AD_ACCOUNT}/campaigns`, {
    name: opts.name,
    objective: "LEAD_GENERATION",
    status: "PAUSED", // Always start paused — Piyush reviews before going live
    special_ad_categories: [],
  });
  if (campaign.error) return { error: campaign.error };

  // 2. Ad Set
  const adSet = await graphPost(`${AD_ACCOUNT}/adsets`, {
    name: `${opts.name} — West Delhi Women`,
    campaign_id: campaign.id,
    billing_event: "IMPRESSIONS",
    optimization_goal: "LEAD_GENERATION",
    bid_strategy: "LOWEST_COST_WITHOUT_CAP",
    daily_budget: budgetPaise,
    targeting: {
      ...WEST_DELHI_TARGETING,
      interests: INTERESTS[opts.service]?.map(id => ({ id: String(id) })) ?? [],
    },
    promoted_object: { page_id: FB_PAGE_ID },
    status: "PAUSED",
  });
  if (adSet.error) return { error: adSet.error };

  // 3. Ad Creative
  const creativeSpec: Record<string, unknown> = opts.videoId
    ? {
        video_data: {
          video_id: opts.videoId,
          title: opts.headline,
          message: opts.body,
          call_to_action: { type: "WHATSAPP_MESSAGE", value: { link: `https://wa.me/917678446364` } },
        },
      }
    : {
        link_data: {
          link: opts.landingPage,
          message: opts.body,
          name: opts.headline,
          image_url: opts.imageUrl ?? "",
          call_to_action: { type: "LEARN_MORE" },
        },
      };

  const creative = await graphPost(`${AD_ACCOUNT}/adcreatives`, {
    name: `${opts.name} Creative`,
    object_story_spec: {
      page_id: FB_PAGE_ID,
      ...(opts.videoId ? { video_data: creativeSpec.video_data } : { link_data: creativeSpec.link_data }),
    },
    instagram_actor_id: IG_ID_BB,
  });
  if (creative.error) return { error: creative.error };

  // 4. Ad
  const ad = await graphPost(`${AD_ACCOUNT}/ads`, {
    name: opts.name,
    adset_id: adSet.id,
    creative: { creative_id: creative.id },
    status: "PAUSED",
  });

  return { campaign_id: campaign.id, adset_id: adSet.id, creative_id: creative.id, ad_id: ad.id };
}

// Auto-optimization: scale winners, pause losers
async function runOptimization() {
  if (!TOKEN || !AD_ACCOUNT) return { skipped: "Meta not configured" };

  const ads = await graphGet(
    `${AD_ACCOUNT}/ads`,
    "id,name,status,insights{spend,actions,cost_per_action_type}"
  );

  const results: { ad_id: string; action: string; reason: string }[] = [];

  for (const ad of ads.data ?? []) {
    const insight = ad.insights?.data?.[0];
    if (!insight) continue;

    const spend = parseFloat(insight.spend ?? "0") * 83; // USD → INR
    const leads = (insight.actions ?? []).find((a: {action_type:string;value:string}) => a.action_type === "lead")?.value ?? 0;
    const cpl = leads > 0 ? spend / Number(leads) : 9999;

    let action = "none";
    let reason = "";

    if (cpl > 1200 && spend > 500) {
      // Too expensive — pause
      await graphPost(`${ad.id}`, { status: "PAUSED" });
      action = "paused";
      reason = `CPL ₹${Math.round(cpl)} > ₹1,200 threshold`;
    } else if (cpl < 400 && spend > 300) {
      // Performing well — note for Piyush to increase budget
      action = "scale_recommended";
      reason = `CPL ₹${Math.round(cpl)} < ₹400 — increase budget 20%`;
    }

    if (action !== "none") results.push({ ad_id: ad.id, action, reason });
  }

  return { optimized: results.length, results };
}

// GET — list active campaigns with performance
export async function GET() {
  if (!TOKEN || !AD_ACCOUNT) {
    return NextResponse.json({ error: "Meta not configured — add META_ACCESS_TOKEN and META_AD_ACCOUNT_ID" });
  }

  const [campaigns, insights] = await Promise.all([
    graphGet(`${AD_ACCOUNT}/campaigns`, "id,name,status,objective"),
    graphGet(`${AD_ACCOUNT}/insights`, "spend,impressions,actions,cost_per_action_type&date_preset=this_month"),
  ]);

  return NextResponse.json({ campaigns: campaigns.data ?? [], insights: insights.data?.[0] ?? {} });
}

// POST — create campaign OR run optimization
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const action = body.action ?? "create";

  if (action === "optimize") {
    const result = await runOptimization();
    return NextResponse.json(result);
  }

  if (action === "create") {
    const result = await createCampaign({
      name: body.name ?? "BB Ad",
      service: body.service ?? "nails",
      dailyBudget: body.daily_budget ?? 150,
      videoId: body.video_id,
      imageUrl: body.image_url,
      headline: body.headline ?? "Blushes & Brushes — Book Now",
      body: body.body ?? "Premium nail and makeup services in West Delhi. WhatsApp to book.",
      landingPage: process.env.NEXT_PUBLIC_APP_URL ?? "https://your-app.vercel.app",
    });
    return NextResponse.json(result);
  }

  // Toggle ad status (activate/pause)
  if (action === "toggle" && body.ad_id) {
    const result = await graphPost(body.ad_id, { status: body.status ?? "ACTIVE" });
    return NextResponse.json(result);
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
