# Design: Analytics and a public stats page

## Goal

Find out how readers use the site, so that effort goes into what matters: which posts and apps draw readers, where they come from, whether they finish what they start, and what they search for and fail to find. A public `/stats` page that shows some of these numbers would be a bonus.

---

## The current setup

Three tools count the same pageviews, and none answers "how do readers behave?".

| Tool | Where | What it gives | Limits |
| --- | --- | --- | --- |
| Google Analytics 4 (`G-Y7P3Z69032`) | `<GoogleAnalytics>` in `src/app/AppBody.tsx` | Pageviews, sources, geography, automatic scroll and outbound-click events | Sets cookies with no consent banner, a problem under UK PECR and GDPR. Ad blockers drop a large share of a technical audience. The reports are slow to use. |
| Vercel Web Analytics | `<Analytics>` in `AppBody.tsx` | Pageviews, referrers, countries, devices | On Hobby: 50K events a month, **1 month** of history, **no custom events**. |
| Vercel Speed Insights | `<SpeedInsights>` | Core Web Vitals | Works well. Keep it. |
| Firebase RTDB view counter | `src/app/api/views/[slug]/route.ts`, `ViewCounter.tsx` | Lifetime view count per post, shown on posts and used to sort the blog index | Counts every load, bots and reloads included. Posts only. |
| Hyvor Talk | `src/modules/hyvor.ts` | Comment counts per post | Already used for the "comments" sort. |

Traffic, from Vercel Web Analytics for 21 October to 21 November 2026: about 1,100 pageviews from about 700 visitors, or 150–290 pageviews a week. `/blog/applying-for-oci-for-british-minor` alone draws about a quarter of it. Vercel's script is blocked by some ad blockers, so true traffic is somewhat higher, but the site is small: a few thousand events a month even with custom events.

Gaps:

- **No engagement signal.** Nothing tells you whether a reader finished a post, used the TOC, clicked a related post, subscribed, or searched.
- **Search is a black box.** Pagefind queries, and especially queries with no results, go unrecorded. They show most directly what readers want and cannot find.
- **Proxied apps are invisible.** `/apps/renting-vs-buying`, `/apps/is-it-worth-it` and `/slides/*` are rewrites to other deployments, so the main site's scripts never run on them.
- **No usable history.** Vercel keeps 1 month and GA4 is clumsy to query, so trends like "how did this post do in its first 90 days compared with that one?" are hard to see.
- **Compliance.** GA4 without consent is the one legal risk in the setup.

---

## Options

### Hosted, privacy-first analytics

| | Umami Cloud | Plausible | GoatCounter | Vercel Web Analytics | Cloudflare Web Analytics |
| --- | --- | --- | --- | --- | --- |
| Free tier | Hobby: 100K events a month, 1 site, 6 months of history | None (from about $9 a month, 10K pageviews) | Free for personal sites; donation-funded | Hobby: 50K events, 1 month | Free |
| Custom events | Yes, with properties | Yes | Basic | Pro plan only | No |
| Cookieless, no banner | Yes | Yes | Yes | Yes | Yes |
| Public dashboard | Share URL; boards | Shared link and iframe embed (Growth tier, about $14 a month and up) | Public dashboard toggle | No | No |
| API for your own page | Yes (REST, API key) | Stats API (Business tier) | Yes | Read via the Vercel API only | GraphQL |
| Self-hostable | Yes (MIT; needs only Postgres) | Yes (AGPL; ClickHouse and Postgres) | Yes | No | No |
| Script size | About 2 KB | About 1 KB | About 3 KB | About 1 KB | About 5 KB |

### Product analytics

| | PostHog Cloud | Microsoft Clarity |
| --- | --- | --- |
| Free tier | 1M events and 5K session replays a month | Unlimited and free |
| Strength | Funnels, retention, paths, session replay, surveys, SQL over events | Heatmaps, scroll maps, session replay |
| Weakness | Heavy script (tens of KB). Uses cookies by default; cookieless mode loses identity. Far more product than a blog needs. | Uses cookies, so needs consent. Microsoft uses the data for ads. No useful API for a public page. |

### Build it yourself

Extending the Firebase counter into a full event store: record events in RTDB or Postgres and write reports by hand. It is free and fully under your control, but you would rebuild referrer parsing, bot filtering, sessions and a dashboard UI. That is not a good use of the time.

---

## Recommendation

**Self-host Umami on Vercel with a free Neon Postgres, back it up nightly to Cloudflare R2, keep Speed Insights, and retire GA4, Vercel Web Analytics and the Firebase counter.**

Lifetime history is a requirement, which rules out Umami Cloud's free tier (6 months) and Pro (2 years). Self-hosted Umami keeps every event until you delete it.

Why Umami:

1. **It is the only free option with all three of custom events, a public share URL and a REST API.** The API makes the `/stats` page possible without paying for Plausible's Business tier.
2. **It is cookieless.** Dropping GA4 removes the consent problem, so the site needs no banner.
3. **It is the easiest analytics app to self-host.** It is a Next.js app that needs only Postgres, so it deploys to Vercel like this site. Plausible's self-hosted edition needs ClickHouse and a long-running server.
4. **It is popular and maintained.** About 40K GitHub stars, more than Plausible, and an MIT licence.

Why not the others:

- **Plausible** has the most polished dashboard and is on more sites than Umami, but its share links and API sit on paid tiers. It is the fallback if you'd rather pay about $14–19 a month than run anything.
- **Umami Cloud** would be the easiest start, but cannot keep lifetime history at any price.
- **PostHog** answers questions a blog seldom asks (funnels, cohorts) at the cost of a heavy script and cookies. Revisit it if one of the apps becomes a product with users to retain.
- **Clarity** is tempting for free heatmaps, but it needs consent and gives little that scroll-depth events don't. Try it for a fortnight on one post if you want to see how readers move through a long article, then remove it.
- **GA4** stays useful only for its link to Search Console. Search Console works on its own, so link it directly rather than through GA.

**Freeze the Firebase counter into a baseline.** At cutover, export the Firebase totals once to `src/data/viewsBaseline.json` along with the cutover timestamp. Lifetime views per post become `baseline[slug] + umamiViews[slug]`, where `umamiViews` comes from one cached Umami call, with `startAt` set to the cutover timestamp, that returns every path's count. Starting the Umami count at cutover stops views from the parallel run being counted twice. Map Umami paths to slugs explicitly, ignoring trailing slashes. Firebase counted every load and Umami filters bots and repeats, so the lifetime figure is approximate. Then remove `firebase-admin`, `src/modules/firebase.ts`, the `/api/views` route and the Firebase credentials. Writing the old counts into Umami's tables instead was considered and rejected: Firebase has no timestamps, so the imported views would all land on one date and distort every chart, and Umami's internal schema changes between versions.

---

## Hosting

| Piece | Where | Free-tier limit | Expected use |
| --- | --- | --- | --- |
| Umami app | New Vercel project `bluprince13-umami`, deployed from the fork `bluprince13/bluprince13-umami`, which only ever syncs with upstream | Vercel Hobby (personal, non-commercial use) | A few thousand function calls a month |
| Database | Neon Postgres, in its own Neon account (not the Vercel Marketplace) | 1 GB storage and 100 CU-hours per project; writes fail at the cap rather than billing | About 500 MB per million events (rough estimate), so tens of MB a year at current traffic |
| Script and collection | Custom subdomain `metrics.bluprince13.com` on the Umami project | — | — |

**A subdomain, not a rewrite.** Proxying the tracker through a Next.js rewrite on `bluprince13.com` would hide the reader from Umami. The Umami deployment would see Vercel's proxy as the client, losing the reader's IP and the `x-vercel-ip-*` location headers. Umami derives its visitor ID from IP and user agent, so readers would merge into a handful of visitors and every country would read as the proxy's. Keeping the client IP through a proxy needs Vercel's Enterprise-only Verified Proxy. A custom subdomain on the Umami project lets Vercel set those headers itself, and is still first-party. The descriptive `metrics.` name was chosen over a meaningless one; some DNS-level blockers match words like it, which costs a few percent of readers. Check on launch day with a VPN from two countries that both appear with the right country.

**Neon directly, not through the Vercel Marketplace.** The plans are the same either way. A separate Neon account keeps the database and its billing independent of Vercel, so the Umami app could later move to another host without touching the data. The cost is setting the connection strings on the Vercel project by hand.

**Neon rather than Supabase.** Both have free Postgres plans, but Supabase's suits this job less well:

| | Neon Free | Supabase Free |
| --- | --- | --- |
| Storage | 1 GB per project | 500 MB per project |
| Idle behaviour | Compute sleeps after 5 minutes and wakes on the next query | Whole project paused after a week of inactivity, until resumed by hand |
| Projects | 100 | 2 active |
| First paid step | Usage-based, a few dollars a month at this size | Pro, $25 a month |
| Extras | Database only | Auth, storage, realtime, none needed here |

Umami documents both, but its Vercel guide pairs it with Neon.

**Compute.** Neon's free plan gives 100 CU-hours a month and suspends compute after 5 idle minutes. Each wake costs at least 5 minutes. Past the allowance, compute is suspended until the next month and events are silently dropped. To stay well clear:

- Cap autoscaling at 0.25 CU, which allows 400 awake hours a month. Without the cap, dashboard queries can scale up to 2 CU.
- Have `/stats`, the "Trending" sort and the home-page row share one cached Umami query, revalidated hourly.
- Check CU-hour usage in the Neon console after the first month.

The first event after a quiet spell is a little slower, which readers never see because the tracker sends in the background.

**Umami settings.**

- `DATABASE_URL`: Neon's pooled connection string. `DIRECT_DATABASE_URL`: the unpooled string, which Umami's build uses for `prisma migrate deploy` so migrations bypass the pooler. Umami 3.5 connects through Prisma's `pg` adapter, so the older `?pgbouncer=true` flag is not needed. Copy both from the Neon console.
- `APP_SECRET`: a random value.
- Leave `TRACKER_SCRIPT_NAME` and `COLLECT_API_ENDPOINT` unset, so the tracker uses Umami's default `/script.js` and `/api/send`. Renaming them would hide the tracker from filter lists; keeping the defaults respects readers who choose to block tracking.
- Exclude your own visits with Umami's exclude-self option, or `IGNORE_IP` if your IP is stable.
- Turn off preview deployments on the Umami project, so a preview build never runs migrations against the production database.
- Change the default `admin` password on first login.
- Keep the fork in sync with upstream a few times a year; each production deploy runs Umami's database migrations, so take a backup first.

---

## Backups

Neon's free plan keeps only a short restore window, so it is not a backup.

This follows Neon's own guide: a nightly GitHub Action runs `pg_dump` and uploads the file to S3-compatible storage. The workflow lives in a new private repo, `bluprince13/umami-backups`, and runs nightly:

1. Run in a `postgres:<major>` container matching Neon's Postgres major version. The runner's own client is older, and `pg_dump` refuses to dump a newer server.
2. Dump with `pg_dump --format=custom`, using a read-only Postgres role (`pg_read_all_data`) whose connection string is a repo secret.
3. Restore the dump into a throwaway `postgres` service container of the same major version. Check that `website_event` has at least as many rows as the previous backup recorded, failing the job on any error. A backup that has never been restored is not a backup.
4. Upload it to Cloudflare R2 as `daily/YYYY-MM-DD.dump`. On the 1st of the month, also upload it as `monthly/YYYY-MM.dump`. Bucket lifecycle rules delete dailies after 30 days and keep monthlies forever. R2's free tier gives 10 GB of storage, 1 million uploads and 10 million reads a month, with no download fees. Thirty dailies plus a monthly copy of a database of tens of MB use well under 1 GB and about 30 uploads a month, so the cost is £0; beyond the free tier storage is $0.015 per GB a month. Record the row count in the object's metadata for the next night's check.
5. On failure, GitHub emails the repo owner.

The dumps stay out of git because `--format=custom` is compressed. Git cannot store a night as a change from the previous one, so each night would add a whole new copy, several GB a year.

Private repos get 2,000 free Actions minutes a month; the job takes about two minutes.

**Restoring:** create a fresh Neon database, `pg_restore` the chosen dump into it, and point the Umami project's `DATABASE_URL` and `DIRECT_DATABASE_URL` at it. Document this in the backups repo's README and try it once.

---

## What to track

Pageviews, referrers, UTM parameters, countries and devices come for free. Add these custom events, each answering a question about where to focus.

| Event | Properties | Question it answers |
| --- | --- | --- |
| `read-progress` | `slug`, `depth` (25, 50, 75, 100) | Do readers finish posts? Where do they drop off? |
| `search` | `query`, `results` (count) | What do readers look for? Which queries find nothing, and so suggest new posts? |
| `outbound-click` | `url`, `page` | Which citations and recommendations get followed? |
| `referral-click` | `programme`, `url`, `page` | Which referral links get clicked, and on which posts? Sign-ups and earnings stay in each programme's own dashboard and never go into Umami. |
| `related-post-click` | `from`, `to` | Does the related-posts block keep readers on the site? |
| `toc-click` | `slug`, `heading` | Which sections draw readers in long posts? |
| `blog-filter` | `tag`, `sort` | How do readers browse the index? |
| `subscribe-click` | `method` (rss, atom, json, email) | Does the subscribe section work? |
| `share-click` | `network`, `slug` | Which posts get shared, and where? |
| `code-copy` | `slug`, `language` | Which technical posts get used as references? |
| `404` | `path` | Which broken inbound links need redirects? |

Self-hosted Umami has no event quota, but keep properties to two or three per event and fire `read-progress` at most four times per view, so storage stays small. At current traffic most events will have small counts; read them quarterly rather than monthly.

Readers reach the proxied apps and slides at `bluprince13.com` URLs, so add the same Umami script with the same website ID to those deployments. They then report to the same site under their real paths. Track one or two app-specific events there, such as `calculate`.

---

## Implementation

### Client

`src/components/metrics/UmamiAnalytics.tsx` loads the script with `next/script`, using constants from `src/modules/analytics.ts`:

```tsx
<Script
    src={`${UMAMI_HOST}/script.js`}
    data-website-id={UMAMI_WEBSITE_ID}
    data-domains="bluprince13.com"
    data-exclude-search="true"
    strategy="afterInteractive"
/>
```

`UMAMI_HOST` is `https://metrics.bluprince13.com`. The website ID is public by nature, since it appears in every page's HTML, so it lives in code rather than an environment variable. The tracker sends events back to the host it loaded from. `data-exclude-search` stops query strings, which can carry personal details, from being stored.

The same module exports a typed helper:

```ts
export function track(event: AnalyticsEvent, data?: Record<string, string | number>) {
    window.umami?.track(event, data)
}
```

where `AnalyticsEvent` is a union of the event names above. That keeps names consistent and makes the helper easy to mock in Vitest. For simple clicks, Umami also reads `data-umami-event="name"` attributes, so no handler is needed.

`data-domains` stops `localhost` and preview deployments from polluting the data, matching how the Firebase `POST` already skips development.

### Server

`src/modules/umami.ts` wraps the Umami API (`/api/websites/:id/stats`, `/metrics`, `/pageviews`) with a server-only API key, cached with `fetch(..., { next: { revalidate: 3600 } })`, following the pattern in `src/modules/hyvor.ts`.

### Removal

- Remove `<GoogleAnalytics>` and `@next/third-parties` in the same deploy that adds Umami. Running GA4 longer only extends the consent problem.
- Keep Vercel Web Analytics for about four weeks to check Umami's numbers against it, then remove `<Analytics>` and `@vercel/analytics`.
- Keep the GA4 property after removing the script. Its standard reports stay readable, so pre-Umami trends remain available.
- Freeze Firebase into `viewsBaseline.json` and remove it, as above. Do this in the same deploy that switches the view counts to Umami, so no views fall between the two.
- Update the privacy policy: no cookies and no personal data, with analytics self-hosted on Vercel and Neon.

---

## Public `/stats` page

A server-rendered page, revalidated hourly, built from three sources the site already has or will have:

```
/stats
├── Headline tiles: visitors (30 days), pageviews (30 days), posts, total comments
├── Visitors by month, all time (line chart)
├── Most-read posts, all time         ← baseline + Umami
├── Trending posts, last 30 days      ← Umami /metrics?type=url
├── Top referrers and countries       ← Umami
├── Most-discussed posts              ← Hyvor comment counts
└── "Full dashboard" link             ← Umami share URL
```

Design notes:

- **Show aggregates only.** No search queries, which can contain personal details, and no referrer paths. Group countries below a threshold into "Other".
- **Check the share URL before linking it.** Umami's share page may show custom-event properties such as `search.query`. Record only zero-result queries, cut to 50 characters, or leave the share link off the page.
- **Charts:** MUI X Charts (`@mui/x-charts`, MIT) fits the existing MUI theme and dark mode with no new design system.
- **Cache hard.** `revalidate = 3600` keeps API calls to about 24 a day, whatever the traffic.
- **Link it from the footer** and from `/uses` or `/about`, in the spirit of "open startup" pages.
- **Small touches elsewhere:** a "Trending" sort on the blog index and a "Popular this month" row on the home page, both from the same cached Umami query.

The Umami share URL gives readers the full interactive dashboard for free. The `/stats` page exists to show the numbers in the site's own style, and to combine pre-Umami views and comments, which Umami does not hold.

---

## Rollout

1. Create a Neon account and project, fork Umami, create the `bluprince13-umami` Vercel project, cap compute at 0.25 CU, set the environment variables, add `metrics.bluprince13.com`, deploy, change the admin password and add the website. **(S)**
2. Create the R2 bucket, the backups repo and the workflow; run it once by hand and restore the dump. **(S)**
3. Add the script and the `track()` helper, remove GA4, and check location and visitor counts with a VPN. Instrument `read-progress`, `search` and `outbound-click` first, since they answer the biggest questions. **(S)**
4. Add the remaining events and the script on the proxied apps and slides. **(S)**
5. After about four weeks of comparison, remove Vercel Web Analytics, freeze and remove Firebase, and update the privacy policy. **(S)**
6. Build `/stats` and the "Trending" sort. **(M)**
7. Review quarterly: top posts, zero-result searches, completion rate by post and 404s. Feed them into `docs/ideas.md`.

## Cost

£0. The limits to watch are Neon's 1 GB storage and its monthly compute allowance; at current traffic neither is close. If either is reached, Neon's paid plan is usage-based and costs a few dollars a month at this size.

## Risks

- **Two free tiers instead of one.** A change to Vercel Hobby or Neon Free terms could force a move. The nightly dump means a move costs an afternoon, not the data.
- **Maintenance.** Umami upgrades occasionally change the schema; a failed migration is recoverable from the previous night's dump.
- **Ad blockers.** Some filter lists block Umami's default script and endpoint names even on first-party hosts, and some DNS blockers match `metrics.`. Those readers go uncounted, by choice.
- **Silent data loss.** If Neon's compute allowance runs out, events are dropped without errors on the site. The nightly backup fails in the same situation, so its failure email doubles as the alarm.

An independent review on 21 November 2026 found the original rewrite proxy, git-stored dumps, client version mismatch, missing pooler settings and double-counted baseline; this version fixes them.


## Sources

- [Umami · Cloud FAQ](https://umami.is/docs/cloud/faq) · [Umami · Share URL](https://docs.umami.is/docs/enable-share-url) · [Umami · Websites API](https://umami.is/docs/api/websites)
- [Vercel · Web Analytics pricing](https://vercel.com/docs/analytics/limits-and-pricing)
- [Neon · Free plan limits](https://neon.com/faqs/free-plan-limits-and-quotas) · [Neon · Backups](https://neon.com/docs/manage/backups) · [Neon · Automate pg_dump backups](https://neon.com/docs/manage/backup-pg-dump-automate)
- [Umami · Running on Vercel](https://docs.umami.is/docs/guides/running-on-vercel) · [Umami · Running on Neon](https://docs.umami.is/docs/guides/running-on-neon)
- [Supabase · Pricing](https://supabase.com/pricing) · [Cloudflare · R2 pricing](https://developers.cloudflare.com/r2/pricing)
- [Vercel · Verified proxy](https://vercel.com/guides/how-to-setup-verified-proxy)
- [OSS Insight · Umami vs Plausible](https://ossinsight.io/compare/umami-software/umami/plausible/analytics)
- [PostHog · Pricing](https://posthog.com/pricing)
- [Plausible · Shared links](https://docs.plausible.io/shared-links) · [Seline · Plausible pricing](https://seline.com/blog/plausible-analytics-pricing)
- [GoatCounter · API](https://www.goatcounter.com/api)
- [Microsoft · Clarity scroll maps](https://learn.microsoft.com/en-us/clarity/scroll-maps)
- [Google · Data API quotas](https://developers.google.com/analytics/devguides/reporting/data/v1/quotas)
