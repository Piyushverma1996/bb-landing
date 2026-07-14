import { NextRequest, NextResponse } from "next/server";

// Sends a weekly WhatsApp summary to Piyush via CallMeBot
// Also triggers on Vercel Cron if configured in vercel.json

const CALLMEBOT_PHONE = process.env.CALLMEBOT_PHONE ?? "";   // Piyush's WhatsApp number with country code e.g. +919899077017
const CALLMEBOT_KEY   = process.env.CALLMEBOT_KEY ?? "";
const SHEET_API       = process.env.GSHEET_API_URL ?? "";

async function getStats() {
  if (!SHEET_API) return null;
  try {
    const res = await fetch(`${SHEET_API}?action=stats`);
    return res.ok ? await res.json() : null;
  } catch { return null; }
}

export async function POST(req: NextRequest) {
  // Verify cron secret when called by Vercel Cron
  const secret = req.headers.get("x-cron-secret") ?? req.nextUrl.searchParams.get("secret");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stats = await getStats();
  const leads = stats?.byWeek ?? "—";
  const total = stats?.total ?? "—";
  const revenue = stats?.revenue?.total ? `₹${stats.revenue.total.toLocaleString()}` : "₹—";
  const booked = stats?.funnel?.booked ?? "—";
  const served = stats?.funnel?.served ?? "—";

  const message = encodeURIComponent(
    `🌸 BB Weekly Report\n` +
    `━━━━━━━━━━━━━━\n` +
    `📥 New leads this week: ${leads}\n` +
    `📊 Total leads all time: ${total}\n` +
    `📅 Bookings: ${booked}  ·  ✅ Served/Paid: ${served}\n` +
    `💰 Revenue: ${revenue}\n` +
    `━━━━━━━━━━━━━━\n` +
    `👉 Dashboard: ${process.env.NEXT_PUBLIC_APP_URL ?? "your-app.vercel.app"}/dashboard\n` +
    `— Auto-report by BB Growth System`
  );

  if (!CALLMEBOT_PHONE || !CALLMEBOT_KEY) {
    return NextResponse.json({ ok: true, message: "Report generated (CallMeBot not configured — add CALLMEBOT_PHONE and CALLMEBOT_KEY to env vars)", stats });
  }

  try {
    await fetch(`https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${message}&apikey=${CALLMEBOT_KEY}`);
    return NextResponse.json({ ok: true, message: "Weekly report sent to WhatsApp" });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

// Vercel Cron handler (GET)
export async function GET(req: NextRequest) {
  return POST(req);
}
