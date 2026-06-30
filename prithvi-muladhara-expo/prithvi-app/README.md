# Prithvi · Muladhara
### A work of devotion

> *"Earth is my mother. I am her child."*  
> — Atharva Veda, Bhumi Sukta 12.1

---

## What this app is

A three-layer mobile app that:
1. **Witnesses** — The timed history of Prithvi (Earth element) depletion, with verified scientific data, dharmic record, and observed evidence clearly labelled
2. **Understands** — How outer ecological depletion maps to inner Muladhara (root chakra) depletion, including the frequency/vibration layer
3. **Heals** — Guided mantra chanting (Lam, Gayatri, Bhumi Sukta), global live heatmap, universal sync chanting, multi-tradition healing sounds

---

## Run on your phone (Expo Go)

### Prerequisites
- Node.js ≥ 18 (you have this)
- Expo Go app on your phone ([iOS](https://apps.apple.com/app/expo-go/id982107779) / [Android](https://play.google.com/store/apps/details?id=host.exp.exponent))

### Steps

```bash
# 1. Go into the project
cd prithvi-app

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start

# 4. Scan the QR code with:
#    - iPhone: Camera app → scan → opens in Expo Go
#    - Android: Expo Go app → Scan QR code
```

That's it. The app is live on your phone.

---

## Build APK (when ready)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account (create free at expo.dev)
eas login

# Configure build
eas build:configure

# Build APK for Android
eas build --platform android --profile preview

# Download APK from the link provided
```

---

## Project Structure

```
prithvi-app/
├── App.js                    # Root — intro screen + navigation
├── app.json                  # Expo config (name, icons, permissions)
├── package.json              # Dependencies
│
└── src/
    ├── theme/
    │   └── tokens.js         # Colors, typography, spacing — all design decisions
    │
    ├── data/
    │   └── research.js       # ALL content: eras, domains, frequencies, mantras, traditions
    │                         # This is the living document — add research here
    │
    ├── components/
    │   └── UI.js             # Reusable components: SourceTag, FactRow, DharmicNote, etc.
    │
    └── screens/
        ├── WitnessScreen.js    # Layer I — History timeline + 5 depletion domains
        ├── UnderstandScreen.js # Layer II — Chakra spine + frequency science + evidence
        └── HealScreen.js       # Layer III — Heatmap + mantra player + traditions
```

---

## The data philosophy

Every piece of content in `src/data/research.js` carries a type:

| Type | Meaning | Color |
|------|---------|-------|
| `verified` | Peer-reviewed / institutional / FAO / NASA / etc | 🟢 Green |
| `dharmic` | Scriptural / traditional / ancient record | 🟡 Gold |
| `observed` | Reported, experiential, emerging, contested | 🔴 Red |

This allows the app to be used in a verified study context (filter to `verified` only) while also carrying the full dharmic and frequency layer for those ready for it.

---

## Next development priorities

1. **Real audio** — Add actual mantra audio files to `/assets/audio/`
2. **Backend for heatmap** — WebSocket server for real-time global chanting data
3. **Push notifications** — Universal sync time alerts
4. **Offline mode** — Cache content for offline chanting
5. **User accounts** — Track personal practice, mala counts
6. **Muladhara app integration** — Deep link to/from existing app

---

## Adding new research

Open `src/data/research.js` and add to any array:

```js
// Add a new era
ERAS.push({
  id: 'new-era',
  period: '...',
  yuga: '...',
  title: '...',
  summary: '...',
  depletion: 0.5,  // 0 to 1
  facts: [
    { stat: '...', desc: '...', source: '...', type: 'verified' },
  ],
  dharmicNote: '...',
  dharmicSource: '...',
});

// Add a new frequency
FREQUENCIES.push({
  hz: 528,
  name: '...',
  color: '#1A5A2A',
  element: '...',
  chakra: '...',
  effect: '...',
  connection: '...',
  type: 'observed',
  source: '...',
});
```

---

*This is a work of devotion. Built with care for the Earth and for those who remember that they are her children.*
