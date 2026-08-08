import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });

export const metadata: Metadata = {
  title: "Uru ke Piya · Urvashi & Piyush · 12 December 2026",
  description: "Wedding details, event schedule and RSVP for Urvashi and Piyush, December 2026.",
  // Guest-facing and private: event dates, venues and an RSVP form. Guests
  // arrive from the invite link, not from search, so there is nothing to gain
  // from indexing and a real privacy cost. follow:true so the links to the
  // studio pages still pass value.
  robots: { index: false, follow: true },
};

export default function WeddingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${playfair.variable} ${montserrat.variable} min-h-screen`}
      style={{
        background: "linear-gradient(170deg,#FFF8ED 0%,#FDF0E2 18%,#FFFDF9 42%,#FBF1F3 70%,#F4EFE4 100%)",
        fontFamily: "var(--font-montserrat), sans-serif",
        color: "#1A5A54",
      }}
    >
      {children}
      <footer className="mx-auto max-w-3xl px-5 pb-10 pt-4 text-center">
        <p className="text-[11px] text-[#1A5A54]/50">
          Made with a lot of love by the groom, hosted on the bride&rsquo;s{" "}
          <Link href="/" className="font-semibold text-[#2E8B83] underline decoration-[#C9A55C]/50 underline-offset-2">
            studio website
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}
