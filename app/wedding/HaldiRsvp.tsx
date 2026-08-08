"use client";

import { useState, FormEvent } from "react";

// Headcount for the Haldi nail-art stall - but the stall is a surprise, so
// nothing here names it. The number is asked for as the price of admission to
// something unnamed, which people answer far more readily than a survey.
export default function HaldiRsvp() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [ladies, setLadies] = useState("");
  const [attending, setAttending] = useState("Haldi + Mehendi (11 Dec)");
  const [note, setNote] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setErr("We need to know who you are, at minimum.");
    if (!/^\d{10}$/.test(phone.replace(/\D/g, ""))) return setErr("A 10-digit number, so we can send you the location.");
    setErr("");
    setState("sending");
    try {
      const r = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: phone.replace(/\D/g, ""), ladies, attending, note }),
      });
      setState(r.ok ? "done" : "error");
      if (!r.ok) setErr("Something broke. WhatsApp Piyush instead and he will add you.");
    } catch {
      setState("error");
      setErr("Network error. WhatsApp Piyush and he will add you.");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-3xl border border-[#C9A55C]/30 bg-white/80 p-7 text-center">
        <p className="text-[22px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#2E8B83" }}>
          You are on the list, {name.split(" ")[0]}
        </p>
        <p className="mx-auto mt-2 max-w-md text-[13px] leading-relaxed text-[#1A5A54]/75">
          {ladies && Number(ladies) > 0
            ? `${ladies} place${Number(ladies) === 1 ? "" : "s"} held for the surprise. Come in the afternoon, and do not let Piyush tell you what it is.`
            : "See you there. If more of you decide to come, just tell Piyush."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="rounded-3xl border border-[#C9A55C]/30 bg-white/75 p-6">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#1A5A54]/60">Your name</span>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="So we know who to hug at the gate"
            className="rounded-xl border border-[#C9A55C]/30 bg-[#FCFBF7] px-4 py-3 text-[14px] outline-none focus:border-[#2E8B83]" />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#1A5A54]/60">WhatsApp number</span>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" inputMode="numeric" placeholder="10 digits"
            className="rounded-xl border border-[#C9A55C]/30 bg-[#FCFBF7] px-4 py-3 text-[14px] outline-none focus:border-[#2E8B83]" />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#1A5A54]/60">Which day are you coming?</span>
          <select value={attending} onChange={(e) => setAttending(e.target.value)}
            className="rounded-xl border border-[#C9A55C]/30 bg-[#FCFBF7] px-4 py-3 text-[14px] outline-none focus:border-[#2E8B83]">
            <option>Haldi + Mehendi (11 Dec)</option>
            <option>Sagan (10 Dec)</option>
            <option>Wedding (12 Dec)</option>
            <option>All of it, obviously</option>
          </select>
        </label>

        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#1A5A54]/60">
            How many ladies are coming with you?
          </span>
          <input value={ladies} onChange={(e) => setLadies(e.target.value.replace(/\D/g, "").slice(0, 2))}
            type="text" inputMode="numeric" placeholder="Count your mother. She will absolutely want in."
            className="rounded-xl border border-[#C9A55C]/30 bg-[#FCFBF7] px-4 py-3 text-[14px] outline-none focus:border-[#2E8B83]" />
          <span className="text-[11px] text-[#1A5A54]/50">
            This is the only number we need. It decides how many places we hold.
          </span>
        </label>

        <label className="flex flex-col gap-1 sm:col-span-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#1A5A54]/60">Anything we should know? (optional)</span>
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Allergies, a song you want played, anything at all"
            className="rounded-xl border border-[#C9A55C]/30 bg-[#FCFBF7] px-4 py-3 text-[14px] outline-none focus:border-[#2E8B83]" />
        </label>
      </div>

      {err && <p className="mt-3 rounded-lg bg-[#F3CDD3]/50 px-3 py-2 text-[12px] text-[#8B3A4A]">{err}</p>}

      <button type="submit" disabled={state === "sending"}
        className="mt-4 w-full rounded-full py-3.5 text-[13px] font-bold uppercase tracking-widest text-white disabled:opacity-60"
        style={{ background: "linear-gradient(120deg,#2E8B83,#5FB3A3 55%,#C9A55C)" }}>
        {state === "sending" ? "Saving your seat…" : "Count us in →"}
      </button>
    </form>
  );
}
