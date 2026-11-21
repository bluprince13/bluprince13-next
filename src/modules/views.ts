import baseline from '../data/viewsBaseline.json'
import { getPageviewsByPath } from '@Modules/umami'

const BLOG_POST_PATH = /^\/blog\/([^/?#]+)\/?$/

/**
 * Approximate lifetime views per post slug: Firebase's frozen totals plus Umami
 * pageviews since the cutover. Firebase counted every load; Umami filters bots.
 */
export async function getLifetimeViews(): Promise<Record<string, number>> {
    const pageviews = await getPageviewsByPath(new Date(baseline.cutoverAt).getTime())
    const views: Record<string, number> = { ...baseline.views }
    for (const [path, count] of Object.entries(pageviews)) {
        const slug = path.match(BLOG_POST_PATH)?.[1]
        if (slug) views[slug] = (views[slug] ?? 0) + count
    }
    return views
}
