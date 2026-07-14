import Link from "next/link";
import { POSTS } from "./posts";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <main className="mx-auto max-w-4xl px-5 py-12">
      <div className="text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C9A55C]">The Blushes &amp; Brushes Journal</p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
          Bridal, Nail &amp; Beauty Tips
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-[#1A5A54]/70">
          Honest, artist-tested advice on makeup, nails and skin — from Urvashi Trehan&rsquo;s studio in Ramesh Nagar, West Delhi.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group overflow-hidden rounded-3xl border border-[#C9A55C]/20 bg-white/80 shadow-sm transition-all hover:shadow-lg"
          >
            <div className="aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.cover} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide">
                <span className="rounded-full bg-[#CFE9DF] px-2.5 py-0.5 text-[#2E7D6E]">{p.category}</span>
                <span className="text-[#1A5A54]/40">{fmt(p.date)} · {p.readMins} min read</span>
              </div>
              <h2 className="mt-2 text-[17px] font-bold leading-snug" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
                {p.title}
              </h2>
              <p className="mt-2 text-[12px] leading-relaxed text-[#1A5A54]/65">{p.description}</p>
              <span className="mt-3 inline-block text-[12px] font-semibold text-[#C9A55C] group-hover:underline">Read more →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
