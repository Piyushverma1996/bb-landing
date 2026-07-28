// Trust pages - required by the SEO audit (Prompt 7: Trust & Conversion).
// Google's E-E-A-T and most directories/portals expect these to exist.

export interface Section { h: string; p?: string; ul?: string[] }
export interface LegalPage {
  slug: string;
  title: string;
  h1: string;
  description: string;
  updated: string;
  intro: string;
  sections: Section[];
}

export const LEGAL: LegalPage[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy | Blushes & Brushes, Ramesh Nagar",
    h1: "Privacy Policy",
    description: "How Blushes & Brushes collects, uses and protects your personal information when you book a consultation or use blushesnbrushes.com.",
    updated: "28 July 2026",
    intro: "Blushes & Brushes by Urvashi Trehan (\"we\", \"us\") respects your privacy. This policy explains what information we collect when you contact us or use blushesnbrushes.com, how we use it, and the choices you have.",
    sections: [
      { h: "Information we collect", ul: [
        "Contact details you provide voluntarily: name, WhatsApp/phone number, and (optionally) your event date and service interest, submitted through our consultation form or WhatsApp.",
        "Basic analytics data: pages visited, approximate location, device and browser type, collected via Google Analytics 4 and the Meta Pixel.",
        "We do not collect payment card details on this website. Payments for services are handled in person at the studio or via UPI/bank transfer.",
      ] },
      { h: "How we use your information", ul: [
        "To respond to your consultation enquiry on WhatsApp or by phone.",
        "To share pricing, availability and booking details you have asked for.",
        "To improve our website and understand which pages are useful.",
        "We never sell, rent or trade your personal information to third parties.",
      ] },
      { h: "Cookies and analytics" , p: "We use Google Analytics 4 and the Meta Pixel to understand how visitors find and use the site. These set cookies in your browser. You can block or delete cookies in your browser settings; the site will continue to work normally." },
      { h: "Data retention", p: "Enquiry details are kept in our booking records for as long as needed to serve you and maintain our client history. You may ask us to delete your details at any time." },
      { h: "Your rights", ul: [
        "Ask what personal information we hold about you.",
        "Ask us to correct or delete your details.",
        "Ask us to stop contacting you.",
        "To exercise any of these, WhatsApp us on +91 76784 46364 or write to the studio address below.",
      ] },
      { h: "Third-party services", p: "Our website is hosted on Vercel and our booking records are stored in Google Workspace (Google Sheets). Instagram, Google Business Profile and Justdial operate under their own privacy policies when you interact with our listings there." },
      { h: "Contact us about privacy", p: "Blushes & Brushes by Urvashi Trehan, B 1/1 Double Storey, Ramesh Nagar, Opposite Subway, New Delhi 110015. WhatsApp: +91 76784 46364." },
    ],
  },
  {
    slug: "terms",
    title: "Terms & Booking Policy | Blushes & Brushes, Ramesh Nagar",
    h1: "Terms & Booking Policy",
    description: "Booking, advance payment, rescheduling and cancellation terms for bridal, party, nail and beauty services at Blushes & Brushes, Ramesh Nagar, West Delhi.",
    updated: "28 July 2026",
    intro: "These terms apply to bookings made with Blushes & Brushes by Urvashi Trehan, whether at our Ramesh Nagar studio or on location across Delhi NCR. We keep them short and fair - if anything is unclear, just ask on WhatsApp before booking.",
    sections: [
      { h: "Booking & confirmation", ul: [
        "A date is confirmed only once the booking advance is received.",
        "For bridal bookings during peak season (November–February), we recommend booking 3–4 months in advance.",
        "Arrival time for on-location bookings is confirmed in writing at the time of booking.",
      ] },
      { h: "Payments", ul: [
        "A booking advance is required to hold your date; the balance is payable on the day of service.",
        "We accept cash, UPI and bank transfer.",
        "Prices quoted include the services listed in the quote. No GST is charged.",
      ] },
      { h: "Rescheduling", p: "Date changes are accommodated subject to availability. Please give us as much notice as possible - for bridal bookings, at least 15 days before the event." },
      { h: "Cancellation", p: "Cancellation terms are confirmed in writing with your booking quote. Please discuss the specific terms for your booking with us on WhatsApp before paying the advance." },
      { h: "Travel", ul: [
        "Bridal and party makeup travel across Delhi NCR. Travel is charged at actuals (cab fare) for the venue.",
        "Nail extensions, beauty and skin services are performed at the Ramesh Nagar studio only.",
      ] },
      { h: "Trials", p: "Bridal trials are chargeable and are adjusted against your final booking if you proceed. We recommend booking the trial 4–8 weeks before your wedding date." },
      { h: "Photography & portfolio use", p: "We may photograph your look for our portfolio and social media. If you would prefer we do not, simply tell us before or during your appointment and we will respect that." },
      { h: "Skin sensitivity", p: "Please tell us about any allergies, skin sensitivities or recent treatments before your appointment so we can select suitable products. We use professional, sealed products but cannot be responsible for undisclosed sensitivities." },
      { h: "Questions", p: "WhatsApp +91 76784 46364 or visit B 1/1 Double Storey, Ramesh Nagar, Opposite Subway, New Delhi 110015." },
    ],
  },
];

export const getLegal = (slug: string) => LEGAL.find((l) => l.slug === slug);
