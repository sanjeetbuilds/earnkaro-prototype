# EarnKaro · Product Assignment Prototype

A clickable prototype that shows how EarnKaro could feel if it knew **who you were**.
Same app, same surfaces — re-rendered for three very different creators.

This repo accompanies the written submission for the EarnKaro Product Manager
assignment (Q1 + Q2).

---

## The three personas

| Persona | Segment | Audience | What the app optimises for |
|---|---|---|---|
| **Ramesh K.** | Performance Distributor | Telegram group · 28K members | Commission %, freshness, low saturation, bulk-share |
| **Monika S.** | Emerging Earner | WhatsApp · friends &amp; family | Confidence, easy starter deals, milestone progress |
| **Anjali R.** | Settled Niche Influencer | Instagram · 80K · personal-finance niche | Reel performance, Auto-DM funnel, storefront GMV, system explainability |

Each persona drives:
- Its own **home / discovery / share** screens (`app/screens/*.tsx`)
- Its own ranking logic over the shared deal pool (`lib/deals.ts`)
- The wallet, segment label, and pinned categories in `lib/personas.ts`

The persona toggle is the centerpiece of the demo — the same bottom-nav surfaces
re-render based on which creator you&apos;re &ldquo;viewing as.&rdquo;

---

## What&apos;s built

### `/` — Persona selector + in-app shell
- Pick Ramesh, Monika, or Anjali → drops you into the in-app experience.
- The &ldquo;⇄ Switch&rdquo; pill at the top cycles personas without leaving the screen,
  so reviewers can compare how each surface differs.
- Three tabs are wired per persona: Home, Discovery (Partners), Make Links (Share).
  Reports and Profile are stubbed with a &ldquo;not built&rdquo; placeholder — the
  assignment scope is the first three.

### `/anjali` — Public creator storefront
A separate, public-facing route modelled on Mukul Sharma&apos;s
[stufflistings.shop](https://stufflistings.shop):
- Hero illustration + bio + social-handle row
- Search bar over Anjali&apos;s recommendations (empty-state shows up in her
  creator dashboard as a search-miss signal)
- &ldquo;Latest finance drops&rdquo; carousel of recent Reels — each tied to the
  deal it covers
- Product grid with image / name / price / coupon badge
- Product detail modal showing live price, active coupon code (copyable), and a
  &ldquo;Buy Now&rdquo; CTA to the partner URL

This is what an audience member lands on when they tap Anjali&apos;s Auto-DM link.

### Anjali creator dashboard highlights
The Day-14 Anjali demo from the Q2 strategic doc is wired in `app/screens/anjali-home.tsx`:
- Latest Reel performance — SBI credit card Reel, 12K views, 287 commenters
  captured by Auto DM, 7 confirmed purchases, ₹2,940 pending wallet
- Storefront-attributed GMV (week over week)
- Top-converting products this week
- Audience search queries that returned no results — gap signal
- &ldquo;What the system did&rdquo; tab: auto-promoted-to-featured, demoted, pinned
  decisions, each editable (Keep / Revert)

---

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript, Tailwind v4
- `lucide-react` for iconography
- All data is in-memory mocks under `lib/` — no backend

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the persona selector,
or [http://localhost:3000/anjali](http://localhost:3000/anjali) for the public
storefront.

## Repo layout

```
app/
  page.tsx                 ← persona selector + in-app shell
  layout.tsx
  anjali/page.tsx          ← public storefront (Q2)
  screens/
    ramesh-home.tsx        ramesh-discovery.tsx        ramesh-share.tsx
    monika-home.tsx        monika-discovery.tsx        monika-share.tsx
    anjali-home.tsx        anjali-discovery.tsx        anjali-share.tsx
components/
  PhoneFrame.tsx           ← responsive phone-frame chrome + persona switcher
  BottomNav.tsx            TopBar.tsx                  DealCard.tsx
lib/
  personas.ts              ← persona records
  deals.ts                 ← shared deal pool + per-persona rankings
  anjali.ts                ← Anjali-only dashboard mocks (Reel, GMV, search misses, auto-decisions)
  tokens.ts                ← design tokens
```

## A note on scope

The prototype is intentionally hand-wired — the goal is to make the **product
choices** legible (what each persona sees, in what order, why), not to
demonstrate state management or a real CMS. The architecture, segmentation
reasoning, and metric framework are in the written submission.
