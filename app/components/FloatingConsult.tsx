import Link from "next/link";

// Always-visible, gentle lead nudge on every deep page.
// Not salesy: "Free consultation" framing, one tap to the homepage booking form.
export default function FloatingConsult() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4">
      <Link
        href="/#book"
        className="pointer-events-auto flex items-center gap-2 rounded-full px-6 py-3 text-[13px] font-bold text-white shadow-2xl"
        style={{ background: "linear-gradient(120deg,#2E8B83,#C9A55C)" }}
      >
        <span>💬</span> Get a free consultation
      </Link>
    </div>
  );
}
