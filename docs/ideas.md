# Ideas for improving bluprince13.com

T-shirt sizes: XS < 1h · S ½ day · M 1–2 days · L 3–5 days · XL > 1 week  
Priority: P1 = high impact / do soon · P2 = solid improvement · P3 = nice to have

---

## P1 — High impact, do soon

### Blog index: cards with thumbnail, description, date, and categories
**Size: M**

The blog index (`/blog`) is currently a plain `<ul>` of title-only links. Every post already has a `banner`, `description`, `date`, and `categories` in its frontmatter — none of it is displayed. Replace with a card grid or list that shows the banner image, description snippet, publish date, reading time estimate, and category chips. This is the single biggest discoverability win on the site.

---

### Related articles at the bottom of each post
**Size: S**

Posts already have `categories` in frontmatter. After the share bar, render 2–3 posts that share at least one category with the current post (excluding the current one). No extra data fetching needed — `getSortedPosts()` at `getStaticProps` time is sufficient.

---

### In-site search (replace Google `site:` redirect)
**Size: M**

The current search opens a Google `site:bluprince13.com` query in a new tab. Replace with [Pagefind](https://pagefind.app/), which generates a static index at build time and delivers instant, offline-capable search with zero server cost. Pagefind integrates well with Next.js static export; the search UI stays in-page rather than redirecting to Google.

---

### Reading time estimate on post and index card
**Size: XS**

Count words in the MDX `content` string in `getPostDataAndContent` and expose `readingTime` (e.g. `Math.ceil(wordCount / 200)` minutes) as part of `PostData`. Display it next to the date on both the blog index card and at the top of each post.

---

### Category filter / tag pages on the blog index
**Size: M**

Categories exist in frontmatter but are invisible in the UI. Add two things:
1. Category chip filters on `/blog` to narrow the list client-side (or generate static `/blog/category/[name]` pages).
2. Clickable category chips on each post page and card so readers can find related content.

There are currently ~12 distinct categories: `uk`, `india`, `finance`, `software`, `health`, `life`, `productivity`, `language`, `learning`, `travel`, `mental_health`.

---

### Remove `next-compose-plugins` and clean up `next.config.js`
**Size: XS**

`next-compose-plugins` is unmaintained and unnecessary since Next.js 12+. The config can be rewritten as a plain object with `withMDX` applied directly:
```js
const nextConfig = withMDX({ pageExtensions: [...], rewrites: async () => rewritesConfig })
module.exports = nextConfig
```

---

### Replace `typeface-roboto` with `@fontsource/roboto`
**Size: XS**

`typeface-roboto` is deprecated and unmaintained. `@fontsource/roboto` is its maintained successor, drop-in replacement. Swap the import in `globals.css` or `_app.js`.

---

### Replace `react-ga` with Next.js `GoogleAnalytics` from `@next/third-parties`
**Size: S**

`react-ga` (v3) targets the legacy Universal Analytics which Google shut down in 2024. `@next/third-parties` ships a `<GoogleAnalytics>` component built for GA4 with automatic script optimisation in Next.js. Remove `react-ga`, `GoogleAnalytics.js`, and the `useEffect` initialisation in `_app.js`.

---

## P2 — Solid improvements, moderate effort

### Use `next/image` in `Figure` and on post banner
**Size: S**

`Figure.tsx` already has a `TODO` comment about this. The post banner in `[slug].tsx` is a plain `<img>`. Replacing both with `next/image` gives automatic WebP conversion, lazy loading, and LCP improvements. The blocker (inferring width/height) can be worked around with `fill` layout or by requiring explicit dimensions in the MDX frontmatter for banners.

---

### Better syntax highlighting: replace `remark-prism` with `rehype-pretty-code`
**Size: M**

`remark-prism` is a remark (Markdown AST) plugin that runs before HTML is generated, which limits what it can do. [`rehype-pretty-code`](https://rehype-pretty-code.netlify.app/) is a rehype plugin using Shiki, giving:
- VS Code–quality themes including Night Owl (already in use)
- Line numbers and line highlighting via frontmatter annotations
- Copy-to-clipboard button
- Highlighted diffs

Drop `remark-prism` and `prism-theme-night-owl`, add `rehype-pretty-code` and `shiki`.

---

### Latest posts on the homepage
**Size: S**

The homepage is just a bio with a photo. Show the 3–5 most recent posts (using `getSortedPosts()` in `getStaticProps`) to give returning visitors a reason to engage. A simple list or compact card strip is enough.

---

### Dark mode toggle
**Size: M**

The MUI theme is currently hardcoded light. Add a `paletteMode` toggle (`light`/`dark`) stored in `localStorage` and wired through the MUI `ThemeProvider`. A sun/moon icon button in the `SearchAppBar` is the natural home for the toggle. MUI does most of the heavy lifting once `palette.mode` is set.

---

### Fix deprecated `legacyBehavior` on Next.js `<Link>`
**Size: S**

`SimpleMenu.tsx` uses `<Link legacyBehavior>` wrapping `<MenuItem>`. Since Next.js 13, `<Link>` renders an `<a>` itself — `legacyBehavior` is the compatibility shim. Migrate by replacing the `<Link><MenuItem>` pattern with a `<MenuItem component={Link} href="...">` pattern or using the `LinkComponent` prop, eliminating the wrapper `<div>` and `legacyBehavior`.

---

### Migrate `@mui/styles` (JSS) to MUI v5 `styled` / `sx`
**Size: L**

`@mui/styles` is the legacy MUI v4 JSS-based styling engine, listed as deprecated. `SearchAppBar.tsx` and `Footer.js` use the `styled()` + class-name pattern from that era. Rewrite using MUI v5's `styled` from `@mui/material/styles` and `sx` prop. This removes the `@mui/styles` package and the `StyledEngineProvider injectFirst` workaround in `AppBody.tsx`.

---

### Reading progress bar on posts
**Size: S**

Add a thin fixed bar at the top of the viewport tracking scroll progress through the article. The TOC that used to be paired with this idea now ships as a hover rail in `src/components/blog/TableOfContents.tsx`.

---

## P3 — Nice to have

### Upgrade to Next.js 15
**Size: M**

Next.js 15 introduces the stable App Router with React 19 support, improved caching defaults, and the Turbopack dev server. The main migration effort is the `getStaticProps` / Pages Router pattern, which still works in v15 but the App Router is the long-term direction. This is a bigger step and should follow smaller clean-ups.

---

### Migrate `.js` components to TypeScript
**Size: L**

Many components (`Footer.js`, `Comments.js`, `ShareBar.js`, `Subscribe.js`, `Timeline.js`, etc.) are plain JS. Converting them to `.tsx` gives type safety and better editor support. Best done incrementally file-by-file.

---

### Estimated reading time in RSS feed items
**Size: XS**

Once reading time is computed (see P1 item above), include it in the RSS feed `description` field in `generateRss.js` so feed readers can show it.

---

### Open Graph image generation per post
**Size: M**

Currently `BlogSeo` passes the banner photo as the OG image. Using `@vercel/og` or `next/og`, generate a branded OG image (post title + site name + avatar) at build time or on-demand. This improves social share appearance for posts that have less visually striking banner images.

---

### Replace `getContentAnchorEl` in `SimpleMenu.tsx`
**Size: XS**

`getContentAnchorEl` was removed in MUI v5 but is still in `SimpleMenu.tsx`. Remove the prop — MUI v5 uses `anchorOrigin` and `transformOrigin` instead, which are already set correctly in the same component.

---

### Pagination on the blog index
**Size: S**

With 16 posts currently, this is not urgent, but once the blog grows beyond ~30 posts, a paginated or "load more" pattern on `/blog` will be worth adding to keep the page fast and scannable.
