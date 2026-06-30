# PRD.md
### Product Requirements Document — Prithvi · Muladhara

**Version:** 2.0 (Locked)
**Date:** June 2026
**Author:** Abhishek (with Claude, Cowork sessions)
**Platform:** Expo (React Native) — iOS + Android
**Backend:** Supabase (real-time, all data)
**Audio:** AWS S3 + CloudFront (mantra audio streaming)

> This is the locked product specification.
> Read SOUL.md before this. SOUL.md governs everything that follows.
> When a decision is already in DECISIONS.md, it is not re-debated here — it is referenced.
> Changes to this document require an explicit conversation, not silent edits.

---

## Table of Contents

1. [Mission & Guiding Intention](#1-mission)
2. [The Navigation Architecture — Locked](#2-navigation)
3. [Screen Specifications](#3-screens)
4. [Sacred Calendar System](#4-sacred-calendar)
5. [Journal Logic — When Prompts Appear](#5-journal-logic)
6. [Design Principles](#6-design)
7. [Content Strategy](#7-content)
8. [Audio Strategy](#8-audio)
9. [Database Architecture](#9-database)
10. [Research Pipeline](#10-research)
11. [Feedback System](#11-feedback)
12. [Feature Roadmap — Now / Later / Thoughtfully Never](#12-roadmap)
13. [What We Will Not Build](#13-never)
14. [Open Questions](#14-open-questions)

---

## 1. Mission

### The Insight

Prithvi tattva — the Earth element — is depleting simultaneously at two scales:

**Outside the human body:** Soil mineral collapse, deforestation, glacier retreat, sacred rivers dying, biodiversity loss. Measurable, documented, accelerating.

**Inside the human body:** Rising anxiety, structural weakening, inability to be still, rootlessness. Muladhara — the root chakra, the seat of Prithvi within — is losing its ground.

These are not separate crises. They are one withdrawal, visible at multiple scales.

### The Hypothesis

Sound — specifically vibrational frequencies carried in sacred chant — can begin to restore what has been lost. The Gayatri Mantra, which opens with *Bhu* (Earth), is a direct Muladhara healing frequency. When chanted by many simultaneously, the vibrations amplify through constructive interference — a measurable physics principle, not only a spiritual one.

This app is an experiment in that hypothesis. We do not claim proof. We invite participation.

### The Psychological Mandate

The user who opens this app may be anxious, depleted, or exhausted — exactly the symptoms of a weakened Muladhara. The app must never add to that weight.

- Every interaction should slow the nervous system, not stimulate it
- Motivation to return must come from meaning, not mechanics — no streaks, no badges, no guilt
- The app should feel like a quiet invitation, not a demand
- Depth is available to those who want it; simplicity is available to those who need it
- Five minutes of use should feel meaningful. Twenty minutes should feel transformational.

---

## 2. Navigation Architecture — Locked

### Three tabs. No more.

```
[ Sadhana ]     [ Bhumi ]     [ Jnana ]
 साधना           भूमि          ज्ञान
(Practice)      (Earth/Map)  (Knowledge + Journal)
```

**Why three:** Five tabs implies five equal importance. This app has one center of gravity — the practice. Three tabs keep that clear without hiding anything important.

**Tab labels:** All Sanskrit, all one word. They work in Hindi and English contexts. Non-Hindi users will learn them quickly — the words earn their small moment of learning.

| Tab | Sanskrit | Meaning | Default? |
|-----|----------|---------|----------|
| Sadhana | साधना | Practice, daily discipline | ✅ YES — app always opens here |
| Bhumi | भूमि | The Earth; the collective map | No |
| Jnana | ज्ञान | Knowledge and reflection | No |

**The app always opens on Sadhana.** A daily user's journey: open → chant → close. Zero navigation required if they don't want it.

### What lives where

```
Sadhana (default home)
├── Sacred moment card (on significant days — full moon, Guru Purnima, etc.)
├── Sandhya indicator (time until next dawn / noon / dusk)
├── Mantra library — Gayatri, Mahamrityunjay, Om + more
│   └── Each mantra: guidance on when/why/how → then play
├── Player: audio or silent mode, mantra text (Sanskrit / transliteration)
├── Session timer
└── Post-session: soft journal prompt (on qualifying occasions — see Section 5)

Bhumi (collective map)
├── Live map — golden glowing dots where practice is happening
├── Global stat — "X minutes of healing today" (large, gold)
├── Toggle (Phase 2): Gayatri only / All practice
├── City tap → quiet detail card
└── Community reflections (anonymous shared journal entries, opt-in)

Jnana (knowledge + reflection)
├── Internal toggle: Know ↔ Reflect
├── Know:
│   ├── "Today's Significance" card (when applicable)
│   ├── Sacred Calendar archive (all past significant moments)
│   ├── Witness: era timeline, expand-on-demand
│   └── Understand: thematic deep-dives (Muladhara, frequencies, mantra science)
└── Reflect:
    ├── Your journal (chronological, filterable by tag)
    └── Community reflections (anonymous, read-only, filterable by tag)
```

---

## 3. Screen Specifications

### App Launch — The Om Moment

Before any screen appears, on cold open:

- A 2–3 second Om sound fades in softly, holds briefly, fades out as the Sadhana screen fades in
- The screen during this moment: pure `#0D0A06` background with a single gold breathing circle at center — nothing else
- Respects device silent mode: if phone is on silent, the circle plays without sound
- Setting: "Om on open" toggle in the app (Settings section within Jnana/Reflect)
- Default: **ON** for first install. User can turn off. Never prompt to turn back on.
- Audio: a clean single Om, no reverb tail longer than 3 seconds, sourced with same quality bar as mantra audio
- This is the app's first impression every single day. It must be the most considered 3 seconds in the app.

**Why:** Muladhara responds to grounding sounds before engagement. An Om at launch is not a branding moment — it is the practice beginning. The user's nervous system starts to settle before they've done anything consciously.

---

### Sadhana

**Purpose:** The center. The act of healing. Everything else serves this.

**Mantra Library:**
Each mantra is a card. The card shows: name (Sanskrit + meaning), one-line purpose, and a "tap to learn more" affordance before play. Inline guidance — users do not have to leave to Jnana to understand what they're chanting.

| Mantra | Purpose | Phase |
|--------|---------|-------|
| Gayatri Mantra | Primary Prithvi healing, daily practice | MVP |
| Mahamrityunjay Mantra | Health, recovery, when someone is unwell | MVP |
| Om | Settling, grounding, sleep, for children | MVP |
| Bhumi Sukta (Atharva Veda 12.1) | Direct Earth prayer | Phase 2 |
| Lam Beej Mantra | Direct Muladhara activation | Phase 2 |
| Cross-tradition healing chants | Buddhist, Indigenous, etc. — research-gated | Phase 3 |

**Player:**
- Mantra text in Devanagari (primary)
- Transliteration toggle
- Meaning card (tap to show — not forced)
- Audio mode: mantra loops, background audio enabled
- Silent mode: timer only
- Session timer (counts up, no pressure)
- Optional mala counter (108 reps) — user activates

**Sandhya Indicator:**
A quiet line near the top of Sadhana: *"Sandhya in 34 minutes"* as dawn or dusk approaches. Calculated from user timezone. Not a notification — just visible presence of the Earth's rhythm. An invitation, never a demand.

**Sacred Moment Card:**
On qualifying days (see Section 4), a calm card appears at the top of Sadhana:
*"Today is Guru Purnima — a day of particular potency for mantra practice."*
Brief explanation. No alarm. No urgency.

---

### Bhumi

**Purpose:** Show the collective practice. You are not doing this alone.

**Map:**
- Dark basemap (CartoDB dark)
- Golden glowing circles at cities where sessions are active or recent
- Soft pulse animation on active sessions (breathing, not flashing)
- Ripple effect when a new session joins (gentle, 2-second fade)
- Circle size = relative session density (not precise numbers — avoids competition)
- Tap city → quiet card: city name, country, sessions today, total minutes today

**Global Stats Bar:**
- One large golden number: *"4,217 minutes of healing today"*
- Supporting: cities active, participants today
- These numbers are for wonder, not competition

**Bhumi Toggle (Phase 2):**
When multiple mantras exist with meaningful usage:
- "Gayatri" view: shows only Gayatri Mantra practice — the primary Earth healing map
- "All Practice" view: shows all mantra activity, with subtle color differentiation by mantra type
- Cross-tradition practice shows in their geographic heartlands — visually moving, no labels needed

**What stays off the Bhumi map (permanently):**
- Solfeggio frequency therapeutic listening (personal, not collective intention)
- Any visualization that creates comparison between cities or users
- Anything that turns collective healing into a competition or performance

---

### Jnana

**Purpose:** Know more. Reflect deeper. Both available when the user chooses them.

**Internal toggle at top:** Know | Reflect

**Know section:**
- Today's Significance card (when applicable — see Section 4)
- Sacred Calendar archive below: all past significant moments, chronological, accessible to all users
- Witness layer: era timeline — Satya Yuga to 2050. Each era = one collapsed card. Tap to expand fully. Collapsed state: era name, depletion %, one striking fact. Expanded: all domain data, sources, dharmic note.
- Understand layer: thematic deep-dives below the timeline. Topics: The Muladhara Connection / The Science of Frequency / The Gayatri Mantra / What Healing Sounds Do / Research on Mantra & Body (grows with research pipeline)
- Human-Scale Equivalences: every major depletion stat has a relatable comparison. "33% of topsoil lost = the entire farmland of India and China combined." Sourced. Tagged.

**Reflect section:**
- Your journal: chronological entries, filterable by tag. Each entry: date, excerpt, tags, mantra chanted. Tap to read fully.
- New entry: distraction-free writing screen, soft background, tag selector, privacy toggle (Private / Share anonymously)
- Community reflections: anonymous shared entries from users who opted in. Filterable by tag. No usernames. No likes. No comments. Read-only. This is digital Satsang — sitting together, knowing others are here.

**Design principle for Jnana:** It is a library, not a feed. It does not push content at the user. It waits to be explored. Depth is always one tap away, never forced.

---

## 4. Sacred Calendar System

The app is context-aware of significant moments in the Earth's rhythm and the dharmic calendar. On such days, the app responds — quietly, not urgently.

### What qualifies as a sacred moment

**Dharmic calendar:**
- Guru Purnima, Navratri (9 nights), Mahashivratri, Makar Sankranti, Ekadashi (monthly), Diwali, major festival days

**Astronomical:**
- Full moon, new moon, solar eclipse, lunar eclipse, solstices (summer/winter), equinoxes (spring/autumn)

**Future — research-gated:**
- Rare planetary alignments when traditional or scientific research supports their significance
- Never framed as "warning" or "forecast" — always as "a moment of particular potency"

### How the app responds

**On the day itself:**
1. Sadhana screen: a calm card at the top with the day's name, brief significance, and invitation to practice
2. Journal prompt logic: qualifying sessions on this day always receive a journal prompt (see Section 5)
3. Jnana / Know: a "Today's Significance" card at the top with deeper context — history, dharmic meaning, how this connects to Prithvi healing

**Framing principle:** Never "something strong is coming — prepare." Always "this moment carries particular significance — here is why, and here is an invitation." The difference between anxiety and wonder.

### Archive

All past sacred moments are preserved in Jnana → Know → Sacred Calendar. Accessible to all users. No premium gate. This becomes a living record of when the community practiced together at meaningful moments. It never deletes.

### Admin / content management

Sacred moment content (title, description, significance, invitation text) is stored in the `sacred_moments` table (see Section 9). Bilingual from day one (English + Hindi). Abhishek or a designated admin adds entries in advance via Supabase dashboard. No CMS needed at MVP scale.

---

## 5. Journal Logic — When Prompts Appear

The journal prompt is a soft card that appears after a session ends. It is never a pop-up, never an interruption, never a guilt mechanism. It says: *"What did you notice?"* — and can be dismissed with one tap.

### When the prompt appears

**Always:**
- First session ever on the device
- Sessions on sacred calendar days (full moon, Guru Purnima, etc.)
- Sessions on the day the user reaches a sacred milestone (see below)

**Sometimes (~1 in 4 sessions):**
- Random — keeps it feeling spontaneous, not mechanical

**Conditionally:**
- After a session significantly longer than the user's usual duration (e.g., 3× their average)

**Never:**
- After every session (becomes noise, users auto-dismiss)
- With language that implies obligation ("Don't forget to record!")

### Sacred milestones that trigger a prompt

Not streak-based. Not arbitrary. Numerically sacred:

| Milestone | Why |
|-----------|-----|
| 1st session | The beginning |
| 108th session | Mala completion |
| 1,008th minute of total practice | Sacred repetition of 108 |
| 10,008th minute | — |
| 1st session in a new calendar year | Natural new beginning |
| User's birth month (if shared) | Personal resonance |

Milestones are tracked in the `user_milestones` table. Calculated server-side. No gamification UI — no badges, no pop-up celebrations. Just the quiet journal prompt with an extra line: *"You have now chanted 108 times. What has changed?"*

---

## 6. Design Principles

*(Full canonical source: SOUL.md — read it before building any screen)*

### Color Tokens — Locked

```js
void:      '#0D0A06'   // primary background
deep:      '#151008'
ground:    '#1E1508'
mud:       '#2E2010'
bark:      '#4A3520'
ochre:     '#C17D3C'   // primary accent
gold:      '#D4A843'   // highlights, sacred numbers
parchment: '#EDE3CF'   // primary text
cream:     '#F5EED8'
ash:       '#7A6A52'   // secondary text
stone:     '#5A4E3A'   // tertiary / muted
muladhara: '#B03020'   // root chakra red — use sparingly
sage:      '#6B7C5E'   // calm green
verified:  '#3A7A4A'   // source tag
dharmic:   '#C9962A'   // source tag
observed:  '#8A4A3A'   // source tag
```

### Typography — Locked
- **EB Garamond:** display, body, mantra text — ancient, earthy
- **Space Mono:** all data, stats, timers, source tags — precision signal

### Signature Motif — Locked
Breathing circles: slow-pulsing concentric rings (3–6 second cycles) around key icons. Never decorative alone — always attached to something alive.

### Interaction Principles
- No animations faster than 300ms
- All transitions: fade or gentle slide-from-below
- Haptics: only on session start and session end
- Every screen usable in 30 seconds or rewarding over 20 minutes — both are valid
- No modals stacking more than one deep

---

## 7. Content Strategy

### Source Tagging — Non-Negotiable

| Tag | Meaning | Color |
|-----|---------|-------|
| `verified` | Peer-reviewed, institutional, replicable | Green `#3A7A4A` |
| `dharmic` | Scriptural, traditional, ancient record | Gold `#C9962A` |
| `observed` | Reported, experiential, emerging, contested | Rust `#8A4A3A` |

Every fact in the app carries exactly one tag. No exceptions. We never suppress traditional knowledge because it lacks a citation. We never present contested research as proven.

### Content Layers

**Already built:** research.js — 6-era Prithvi depletion timeline, ~40 facts, 5 domains. Solid foundation.

**To build for MVP:** Understand section content (Muladhara connection, frequency science, Gayatri Mantra deep-dive). Mantra guidance cards for each mantra in Sadhana. Sacred calendar events for the coming 12 months.

**Evolving:** Human-scale equivalences for depletion data. Research summaries as new papers are reviewed. New mantra additions when frequency research supports them. Cross-tradition content when tradition-knowledgeable reviewers confirm appropriateness.

### Language
- English and Hindi at launch — full bilingual
- Mantra text: Devanagari primary, romanized transliteration as secondary
- Tab labels: Sanskrit (works in both language contexts)
- Future languages: when user demand warrants it, not before

---

## 8. Audio Strategy

### Philosophy
Audio is the primary healing modality. Visual supports audio — never the reverse.

### MVP Audio (Phase 1)
Four audio files, sourced or commissioned:
1. Om (launch sound) — single clean Om, 2–3 seconds, no long reverb tail. Used for app launch moment. Highest priority.
2. Gayatri Mantra — complete, loopable, ~2-minute cycle, high quality
3. Mahamrityunjay Mantra — complete, loopable
4. Om (long) — sustained Om for Sadhana mantra practice, loopable

Quality bar is high. Not "find something on YouTube." Licensing must be unambiguous. Best option: commission from a known reciter, or Abhishek records himself (authentic, zero licensing complexity, personal connection to the practice).

### Phase 2 Audio — Vagdhenu Pipeline
Vagdhenu (IISc, Prof. Prathosh A.P., Apache-2.0) is a production-grade Sanskrit chant TTS with MOS 4.6. It chants metrically — not flat text-to-speech. Has already produced the full Srimad Bhagavatam (16,017 verses).

Use: run on AWS EC2 GPU instance, generate additional mantra audio (Bhumi Sukta, Lam Beej, etc.), store output on S3. This eliminates licensing dependency for future mantras and allows adding any Sanskrit text as audio without sourcing recordings.

### Storage
AWS S3 + CloudFront CDN. Audio streams; not bundled in the app binary. App size stays small. New mantras added without app updates.

---

## 9. Database Architecture

### Principle
The database captures everything. No data is ever hard-deleted (soft delete with `deleted_at`). Research, user experience, and collective practice are all valuable records. A strong schema now prevents painful migrations later.

### Tables

---

#### `profiles`
One row per anonymous user. Created on first app open via Supabase anon auth.

```sql
id                  uuid primary key default gen_random_uuid()
device_id           text unique not null        -- Expo device ID, for cross-session continuity
language            text default 'en'           -- 'en' | 'hi'
created_at          timestamptz default now()
last_active_at      timestamptz
total_sessions      integer default 0           -- denormalized for quick reads
total_minutes       integer default 0           -- denormalized
```

---

#### `sessions`
Every chanting session, from start to end.

```sql
id                  uuid primary key default gen_random_uuid()
user_id             uuid references profiles(id)
mantra              text not null               -- 'gayatri' | 'mahamrityunjay' | 'om' | 'bhumi_sukta' | etc.
mode                text not null               -- 'audio' | 'silent'
started_at          timestamptz default now()
ended_at            timestamptz                 -- null until session ends
duration_sec        integer                     -- calculated on end
journal_written     boolean default false       -- did user write a journal entry after?
city                text                        -- nullable, future geo
country             text                        -- nullable, future geo
lat                 float                       -- nullable, future geo
lng                 float                       -- nullable, future geo
sacred_moment_id    uuid references sacred_moments(id)  -- if session occurred on a sacred day
created_at          timestamptz default now()
deleted_at          timestamptz                 -- soft delete
```

---

#### `anubhav` (Journal)
Every journal entry, private or shared.

```sql
id                  uuid primary key default gen_random_uuid()
user_id             uuid references profiles(id)
session_id          uuid references sessions(id)  -- nullable, if written post-session
mantra              text                        -- which mantra was chanted before writing
text                text not null
tags                text[]                      -- Peace | Grounding | Clarity | Stillness | Connection | Heaviness | Unsettled | Gratitude | Grief
is_public           boolean default false       -- user opted to share anonymously
wellbeing_before    smallint                    -- 1=unsettled, 2=neutral, 3=grounded (optional pre-session)
wellbeing_after     smallint                    -- 1=unsettled, 2=neutral, 3=grounded (optional post-session)
created_at          timestamptz default now()
deleted_at          timestamptz                 -- soft delete, never hard delete
```

---

#### `sacred_moments`
Admin-curated calendar of significant days. Populated in advance.

```sql
id                  uuid primary key default gen_random_uuid()
date                date not null
type                text not null               -- 'full_moon' | 'new_moon' | 'guru_purnima' | 'navratri' | 'eclipse_solar' | 'eclipse_lunar' | 'solstice' | 'equinox' | 'ekadashi' | 'other'
title_en            text not null
title_hi            text not null
description_en      text                        -- deeper context, shown in Jnana
description_hi      text
invitation_en       text                        -- short invitation line, shown in Sadhana card
invitation_hi       text
significance        text                        -- internal note: why this day matters for Prithvi/Muladhara
source_type         text                        -- 'dharmic' | 'astronomical' | 'both'
created_by          text                        -- admin identifier
created_at          timestamptz default now()
```

---

#### `user_milestones`
Sacred practice milestones per user. Calculated server-side, never shown as badges.

```sql
id                  uuid primary key default gen_random_uuid()
user_id             uuid references profiles(id)
milestone_type      text not null               -- 'first_session' | 'session_108' | 'minute_1008' | 'minute_10008' | 'new_year' | 'birth_month'
achieved_at         timestamptz default now()
session_id          uuid references sessions(id)  -- the session that triggered it
journal_prompted    boolean default false        -- was a journal prompt shown?
journal_written     boolean default false        -- did they write?
```

---

#### `city_seeds`
Static seed data for the Bhumi map. Real session counts computed from `sessions` by city.

```sql
id                  uuid primary key default gen_random_uuid()
city                text not null
country             text not null
lat                 float not null
lng                 float not null
region              text                        -- 'india' | 'global'
tradition_affinity  text                        -- for future cross-tradition map views
```

---

#### `feedback`
User feedback via the leaf icon. Simple, always open.

```sql
id                  uuid primary key default gen_random_uuid()
user_id             uuid references profiles(id)  -- nullable, fully anonymous option
text                text not null
screen              text                        -- which screen they were on: 'sadhana' | 'bhumi' | 'jnana' | 'other'
app_version         text
platform            text                        -- 'ios' | 'android'
created_at          timestamptz default now()
reviewed            boolean default false        -- admin has read this
```

---

#### `research_log`
Every research finding, frequency study, paper, or data point reviewed for potential inclusion. The "nothing slips" table.

```sql
id                  uuid primary key default gen_random_uuid()
title               text not null
source              text                        -- author, institution, journal, URL
source_type         text                        -- 'verified' | 'dharmic' | 'observed'
topic               text                        -- 'frequency' | 'mantra' | 'soil' | 'chakra' | 'cross_tradition' | 'prithvi' | 'other'
summary             text                        -- what was found
relevance           text                        -- how this connects to Prithvi/Muladhara healing
inclusion_status    text default 'pending'      -- 'pending' | 'included' | 'excluded' | 'needs_more_research'
exclusion_reason    text                        -- if excluded, why
included_in         text                        -- which part of the app if included (e.g., 'understand_frequency')
reviewed_by         text                        -- who reviewed this
reviewed_at         timestamptz
created_at          timestamptz default now()
notes               text                        -- any additional notes
```

---

### Row-Level Security (Supabase RLS)

```
profiles:       users can only read/write their own row
sessions:       users can only read/write their own rows
anubhav:        users can read/write their own rows; is_public=true rows readable by all
sacred_moments: readable by all; writable only by admin role
user_milestones: users can only read their own rows; service role writes
city_seeds:     readable by all; writable only by admin role
feedback:       users write their own; admin reads all
research_log:   admin only (not exposed to app users)
```

### Real-time Subscriptions

```
sessions:       Bhumi map subscribes to INSERT/UPDATE — live session markers
```

### Indexes

```sql
CREATE INDEX ON sessions (mantra, started_at);
CREATE INDEX ON sessions (city, started_at);
CREATE INDEX ON sessions (user_id, started_at);
CREATE INDEX ON anubhav (user_id, created_at);
CREATE INDEX ON anubhav (is_public, created_at) WHERE is_public = true;
CREATE INDEX ON sacred_moments (date);
CREATE INDEX ON user_milestones (user_id, milestone_type);
CREATE INDEX ON research_log (inclusion_status, topic);
```

---

## 10. Research Pipeline

### Principle
Research is ongoing. Every finding is logged in `research_log` before a decision is made about inclusion. Nothing is added to the app impulsively. Nothing is lost.

### Current Research Tracks

**Track A — Healing Frequencies (active):**
- Schumann Resonance (7.83 Hz) and its relationship to Muladhara
- 432 Hz vs 440 Hz tuning: the 1939 shift and evidence for/against
- Solfeggio frequencies: 174 Hz (foundation/Prithvi), 396 Hz (root liberation), 528 Hz (claimed DNA repair)
- Om's frequency (~136.1 Hz, Earth's orbital resonance note)
- Gayatri Mantra's measurable frequency signature
- Nad-Anahad: the unstruck sound — dharmic framework + any scientific parallels

**Track B — Mantra Science (active):**
- Peer-reviewed studies on mantra recitation: cortisol, HRV, vagal tone effects
- The Maharishi Effect: measurable societal effects of collective meditation
- Sanskrit prosody and its physiological effects (rhythm, breath entrapment)
- Cross-tradition comparison: what frequencies do Buddhist, Sufi, Indigenous healing chants carry?

**Track C — Earth Depletion Data (annual update):**
- FAO soil reports (annual)
- IPCC glacier data
- Biodiversity loss metrics
- Himalayan glacier retreat measurements
- Sacred river flow data

**Track D — Cross-Tradition Research (future, research-gated):**
- Before any non-Vedic chant is added: frequency analysis, healing intent, traditional context, tradition-knowledgeable review
- Buddhist Metta Bhavana, Tibetan singing bowls, Lakota Earth prayers, Sufi dhikr
- Inclusion only if: Earth-honoring in intention, frequency supports healing, tradition-knowledgeable person confirms appropriateness

### Research Review Criteria (for inclusion in app)

A finding moves from `pending` to `included` only when:
1. Source is credible (institution, peer review, or established dharmic text)
2. Source type is clearly assigned (verified / dharmic / observed)
3. Content deepens the user's understanding of Prithvi healing or motivates practice
4. Content does not harm, alarm, or mislead
5. At least one person (Abhishek) has read the primary source, not just a summary

A finding is `excluded` when:
- It is contested without any credible backing (not even `observed` tier)
- It would create anxiety rather than grounding
- It belongs to a tradition we haven't yet researched carefully enough
- It adds complexity without proportionate healing value

---

## 11. Feedback System

### The Leaf Icon
A small, subtle leaf icon (🌿 or custom SVG) permanently available in the top corner of every screen. Tapping it opens a distraction-free input:

*"What would make this more healing for you?"*

Free text. No star rating. No categories. Just words. Sends to `feedback` table with screen context and app version.

### Why this matters
The first 6 months of real use will surface things no roadmap predicted. Users who encounter something confusing, missing, or moving will have an immediate, frictionless way to share it. This is how the app grows in the right direction.

### Review cadence
Abhishek reviews all feedback weekly via Supabase dashboard. High-signal feedback (repeated themes, specific suggestions, reports of something not working) gets logged as notes in DECISIONS.md for the next build conversation.

---

## 12. Feature Roadmap

### Now — Phase 0 (Foundation, current)
- [x] Expo project scaffold, design tokens, research.js
- [x] SOUL.md, PROJECT_CONTEXT.md, DECISIONS.md, SETUP_LOG.md, PRD.md
- [ ] TypeScript migration (rename .js → .tsx, add tsconfig)
- [ ] Supabase project setup (all tables above, RLS, indexes)
- [ ] App running cleanly on physical device
- [ ] GitHub fully in sync

### Phase 1 — MVP (First real build)
**Goal:** Working app for 20 people to give real feedback.

- [ ] Sadhana: Gayatri Mantra player (audio + silent), session logging to Supabase
- [ ] Sadhana: Mahamrityunjay + Om added with guidance cards
- [ ] Sadhana: Sandhya indicator (time until dawn/dusk in user timezone)
- [ ] Bhumi: seeded map with real session counts from Supabase, live updates
- [ ] Jnana/Know: Witness era timeline (expand-on-demand)
- [ ] Jnana/Know: Understand section (Muladhara + frequency science)
- [ ] Jnana/Reflect: journal (private entries, Supabase storage)
- [ ] Sacred calendar: next 12 months of moments pre-loaded
- [ ] Sacred moment card in Sadhana on qualifying days
- [ ] Journal prompts: first session + sacred days + 1-in-4 random
- [ ] Feedback leaf icon on all screens
- [ ] Hindi / English full bilingual
- [ ] EAS Android APK build

### Phase 2 — First Public Release
**Goal:** App Store and Play Store ready.

- [ ] Bhumi map toggle: Gayatri / All Practice
- [ ] Community reflections in Jnana/Reflect (anonymous, opt-in)
- [ ] Sacred Calendar archive in Jnana/Know
- [ ] Post-session wellbeing check-in (3-point optional: 🌱 / 😐 / 🌀)
- [ ] User milestones: 108 sessions, 1008 minutes — quiet journal prompt
- [ ] Bhumi Sukta + Lam Beej audio (via Vagdhenu or sourced)
- [ ] Human-scale equivalences in Witness data
- [ ] iOS build + App Store submission
- [ ] Audio served from S3/CloudFront

### Phase 3 — Deepening (6 months post-launch)
- [ ] Cross-tradition mantras — research-gated, tradition-reviewed
- [ ] Opt-in city-level geolocation for real map data
- [ ] Schumann Resonance live data in Bhumi (pending reliable API)
- [ ] Understand: peer-reviewed research summaries from research_log
- [ ] Sacred calendar: rare planetary alignments (when research supports)
- [ ] Frequency analysis display: visual waveform or Hz note for each mantra
- [ ] Optional email link for cross-device sync

### Phase 4 — The Long Game
- [ ] Researcher API access to anonymized aggregate data
- [ ] Collaboration with sound healing researchers for controlled study
- [ ] Multiple recordings per mantra (different traditions, tempos)
- [ ] Annual Witness data update (keep depletion stats current)
- [ ] Additional languages as demand warrants

---

## 13. What We Will Not Build

*Permanent. Not deferred. See SOUL.md.*

- Advertising of any kind
- Premium tiers that gate healing content
- Streaks that punish absence
- Notifications that interrupt peace
- Leaderboards, competitive maps, "top chanter" rankings
- Social features with likes, comments, follower counts
- Any dark pattern designed to maximize time-in-app
- Content that exploits ecological grief for engagement
- Solfeggio frequencies on the Bhumi map (personal therapeutic, not collective intention)
- "Forecast" language that creates anxiety about upcoming days
- Any claim presented as proven that is not proven
- Any tradition presented as superior to another

---

## 14. Open Questions

*Not yet decided. Do not assume. Each needs explicit conversation.*

**Audio sourcing for MVP:** Commission, license, or Abhishek records himself? Timeline?

**Sacred calendar content creation:** Who writes the descriptions? Abhishek alone, or a dharmic-knowledgeable collaborator?

**Wellbeing data:** The 3-point post-session check-in generates real (if uncontrolled) data on how chanting affects people. At what point does this become worth sharing — with users, with researchers? How do we handle this responsibly?

**Emergent app retirement:** When this build is production-ready, the Emergent prototype should be retired. Timing and communication to any existing Emergent users to be decided.

**Vagdhenu self-hosting:** Which AWS GPU instance type? One-time generation pipeline vs persistent API?

**Cross-tradition research timeline:** This needs real musicological and cultural research. Who does it, and on what timeline? Do not add cross-tradition content without this.

---

*माता भूमिः पुत्रोऽहं पृथिव्याः*
*Earth is my mother. I am her child.*
— Atharva Veda · Bhumi Sukta 12.1.12

*This document was written with the intention to heal, not to build.*
*Every feature decision should return to that intention.*

**Aum Kriya Babaji Namah. Aum Shanti.**
