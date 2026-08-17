# MNext Challenge — Frontend Prototype

A bilingual (English / Bahasa Melayu), mobile-first situational judgment test (SJT) portal built for NBOL's **MNext Management Trainee** selection process, plus an admin panel to manage candidates, content, scoring and results.

> **Prototype status:** this is a **frontend-only** build. All data (candidates, responses, scoring config, declaration text, admin sessions) is stored in the browser's `localStorage` — there is no database or API yet. See [Known limitations](#known-limitations--whats-needed-for-production) before using this for anything beyond a demo/UX review.

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — best viewed on a phone or a mobile device emulator (the candidate portal is mobile-first).

The admin panel lives at [http://localhost:3000/admin](http://localhost:3000/admin).

---

## Demo credentials

**Admin panel** (`/admin/login`):

| Role | Username | Password |
|---|---|---|
| Super Admin | `admin` | `admin123` |
| Reviewer | `reviewer` | `reviewer123` |

**Candidate portal** (`/login`) — sign in with any seeded candidate's email or access token:

| Name | Email | Access token | Status |
|---|---|---|---|
| Alice Tan | `alice.tan@example.com` | `tok_alice001` | Fully completed |
| Bakri Hassan | `bakri.hassan@example.com` | `tok_bakri002` | SJT in progress |
| Chen Wei Ling | `chen.wei@example.com` | `tok_chen003` | Not started |
| Devi Raj | `devi.raj@example.com` | `tok_devi004` | Fully completed, flagged |
| Farah Aziz | `farah.aziz@example.com` | `tok_farah005` | Not started |
| Gopal Krishnan | `gopal.krishnan@example.com` | `tok_gopal006` | Not started |
| Hana Yusof | `hana.yusof@example.com` | `tok_hana007` | Not started |
| Imran Zulkifli | `imran.zulkifli@example.com` | `tok_imran008` | Not started |
| Jia Wong | `jia.wong@example.com` | `tok_jia009` | Not started |
| Kavitha Selvam | `kavitha.selvam@example.com` | `tok_kavitha010` | Not started |

New candidates added via the admin panel get their own auto-generated access token — see them under **Candidates → Access token**.

---

## What's implemented

### Candidate portal
- **Login** (`/login`) — magic-link-style: candidate enters their email or access token, no password. Uses the same theme/language switcher as the rest of the portal.
- **Dashboard** (`/`) — shows the candidate's profile, Thomas Assess launch link + status, and MNext Challenge progress/entry point.
- **Integrity declaration + start** (`/sjt/start`) — candidate must accept the (admin-editable) Candidate Integrity Declaration before starting.
- **MNext Challenge** (`/sjt/[qid]`) — 8 situational-judgment scenarios, grouped into **4 levels** of 2 questions each:

  | Level | Scenarios | Theme |
  |---|---|---|
  | 1 — Operate | Q01 Passenger Disruption, Q02 Team Challenge | Immediate operational/people judgement |
  | 2 — Manage | Q03 Customer Experience vs Cost, Q04 Digital Transformation | Business trade-offs & implementation |
  | 3 — Influence | Q05 Commercial Opportunity, Q06 Stakeholder Conflict | Competing stakeholder interests |
  | 4 — Shape the Future | Q07 Budget Shock, Q08 Future of the Airport | Prioritisation & long-term direction |

  Question order is always fixed/serial (Q01 → Q08). Each scenario's **4 answer options are randomized on display** (and the shuffled order is persisted per attempt, so it stays stable across refreshes) — but every answer keeps its permanent Answer ID (e.g. `Q01-C`), so scoring is never affected by display order.
  - A visual **journey stepper** (`START → OPERATE → MANAGE → INFLUENCE → SHAPE THE FUTURE → COMPLETE`) is shown throughout.
  - After the 2nd question of each level, the candidate sees a **level-transition screen** ("Level 1 Completed — Proceed to Level 2: Manage") instead of jumping straight into the next question.
  - Per-scenario countdown timer with a warning threshold and auto-advance on expiry; no backtracking once submitted.
  - Optional free-text comment per answer (stored for admin review, not auto-scored).
- **Completion screen** (`/sjt/complete`) — confirms submission; scores are never shown to the candidate.

### Admin panel (`/admin/*`)
- **Monitoring** — live status board (Not Started → Thomas In Progress/Completed → SJT In Progress/Completed → Fully Completed → Exception), searchable and filterable.
- **Candidates** — create/edit, CSV bulk import & export, reissue access token, **clear a candidate's test data** (wipes Thomas status, declaration acceptance and every SJT answer so they can retake it), bulk-set the Thomas URL for every candidate at once.
- **Candidate detail** — profile, Thomas tool summary, declaration audit entry, integrity indicators (tab/focus changes, response times) with a manual review flag, competency scores, and a **prototype AI-generated summary** (heuristic, not a live LLM call — clearly labelled as such).
- **Results** — per-candidate overall + competency scores (full competency names, not just codes) and CSV export.
- **Content & Scoring** — edit scenario/option text (EN + BM) grouped by level, per-scenario timers, the scoring matrix (Overall score + up to 2 competency-evidence points per answer), competency names/descriptions, and default timer/evidence-threshold config — all without touching code.
- **Declaration** — edit the integrity declaration wording/version and view the acceptance audit log.
- Full light/dark theme support (toggle in the sidebar), and a responsive layout — the sidebar collapses into a slide-in drawer on mobile.

---

## Project structure

```
pages/
  index.tsx              Candidate dashboard
  login.tsx               Candidate login
  sjt/
    start.tsx             Declaration + challenge intro
    [qid].tsx              Scenario page (dynamic route per question)
    level-complete.tsx     Level-transition screen
    complete.tsx           Completion screen
  admin/
    login.tsx              Admin login
    index.tsx               Monitoring dashboard
    candidates/             Candidate list + candidate detail ([email].tsx)
    results.tsx              Results table + export
    content.tsx               Scenario/scoring/competency/timer config
    declaration.tsx            Declaration wording + audit log

components/               Shared UI (Layout, Timer, LevelProgress, theme/language switches)
components/admin/         AdminLayout (sidebar/drawer shell)
contexts/                 Theme + language React contexts
data/
  scenarios.ts             The 8 SJT scenarios, options, EN/BM text, timers
  levels.ts                The 4-level grouping + bilingual names/descriptions
lib/
  adminStore.ts             All persisted data + derived logic (candidates, responses,
                             scoring, competencies, declaration, status/summary helpers)
  adminAuth.ts               Admin login/session (mock, hardcoded users)
  candidateAuth.ts            Candidate login/session (mock, token/email match)
  adminTheme.ts               Shared light/dark className tokens for the admin panel
  i18n.ts                     EN/BM translation strings
```

---

## Data & persistence model

Everything lives in the browser's `localStorage` under keys prefixed `mnext_admin_*` and `mnext_candidate_session`/`mnext_theme`/`mnext_language`, managed through [`lib/adminStore.ts`](lib/adminStore.ts). Key implications:

- **Scoped to one browser.** A candidate or admin change made in Chrome isn't visible in Firefox, incognito, or another device.
- **Seeded on first load**, then reads/writes go straight to `localStorage`. `getCandidates()` will "top up" any newly-added seed candidates into existing browser data without wiping what's already there.
- Candidate SJT submissions in `pages/sjt/[qid].tsx` write into the *same* store the admin panel reads (`upsertResponse`), so comments/answers/timing entered by a candidate immediately show up in the admin's candidate detail and results views — as long as it's the same browser.
- Scoring is fully configurable: each `answerId` maps to an Overall score plus up to 2 competency-evidence points, editable in **Content & Scoring**. Candidate-facing option display order is randomized but always keyed back to the permanent Answer ID for scoring.

## Known limitations / what's needed for production

This build intentionally stopped at the frontend-prototype stage. Before this goes near real candidates:

- **No backend/database.** Replace the `localStorage`-backed functions in `lib/adminStore.ts` with real API calls to a persisted store (e.g. Postgres/Supabase), matching the existing data shapes.
- **No real authentication.** Admin login is a hardcoded credential list in `lib/adminAuth.ts`; candidate login just matches an email/token against local data. Both need real, server-verified sessions.
- **No server-side score validation.** Scoring is currently computed client-side from data in `localStorage` — must move server-side so candidates can't see or tamper with it.
- **AI-generated summary is a placeholder.** `generateAiSummary()` in `lib/adminStore.ts` is a template-based heuristic, not a real LLM call.
- **Bahasa Melayu content** for the declaration and scenario/option text is present as seed/placeholder translation and should go through NBOL's formal translation/psychometric review before production use.
- **No backups, audit logging, or hosting/security hardening** — all called out as required in the original platform spec but out of scope for this frontend-only build.
