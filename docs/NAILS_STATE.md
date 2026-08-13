# NAILS_STATE
**Living state file. Read this, not the master OS doc, at the start of each session.**
Last verified: 13 Aug 2026

---

## Current goal
Nail revenue from customers who are **already in the building** — Damini footfall and B&B's bridal funnel. Not from website traffic, which does not yet exist at usable volume.

---

## Credentials (status only)

| Variable | Status |
|---|---|
| `NEXT_PUBLIC_META_PIXEL_ID` | **LIVE** — 2818814595140649, verified firing (fbq.loaded true) |
| `META_APP_SECRET` | set |
| `META_LEADS_TOKEN` | set |
| `POLL_SECRET` | set — dedicated credential for cron-job.org |
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

1. **No lead ad exists.** Poller reports `forms: 0`. This is the only thing between the built pipeline and actual leads.
2. **No Damini data at all**: no price list, no staff skill baseline, no current nail volume. Blocks all Phase 1 printing and pricing.
3. Google reviews not being asked for
4. Bing Places unclaimed
5. Clarity id not set (heatmaps)

Resolved since 12 Aug: Meta Pixel live · Instant Forms credentials set · lead ingestion working via poller.

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

## Lead ingestion — how it actually works now

Meta app is UNPUBLISHED, so Page webhooks deliver nothing in production
(publishing needs business verification + App Review, weeks away). Instead:

- `/api/cron/poll-meta-leads` polls the Graph API every 15 min
- Triggered externally by cron-job.org (Vercel Hobby caps crons at daily)
- Exchanges the System User token for a Page token at call time
- Pushes each lead through the same pipeline as a website lead
- Guarded by `POLL_SECRET`; de-duplicated by lead id; 24h lookback
- Verified running: 200 OK, ~3s, every 15 min since 13 Aug

## Next 5 actions
1. **Build the Instant Form lead ad** in Ads Manager — the only gap
2. Get Damini baseline answers (blocks all Phase 1 print/pricing work)
3. Shoot 3-4 everyday/office nail sets — catalogue has only 1 Clean-tier look
4. Nail enquiry tracker in the existing Sheet
5. Clarity id for heatmaps

## Last verified metrics
GSC 468 impressions / 5 clicks / pos 23.2 · GA4 152 sessions / 19 real · 22 of 49 indexed · 0 website leads · 1 confirmed booking from ₹1,500 IG boost (engagement makeup, 25 Aug, Race Course Club)
