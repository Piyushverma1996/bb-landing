import { NextRequest, NextResponse } from "next/server";
import { appendFileSync, mkdirSync } from "fs";
import { join } from "path";

// Internal invoicing endpoint — forwards to the SAME Apps Script web app used by leads.
// Contract matches the DEPLOYED script (BB Invoices tab):
//   create → { action: "createInvoice", ... , totalAmount, advancePaid }  → returns { invoiceId }
//   status → { action: "updateInvoiceStatus", id, status }
//   list   → GET ?action=getInvoices  → { invoices: [{ id, name, ... }] }
// No new env vars: reuses WEBHOOK_URL / GSHEET_API_URL.
const WRITE_URL = process.env.WEBHOOK_URL ?? "";
const READ_URL = process.env.GSHEET_API_URL ?? process.env.WEBHOOK_URL ?? "";

interface InvoiceIn {
  customerName: string;
  whatsapp: string;
  invoiceDate: string;
  eventDate?: string;
  services: string[];
  total: number;
  advance: number;
}

function backup(kind: string, payload: unknown) {
  try {
    const dir = join(process.cwd(), ".lead-backup");
    mkdirSync(dir, { recursive: true });
    appendFileSync(join(dir, "invoices.ndjson"), JSON.stringify({ kind, at: new Date().toISOString(), payload }) + "\n", "utf8");
  } catch { /* best effort — never block */ }
}

// GET /api/invoice → list ledger records (maps sheet's `name` → `customerName` for the UI)
export async function GET() {
  if (!READ_URL || READ_URL.includes("your-webhook-url")) {
    return NextResponse.json({ invoices: [] });
  }
  try {
    const res = await fetch(`${READ_URL}?action=getInvoices`, { cache: "no-store" });
    if (!res.ok) throw new Error(`Sheet read ${res.status}`);
    const data = await res.json();
    const invoices = (data.invoices ?? []).map((r: Record<string, unknown>) => ({
      id: r.id,
      customerName: r.name ?? r.customerName ?? "",
      whatsapp: String(r.whatsapp ?? ""),
      invoiceDate: r.invoiceDate ?? "",
      eventDate: r.eventDate ?? "",
      services: r.services ?? "",
      total: Number(r.total) || 0,
      advance: Number(r.advance) || 0,
      due: Number(r.due) || 0,
      status: r.status ?? "Pending",
    }));
    return NextResponse.json({ invoices });
  } catch (err) {
    console.error("Invoice list failed:", err);
    return NextResponse.json({ invoices: [] });
  }
}

// POST /api/invoice → { action: "create" | "status", ... }
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const action = (body.action as string) ?? "create";

  /* ── Status toggle ── */
  if (action === "status") {
    const id = String(body.id ?? "").trim();
    const status = String(body.status ?? "").trim();
    if (!id) return NextResponse.json({ error: "Invoice id is required" }, { status: 422 });
    if (!["Pending", "Partially Paid", "Fully Paid"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 422 });
    }
    const payload = { action: "updateInvoiceStatus", id, status };
    backup("status", payload);
    if (!WRITE_URL || WRITE_URL.includes("your-webhook-url")) {
      return NextResponse.json({ ok: true, offline: true });
    }
    try {
      const res = await fetch(WRITE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const d = await res.json().catch(() => ({}));
      return NextResponse.json({ ok: d.ok ?? res.ok, id, status });
    } catch (err) {
      console.error("Status update failed:", err);
      return NextResponse.json({ error: "Sheet update failed" }, { status: 502 });
    }
  }

  /* ── Create invoice ── */
  const inv = body as unknown as InvoiceIn;
  if (!inv.customerName?.trim()) {
    return NextResponse.json({ error: "Customer name is required" }, { status: 422 });
  }
  if (!/^\d{10}$/.test(String(inv.whatsapp ?? "").trim())) {
    return NextResponse.json({ error: "A valid 10-digit WhatsApp number is required" }, { status: 422 });
  }
  if (!Array.isArray(inv.services) || inv.services.length === 0) {
    return NextResponse.json({ error: "Select at least one service" }, { status: 422 });
  }

  // Field names below MUST match the deployed handleInvoiceTransaction() (totalAmount/advancePaid).
  const payload = {
    action: "createInvoice",
    customerName: inv.customerName.trim(),
    whatsapp: String(inv.whatsapp).trim(),
    invoiceDate: inv.invoiceDate || new Date().toISOString().slice(0, 10),
    eventDate: inv.eventDate ?? "",
    services: inv.services.join(", "),
    totalAmount: Number(inv.total) || 0,
    advancePaid: Number(inv.advance) || 0,
  };

  backup("create", payload);

  if (!WRITE_URL || WRITE_URL.includes("your-webhook-url")) {
    return NextResponse.json({ ok: true, offline: true, id: `BB-${new Date().getFullYear()}-LOCAL` });
  }

  try {
    const res = await fetch(WRITE_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const d = await res.json().catch(() => ({}));
    if (!d.ok) throw new Error(d.error || "Sheet write failed");
    return NextResponse.json({ ok: true, id: d.invoiceId ?? d.id ?? "" });
  } catch (err) {
    console.error("Invoice save failed:", err);
    return NextResponse.json({ error: "Sheet write failed — record backed up locally" }, { status: 502 });
  }
}
