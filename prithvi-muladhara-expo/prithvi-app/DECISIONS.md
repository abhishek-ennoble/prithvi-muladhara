# DECISIONS.md
### A running log of decisions made — and why

> When Cowork, Cursor, or Claude Code is about to suggest something "better,"
> check here first. If a decision was made deliberately, it should be
> *changed* deliberately too — not silently overwritten because a tool
> thought it knew better.

Format: **Decision** → **Why** → **Status**

---

## Architecture

**Decision:** Expo (~51.0.0) + React Native (0.74.1), not bare React Native, not Flutter, not native Swift/Kotlin.
**Why:** Abhishek identifies as a non-coder/PM-level technical user. Expo's managed workflow means EAS cloud builds — no Android Studio or Xcode required locally. Expo Go allows instant testing on a real phone without any build step. This was chosen specifically to keep velocity high for a solo non-coder founder.
**Status:** ✅ Locked in. Do not suggest ejecting to bare workflow without strong reason.

**Decision:** All app content (eras, domains, frequencies, mantras, traditions) lives in a single `src/data/research.js` file, not scattered across components or fetched from a CMS/backend.
**Why:** This is content that grows constantly through research conversations. Centralizing it means adding a new fact, mantra, or tradition never requires touching component/UI code — lowering the barrier for non-coder iteration.
**Status:** ✅ Locked in for MVP. Revisit only when content volume genuinely requires a backend (see Roadmap).

**Decision:** Three-screen bottom-tab structure: Witness → Understand → Heal. Not a single scrolling page, not a hub-and-spoke menu.
**Why:** This mirrors a deliberate psychological/spiritual arc — awareness before understanding before action. Collapsing this into fewer screens would lose the intentional pacing. See SOUL.md "lineage of this work."
**Status:** ✅ Core to product identity. Do not flatten.

---

## Design

**Decision:** Dark theme only (void `#0D0A06` background), no light mode in MVP.
**Why:** The aesthetic intention is "stepping into a quiet temple" (SOUL.md). A light mode would need entirely separate design thinking, not just inverted colors — risk of looking like a generic app if done hastily.
**Status:** 🔶 Open for revisit post-MVP, but not now.

**Decision:** EB Garamond (serif) for display/body text, Space Mono for all data/stats/labels.
**Why:** Serif = ancient/earthy/devotional feeling for content. Monospace = precision and honesty signal specifically for data, stats, and source tags — visually separates "what is known" from "what is felt."
**Status:** ✅ Locked in.

**Decision:** Source tagging system — every fact/claim tagged `verified` (green) / `dharmic` (gold) / `observed` (rust) — is baked into the data schema itself, not an afterthought UI feature.
**Why:** Explicit requirement from Abhishek: "we will need to think that it can be info which can be cited. And some which can't... keep both the categories open." This is foundational to the app's intellectual honesty.
**Status:** ✅ Non-negotiable. Every new content addition must include this tag.

**Decision:** "Breathing circle" animation motif (slow pulsing concentric rings, 3-6 sec cycles) used around key icons throughout.
**Why:** Signature calming visual element — references yantra geometry without being literally decorative, reinforces the "slow the nervous system down" principle from SOUL.md.
**Status:** ✅ Locked in as a reusable component pattern.

---

## Content & Research

**Decision:** Five domains for Layer I (Witness): Soil, Minerals, Forests, Human Body, Sacred Geographies.
**Why:** These were explicitly chosen by Abhishek as the physical manifestations of Prithvi tattva worth tracking quantitatively. Not arbitrary — came from direct selection in early conversation.
**Status:** ✅ Locked as the core five. New domains require explicit conversation, not silent addition.

**Decision:** Multi-tradition healing content (Buddhist, Jewish/Kabbalistic, Christian/Sufi, Islamic, Indigenous) included alongside Vedic core.
**Why:** Direct feedback from Abhishek's father (Papa) — "add more mantra, people can listen which are guaranteed healing... sectionize each religion healing music... because God is everywhere."
**Status:** ✅ Locked in as core philosophy, not optional add-on.

**Decision:** Frequency/vibration science layer (Solfeggio frequencies, Schumann Resonance, 432Hz/440Hz history, water memory research) included as Layer II content.
**Why:** Explicit request — "Think from energy and vibration frequency point of view." This layer exists specifically to give scientifically-minded users "a door through the rational mind" (SOUL.md) into content that's otherwise purely dharmic.
**Status:** ✅ Locked in. All frequency claims must carry `observed` or `verified` tags — most are `observed` since the field is contested.

---

## Product Philosophy (enforced via SOUL.md)

**Decision:** No ads, no premium gating of healing content, no streak/gamification mechanics, no aggressive notifications — ever.
**Why:** Explicit, repeated, and non-negotiable. This is a "work of devotion," not a growth-hacked product. Violating this is the single fastest way to break the project's actual purpose.
**Status:** ✅ Permanent. Any AI assistant suggesting these features should be redirected to SOUL.md.

**Decision:** Live heatmap and sync chanting are collective-awareness features, never competitive/social-pressure features.
**Why:** "These exist to remind people they are not alone in caring. They are never used to create social pressure." (SOUL.md)
**Status:** ✅ Permanent design constraint for any future heatmap/social feature work.

---

---

## Navigation & UX (decided June 2026 — Cowork session)

**Decision:** Three tabs only: Sadhana, Bhumi, Jnana.
**Why:** Five tabs implies five equal importance. This app has one center of gravity — the chanting practice. Three keeps that clear. Witness and Understand (knowledge) merged into Jnana because they serve the same psychological moment: going deeper. Knowledge is not a daily tab; it is a library.
**Status:** ✅ Locked. Do not add tabs without explicit conversation.

**Decision:** Tab labels are Sanskrit: Sadhana (साधना), Bhumi (भूमि), Jnana (ज्ञान).
**Why:** All three are Sanskrit-rooted, work in Hindi and English contexts, are one word, and together tell the story of the app: you practice, you see the Earth, you come to know. "Sangam" was rejected (too many cultural associations in India, not distinctive enough). "Anubhav" as a tab was rejected (mixing Hindi with English tabs is inconsistent).
**Status:** ✅ Locked.

**Decision:** App always opens on Sadhana.
**Why:** The daily user's journey must be: open → chant → close. Zero navigation required. The chanting screen is the reason the app exists. It should never be one of five equal options.
**Status:** ✅ Locked.

**Decision:** Jnana tab has an internal toggle: Know | Reflect.
**Why:** Knowledge (Witness + Understand) and Journal (Anubhav + community reflections) serve the same psychological moment — depth and contemplation — but are different activities. A single tab with an internal toggle keeps nav to 3 without hiding either.
**Status:** ✅ Locked.

**Decision:** Journal prompt appears on sacred days, milestones (108th session, 1008th minute), first session, unusually long sessions, and randomly ~1 in 4 sessions. Never after every session.
**Why:** Daily prompts become noise within a week — users auto-dismiss. Sacred timing makes the prompt feel like an invitation from the tradition, not a UX pattern. The question is always "What did you notice?" — never a rating or obligation.
**Status:** ✅ Locked.

**Decision:** Backend is Supabase (not FastAPI + MongoDB as in the Emergent build).
**Why:** Supabase gives real-time subscriptions (Bhumi map), row-level security (private journals), anonymous auth (no accounts required), and PostgreSQL — all without writing a custom backend. Simpler, more maintainable, production-grade from day one.
**Status:** ✅ Locked.

**Decision:** A `research_log` table in Supabase stores every research finding, frequency study, or paper reviewed. Inclusion status tracked per entry.
**Why:** Research on healing frequencies is ongoing. Cross-tradition mantras are research-gated. Nothing should slip. Every finding gets logged before any decision is made about inclusion in the app.
**Status:** ✅ Locked. All future research goes through research_log before touching any content file.

**Decision:** Sacred calendar moments are stored in a `sacred_moments` table, admin-curated, bilingual, archived forever.
**Why:** The app needs to be context-aware of full moons, Guru Purnima, solstices, eclipses, etc. — and respond quietly. This content is too dynamic for a static file but too sacred to be fully automated. Admin curates in advance via Supabase dashboard.
**Status:** ✅ Locked.

**Decision:** Solfeggio frequencies and therapeutic listening do NOT appear on the Bhumi map.
**Why:** The Bhumi map visualizes collective healing intention — things people are doing together with shared purpose. Individual therapeutic listening is personal, not collective resonance in the same sense. Mixing them fragments the map's meaning without proportionate healing value.
**Status:** ✅ Locked. Solfeggio may exist in Sadhana as a listening option (Phase 3, research-gated), but never on the collective map.

**Decision:** "Sacred moment" framing, never "forecast" framing.
**Why:** "Forecast" implies something is coming — creates anticipation or anxiety. "Sacred moment" acknowledges significance without urgency. Example: "This moment carries particular potency" rather than "Strong energy incoming — prepare." Aligns with SOUL.md principle of never overstimulating.
**Status:** ✅ Locked.

**Decision:** A subtle feedback mechanism (leaf icon) on every screen. One open question: "What would make this more healing for you?"
**Why:** The first 6 months of real use will surface things no roadmap predicted. Zero friction for users to share. No star ratings (SOUL.md: no dark patterns). Results reviewed weekly.
**Status:** ✅ Locked for MVP.

---

## Open Questions (not yet decided — do not assume)

- **Audio sourcing for MVP:** Commission, license existing recordings, or Abhishek records himself? Quality and authenticity both matter. "Find something on YouTube" is not acceptable given the devotional nature.
- **Sacred calendar content writing:** Who writes the descriptions and significance text? Abhishek alone, or with a dharmic-knowledgeable collaborator?
- **Wellbeing data from post-session check-in:** At what point does the aggregate 3-point wellbeing data become worth sharing — with users, with researchers? How is this handled responsibly?
- **Monetization (if ever):** Not decided. Explicitly NOT subscription or premium-gating per SOUL.md. Optional one-time "support this work" donation is the only model under consideration.
- **Emergent app retirement:** When this build is production-ready, the Emergent prototype should be retired to avoid confusion. Timing TBD.
- **iOS distribution:** Android APK first (free, faster). iOS requires Apple Developer account ($99/yr). Timeline not yet decided.
- **Vagdhenu self-hosting:** Which AWS GPU instance type for audio generation? One-time pipeline vs persistent API?
- **Cross-tradition chant research:** Who does the musicological and cultural research? On what timeline? No cross-tradition content without this.

---

## How to add to this document

When a real decision gets made — in chat, in Cowork, anywhere — it should be added here in the same format: **Decision → Why → Status**. This is the project's memory across every tool and every session.
