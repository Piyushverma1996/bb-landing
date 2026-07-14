"use client";
import { useEffect, useState, useCallback } from "react";

/* ────────────────────────────────────────────────────────────────
   BLUSHES & BRUSHES — Internal Invoicing & Ledger  (pw-gated, not in nav)
   Route: /invoice   ·   Password: NEXT_PUBLIC_DASH_PW ("bb2026")
   No GST. Total Due = Total − Advance (live). PDF via @media print.
─────────────────────────────────────────────────────────────────── */

const SERVICES = ["Bridal Makeup", "Party Makeup", "Nail Extensions", "Beauty Combo"] as const;
const STATUSES = ["Pending", "Partially Paid", "Fully Paid"] as const;
type Status = (typeof STATUSES)[number];

const BRAND = {
  teal: "#2E8B83",
  tealDeep: "#1A5A54",
  gold: "#C9A55C",
  goldDeep: "#B8893B",
  peach: "#F7D6C6",
  cream: "#FBF4EA",
};

interface Invoice {
  id: string;
  customerName: string;
  whatsapp: string;
  invoiceDate: string;
  eventDate?: string;
  services: string;
  total: number;
  advance: number;
  due: number;
  status: Status;
}

const inr = (n: number) => `₹${(Number(n) || 0).toLocaleString("en-IN")}`;
const grp = (v: number | "") => (v === "" ? "" : Number(v).toLocaleString("en-IN"));
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
// "2026-07-14" → "14-Jul-2026". HTML date inputs always hold ISO regardless of how the OS displays them.
const fmtDate = (s: string) => {
  if (!s) return "—";
  const [y, m, d] = s.split("-");
  if (!y || !m || !d) return s;
  return `${d}-${MONTHS[Number(m) - 1]}-${y}`;
};

const STATUS_STYLE: Record<Status, string> = {
  Pending: "bg-[#F3CDD3]/60 text-[#B05A68] border-[#E09BA6]/50",
  "Partially Paid": "bg-[#F0DDB4]/70 text-[#B8893B] border-[#C9A55C]/50",
  "Fully Paid": "bg-[#CFE9DF]/70 text-[#2E7D6E] border-[#7BB5A8]/50",
};

export default function InvoiceTool() {
  const DASH_PW = process.env.NEXT_PUBLIC_DASH_PW ?? "bb2026";
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");

  // Form
  const [customerName, setCustomerName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [total, setTotal] = useState<number | "">("");
  const [advance, setAdvance] = useState<number | "">("");

  // Ledger
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const due = Math.max((Number(total) || 0) - (Number(advance) || 0), 0);

  // default invoice date = today (set on client to avoid hydration mismatch)
  useEffect(() => { setInvoiceDate(new Date().toISOString().slice(0, 10)); }, []);

  const loadInvoices = useCallback(async () => {
    setLoadingList(true);
    try {
      const res = await fetch("/api/invoice", { cache: "no-store" });
      const d = await res.json();
      setInvoices(d.invoices ?? []);
    } catch { /* ledger stays as-is */ }
    setLoadingList(false);
  }, []);

  function login() {
    if (pw === DASH_PW) { setAuth(true); loadInvoices(); }
    else alert("Wrong password");
  }

  // Projected next sequential ID (Apps Script assigns the authoritative one on save)
  const year = invoiceDate ? invoiceDate.slice(0, 4) : new Date().getFullYear().toString();
  const nextSeq = String(invoices.length + 1).padStart(3, "0");
  const previewId = `BB-${year}-${nextSeq}`;

  function toggleService(s: string) {
    setServices(prev => (prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]));
  }

  function flash(msg: string) { setToast(msg); setTimeout(() => setToast(""), 2600); }

  async function saveInvoice() {
    if (!customerName.trim()) return flash("⚠ Customer name is required");
    if (!/^\d{10}$/.test(whatsapp.trim())) return flash("⚠ Enter a valid 10-digit WhatsApp number");
    if (services.length === 0) return flash("⚠ Select at least one service");
    setSaving(true);
    try {
      const res = await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          customerName, whatsapp, invoiceDate, eventDate,
          services, total: Number(total) || 0, advance: Number(advance) || 0,
        }),
      });
      const d = await res.json();
      if (res.ok) {
        flash(`✓ Saved ${d.id || previewId}`);
        await loadInvoices();
      } else {
        flash(`⚠ ${d.error || "Save failed"}`);
      }
    } catch {
      flash("⚠ Network error — record backed up locally");
    }
    setSaving(false);
  }

  async function updateStatus(id: string, status: Status) {
    setInvoices(prev => prev.map(i => (i.id === id ? { ...i, status } : i))); // optimistic
    try {
      await fetch("/api/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "status", id, status }),
      });
    } catch { flash("⚠ Status sync failed — will retry on reload"); }
  }

  function resetForm() {
    setCustomerName(""); setWhatsapp(""); setEventDate("");
    setServices([]); setTotal(""); setAdvance("");
    setInvoiceDate(new Date().toISOString().slice(0, 10));
  }

  // Set a relevant filename for the "Save as PDF" dialog (browsers default to document.title).
  function downloadPDF() {
    const prev = document.title;
    const safeName = (customerName || "Invoice").trim().replace(/[^\w]+/g, "_").replace(/^_+|_+$/g, "") || "Invoice";
    document.title = `Blushes&Brushes_${safeName}_${previewId}`;
    window.print();
    window.setTimeout(() => { document.title = prev; }, 500);
  }

  /* ── Gate ── */
  if (!auth) {
    return (
      <div className="flex min-h-screen items-center justify-center" style={{ background: "linear-gradient(135deg,#FBEFE7 0%,#F4E6DE 30%,#E6F0EA 70%,#EFE4F0 100%)" }}>
        <div className="w-80 rounded-3xl border border-white bg-white/80 p-8 text-center shadow-xl backdrop-blur">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-3xl" style={{ background: "linear-gradient(135deg,#CFE9DF,#F3CDD3)" }}>🧾</div>
          <h1 className="text-xl font-bold" style={{ color: BRAND.tealDeep }}>B&amp;B Invoicing</h1>
          <p className="mt-1 text-[10px]" style={{ color: BRAND.tealDeep + "8c" }}>Internal billing &amp; ledger — private</p>
          <input className="mt-6 w-full rounded-xl border px-4 py-3 text-sm outline-none" style={{ borderColor: BRAND.teal + "40", background: BRAND.cream, color: BRAND.tealDeep }} type="password" placeholder="Password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} />
          <button onClick={login} className="mt-3 w-full rounded-xl py-3 text-sm font-bold text-white" style={{ background: `linear-gradient(135deg,${BRAND.teal},${BRAND.gold})` }}>Enter →</button>
        </div>
      </div>
    );
  }

  /* ── Tool ── */
  return (
    <div className="bb-root min-h-screen font-sans" style={{ background: "linear-gradient(160deg,#FBEFE7 0%,#F5E8DF 25%,#E8F0EB 55%,#F0E5F0 80%,#FBEFE7 100%)" }}>
      {/* print styles — only #bb-invoice-print survives on paper */}
      <style>{`
        @media print {
          @page { size: A4; margin: 14mm; }
          /* collapse all page height so no blank 2nd page is produced */
          html, body { height: auto !important; min-height: 0 !important; margin: 0 !important; padding: 0 !important; background: #fff !important; }
          .bb-root { min-height: 0 !important; height: auto !important; background: #fff !important; padding: 0 !important; }
          .no-print { display: none !important; }
          /* show only the invoice, print its brand colours faithfully */
          body * { visibility: hidden !important; }
          #bb-invoice-print, #bb-invoice-print * { visibility: visible !important; }
          #bb-invoice-print {
            position: absolute !important; left: 0; top: 0; width: 100%;
            box-shadow: none !important; border: none !important;
            -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
          }
          /* letterhead: black text on white (backgrounds don't print reliably) */
          #bb-invoice-print .bb-letterhead { background: #fff !important; border-bottom: 2px solid ${BRAND.gold} !important; }
          #bb-invoice-print .bb-letterhead, #bb-invoice-print .bb-letterhead * { color: #000 !important; }
        }
      `}</style>

      {toast && (
        <div className="no-print fixed inset-x-0 top-6 z-50 flex justify-center px-4">
          <div className="rounded-full px-6 py-3 text-sm font-bold text-white shadow-2xl" style={{ background: `linear-gradient(135deg,${BRAND.teal},${BRAND.gold})` }}>{toast}</div>
        </div>
      )}

      <div className="mx-auto max-w-6xl p-4">
        {/* Header */}
        <div className="no-print mb-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold" style={{ color: BRAND.tealDeep }}>Invoicing &amp; Ledger <span style={{ color: BRAND.gold }}>✦</span></h1>
            <p className="text-[10px]" style={{ color: BRAND.tealDeep + "8c" }}>Create · download · track client bills — GST-free</p>
          </div>
          <a href="/dashboard" className="rounded-xl border bg-white/70 px-3 py-2 text-[11px] font-semibold" style={{ borderColor: BRAND.teal + "33", color: BRAND.tealDeep }}>← Dashboard</a>
        </div>

        <div className="grid gap-5 lg:grid-cols-2">
          {/* ── LEFT: Intake form ── */}
          <div className="no-print space-y-4 rounded-3xl bg-white/85 p-6 shadow-sm backdrop-blur" style={{ border: `1px solid ${BRAND.teal}22` }}>
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: BRAND.tealDeep + "80" }}>New Invoice · {previewId}</p>

            <Field label="Customer Name" required>
              <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="e.g. Simran Kaur" className="bb-input" />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="WhatsApp Number" required>
                <input value={whatsapp} onChange={e => setWhatsapp(e.target.value.replace(/\D/g, "").slice(0, 10))} inputMode="numeric" placeholder="10-digit" className="bb-input" />
              </Field>
              <Field label="Invoice Date">
                <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} className="bb-input" />
              </Field>
            </div>

            <Field label="Event Date (optional)">
              <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} className="bb-input" />
            </Field>

            <Field label="Services Taken" required>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map(s => {
                  const on = services.includes(s);
                  return (
                    <button key={s} type="button" onClick={() => toggleService(s)}
                      className="rounded-full border px-3.5 py-1.5 text-[11px] font-semibold transition-all"
                      style={on
                        ? { background: `linear-gradient(135deg,${BRAND.teal},${BRAND.gold})`, color: "#fff", borderColor: "transparent" }
                        : { background: BRAND.cream, color: BRAND.tealDeep, borderColor: BRAND.teal + "33" }}>
                      {on ? "✓ " : ""}{s}
                    </button>
                  );
                })}
              </div>
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Total Amount (₹)">
                <input inputMode="numeric" value={grp(total)} onChange={e => { const n = e.target.value.replace(/[^\d]/g, ""); setTotal(n === "" ? "" : Number(n)); }} placeholder="0" className="bb-input" />
              </Field>
              <Field label="Advance Paid (₹)">
                <input inputMode="numeric" value={grp(advance)} onChange={e => { const n = e.target.value.replace(/[^\d]/g, ""); setAdvance(n === "" ? "" : Number(n)); }} placeholder="0" className="bb-input" />
              </Field>
            </div>

            <div className="flex items-center justify-between rounded-2xl px-4 py-3" style={{ background: `linear-gradient(135deg,${BRAND.peach}88,${BRAND.cream})`, border: `1px solid ${BRAND.gold}44` }}>
              <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: BRAND.tealDeep }}>Total Due</span>
              <span className="text-2xl font-extrabold" style={{ color: BRAND.goldDeep }}>{inr(due)}</span>
            </div>

            <div className="flex gap-2 pt-1">
              <button onClick={saveInvoice} disabled={saving} className="flex-1 rounded-xl py-3 text-sm font-bold text-white disabled:opacity-50" style={{ background: `linear-gradient(135deg,${BRAND.teal},${BRAND.gold})` }}>
                {saving ? "Saving…" : "💾 Save to Ledger"}
              </button>
              <button onClick={downloadPDF} className="rounded-xl border px-4 py-3 text-sm font-bold" style={{ borderColor: BRAND.gold, color: BRAND.goldDeep, background: "#fff" }}>⬇ PDF</button>
              <button onClick={resetForm} className="rounded-xl border px-4 py-3 text-sm font-semibold" style={{ borderColor: BRAND.teal + "33", color: BRAND.tealDeep, background: "#fff" }}>Clear</button>
            </div>
          </div>

          {/* ── RIGHT: Live print-ready invoice ── */}
          <div id="bb-invoice-print" className="overflow-hidden rounded-3xl bg-white shadow-lg" style={{ border: `1px solid ${BRAND.teal}22` }}>
            {/* Letterhead — business identity: logo · name · address · contact */}
            <div className="bb-letterhead flex items-start gap-4 px-8 py-6" style={{ background: `linear-gradient(120deg,${BRAND.tealDeep},${BRAND.teal} 60%,${BRAND.gold})` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.jpeg" alt="Blushes & Brushes" className="h-16 w-16 shrink-0 rounded-full border-2 border-white/70 object-cover" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold leading-tight text-white" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>Blushes &amp; Brushes</h2>
                <p className="text-[10px] font-semibold tracking-widest text-white/85">BRIDAL MAKEUP · NAIL ART · BEAUTY STUDIO</p>
                <div className="mt-2 space-y-0.5 text-[9.5px] leading-snug text-white/80">
                  <p>B 1/1 Double Storey, Ramesh Nagar, Opp. Subway, New Delhi – 110015</p>
                  <p>WhatsApp 76784 46364 · www.blushesnbrushes.com</p>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[9px] uppercase tracking-widest text-white/70">Invoice</p>
                <p className="text-lg font-bold text-white">{previewId}</p>
                <p className="mt-1 text-[9px] text-white/75">{fmtDate(invoiceDate)}</p>
              </div>
            </div>

            <div className="px-8 py-6">
              {/* Meta row */}
              <div className="mb-6 flex flex-wrap justify-between gap-4 text-[11px]">
                <div>
                  <p className="font-bold uppercase tracking-widest" style={{ color: BRAND.teal }}>Billed To</p>
                  <p className="mt-1 text-base font-bold" style={{ color: BRAND.tealDeep }}>{customerName || "—"}</p>
                  <p style={{ color: BRAND.tealDeep + "aa" }}>{whatsapp ? `+91 ${whatsapp}` : "—"}</p>
                </div>
                <div className="text-right">
                  <p style={{ color: BRAND.tealDeep + "aa" }}><span className="font-semibold" style={{ color: BRAND.teal }}>Invoice Date:</span> {fmtDate(invoiceDate)}</p>
                  {eventDate && <p style={{ color: BRAND.tealDeep + "aa" }}><span className="font-semibold" style={{ color: BRAND.teal }}>Event Date:</span> {fmtDate(eventDate)}</p>}
                </div>
              </div>

              {/* Services */}
              <table className="w-full text-[12px]">
                <thead>
                  <tr style={{ background: BRAND.cream }}>
                    <th className="rounded-l-lg px-4 py-2.5 text-left font-bold uppercase tracking-wide" style={{ color: BRAND.tealDeep }}>Service</th>
                    <th className="rounded-r-lg px-4 py-2.5 text-right font-bold uppercase tracking-wide" style={{ color: BRAND.tealDeep }}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {(services.length ? services : ["—"]).map((s, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${BRAND.teal}18` }}>
                      <td className="px-4 py-2.5 font-semibold" style={{ color: BRAND.tealDeep }}>{s}</td>
                      <td className="px-4 py-2.5 text-right" style={{ color: BRAND.tealDeep + "99" }}>Premium service</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals */}
              <div className="mt-6 ml-auto w-full max-w-xs space-y-1.5 text-[13px]">
                <Row label="Total Amount" value={inr(Number(total) || 0)} />
                <Row label="Advance Paid" value={`− ${inr(Number(advance) || 0)}`} />
                <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: `linear-gradient(135deg,${BRAND.peach}77,${BRAND.cream})`, border: `1px solid ${BRAND.gold}55` }}>
                  <span className="text-[12px] font-bold uppercase tracking-wide" style={{ color: BRAND.tealDeep }}>Balance Due</span>
                  <span className="text-xl font-extrabold" style={{ color: BRAND.goldDeep }}>{inr(due)}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 border-t pt-4 text-center" style={{ borderColor: BRAND.teal + "22" }}>
                <p className="text-[13px] font-bold" style={{ color: BRAND.teal, fontFamily: "'Playfair Display', Georgia, serif" }}>Thank you for choosing Blushes &amp; Brushes 🌸</p>
                <p className="mt-1 text-[9px] tracking-wide" style={{ color: BRAND.tealDeep + "88" }}>Payments via UPI / Cash / Bank transfer · Balance due before event date · This is a computer-generated invoice.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Ledger ── */}
        <div className="no-print mt-6 rounded-3xl bg-white/85 p-6 shadow-sm backdrop-blur" style={{ border: `1px solid ${BRAND.teal}22` }}>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: BRAND.tealDeep + "80" }}>Ledger · {invoices.length} record{invoices.length === 1 ? "" : "s"}</p>
            <button onClick={loadInvoices} disabled={loadingList} className="rounded-xl border bg-white/70 px-3 py-1.5 text-[11px] font-semibold" style={{ borderColor: BRAND.teal + "33", color: BRAND.tealDeep }}>{loadingList ? "…" : "↻ Refresh"}</button>
          </div>

          {invoices.length === 0 ? (
            <p className="py-8 text-center text-[12px]" style={{ color: BRAND.tealDeep + "66" }}>No invoices yet. Save one above to start the ledger.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-[12px]">
                <thead>
                  <tr className="text-left" style={{ color: BRAND.tealDeep + "80" }}>
                    <th className="px-3 py-2 font-bold uppercase tracking-wide">Invoice</th>
                    <th className="px-3 py-2 font-bold uppercase tracking-wide">Customer</th>
                    <th className="px-3 py-2 font-bold uppercase tracking-wide">Services</th>
                    <th className="px-3 py-2 text-right font-bold uppercase tracking-wide">Total</th>
                    <th className="px-3 py-2 text-right font-bold uppercase tracking-wide">Due</th>
                    <th className="px-3 py-2 font-bold uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map(inv => (
                    <tr key={inv.id} style={{ borderTop: `1px solid ${BRAND.teal}15` }}>
                      <td className="px-3 py-2.5 font-bold" style={{ color: BRAND.goldDeep }}>{inv.id}</td>
                      <td className="px-3 py-2.5">
                        <p className="font-semibold" style={{ color: BRAND.tealDeep }}>{inv.customerName}</p>
                        <p className="text-[10px]" style={{ color: BRAND.tealDeep + "88" }}>+91 {inv.whatsapp}</p>
                      </td>
                      <td className="px-3 py-2.5" style={{ color: BRAND.tealDeep + "cc" }}>{inv.services}</td>
                      <td className="px-3 py-2.5 text-right font-semibold" style={{ color: BRAND.tealDeep }}>{inr(inv.total)}</td>
                      <td className="px-3 py-2.5 text-right font-bold" style={{ color: inv.due > 0 ? BRAND.goldDeep : "#2E7D6E" }}>{inr(inv.due)}</td>
                      <td className="px-3 py-2.5">
                        <select value={inv.status} onChange={e => updateStatus(inv.id, e.target.value as Status)}
                          className={`cursor-pointer rounded-full border px-3 py-1 text-[11px] font-semibold outline-none ${STATUS_STYLE[inv.status] ?? STATUS_STYLE.Pending}`}>
                          {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="no-print mt-6 text-center text-[9px]" style={{ color: BRAND.tealDeep + "4d" }}>BB Invoicing · Internal · {new Date().getFullYear()}</p>
      </div>

      <style>{`
        .bb-input {
          width: 100%; border-radius: 0.75rem; border: 1px solid ${BRAND.teal}40;
          background: ${BRAND.cream}; padding: 0.6rem 0.85rem; font-size: 0.8rem;
          color: ${BRAND.tealDeep}; outline: none;
        }
        .bb-input:focus { border-color: ${BRAND.teal}; }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide" style={{ color: BRAND.tealDeep + "80" }}>
        {label}{required && <span style={{ color: BRAND.gold }}> *</span>}
      </label>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-1">
      <span style={{ color: BRAND.tealDeep + "aa" }}>{label}</span>
      <span className="font-semibold" style={{ color: BRAND.tealDeep }}>{value}</span>
    </div>
  );
}
