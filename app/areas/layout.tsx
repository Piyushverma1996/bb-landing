import { Playfair_Display, Montserrat } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });

export default function AreasLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${playfair.variable} ${montserrat.variable} min-h-screen`}
      style={{ background: "linear-gradient(160deg,#FBF4EA 0%,#FCFBF7 40%,#F3EFE6 100%)", fontFamily: "var(--font-montserrat), sans-serif", color: "#1A5A54" }}
    >
      <header className="sticky top-0 z-40 border-b border-[#C9A55C]/20 bg-[#FBF4EA]/85 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <Link href="/" className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.jpeg" alt="Blushes & Brushes" className="h-9 w-9 rounded-full object-cover" />
            <span className="text-[15px] font-bold" style={{ fontFamily: "var(--font-playfair), serif", color: "#1A5A54" }}>Blushes &amp; Brushes</span>
          </Link>
          <nav className="flex items-center gap-3.5 text-[11.5px] font-semibold sm:gap-4">
            <Link href="/services" className="text-[#1A5A54]/70 hover:text-[#1A5A54]">Services</Link>
            <Link href="/areas" className="text-[#1A5A54]/70 hover:text-[#1A5A54]">Areas</Link>
            <a href="/#book" className="rounded-full px-3.5 py-1.5 text-white" style={{ background: "linear-gradient(135deg,#2E8B83,#C9A55C)" }}>Free Consult</a>
          </nav>
        </div>
      </header>
      {children}
      <footer className="mt-16 border-t border-[#C9A55C]/20 py-8 text-center text-[11px] text-[#1A5A54]/60">
        <p className="mb-1" style={{ fontFamily: "var(--font-playfair), serif", fontSize: "15px", color: "#2E8B83" }}>Blushes &amp; Brushes</p>
        <p>B 1/1 Double Storey, Ramesh Nagar, Opp. Subway, New Delhi 110015 · WhatsApp 76784 46364</p>
        <p className="mt-2"><Link href="/areas" className="text-[#C9A55C] font-semibold">See all areas we serve →</Link></p>
      </footer>
    </div>
  );
}
