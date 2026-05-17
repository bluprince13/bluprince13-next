# MUI v9 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade `@mui/material`, `@mui/icons-material`, and `@mui/lab` from v5 to v9, fixing all API renames and the one Grid migration required.

**Architecture:** Direct one-shot upgrade. The codebase already uses Emotion (no JSS/`@mui/styles`), and already uses the CSS vars APIs under their v5 experimental names — so the changes are four targeted edits plus a `yarn install`. Validate with a build and test run.

**Tech Stack:** MUI v9, Emotion v11, Next.js 14, TypeScript, Jest + React Testing Library

---

## Files

| File | Change |
|---|---|
| `package.json` | Bump three MUI package versions |
| `src/modules/theme.ts` | Remove `experimental_` prefix from `extendTheme` import |
| `src/app/AppBody.tsx` | Remove `Experimental_` prefix from `CssVarsProvider` import |
| `src/pages/uses.js` | Rename `Grid` import path to `GridLegacy` |

---

### Task 1: Bump MUI package versions

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update versions in package.json**

In `package.json`, change these three lines in `"dependencies"`:

```diff
-        "@mui/icons-material": "^5.1.0",
-        "@mui/lab": "^5.0.0-alpha.55",
-        "@mui/material": "^5.1.0",
+        "@mui/icons-material": "^9.0.1",
+        "@mui/lab": "^9.0.0-beta.3",
+        "@mui/material": "^9.0.1",
```

- [ ] **Step 2: Install**

```bash
yarn install
```

Expected: resolves without peer dependency errors. If peer dep warnings appear for `@mui/lab` (it's beta), they can be ignored — lab depends on the same `@mui/material` v9.

- [ ] **Step 3: Commit**

```bash
git add package.json yarn.lock
git commit -m "chore: bump @mui/material, icons-material, lab to v9"
```

---

### Task 2: Fix experimental API renames

In v6, `experimental_extendTheme` and `Experimental_CssVarsProvider` were stabilised and the `experimental` prefix was dropped. This task removes those prefixes.

**Files:**
- Modify: `src/modules/theme.ts:2`
- Modify: `src/app/AppBody.tsx:3`

- [ ] **Step 1: Fix theme.ts import**

In `src/modules/theme.ts`, line 2:

```diff
-import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
+import { extendTheme } from '@mui/material/styles'
```

- [ ] **Step 2: Fix AppBody.tsx import**

In `src/app/AppBody.tsx`, line 3:

```diff
-import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
+import { CssVarsProvider } from '@mui/material/styles'
```

- [ ] **Step 3: Verify TypeScript**

```bash
yarn tsc --noEmit
```

Expected: no errors related to `extendTheme` or `CssVarsProvider`.

- [ ] **Step 4: Commit**

```bash
git add src/modules/theme.ts src/app/AppBody.tsx
git commit -m "chore: remove experimental prefix from extendTheme and CssVarsProvider"
```

---

### Task 3: Migrate Grid → GridLegacy

In MUI v7, the original `Grid` component (v5 API) was renamed to `GridLegacy`. The new `Grid` refers to what was previously `Grid2`. The one usage in `uses.js` is a simple flex wrapper — a drop-in rename.

**Files:**
- Modify: `src/pages/uses.js`

- [ ] **Step 1: Update the import**

In `src/pages/uses.js`, find the Grid import (around line 9):

```diff
-import Grid from '@mui/material/Grid'
+import { GridLegacy as Grid } from '@mui/material'
```

No JSX changes needed — the `container` and `justifyContent` props are unchanged on `GridLegacy`.

- [ ] **Step 2: Commit**

```bash
git add src/pages/uses.js
git commit -m "chore: migrate Grid to GridLegacy for MUI v7+ compatibility"
```

---

### Task 4: Validate build and tests

- [ ] **Step 1: Run Jest tests**

```bash
yarn test:jest
```

Expected: all tests pass. The `matchMedia` mock in `jest.setup.ts` already handles `CssVarsProvider`'s dependency on `window.matchMedia`.

- [ ] **Step 2: Run production build**

```bash
yarn build
```

Expected: build completes with no type errors or missing module errors. Ignore any `@mui/lab` beta warnings in the output.

- [ ] **Step 3: Smoke test locally (optional but recommended)**

```bash
yarn dev
```

Check:
- Dark mode toggle in nav bar works
- `/uses` page loads and filter dropdown renders
- A blog post with a `<Timeline>` component renders (e.g., any post using the Timeline MDX component)

- [ ] **Step 4: Final commit if any fixups were needed**

```bash
git add -p
git commit -m "chore: fixups from MUI v9 upgrade validation"
```
