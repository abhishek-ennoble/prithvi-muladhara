# SETUP_LOG.md
### Current technical state of the project

> This is the "where are we right now, exactly" document.
> Read this to avoid re-doing work or re-asking questions already answered.

---

## Environment

- **OS:** Windows
- **Node version:** v24.15.0
- **Git version:** 2.40.0.windows.1
- **Editor:** Cursor (primary), with Claude Code available when needed
- **Project location:** `D:\Personal\Muladhara\prithvi-muladhara-expo\prithvi-app`
  - Note: there's a nested folder structure from the original ZIP extraction
    (`Muladhara\prithvi-muladhara-expo\prithvi-app`) — the actual Expo project
    root is the innermost `prithvi-app` folder. This may be worth flattening
    later for cleanliness, but works as-is.

---

## GitHub

- **Repo:** https://github.com/abhishek-ennoble/prithvi-muladhara.git
- **Visibility:** Private
- **Account:** abhishek-ennoble (Ennoble AI account)
- **Status:** Phase 0 pushed to GitHub on 2026-06-30. SDK upgraded to 54 on
  2026-06-30 after Expo Go load failure (SDK 51 incompatible with current Expo Go).

---

## What's installed / working

- ✅ Expo SDK **54** (upgraded from 51 for Expo Go compatibility)
- ✅ React Native **0.81.5**, React **19.1.0**
- ✅ `babel-preset-expo` installed (required after SDK upgrade)
- ✅ `npx expo-doctor` passes (18/18 checks)
- ✅ Android bundle export succeeds after SDK upgrade
- ✅ Required Expo assets are present:
  - `assets/icon.png`
  - `assets/splash.png`
  - `assets/adaptive-icon.png`
  - `assets/favicon.png`
- ✅ TypeScript migration completed:
  - `tsconfig.json` added using Expo base config with strict mode enabled
  - `App.js` renamed to `App.tsx`
  - all `src/**/*.js` files renamed to `.ts` / `.tsx`
  - `src/theme/tokens.ts` and `src/data/research.ts` typed first
- ✅ TanStack Query installed with `npx expo install @tanstack/react-query`
- ✅ Root app wrapped in `QueryClientProvider`
- ⚠️ `npm install` currently reports 26 audit findings:
  - 1 low
  - 13 moderate
  - 12 high
  - Not fixed during Phase 0 to avoid changing packages outside the approved scope.

---

## Known issues hit and their fixes

### Issue 1: Stray `{src` folder
A malformed folder named `{src` appeared in the unzipped project (artifact of
the original zip command). Should be deleted if still present:
```powershell
Remove-Item -Recurse -Force '.\{src'
```

### Issue 2: Missing asset files
```
Unable to resolve asset "./assets/icon.png" from "icon" in your app.json
```
**Cause:** `assets/` folder exists but has no actual image files — the
project scaffold referenced icons that were never generated.
**Fix options given:**
1. Generate placeholder PNGs via curl/placeholder service
2. OR remove icon/splash/adaptiveIcon references from `app.json` temporarily
**Status as of Phase 0:** Fixed. The required Expo asset files are present in
`assets/`, and `npx expo start` reaches Metro successfully.

## Expo Go troubleshooting (2026-06-30)

**Symptom:** Expo Go loads for a long time, then shows "Something went wrong."

**Root cause found:** Project was on Expo SDK 51. Current Expo Go (App Store /
Play Store, June 2026) expects SDK 54+. SDK mismatch prevents the app from
running on a physical device.

**Fix applied:** Upgraded to Expo SDK 54 and aligned all dependencies.

**If it still fails after pulling latest code:**

1. From project root, run:
   ```powershell
   cd D:\Personal\Muladhara\prithvi-muladhara-expo\prithvi-app
   npm install
   npx expo start -c --tunnel
   ```
2. Use `--tunnel` if phone and PC are on different networks or Windows
   firewall blocks LAN access to port 8081.
3. Confirm Expo Go is updated from the App Store / Play Store.
4. Watch the Metro terminal when you scan the QR — any red error there is the
   actual crash reason.

---

### Issue 3: SOUL.md missing from local folder
`SOUL.md` was written in chat AFTER the ZIP was generated, so it never made
it into the downloaded project. Had to be manually re-added.
**Lesson:** Any file created in chat conversation needs to be explicitly
re-confirmed as present in the local folder — chat and local filesystem
are NOT automatically in sync unless using Cowork.

---

## File inventory (expected vs confirm-on-arrival)

Run `Get-ChildItem -Recurse -File | Select-Object FullName` in the project
root and confirm these all exist:

```
App.js
app.json
babel.config.js
package.json
package-lock.json
SOUL.md                          ← was missing, should now be added
PROJECT_CONTEXT.md               ← new, being added now
DECISIONS.md                     ← new, being added now
README.md
src/theme/tokens.js
src/data/research.js
src/components/UI.js
src/screens/WitnessScreen.js
src/screens/UnderstandScreen.js
src/screens/HealScreen.js
assets/                          ← needs real icon files, currently likely empty or placeholder
```

---

## Immediate next steps (in order)

1. Begin Phase 1 screen work from the locked product direction in
   `SOUL.md`, `DECISIONS.md`, and `.cursorrules`.
2. Set up EAS (`npm install -g eas-cli`, `eas login`, `eas build:configure`)
3. First EAS cloud build: `eas build --platform android --profile preview`
4. Review Emergent prototype screenshots (visual design comparison — pending,
   Abhishek to provide screenshots)
5. Decide: merge any Emergent visual decisions into design tokens, or keep
   current tokens as-is

---

## Phase 0 completion — 2026-06-30

- Task 1 complete: `assets/` contains the required Expo images, and
  `npx expo start` reaches:
  - `Starting Metro Bundler`
  - `Waiting on http://localhost:8081`
  - `Logs for your project will appear below.`
- Task 2 complete: app migrated to strict TypeScript file structure with no
  logic, color, font, or layout rewrites.
- Task 3 complete: TanStack Query installed and root provider configured.
- Current state: the app starts Metro successfully after Phase 0 changes.
- Note: occasional stale Windows listeners on port `8081` were cleared by
  stopping the owning process before rerunning Expo.

---

## Cowork workspace

As of this document, Abhishek is setting up Claude Desktop's Cowork feature
pointed at `D:\Personal\Muladhara\` to eliminate drift between chat-based
decisions and the actual local project files. All four founding documents
(`SOUL.md`, `PROJECT_CONTEXT.md`, `DECISIONS.md`, this `SETUP_LOG.md`) should
be placed in the project root and read by Cowork at the start of every session.
