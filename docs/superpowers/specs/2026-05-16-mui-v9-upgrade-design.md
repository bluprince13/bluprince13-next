# MUI v5 → v9 Upgrade Design

**Date:** 2026-05-16  
**Branch:** worktree-agent-ac427e6d5dcc9ae58  
**Approach:** One-shot direct upgrade (manual edits + yarn install)

## Context

The codebase runs MUI v5.15.18 (`@mui/material`, `@mui/icons-material`, `@mui/lab`) but `@mui/material-nextjs` is already at v9.0.1 — a version mismatch. The code also already uses the v6+ CSS vars APIs under their v5 experimental names (`experimental_extendTheme`, `Experimental_CssVarsProvider`). No `@mui/styles` (JSS) is in use anywhere — only Emotion-based styling — so the hardest part of the migration is already done.

## Scope

| File | Change |
|---|---|
| `package.json` | Bump `@mui/material`, `@mui/icons-material`, `@mui/lab` to `^9.0.1` / `^9.0.0-beta.3` |
| `src/modules/theme.ts` | Remove `experimental_` prefix from `extendTheme` import |
| `src/app/AppBody.tsx` | Remove `Experimental_` prefix from `CssVarsProvider` import |
| `src/pages/uses.js` | Migrate `Grid` from `@mui/material/Grid` → `GridLegacy` from `@mui/material/GridLegacy` |

## What is NOT changing

- `@mui/material-nextjs` — already at v9.0.1; `v15-pagesRouter` path exists and works
- `src/components/Timeline.js` — Timeline is still in `@mui/lab` at v9, no import change needed
- All Emotion packages — already at compatible versions (`^11.x`)
- Styling approach — `styled()` + `sx` prop, no JSS to migrate

## Validation

After `yarn install`:
1. `yarn build` — must succeed with no type errors
2. `yarn test:jest` — existing suite must pass (matchMedia mock already in jest.setup.ts)
3. Manual smoke test: verify dark mode toggle works, timeline page renders, uses page filter renders

## Risks

- `@mui/lab` v9 is `9.0.0-beta.3` (beta). Timeline is still in lab; if it moves to stable before lab ships, we may need to update imports. Low risk for now.
- The old `Grid` (v5 API) is renamed to `GridLegacy` in v7+. The one usage in `uses.js` is a simple flex container for right-alignment; migrating to `GridLegacy` is a drop-in rename.
