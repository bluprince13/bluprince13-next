# Design: Related Articles

## Goal

Show 2–3 related posts at the bottom of each blog post to keep readers on the site and help them discover content they might have missed.

---

## Placement

```
[post content]
[ShareBar]
[Related articles]   ← here
[Subscribe]
[Comments]
```

Placed between ShareBar and Subscribe so it appears before the reader leaves the page, but doesn't interrupt the reading flow.

---

## How "related" is determined

All posts already have `categories` in frontmatter. Relatedness is computed server-side in `getStaticProps` — no client JS needed.

### Algorithm (in priority order)

1. **Score by shared categories** — count how many categories overlap between the current post and every other post.
2. **Sort by score desc, then by date desc** (newer posts preferred among ties).
3. **Take the top 3**.
4. **Fallback** — if no other post shares a category (e.g. a post in a unique category), fall back to the 3 most recent posts excluding the current one.

```ts
function getRelatedPosts(current: PostData, all: PostData[]): PostData[] {
  const others = all.filter(p => p.slug !== current.slug)
  const currentCats = new Set(current.categories ?? [])

  const scored = others.map(p => ({
    post: p,
    score: (p.categories ?? []).filter(c => currentCats.has(c)).length
  }))

  scored.sort((a, b) =>
    b.score !== a.score
      ? b.score - a.score
      : new Date(b.post.date).getTime() - new Date(a.post.date).getTime()
  )

  const related = scored.filter(x => x.score > 0).slice(0, 3).map(x => x.post)
  if (related.length === 0) return others.slice(0, 3)   // fallback: most recent
  return related
}
```

This runs at build time — zero runtime cost.

---

## UI layout

### Desktop (≥ 600px) — horizontal row of cards

```
Related articles
────────────────────────────────────────────────────────────────────
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  [banner]    │  │  [banner]    │  │  [banner]    │
│  16:9 image  │  │  16:9 image  │  │  16:9 image  │
├──────────────┤  ├──────────────┤  ├──────────────┤
│ Title        │  │ Title        │  │ Title        │
│ 23 Oct 2025  │  │ 15 Jan 2024  │  │ 3 Mar 2023   │
│ [uk][india]  │  │ [software]   │  │ [life]       │
└──────────────┘  └──────────────┘  └──────────────┘
```

### Mobile (< 600px) — stacked vertical cards

```
Related articles
──────────────────────────
┌──────────────────────┐
│  [banner 16:9]       │
├──────────────────────┤
│ Title                │
│ 23 Oct 2025          │
│ [uk] [india]         │
└──────────────────────┘
┌──────────────────────┐
│  ...                 │
```

---

## Component design

### `RelatedPosts` props

```ts
type RelatedPostsProps = {
  posts: PostData[]  // already filtered to 2–3 related posts
}
```

### `RelatedPostCard` (internal to RelatedPosts, not exported)

```ts
type RelatedPostCardProps = {
  slug: string
  title: string
  date: string
  banner: string
  categories: string[]
}
```

Visual details:
- MUI `Card` with `variant="outlined"`, full card is a Next.js `<Link>`
- `next/image` for the banner with `aspect-ratio: 16/9`, `objectFit="cover"`
- Title: `Typography variant="subtitle1"` (slightly smaller than blog index cards — these are secondary)
- Date: `Typography variant="caption" color="text.secondary"`
- Category chips: `Chip size="small"` — display-only (no click behaviour in this pass)
- No description — space is tight at 3-up; title + date is enough

### Section wrapper

```tsx
<Box sx={{ mt: 4, mb: 2 }}>
  <Divider sx={{ mb: 3 }} />
  <Typography variant="h6" gutterBottom>Related articles</Typography>
  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
    {posts.map(p => <RelatedPostCard key={p.slug} {...p} />)}
  </Box>
</Box>
```

---

## Data flow

`getStaticProps` in `src/pages/blog/[slug].tsx` already calls `getPostDataAndContent(slug)`. Add:

```ts
// existing
const { data, content } = getPostDataAndContent(params.slug)
const mdxSource = await serialize(...)

// new
const allPosts = getSortedPosts()
const relatedPosts = getRelatedPosts(data, allPosts)

return {
  props: { mdxSource, data, relatedPosts }
}
```

`getRelatedPosts` lives in `src/modules/posts.ts` alongside `getSortedPosts`.

---

## Files to create / modify

| File | Action |
|------|--------|
| `src/modules/posts.ts` | Add `getRelatedPosts(current, all)` function; add `categories` to `PostData` type |
| `src/components/blog/RelatedPosts.tsx` | Create — section with 2–3 `RelatedPostCard` tiles |
| `src/pages/blog/[slug].tsx` | Call `getRelatedPosts` in `getStaticProps`; render `<RelatedPosts>` between ShareBar and Subscribe |
| `tst/components/RelatedPosts.test.tsx` | Create — tests for scoring logic and rendering |

---

## Edge cases

| Case | Handling |
|------|----------|
| No shared categories | Show 3 most recent posts |
| Only 1 or 2 matches | Show what exists (don't pad with unrelated posts) |
| Post has no `categories` field | Treat as empty array; fall back to recency |
| Only 1 post in the whole blog | `relatedPosts` is empty; `RelatedPosts` renders nothing |
