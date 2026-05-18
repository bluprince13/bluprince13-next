# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website at [bluprince13.com](https://bluprince13.com), built with Next.js 14. Uses a hybrid routing setup: the Pages Router (`src/pages/`) handles most routes, with the App Router (`src/app/`) used only for the CV page and root layout.

## Commands

```bash
yarn dev          # Start dev server with file watching on src/content/blog
yarn build        # Production build
yarn lint         # ESLint
yarn test:jest    # Jest unit/component tests
yarn test:e2e     # Playwright e2e tests (builds + starts server first)
yarn test         # Both test suites
```

Run a single Jest test file:
```bash
yarn test:jest -- tst/components/Alert.test.tsx
```

## Architecture

### Routing
- **Pages Router** (`src/pages/`): Main site — home, blog, apps, uses, kudos, etc.
- **App Router** (`src/app/`): Only `cv/page.tsx`; `layout.tsx` wraps both routers via `AppBody`
- Both routers share `AppBody` for consistent layout (MUI theme, nav, footer)

### Blog System
Blog posts live in `src/content/blog/*.mdx` with gray-matter frontmatter (`title`, `description`, `date`, `banner`, `categories`). The pipeline:

1. `src/modules/posts.ts` — reads MDX files from disk, parses frontmatter, sorts by date
2. `src/pages/blog/[slug].tsx` — `getStaticPaths`/`getStaticProps` generate all post pages at build time using `next-mdx-remote`
3. MDX is serialized with remark/rehype plugins: TOC, emoji, Mermaid diagrams, CodeSandbox buttons, Prism syntax highlighting, auto-linked headings, citations

### MDX Components
Custom components available inside blog MDX files (registered in `[slug].tsx`):
`Figure`, `Youtube`, `Timeline`, `Table`, `Alert`, `ComparisonTable`, `Mermaid`, `Iframe`, `SymbolOverviewWidget`, `Typography` (MUI), `Link` (Next.js)

### Path Aliases
Configured in `jest.config.ts` and `tsconfig.json`:
- `@App` → `src/app`
- `@Components` → `src/components`
- `@Modules` → `src/modules`
- `@Styles` → `src/styles`
- `@Content` → `src/content`
- `@Apps` → `src/apps`

### External Data
- **Firebase** (`src/modules/firebase.js`): Blog post view counters via API routes in `src/pages/api/views/`
- **RSS/Atom/JSON feeds**: Generated at build time via `src/modules/generateRss.js`
- **Rewrites**: Several `/apps/*` routes proxy to separate Vercel/Netlify deployments (configured in `next.config.js`)

### Testing
- Unit/component tests: `tst/` directory, Jest + React Testing Library, jsdom environment
- E2E tests: `tst-e2e/` directory, Playwright (Chromium only), runs against built app
- Snapshot tests are used for some components (`.snap` files in `tst/components/__snapshots__/`)

## Improvement ideas

Full details in `docs/ideas.md`. Summary by priority:

**P1 — Do soon**
- Blog index cards with thumbnail, description, date, reading time, categories (M)
- Related articles at the bottom of each post, based on shared categories (S)
- In-site search with Pagefind, replacing the current Google `site:` redirect (M)
- Reading time estimate computed from word count (XS)
- Category filter / tag pages on the blog index (M)
- Remove unmaintained `next-compose-plugins` from `next.config.js` (XS)
- Replace deprecated `typeface-roboto` with `@fontsource/roboto` (XS)
- Replace dead `react-ga` (Universal Analytics) with `@next/third-parties` GA4 component (S)

**P2 — Solid improvements**
- Use `next/image` in `Figure` component and post banner (S) — there is already a TODO comment
- Better syntax highlighting: replace `remark-prism` with `rehype-pretty-code` / Shiki (M)
- Latest posts section on the homepage (S)
- Dark mode toggle stored in `localStorage`, wired through MUI `ThemeProvider` (M)
- Fix deprecated `legacyBehavior` on Next.js `<Link>` in `SimpleMenu.tsx` (S)
- Migrate legacy `@mui/styles` (JSS) to MUI v5 `styled`/`sx` in `SearchAppBar` and `Footer` (L)

**P3 — Nice to have**
- Next.js 15 upgrade (M)
- Migrate remaining `.js` components to TypeScript (L)
- Reading time in RSS feed items (XS)
- Per-post Open Graph image generation with `@vercel/og` (M)
- Fix stale `getContentAnchorEl` prop in `SimpleMenu.tsx` — removed in MUI v5 (XS)
- Pagination on the blog index once post count grows (S)
- Remove unnecessary `'use client'` from pure display components (`Alert`, `Figure`, `Timeline`) once App Router migration is complete — they have no hooks/event handlers and could run as Server Components (XS)
