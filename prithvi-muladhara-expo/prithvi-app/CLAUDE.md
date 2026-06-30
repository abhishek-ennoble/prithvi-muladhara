# CLAUDE.md
### Auto-context for Claude Code sessions — Prithvi · Muladhara

Read this file, then read SOUL.md, then read SETUP_LOG.md before doing anything.
These three files together give you the complete picture of what this is and where we are.

---

## What this project is

A sacred healing app — not a commercial product. Built to help people heal the
Earth element (Prithvi tattva) within themselves and on the planet through mantra
chanting, awareness, and collective resonance.

**Platform:** Expo (React Native) — iOS + Android
**Backend:** Supabase
**Audio:** AWS S3 + CloudFront
**Project root:** `D:\Personal\Muladhara\prithvi-muladhara-expo\prithvi-app`

---

## The documents — read them in this order

| File | When to read |
|------|-------------|
| `SOUL.md` | Before every session — the design constitution |
| `SETUP_LOG.md` | Before every session — current technical state |
| `PRD.md` | Before building any new feature or screen |
| `DECISIONS.md` | Before any architectural or UX decision |
| `RESEARCH_PIPELINE.md` | Before adding any content or frequency claim |

---

## Navigation — 3 tabs, locked

**Sadhana** (साधना) — chanting practice, DEFAULT HOME, app always opens here
**Bhumi** (भूमि) — collective map, real-time session visualization
**Jnana** (ज्ञान) — knowledge (Know) + journal (Reflect) with internal toggle

Do not change this. Do not suggest alternatives.

---

## Tech stack — locked

- Expo ~51 managed workflow (do NOT eject, do NOT suggest ejecting)
- TypeScript strict mode
- React Navigation bottom tabs
- Supabase (real-time, RLS, anon auth)
- expo-av for audio
- No Redux, no Zustand, no NativeWind

---

## Design tokens — import from src/theme/tokens.ts, never hardcode

Primary bg: `#0D0A06` | Primary text: `#EDE3CF` | Accent: `#C17D3C`
Gold: `#D4A843` | Muladhara red: `#B03020` | Sage: `#6B7C5E`
Source tags: verified `#3A7A4A` | dharmic `#C9962A` | observed `#8A4A3A`

Fonts: EB Garamond (content) + Space Mono (data/stats). No other fonts.

---

## Rules Claude Code must follow

1. **Never hard-delete data** — all tables use soft delete (`deleted_at`)
2. **Every content fact needs a source tag** — verified / dharmic / observed
3. **No gamification** — no streaks, badges, points, leaderboards
4. **No push notifications** except explicit opt-in for global resonance windows
5. **Audio streams from S3** — never bundle large audio files in the app binary
6. **TypeScript strict** — no `any` unless unavoidable, and always with a TODO comment
7. **Update SETUP_LOG.md** at the end of every session with current state

---

## DB tables (Supabase) — full schema in PRD.md Section 9

`profiles` `sessions` `anubhav` `sacred_moments`
`user_milestones` `city_seeds` `feedback` `research_log`

---

## Common terminal operations for this project

```bash
# Start Metro bundler
npx expo start

# Fix package version mismatches
npx expo install --fix

# EAS Android build (preview)
eas build --platform android --profile preview

# EAS iOS build (preview)
eas build --platform ios --profile preview

# Push to GitHub
git add . && git commit -m "message" && git push origin main

# Install new package (always use expo install, not npm install)
npx expo install <package-name>
```

---

## Session start checklist

- [ ] Read SOUL.md
- [ ] Read SETUP_LOG.md (know current state before touching anything)
- [ ] Check DECISIONS.md if about to make an architectural choice
- [ ] Confirm the task is in Phase 0, 1, or 2 roadmap (see PRD.md Section 12)

## Session end checklist

- [ ] App still compiles without errors
- [ ] Update SETUP_LOG.md with what was done and what's next
- [ ] If a new decision was made → add to DECISIONS.md
- [ ] If research was referenced → check RESEARCH_PIPELINE.md is current
- [ ] Git commit and push

---

*माता भूमिः पुत्रोऽहं पृथिव्याः*
*Earth is my mother. I am her child.*
