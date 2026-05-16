# Design: Blog Index Cards

## Goal

Replace the plain `<ul>` link list on `/blog` with a card-based layout that surfaces the information already available in each post's frontmatter: banner image, title, description, date, reading time, and categories.

---

## Layout

### Desktop (≥ 900px) — single column, horizontal cards

```
┌────────────────────────────────────────────────────────────────┐
│  [thumbnail]  │  Title of the post                             │
│  160×120px    │  23 October 2025  ·  5 min read                │
│               │  [uk] [finance]                                 │
│               │                                                 │
│               │  Short description of the post, truncated to   │
│               │  two lines if it runs long...                   │
└────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────┐
│  [thumbnail]  │  Another post title                            │
│               │  ...                                            │
└────────────────────────────────────────────────────────────────┘
```

### Mobile (< 600px) — vertical cards, full-width banner

```
┌──────────────────────────┐
│                          │
│  [banner image, 16:9]    │
│                          │
├──────────────────────────┤
│  Title of the post       │
│  23 Oct 2025 · 5 min     │
│  [uk] [finance]          │
│                          │
│  Short description...    │
└──────────────────────────┘
```

---

## Data requirements

All fields already exist in `PostData` (`src/modules/posts.ts`) except `readingTime` and `categories`.

| Field          | Source                     | Change needed?                          |
|----------------|----------------------------|-----------------------------------------|
| `title`        | frontmatter                | No                                      |
| `description`  | frontmatter                | No                                      |
| `date`         | frontmatter (formatted)    | No                                      |
| `banner`       | frontmatter                | No                                      |
| `slug`         | filename                   | No                                      |
| `categories`   | frontmatter                | Add to `PostData` type and `getPostDataAndContent` |
| `readingTime`  | computed from word count   | Add to `getPostDataAndContent`           |

### Adding `readingTime` and `categories` to `posts.ts`

```ts
// In getPostDataAndContent, after parsing gray-matter:
const wordCount = content.split(/\s+/).length
const readingTime = Math.max(1, Math.ceil(wordCount / 200)) // minutes

const modifiedData = {
  slug,
  ...data,
  // ...existing fields...
  categories: data.categories ?? [],
  readingTime,
}
```

---

## Component structure

```
src/components/blog/
  BlogCard.tsx       ← single card (new)
  BlogCardList.tsx   ← renders the list of cards (new)
```

`src/pages/blog/index.js` imports `BlogCardList` and passes `allPostsData`.

### `BlogCard.tsx` props

```ts
type BlogCardProps = {
  slug: string
  title: string
  description: string
  date: string          // already formatted as "23 October 2025"
  banner: string        // e.g. "/blog/my-post/assets/banner.jpg"
  categories: string[]
  readingTime: number   // minutes
}
```

### Visual details

- **Card**: MUI `Card` with `elevation={0}` and a subtle border (`variant="outlined"`), or `elevation={1}`. Full card is a Next.js `<Link>` (no `legacyBehavior`).
- **Thumbnail**: `next/image` with `width={160}` `height={120}` `objectFit="cover"` on desktop; full-width `aspect-ratio: 16/9` on mobile. Falls back gracefully if `banner` is missing.
- **Title**: MUI `Typography variant="h6"`.
- **Meta line**: date · `{readingTime} min read` — MUI `Typography variant="caption" color="text.secondary"`.
- **Categories**: MUI `Chip size="small"` per category. Clicking a chip is a no-op for now (filtering is a separate task).
- **Description**: MUI `Typography variant="body2"`, clamped to 2 lines with `-webkit-line-clamp: 2`.
- **Hover state**: subtle box-shadow lift (`elevation` change on hover via `sx`).

---

## Category filter (defer to separate task)

The chip list on each card is rendered but not interactive in this first pass. A separate task (`docs/ideas.md` — *Category filter / tag pages*, P1) will add filtering.

---

## Accessibility

- The entire card is wrapped in a `<Link>` (renders as `<a>`). Category chips are `<span>` (not `<button>`) since they are non-interactive in this pass.
- `next/image` gets `alt={title}` so screen readers describe the image.
- Focus ring on the card link is preserved (MUI default outline).

---

## Files to create / modify

| File | Action |
|------|--------|
| `src/modules/posts.ts` | Add `categories: string[]` and `readingTime: number` to `PostData`; compute in `getPostDataAndContent` |
| `src/components/blog/BlogCard.tsx` | Create — single card component |
| `src/components/blog/BlogCardList.tsx` | Create — maps posts → `<BlogCard>` |
| `src/pages/blog/index.js` | Replace `<ul>` with `<BlogCardList>` |
| `tst/components/BlogCard.test.tsx` | Create — snapshot + basic render test |
