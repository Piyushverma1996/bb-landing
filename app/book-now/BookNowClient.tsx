"use client";
import { useEffect, useState } from "react";

const SERVICES = [
  "Bridal Makeup", "Engagement / Roka / Sagan Makeup", "Party Makeup",
  "Nail Extensions ₹499 offer", "Nail Art / Designer set", "Beauty — cleanup / facial / pamper", "Not sure yet — need advice",
];

const WA = "917678446364";
type Gtag = (event: string, params?: Record<string, unknown>) => void;
const track: Gtag = (e, p) => { const w = window as unknown as { gtag?: Gtag }; if (w.gtag) w.gtag(e, p); };

export default function BookNowClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [src, setSrc] = useState("book-now");
  const [msg, setMsg] = useState("");
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      const p = new URLSearchParams(window.location.search);
      const s = p.get("s") || p.get("utm_source");
      if (s) setSrc(`book-now-${s}`);
    } catch { /* ignore */ }
  }, []);

  function waLink() {
    let m = "Hi Urvashi!\nI'd like a free consultation";
    if (service) m += ` for ${service}`;
    if (name) m += `. My name is ${name}`;
    if (date) m += ` and my date is ${date}`;
    m += ". Could you please share the details?";
    return `https://wa.me/${WA}?text=${encodeURIComponent(m)}`;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setMsg("Please enter your name.");
    if (!/^\d{10}$/.test(phone.trim())) return setMsg("Enter a valid 10-digit WhatsApp number.");
    setSaving(true); setMsg("Sending…");
    try {
      const r = await fetch("/api/lead", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, course: service || "Free consultation", notes: date ? `Date: ${date}` : "", source: src }),
      });
      const d = await r.json();
      if (d.ok) {
        track("generate_lead", { source: src, service });
        setDone(true);
      } else setMsg(d.error || "Something went wrong. Please try again.");
    } catch { setMsg("Network error. Please try again."); }
    setSaving(false);
  }

  const field = "w-full rounded-xl border border-[#2E8B83]/30 bg-[#FBF4EA] px-4 py-3 text-[14px] text-[#1A5A54] outline-none focus:border-[#2E8B83]";

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-5 py-10">
      <div className="text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/logo.jpeg" alt="Blushes & Brushes" className="mx-auto h-16 w-16 rounded-full border-2 border-[#C9A55C]/50 object-cover" />
        <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A55C]">✦ 100% Free consultation</p>
        <h1 className="mt-1 text-2xl font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Book with Blushes &amp; Brushes</h1>
        <p className="mt-2 text-[12.5px] text-[#1A5A54]/70">Bridal · Party · Nails · Beauty · Ramesh Nagar &amp; across Delhi NCR. Urvashi replies personally within the hour — no pressure.</p>
      </div>

      {done ? (
        <div className="mt-8 rounded-3xl bg-white/85 p-6 text-center shadow-sm">
          <p className="text-[20px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#B8893B" }}>Thank you, {name} 💌</p>
          <p className="mt-1 text-[13px] text-[#1A5A54]/75">Urvashi will WhatsApp you within the hour. Want to reach her right now?</p>
          <a href={waLink()} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-[14px] font-bold text-white">Chat on WhatsApp now →</a>
        </div>
      ) : (
        <form onSubmit={submit} className="mt-8 space-y-3 rounded-3xl bg-white/85 p-6 shadow-sm">
          <input className={field} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          <input className={field} placeholder="WhatsApp number (10 digits)" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))} autoComplete="tel" />
          <select className={field} value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">What can we help you with?</option>
            {SERVICES.map((s) => <option key={s}>{s}</option>)}
          </select>
          <input className={field} placeholder="Event / preferred date (optional)" value={date} onChange={(e) => setDate(e.target.value)} />
          {msg && <p className="text-center text-[12px] text-[#b04a3f]">{msg}</p>}
          <button type="submit" disabled={saving} className="w-full rounded-xl py-3.5 text-[14px] font-bold text-white disabled:opacity-50" style={{ background: "linear-gradient(120deg,#2E8B83,#C9A55C)" }}>
            {saving ? "Sending…" : "Get my free consultation →"}
          </button>
          <div className="text-center text-[10px] uppercase tracking-widest text-[#1A5A54]/45">— or chat instantly —</div>
          <a href={waLink()} onClick={() => track("whatsapp_click", { source: src })} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-[14px] font-bold text-white">
            <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" style={{ width: 18, height: 18, fill: "#fff" }}><path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.2-.2.3-.7 1-.9 1.1-.2.2-.3.2-.6.1-1.7-.9-2.9-1.6-4-3.6-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6 2 .8 2.7.9 3.7.8.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 00-8.6 15l-1.3 4.7 4.9-1.3A10 10 0 1012 2z"/></svg>
            Send Urvashi my details on WhatsApp
          </a>
          <p className="pt-1 text-center text-[11px] text-[#1A5A54]/50">🔒 Your number stays private · ⭐ 4.8★ · 200+ brides</p>
        </form>
      )}
    </main>
  );
}
