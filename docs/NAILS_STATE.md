# NAILS_STATE
**Living state file. Read this, not the master OS doc, at the start of each session.**
Last verified: 12 Aug 2026

---

## Current goal
Nail revenue from customers who are **already in the building** — Damini footfall and B&B's bridal funnel. Not from website traffic, which does not yet exist at usable volume.

---

## Credentials (status only)

| Variable | Status |
|---|---|
| `NEXT_PUBLIC_META_PIXEL_ID` | **PLACEHOLDER** — set to the literal string, so the pixel is dead |
| `META_APP_SECRET` | missing |
| `META_LEADS_TOKEN` | missing |
| `IG_USER_ID` | missing |
| `IG_TOKEN` | missing |
| `NEXT_PUBLIC_CLARITY_ID` | missing |

Working: GA4, Search Console, IndexNow, WhatsApp Cloud API (`bb_new_lead` approved and sending), Sheets webhook.

---

## What already exists — do not rebuild

- **`/services/nail-extensions`** — live, indexed status "Discovered, not indexed"
- **15 real nail photos** in `public/images/gallery/` (chrome gold, chrome teal, french blue/red/white/polka, floral autumn/green/white, maroon nude, stiletto chrome…)
- **Live nail prices** (already owner-approved, on site): Gel extensions + free art **₹499+**, Luxe French **₹1,200+**, Designer sets **₹1,500+**
- Nail blog posts: `gel-vs-acrylic-nail-extensions`, `how-long-do-nail-extensions-last-aftercare` — both **indexed**
- `/best-nail-salon-in-west-delhi` guide
- Homepage Offers section with the ₹499 hook
- Lead pipeline, WhatsApp alerts, source attribution, `/api/rsvp`, Clarity + behaviour events (code ready, id missing)

---

## Verified traffic reality (28 days to 12 Aug)

| | |
|---|---|
| GA4 sessions | 152 — but **126 are Direct** (us + dashboard) |
| Real outside sessions | **~19 in 28 days** |
| Nail page views | `/blog/gel-vs-acrylic` 3, `/blog/how-long-do…` 2. `/services/nail-extensions` did not reach top pages |
| Search | 468 impressions, 5 clicks, avg position 23.2 |
| Indexed | 22 of 49 pages |

**Conclusion: the website is not a Phase-1 revenue channel.** It is a proof and conversion surface for traffic sent from elsewhere.

---

## Blockers

1. Meta Pixel placeholder — ₹1,500 already spent built no retargeting audience, no conversion signal
2. Instant Forms not switched on — IG leads never reach the sheet or WhatsApp
3. No Damini data at all: no price list, no staff skill baseline, no current nail volume
4. Google reviews not being asked for
5. Bing Places unclaimed

---

## Damini — what is unknown and blocks Phase 1

Everything below needs an owner answer before anything is published or printed:

- Current nail prices at Damini (if any)
- Which staff, how many, current nail skill level
- Whether Damini nail service is live today or starting from zero
- Product/system in use (gel, acrylic, polygel), or none
- Whether Damini branding may reference Blushes & Brushes publicly
- Average daily footfall and service mix

Until answered: **no Damini prices on the website, no cross-brand claims.**

---

## Completed
- Full lead + WhatsApp + Sheets pipeline, tested end to end
- SEO: 49 pages, entity consolidation, sitemap lastmod, IndexNow, area-page dedup
- Wedding page (noindex) with UTM-tagged funnel into service pages
- Analytics: GA4/GSC APIs, behaviour events, heatmap code

## Next 5 actions
1. Fix Meta Pixel (P0, 5 min, unblocks everything paid)
2. Get Damini baseline answers (blocks all Phase 1 print/pricing work)
3. Build Look catalogue from the 15 real nail photos → WhatsApp CTA carrying Look ID
4. Nail enquiry tracker in the existing Sheet
5. Switch on Instant Forms

## Last verified metrics
GSC 468 impressions / 5 clicks / pos 23.2 · GA4 152 sessions / 19 real · 22 of 49 indexed · 0 website leads · 1 confirmed booking from ₹1,500 IG boost (engagement makeup, 25 Aug, Race Course Club)
