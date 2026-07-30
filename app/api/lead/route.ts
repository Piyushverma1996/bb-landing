import { NextRequest, NextResponse } from "next/server";
import { processLead, type LeadPayload } from "./pipeline";

// Website lead form. The pipeline (backup -> WhatsApp -> Sheet) lives in
// ./pipeline so Meta Instant Form leads go through exactly the same path.

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { name, phone, course, notes, source } = body as Record<string, string>;

  if (!name?.trim()) {
    return NextResponse.json({ error: "Full name is required" }, { status: 422 });
  }
  if (!/^\d{10}$/.test(phone?.trim() ?? "")) {
    return NextResponse.json({ error: "A valid 10-digit WhatsApp number is required" }, { status: 422 });
  }

  const payload: LeadPayload = {
    name: name.trim(),
    phone: phone.trim(),
    // Service is optional - "Not sure yet" is a valid, high-intent answer
    course: course?.trim() || "Free consultation (service not specified)",
    notes: notes?.trim() ?? "",
    // Preserve the real source the form sent (book | instagram, home | google...)
    source: source?.trim() || "website",
    timestamp: new Date().toISOString(),
  };

  const notified = await processLead(payload);
  return NextResponse.json({ ok: true, notified }, { status: 200 });
}
