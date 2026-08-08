import { NextResponse } from "next/server";
import { appendFileSync, mkdirSync } from "fs";
import { join } from "path";

// Wedding RSVP. Deliberately NOT routed through the lead pipeline: a guest is
// not a lead, and firing the "NEW LEAD - Blushes & Brushes" WhatsApp template
// at Urvashi for every relative would be both wrong and noisy. Rows land in the
// same sheet, clearly labelled, so the headcount is easy to read off.
const WEBHOOK_URL = process.env.WEBHOOK_URL ?? "";

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").replace(/\D/g, "");
  if (!name || !/^\d{10}$/.test(phone)) {
    return NextResponse.json({ error: "Name and a 10-digit number are required" }, { status: 422 });
  }

  const ladies = (body.ladies ?? "").replace(/\D/g, "");
  const payload = {
    name,
    phone,
    course: "WEDDING RSVP",
    notes: [
      `Attending: ${(body.attending ?? "").trim() || "not specified"}`,
      `Nail-art slots: ${ladies || "0"}`,
      (body.note ?? "").trim() && `Note: ${(body.note ?? "").trim()}`,
    ].filter(Boolean).join(" | "),
    source: "wedding-rsvp",
    timestamp: new Date().toISOString(),
  };

  try {
    const dir = join(process.cwd(), ".lead-backup");
    mkdirSync(dir, { recursive: true });
    appendFileSync(join(dir, "rsvp.ndjson"), JSON.stringify(payload) + "\n", "utf8");
  } catch { /* best effort */ }

  if (WEBHOOK_URL && !WEBHOOK_URL.includes("your-webhook-url")) {
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      });
    } catch (err) {
      console.error("RSVP sheet write failed (saved locally):", err);
    }
  }

  return NextResponse.json({ ok: true });
}
