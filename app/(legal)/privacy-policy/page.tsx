import type { Metadata } from "next";
import Link from "next/link";
import { getLegal } from "../legalData";

const SLUG = "privacy-policy";
const page = getLegal(SLUG)!;

export const metadata: Metadata = {
  title: page.title,
  description: page.description,
  alternates: { canonical: `https://blushesnbrushes.com/${SLUG}` },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-10">
      <nav className="text-[11px] text-[#1A5A54]/55"><Link href="/" className="hover:text-[#C9A55C]">Home</Link> · <span className="text-[#1A5A54]/80">{page.h1}</span></nav>
      <h1 className="mt-3 text-[28px] font-bold leading-tight md:text-[34px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>{page.h1}</h1>
      <p className="mt-1 text-[11px] text-[#1A5A54]/50">Last updated: {page.updated}</p>
      <p className="mt-4 text-[14px] leading-[1.75] text-[#1A5A54]/85">{page.intro}</p>
      {page.sections.map((s, i) => (
        <section key={i} className="mt-7">
          <h2 className="mb-2 text-[19px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>{s.h}</h2>
          {s.p && <p className="text-[14px] leading-[1.75] text-[#1A5A54]/85">{s.p}</p>}
          {s.ul && (
            <ul className="mt-2 space-y-2">
              {s.ul.map((li, j) => (
                <li key={j} className="flex gap-2.5 text-[14px] leading-relaxed text-[#1A5A54]/85"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A55C]" /><span>{li}</span></li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </main>
  );
}
