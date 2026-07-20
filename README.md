# Blushes & Brushes — Next.js Site + Ops Dashboard

Growth engine for **[Blushes & Brushes by Urvashi Trehan](https://blushesnbrushes.com)** — a premium bridal makeup, nail art & beauty studio in Ramesh Nagar, West Delhi.

- 🌐 Live site: **https://blushesnbrushes.com**
- 💄 Services: Bridal makeup (HD & airbrush), party makeup, nail extensions, beauty rituals
- 📍 Studio: B 1/1 Double Storey, Ramesh Nagar, Opp. Subway, New Delhi 110015
- 📞 WhatsApp: +91 76784 46364
- ⭐ 4.8★ on Google · 200+ brides served

---

## What's in this repo

The public-facing site + a private ops dashboard (`/dashboard`, password-gated) that runs the salon's lead funnel, invoicing, review collection, ads manager, and content calendar.

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (app routes) + hand-written CSS (static premium homepage)
- **AI:** `@anthropic-ai/sdk` for content generation
- **Backend:** Google Apps Script web app → Google Sheets (leads, invoices, reviews, quest state)
- **Deploy:** Vercel (production at `blushesnbrushes.com`, aliased via Cloudflare DNS)
- **Analytics:** GA4 · Meta Pixel · Google Search Console

## Public pages

- `/` — premium homepage (services, portfolio, testimonials, journal, booking)
- `/book` — services lead capture
- `/courses` — academy landing
- `/blog` — journal (bridal, nail & beauty tips) — 14 SEO articles with FAQPage schema

## Local dev

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy

```bash
vercel --prod   # deploys to blushesnbrushes.com
```

---

## Book Urvashi

If you found this repo through a search and want to book bridal or party makeup in Delhi NCR: **[blushesnbrushes.com/book](https://blushesnbrushes.com/book)** or WhatsApp **+91 76784 46364**.

_Built by [Piyush Verma](https://github.com/Piyushverma1996)._
