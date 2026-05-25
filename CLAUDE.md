# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal website at [bluprince13.com](https://bluprince13.com), built with Next.js 16 and React 19.

## Commands

```bash
yarn dev          # Start dev server with file watching on src/content/blog
yarn build        # Production build
yarn lint         # ESLint
yarn test:vitest  # Vitest unit/component tests
yarn test:e2e     # Playwright e2e tests (builds + starts server first)
yarn test         # Both test suites
yarn watch        # Vitest in watch mode
```

Run a single Vitest test file:
```bash
yarn test:vitest -- tst/components/Alert.test.tsx
```

## Architecture

### Routing
- **App Router** (`src/app/`): Handles all routes — home, blog, apps, uses, kudos, cv, values, privacy policy, etc.
- **Pages Router** (`src/pages/`): Only contains `blog/[slug].tsx`, which is dead code left over from migration. App Router takes precedence for `/blog/[slug]`.
- `src/app/layout.tsx` wraps everything via `AppBody` for consistent layout (MUI theme, nav, footer)

### Blog System
Blog posts live in `src/content/blog/*.mdx` with gray-matter frontmatter (`title`, `description`, `date`, `banner`, `categories`). The pipeline:

1. `src/modules/posts.ts` — reads MDX files from disk, parses frontmatter, sorts by date. Uses React `cache()` for deduplication.
2. `src/app/blog/[slug]/page.tsx` — `generateStaticParams` generates all post pages at build time using `@mdx-js/mdx`'s `evaluate()`
3. MDX is processed with remark/rehype plugins: TOC, emoji, Mermaid diagrams, CodeSandbox buttons, Shiki syntax highlighting (`rehype-pretty-code`), auto-linked headings, heading numbering (`remarkNumberHeadings`), citations

### MDX Components
Custom components available inside blog MDX files, defined in `src/modules/mdxComponents.ts`:
`Figure`, `Youtube`, `Timeline`, `Table`, `Alert`, `ComparisonTable`, `Mermaid`, `SymbolOverviewWidget`, `Typography` (MUI), `Link` (Next.js)

Also registered in `mdx-components.tsx` at the root for App Router MDX handling.

### UI Components
- `src/components/appbar/` — `AppBar.tsx` (nav with dark-mode toggle and search), `SearchModal.tsx` (Pagefind-powered search overlay), `SimpleMenu.tsx` (mobile nav menu)
- `src/components/blog/` — `Breadcrumbs.tsx`, `FadeIn.tsx` (motion wrapper), `RelatedPosts.tsx`, `ViewCounter.tsx`
- `src/components/PostCard.tsx` — blog post card with banner, title, date, reading time, and category chips
- `src/components/BlogIndex.tsx` — filterable blog list with tag filter and slide-in animation (uses `motion` package)

### Key Modules
- `src/modules/pagefind.ts` — Pagefind search client wrapper
- `src/modules/tagUrl.ts` — URL helpers for tag/category filter links
- `src/modules/remarkNumberHeadings.ts` — remark plugin that numbers headings in MDX posts
- `scripts/build-search-index.mjs` — runs after `next build` (via `postbuild`) to generate the Pagefind search index

### Path Aliases
Configured in `tsconfig.json` and `vitest.config.mts`:
- `@App` → `src/app`
- `@Public` → `public`
- `@Components` → `src/components`
- `@Modules` → `src/modules`
- `@Styles` → `src/styles`
- `@Content` → `src/content`
- `@Apps` → `src/apps`

### External Data
- **Firebase** (`src/modules/firebase.ts`): Blog post view counters via App Router API routes in `src/app/api/views/`
- **RSS/Atom/JSON feeds**: Served via route handlers (`src/app/feed.xml/route.ts`, `src/app/atom.xml/route.ts`, `src/app/feed.json/route.ts`) using `src/modules/generateRss.ts`
- **Rewrites**: Several `/apps/*` routes proxy to separate Vercel/Netlify deployments (configured in `next.config.mjs`)

### Testing
- Unit/component tests: `tst/` directory, Vitest + React Testing Library, jsdom environment (`vitest.config.mts`)
- E2E tests: `tst-e2e/` directory, Playwright (Chromium only), runs against built app
- Snapshot tests for some components (`.snap` files in `tst/components/__snapshots__/`)

**Rules:**
- Always run `yarn test:vitest` before reporting work as done
- E2E tests (`yarn test:e2e`) are slow — run them for significant changes and always before committing
- In MDX blog posts, do not insert line breaks within a paragraph — each paragraph must be a single unbroken line

### TypeScript
- All source files are `.ts`/`.tsx` — migration from JS is complete
- `tsconfig.json` has `strict: false` but `strictNullChecks: true` (partial strict mode)
- Known type shortcuts: `posts.ts` uses `as unknown as PostData` cast and has an untyped `slug` parameter in `getFileContent`; `mdx.ts` uses `runtime as any`

## Improvement ideas

Full details in `docs/ideas.md`. Summary by priority:

**P1 — Do soon**
- Latest posts section on the homepage (S)

**P2 — Solid improvements**
- Per-post Open Graph image generation with `@vercel/og` (M)
- Progress bar / table of contents sidebar on posts (M)

**P3 — Nice to have**
- Reading time in RSS feed items (XS)
- Pagination on the blog index once post count grows (S)
- Remove `'use client'` from pure display components (`Alert`, `Figure`, `Timeline`) — they have no hooks/event handlers (XS)
- Fix type shortcuts in `posts.ts` and `mdx.ts` (XS)
