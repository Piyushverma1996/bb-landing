import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, mkdirSync } from "fs";
import { join } from "path";
import { DRAFTS } from "./drafts";

// Daily reviews tracker — logs each written review with who got it (Urvashi/Kukkie/Asha),
// which platform (Google/Justdial/magicpin), and whether it had a photo (Google only).
// Payout rule: staff (Kukkie/Asha) earn ₹50 for the 3rd review of the day WITH a photo — computed here.
// Backend: extends the existing Apps Script → "Reviews" tab. See § REVIEWS in BB_AppsScript_FULL.gs.
const WRITE_URL = process.env.WEBHOOK_URL ?? "";
const READ_URL = process.env.GSHEET_API_URL ?? process.env.WEBHOOK_URL ?? "";

function backup(kind: string, p: unknown) {
  try {
    const dir = join(process.cwd(), ".lead-backup");
    mkdirSync(dir, { recursive: true });
    appendFileSync(join(dir, "reviews.ndjson"), JSON.stringify({ kind, at: new Date().toISOString(), p }) + "\n", "utf8");
  } catch { /* best effort */ }
}

interface ReviewRow {
  id: string;
  date: string;        // YYYY-MM-DD (Delhi local when logged)
  timestamp: string;
  person: string;      // Urvashi | Kukkie | Asha
  platform: string;    // Google | Justdial | magicpin
  photo: boolean;
  clientName?: string;
  note?: string;
}

const PEOPLE = ["Urvashi", "Kukkie", "Asha"] as const;
const PLATFORMS = ["Google", "Justdial"] as const;
const PAYOUT = 50;
const STAFF = new Set<string>(["Kukkie", "Asha"]);

// GET /api/reviews → today's + all-time summary
export async function GET() {
  if (!READ_URL || READ_URL.includes("your-webhook-url")) {
    return NextResponse.json({ rows: [], today: emptyDay(), leaderboard: emptyBoard(), streakDays: 0, drafts: DRAFTS });
  }
  try {
    const res = await fetch(`${READ_URL}?action=getReviews`, { cache: "no-store" });
    const d = await res.json();
    const rows: ReviewRow[] = (d.rows ?? []).map((r: Record<string, unknown>) => ({
      id: String(r.id ?? ""),
      date: String(r.date ?? ""),
      timestamp: String(r.timestamp ?? ""),
      person: String(r.person ?? ""),
      platform: String(r.platform ?? ""),
      photo: r.photo === true || r.photo === "TRUE" || r.photo === "Yes",
      clientName: r.clientName as string | undefined,
      note: r.note as string | undefined,
    }));

    const today = todayISO();
    const dayRows = rows.filter((r) => r.date === today);

    // Per-person day view — payout is on the 3rd+ review of the day WITH photo, and only for staff.
    const today_summary = PEOPLE.map((p) => {
      const mine = dayRows.filter((r) => r.person === p);
      const withPhoto = mine.filter((r) => r.photo).length;
      // count position within same-person same-day sequence to apply "3rd review onwards" rule
      const payoutQualifiedCount = STAFF.has(p) ? Math.max(0, withPhoto - 2) : 0;
      return {
        person: p,
        total: mine.length,
        google: mine.filter((r) => r.platform === "Google").length,
        justdial: mine.filter((r) => r.platform === "Justdial").length,
        withPhoto,
        payoutDue: payoutQualifiedCount * PAYOUT,
      };
    });

    // All-time leaderboard (last 30 days)
    const cutoff = daysAgoISO(30);
    const recent = rows.filter((r) => r.date >= cutoff);
    const leaderboard = PEOPLE.map((p) => {
      const mine = recent.filter((r) => r.person === p);
      return { person: p, count: mine.length, withPhoto: mine.filter((r) => r.photo).length };
    }).sort((a, b) => b.count - a.count);

    // Streak: consecutive days with ≥1 review
    let streak = 0;
    const dayMap = new Set(rows.map((r) => r.date));
    let cur = new Date();
    while (dayMap.has(cur.toISOString().slice(0, 10))) {
      streak++;
      cur = new Date(cur.getTime() - 86400000);
    }

    return NextResponse.json({
      rows: rows.slice(-40).reverse(),
      today: { date: today, total: dayRows.length, byPerson: today_summary, totalPayoutDue: today_summary.reduce((s, x) => s + x.payoutDue, 0) },
      leaderboard,
      streakDays: streak,
      drafts: DRAFTS,
    });
  } catch (err) {
    console.error("Reviews GET failed:", err);
    return NextResponse.json({ rows: [], today: emptyDay(), leaderboard: emptyBoard(), streakDays: 0, drafts: DRAFTS });
  }
}

// POST /api/reviews  → log a new review
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const person = String(body.person ?? "").trim();
  const platform = String(body.platform ?? "").trim();
  const photo = body.photo === true;
  const clientName = String(body.clientName ?? "").trim();
  const note = String(body.note ?? "").trim();
  if (!(PEOPLE as readonly string[]).includes(person)) return NextResponse.json({ error: "Invalid person" }, { status: 422 });
  if (!(PLATFORMS as readonly string[]).includes(platform)) return NextResponse.json({ error: "Invalid platform" }, { status: 422 });

  const payload = { type: "review", person, platform, photo, clientName, note, date: todayISO(), timestamp: new Date().toISOString() };
  backup("log", payload);

  if (!WRITE_URL || WRITE_URL.includes("your-webhook-url")) {
    return NextResponse.json({ ok: true, offline: true });
  }
  try {
    const res = await fetch(WRITE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const d = await res.json().catch(() => ({}));
    if (!d.ok) throw new Error(d.error || "sheet write failed");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Reviews POST failed:", err);
    return NextResponse.json({ error: "Sheet write failed — logged locally" }, { status: 502 });
  }
}

function todayISO() {
  // Fixed to Delhi (IST = UTC+5:30) so "today" is stable regardless of server tz
  const now = new Date();
  const ist = new Date(now.getTime() + (5.5 * 60 - now.getTimezoneOffset()) * 60000);
  return ist.toISOString().slice(0, 10);
}
function daysAgoISO(n: number) {
  const d = new Date(); d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}
function emptyDay() {
  return {
    date: todayISO(),
    total: 0,
    byPerson: PEOPLE.map((p) => ({ person: p, total: 0, google: 0, justdial: 0, withPhoto: 0, payoutDue: 0 })),
    totalPayoutDue: 0,
  };
}
function emptyBoard() {
  return PEOPLE.map((p) => ({ person: p, count: 0, withPhoto: 0 }));
}
