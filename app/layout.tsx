import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import MetaPixel from "./components/MetaPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blushesnbrushes.com"),
  title: "Bridal & Party Makeup, Nail Art & Beauty | Blushes & Brushes by Urvashi Trehan – Ramesh Nagar, Delhi",
  description:
    "Look flawless on your big day. Bridal & party makeup, nail art and beauty by Urvashi Trehan. HD & airbrush bridal, travels across Delhi NCR. Studio in Ramesh Nagar. Book on WhatsApp — 4.8★, 200+ happy brides.",
  keywords:
    "bridal makeup delhi, party makeup ramesh nagar, nail art delhi, nail extensions, airbrush bridal makeup, engagement roka makeup, keratin hair spa, makeup artist west delhi, Urvashi Trehan, Blushes and Brushes",
  openGraph: {
    title: "Look Flawless on Every Big Day | Blushes & Brushes by Urvashi Trehan",
    description:
      "Bridal & party makeup, nail art & beauty. HD & airbrush bridal, travels across Delhi NCR. 4.8★, 200+ happy brides. Book your look on WhatsApp.",
    url: "https://blushesnbrushes.com",
    siteName: "Blushes & Brushes by Urvashi Trehan",
    images: [{ url: "/images/bridal-hero.jpg", width: 712, height: 892, alt: "Bridal makeup by Urvashi Trehan" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bridal & Party Makeup, Nail Art & Beauty | Blushes & Brushes",
    description: "Look flawless on your big day. Book bridal, party, nails & beauty with Urvashi Trehan — Ramesh Nagar, Delhi.",
    images: ["/images/bridal-hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
