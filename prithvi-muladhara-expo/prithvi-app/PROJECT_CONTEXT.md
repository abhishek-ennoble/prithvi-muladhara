# PROJECT_CONTEXT.md
### Full background for AI coding assistants (Cursor, Claude Code)

> Read this fully before making any architectural decisions on this project.
> This is the "why" behind every design and technical choice already made.

---

## Origin story

This app was conceived by Abhishek, who works in AI/travel-tech (Ennoble AI) and is deeply engaged with Vedic/Sanatan dharmic philosophy. He is independently building this as a personal devotional project — not a commercial product.

The idea emerged through two parallel threads of research:

**Thread 1 — Ecological research.** A deep investigation into the depletion of Prithvi tattva (Earth element, in the Vedic Pancha Mahabhuta framework) across five physical domains: soil, minerals, forests, the human body (Annamaya Kosha), and sacred geographies (Himalayan glaciers, sacred rivers). This research mapped a "timed history" from Satya Yuga to present day, with both verified scientific data (FAO, UNCCD, peer-reviewed nutrition studies) and dharmic/traditional sources (Vedas, Puranas, Charaka Samhita).

**Thread 2 — Muladhara research.** Abhishek has a separate, earlier app called "Muladhara" (built on Emergent platform) where he discovered through research that the root chakra (Muladhara) — corresponding to Prithvi tattva — is the foundational chakra that requires healing first, both individually and collectively. This led him to the Gayatri Mantra, which begins with "Bhu" (Earth) before ascending through other planes — making it a direct Muladhara healing tool.

**The synthesis:** These two threads combined into "Prithvi · Muladhara" — an app that first makes people *aware* of what has been lost (ecologically, scientifically, dharmically) and then offers them a *direct healing practice* (mantra chanting) to address it, both individually and as a synchronized global collective.

His father (Papa) also contributed feedback — specifically requesting multi-tradition healing music be included, since "God is everywhere" — leading to the inclusion of healing practices from Buddhist, Jewish, Christian/Sufi, Islamic, and Indigenous traditions alongside the Vedic core.

---

## The three-layer architecture

This is the core product structure and should never be flattened or simplified away:

### Layer I — WITNESS
A timed historical journey (Satya Yuga → Treta → Dwapara → Early Kali → Deep Kali → Projected 2050) showing Prithvi's depletion across 5 domains: Soil, Minerals, Forests, Human Body, Sacred Geographies. Every fact is tagged as `verified` / `dharmic` / `observed`.

### Layer II — UNDERSTAND
The bridge layer. Shows the full chakra system with Muladhara highlighted/pulsing as the root. Maps inner depletion (anxiety, bone weakness, disconnection) to outer depletion (soil loss, glacier retreat) side by side. Introduces the **frequency/vibration science layer** — Solfeggio frequencies (174Hz–963Hz), the Schumann Resonance (7.83 Hz, Earth's EM heartbeat), the historical 432Hz→440Hz tuning shift (1939), and water memory research (Emoto). This layer is what makes the app's claims feel grounded rather than purely mystical — it gives people a "door through the rational mind" (a phrase Abhishek used) while still honoring dharmic knowing as equally valid.

### Layer III — HEAL
The action layer. Mantra chanting player (Lam Beej Mantra for direct Muladhara activation, Gayatri Mantra, Bhumi Sukta), with:
- 108-repeat mala counter (visual dots)
- Play/pause/loop/speed controls
- A live global heatmap showing where people are chanting right now (animated, not literal GPS in MVP — to be built with real backend later)
- Universal sync chanting time (6 AM IST) with countdown
- Multi-tradition tab: Vedic, Buddhist, Jewish/Kabbalistic, Christian/Sufi, Islamic, Indigenous — each with their own Earth-honoring practices

---

## The design philosophy (SOUL.md is the canonical source — read it)

Key non-negotiables Abhishek explicitly stated:
1. **"Highly interactive yet calm and peaceful, pure in design"** — this is a direct quote and should guide every UI decision
2. **Lightweight always** — never add features that add weight without clarity
3. **Easy on the brain and mind** — the target user is often already depleted/anxious; the app must never overstimulate
4. **Sound before visual** — audio is the primary healing modality
5. **No dark patterns, no gamification anxiety, no ads, no premium gating of healing content** — explicitly forbidden forever
6. **Universal, not exclusive** — every tradition that honors Earth belongs; this is not a Hindu-only app despite Vedic origins
7. **Citable vs non-citable content both matter** — Abhishek explicitly asked for both "verified" (citable) and "unverified" (dharmic/observed) content to coexist, clearly tagged, never one replacing the other

---

## Design tokens (already established, do not change without explicit approval)

```js
void:        '#0D0A06'   // background
deep:        '#151008'
ground:      '#1E1508'
mud:         '#2E2010'
bark:        '#4A3520'

ochre:       '#C17D3C'   // primary accent
gold:        '#D4A843'   // secondary accent / highlights
paleGold:    '#D4B060'
parchment:   '#EDE3CF'   // primary text
cream:       '#F5EED8'

ash:         '#7A6A52'   // secondary text
stone:       '#5A4E3A'   // tertiary/muted

muladhara:   '#B03020'   // root chakra red
sage:        '#6B7C5E'   // calm green accent

verified:    '#3A7A4A'   // source tag green
dharmic:     '#C9962A'   // source tag gold
observed:    '#8A4A3A'   // source tag rust
```

**Typography:** EB Garamond (display/serif, ancient earthy weight) for titles and body, Space Mono for all data labels, stats, and tags (precision/honesty signal).

**Signature visual motif:** "Breathing circle" elements — concentric rings that pulse slowly (3-6 second cycles) around key icons (Earth, chakra symbols). This references yantra geometry without being literally decorative. Used throughout as the calming, living visual signature of the app.

---

## Technical decisions already made

- **Expo ~51.0.0** / React Native 0.74.1 (chosen for: cross-platform from one codebase, EAS cloud build means no Android Studio/Xcode needed locally, Expo Go allows instant phone testing without builds)
- **React Navigation** (bottom tabs) for the 3-screen structure
- All screen content/data centralized in `src/data/research.js` — this is intentional, so that adding new research, mantras, traditions, or frequencies never requires touching component code
- Source-tagging system (`verified` / `dharmic` / `observed`) is baked into the data layer from day one — every fact, every claim carries this
- `expo-av` for audio (mantra playback)
- `expo-linear-gradient` for the atmospheric backgrounds
- `react-native-svg` reserved for future custom yantra/chakra graphics

---

## What's been built so far (as of this context doc)

1. ✅ Full HTML/CSS prototype (desktop research artifact) — Prithvi Tattva depletion research with citations
2. ✅ Full HTML/CSS interactive PWA mock — first pass at the 3-layer app structure
3. ✅ Higher-fidelity phone-frame HTML mock — used for visual approval, fully interactive (this is what Abhishek approved as "love it")
4. ✅ Real Expo/React Native project scaffold — `package.json`, `app.json`, `babel.config.js`, `App.js`, `src/theme/tokens.js`, `src/data/research.js`, `src/components/UI.js`, `src/screens/WitnessScreen.js`, `src/screens/UnderstandScreen.js`, `src/screens/HealScreen.js`
5. ✅ `SOUL.md` — the design constitution, written and approved
6. 🔄 In progress: getting `npx expo start` running cleanly on Windows laptop, GitHub repo connected, EAS build pipeline for APK

---

## Known issues encountered during setup

- ZIP unzip created a stray `{src` folder (artifact of build process) — should be deleted if present
- `assets/` folder was empty, causing `Unable to resolve asset "./assets/icon.png"` error — needs placeholder PNGs or app.json icon references removed temporarily
- Package version mismatches flagged by Expo (react-native@0.74.1 vs expected 0.74.5, react-native-safe-area-context@4.10.1 vs expected 4.10.5) — minor, can run `npx expo install --fix` to auto-correct later

---

## What comes next (roadmap, not yet built)

1. Real mantra audio files (currently simulated with timers, no actual sound)
2. Backend for the live heatmap (currently simulated with animated dots, no real geolocation/WebSocket)
3. Push notifications for universal sync time (must be designed to NOT feel like nagging — see SOUL.md principle 2)
4. Offline mode / caching
5. EAS-based APK build for direct Android distribution
6. Eventually: integration or deep-linking with Abhishek's existing "Muladhara" app on Emergent
7. User accounts / personal practice tracking (mala history) — to be designed carefully to avoid any guilt/streak mechanics

---

## How to use this document

When making any architectural, design, or content decision:
1. Check `SOUL.md` first — does this align with the core principles?
2. Check this document — has this already been decided, and why?
3. If genuinely new ground — ask Abhishek before assuming, especially for anything touching: monetization, notifications, data collection, or new dependencies

This is a work of devotion before it is a product. Build accordingly.
