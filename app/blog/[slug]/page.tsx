import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { POSTS, getPost, type Block } from "../posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found | Blushes & Brushes" };
  const url = `https://blushesnbrushes.com/blog/${post.slug}`;
  return {
    title: `${post.title} | Blushes & Brushes`,
    description: post.description,
    keywords: post.keywords.join(", "),
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      images: [{ url: post.cover, alt: post.title }],
      siteName: "Blushes & Brushes by Urvashi Trehan",
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description, images: [post.cover] },
  };
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

function Blocks({ body }: { body: Block[] }) {
  return (
    <>
      {body.map((b, i) => {
        if ("h" in b) return <h2 key={i} className="mt-8 mb-2 text-[20px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>{b.h}</h2>;
        if ("ul" in b) return (
          <ul key={i} className="my-3 space-y-2 pl-1">
            {b.ul.map((li, j) => (
              <li key={j} className="flex gap-2.5 text-[14px] leading-relaxed text-[#1A5A54]/85">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A55C]" />
                <span>{li}</span>
              </li>
            ))}
          </ul>
        );
        return <p key={i} className="my-3 text-[14px] leading-[1.75] text-[#1A5A54]/85">{b.p}</p>;
      })}
    </>
  );
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    image: `https://blushesnbrushes.com${post.cover}`,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    author: { "@type": "Person", name: "Urvashi Trehan", jobTitle: "Makeup Artist", worksFor: { "@type": "BeautySalon", name: "Blushes & Brushes" } },
    publisher: {
      "@type": "Organization",
      name: "Blushes & Brushes",
      logo: { "@type": "ImageObject", url: "https://blushesnbrushes.com/images/logo.jpeg" },
    },
    mainEntityOfPage: `https://blushesnbrushes.com/blog/${post.slug}`,
  };

  // FAQPage schema — consumed by Google rich results AND AI assistants (ChatGPT/Gemini/Claude web search)
  const faqLd = post.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <main className="mx-auto max-w-2xl px-5 py-10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}

      <Link href="/blog" className="text-[12px] font-semibold text-[#C9A55C]">← Journal</Link>

      <div className="mt-4 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wide">
        <span className="rounded-full bg-[#CFE9DF] px-2.5 py-0.5 text-[#2E7D6E]">{post.category}</span>
        <span className="text-[#1A5A54]/40">{fmt(post.date)} · {post.readMins} min read</span>
      </div>

      <h1 className="mt-3 text-[28px] font-bold leading-tight md:text-[34px]" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>
        {post.title}
      </h1>

      <div className="mt-5 overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.cover} alt={post.title} className="w-full object-cover" />
      </div>

      <article className="mt-6">
        <Blocks body={post.body} />
      </article>

      {/* FAQ — visible Q&A mirrors the FAQPage schema (direct-answer format AI assistants cite) */}
      {post.faq && post.faq.length > 0 && (
        <section className="mt-10">
          <h2 className="text-[20px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Frequently asked questions</h2>
          <div className="mt-4 space-y-3">
            {post.faq.map((f, i) => (
              <details key={i} className="group rounded-2xl border border-[#C9A55C]/25 bg-white/80 p-4">
                <summary className="cursor-pointer list-none text-[14px] font-semibold text-[#1A5A54]">
                  {f.q}
                </summary>
                <p className="mt-2 text-[13px] leading-relaxed text-[#1A5A54]/80">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <div className="mt-10 rounded-3xl p-6 text-center text-white shadow-md" style={{ background: "linear-gradient(120deg,#2E8B83,#5FB3A3 55%,#C9A55C)" }}>
        <p className="text-[18px] font-bold" style={{ fontFamily: "var(--font-playfair), serif" }}>Ready to book your look?</p>
        <p className="mx-auto mt-1 max-w-md text-[12px] text-white/90">Bridal &amp; party makeup, nail art and beauty by Urvashi Trehan — 4.8★, 200+ happy brides across Delhi NCR.</p>
        <Link href="/book" className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-[13px] font-bold text-[#1A5A54]">Book on WhatsApp →</Link>
      </div>
    </main>
  );
}
