import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, mkdirSync } from "fs";
import { join } from "path";

const WEBHOOK_URL = process.env.WEBHOOK_URL ?? "";
const CALLMEBOT_URVASHI_PHONE = process.env.CALLMEBOT_URVASHI_PHONE ?? "";
const CALLMEBOT_KEY = process.env.CALLMEBOT_KEY ?? "";

function saveLocally(payload: Record<string, string>) {
  try {
    const dir = join(process.cwd(), ".lead-backup");
    mkdirSync(dir, { recursive: true });
    const line = JSON.stringify(payload) + "\n";
    appendFileSync(join(dir, "leads.ndjson"), line, "utf8");
  } catch { /* non-critical — best effort */ }
}

async function notifyUrvashi(payload: Record<string, string>) {
  if (!CALLMEBOT_URVASHI_PHONE || !CALLMEBOT_KEY) return;
  const msg = encodeURIComponent(
    `New lead from landing page!\nName: ${payload.name}\nPhone: ${payload.phone}\nCourse: ${payload.course}\n\nCall back within 1 hour`
  );
  try {
    await fetch(`https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_URVASHI_PHONE}&text=${msg}&apikey=${CALLMEBOT_KEY}`);
  } catch { /* non-critical */ }
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, phone, course } = body as Record<string, string>;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Full name is required" }, { status: 422 });
  }
  if (!/^\d{10}$/.test(phone?.trim() ?? "")) {
    return NextResponse.json({ error: "A valid 10-digit WhatsApp number is required" }, { status: 422 });
  }
  if (!course?.trim()) {
    return NextResponse.json({ error: "Please select a course" }, { status: 422 });
  }

  const payload = {
    name: name.trim(),
    phone: phone.trim(),
    course: course.trim(),
    source: "landing-page",
    timestamp: new Date().toISOString(),
  };

  // Always save locally first — zero lead loss even if webhook is unconfigured
  saveLocally(payload);

  // Fire WhatsApp alert to Urvashi immediately (non-blocking)
  notifyUrvashi(payload).catch(() => {});

  // Forward to Google Sheet if webhook is configured
  if (WEBHOOK_URL && !WEBHOOK_URL.includes("your-webhook-url")) {
    try {
      const webhookRes = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!webhookRes.ok) {
        console.error("Webhook responded with", webhookRes.status);
      }
    } catch (err) {
      console.error("Webhook request failed (lead saved locally):", err);
    }
  }

  // Always return success to the user — lead is captured locally regardless
  return NextResponse.json({ ok: true }, { status: 200 });
}
