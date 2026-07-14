"use client";

import { useState, FormEvent } from "react";
import { trackLead } from "./MetaPixel";

type FormState = "idle" | "loading" | "success" | "error";

const SERVICE_OPTIONS = [
  { value: "", label: "— What can we do for you? —" },
  { value: "Bridal Makeup", label: "Bridal Makeup (HD / Airbrush)" },
  { value: "Party / Engagement / Roka Makeup", label: "Party / Engagement / Roka Makeup" },
  { value: "Nail Art & Extensions", label: "Nail Art & Extensions" },
  { value: "Beauty (Keratin / Hair Spa / Facial)", label: "Beauty — Keratin, Hair Spa, Facial" },
  { value: "Something else", label: "Something else" },
];

const COURSE_OPTIONS = [
  { value: "", label: "— Select a Course —" },
  { value: "Makeup Course", label: "Professional Makeup Course" },
  { value: "Nail Extensions Master Course", label: "Nail Extensions & Nail Art Course" },
  { value: "Beauty Master Course", label: "Beauty Master Course" },
];

export default function LeadForm({ compact = false, variant = "service" }: { compact?: boolean; variant?: "service" | "course" }) {
  const isCourse = variant === "course";
  const COURSES = isCourse ? COURSE_OPTIONS : SERVICE_OPTIONS;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  const validate = (): string => {
    if (!name.trim()) return "Please enter your full name.";
    if (!/^\d{10}$/.test(phone.trim())) return "Enter a valid 10-digit WhatsApp number.";
    if (!course) return "Please tell us what you're looking for.";
    return "";
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setFormState("loading");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, course }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setFormState("error");
      } else {
        trackLead({ name, phone, course });
        setFormState("success");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setFormState("error");
    }
  }

  if (formState === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-brand-teal px-6 py-10 text-center shadow-xl">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold text-3xl">
          ✓
        </div>
        <h3 className="text-xl font-bold text-white">
          {isCourse ? "You’re booked in!" : "Request received! 🌸"}
        </h3>
        <p className="text-brand-gold-light text-sm leading-relaxed">
          Thanks! Urvashi&rsquo;s team will WhatsApp you shortly on{" "}
          <span className="font-semibold text-white">{phone}</span>{" "}
          {isCourse ? "to confirm your free trial class spot." : "to confirm your appointment and share details."}
        </p>
        <p className="mt-2 text-xs text-white/60">
          Blushes &amp; Brushes · Ramesh Nagar, Delhi
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={`flex flex-col gap-3 rounded-2xl bg-white shadow-xl ring-1 ring-brand-cream-dark ${
        compact ? "px-5 py-6" : "px-6 py-8"
      }`}
    >
      {!compact && (
        <div className="mb-1 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {isCourse ? "Free 1-Day Trial Class" : "Book Your Appointment"}
          </p>
          <h3 className="mt-1 text-xl font-bold text-brand-teal">
            {isCourse ? "Reserve Your Spot Today" : "Reserve Your Slot"}
          </h3>
          <p className="mt-1 text-sm text-brand-teal/60">
            {isCourse ? "No fees · No commitment · Walk in & experience the academy" : "Bridal · Party · Nails · Beauty · Quick WhatsApp confirmation"}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wide text-brand-teal/70">
          Full Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Priya Sharma"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-brand-cream-dark bg-brand-cream px-4 py-3 text-sm text-brand-dark placeholder:text-brand-teal/30 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wide text-brand-teal/70">
          WhatsApp Number
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="10-digit number"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
          className="rounded-lg border border-brand-cream-dark bg-brand-cream px-4 py-3 text-sm text-brand-dark placeholder:text-brand-teal/30 focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="course" className="text-xs font-semibold uppercase tracking-wide text-brand-teal/70">
          {isCourse ? "Course of Interest" : "What are you looking for?"}
        </label>
        <select
          id="course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="rounded-lg border border-brand-cream-dark bg-brand-cream px-4 py-3 text-sm text-brand-dark focus:border-brand-teal focus:outline-none focus:ring-2 focus:ring-brand-teal/20"
        >
          {COURSES.map((c) => (
            <option key={c.value} value={c.value} disabled={c.value === ""}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={formState === "loading"}
        className="mt-1 rounded-xl bg-brand-teal px-6 py-4 text-sm font-bold uppercase tracking-widest text-brand-gold shadow-lg transition-all hover:bg-brand-teal-light active:scale-95 disabled:opacity-60"
      >
        {formState === "loading" ? "Sending…" : isCourse ? "Book My Free Trial Class →" : "Book My Slot →"}
      </button>

      <p className="text-center text-[10px] text-brand-teal/40">
        By submitting, you agree to be contacted via WhatsApp. We never spam.
      </p>
    </form>
  );
}
