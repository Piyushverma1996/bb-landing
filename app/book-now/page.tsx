import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import BookNowClient from "./BookNowClient";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat", display: "swap" });

export const metadata: Metadata = {
  title: "Book Now — Free Consultation | Blushes & Brushes, Ramesh Nagar",
  description: "Book bridal, party, nails or beauty with Urvashi Trehan — free consultation, reply within the hour. Ramesh Nagar & across Delhi NCR.",
  alternates: { canonical: "https://blushesnbrushes.com/book-now" },
  robots: { index: false, follow: true }, // conversion page for IG/GBP traffic — keep out of search
};

export default function BookNowPage() {
  return (
    <div className={`${playfair.variable} ${montserrat.variable}`} style={{ background: "linear-gradient(160deg,#FBEFE7 0%,#F5E8DF 30%,#E8F0EB 65%,#F0E5F0 100%)", fontFamily: "var(--font-montserrat), sans-serif" }}>
      <BookNowClient />
    </div>
  );
}
