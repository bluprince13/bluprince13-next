export const HYVOR_WEBSITE_ID = 2205

const DATA_API = 'https://talk.hyvor.com/api/data/v1/pages'
const PAGE_SIZE = 50
const MAX_REQUESTS = 10

type HyvorPage = {
    identifier: string
    comments_count: number
}

/**
 * Comment counts per post slug, from Hyvor Talk's public Data API.
 *
 * The API has no key here — it authorises on the Origin/Referer header against
 * the domains allowed in the Hyvor console, so server-side calls must send one
 * explicitly. Pages only exist in Hyvor once their comment embed has loaded at
 * least once, so slugs missing from the response have no comments.
 */
export async function getCommentCounts(): Promise<Record<string, number>> {
    const referer = process.env.SITE_ROOT
    if (!referer) return {}

    const counts: Record<string, number> = {}

    try {
        for (let request = 0; request < MAX_REQUESTS; request++) {
            const url = `${DATA_API}?website_id=${HYVOR_WEBSITE_ID}&limit=${PAGE_SIZE}&offset=${request * PAGE_SIZE}`
            const response = await fetch(url, {
                headers: { Referer: referer },
                next: { revalidate: 3600 }
            })

            if (!response.ok) {
                throw new Error(`${response.status} ${response.statusText}`)
            }

            const pages: HyvorPage[] = await response.json()
            if (!Array.isArray(pages)) {
                throw new Error('unexpected response shape')
            }

            pages.forEach(page => {
                counts[page.identifier] = page.comments_count ?? 0
            })

            if (pages.length < PAGE_SIZE) break
        }
    } catch (error) {
        // Comment counts are decorative here — fall back to zero rather than
        // failing the whole blog index render.
        console.error('Failed to fetch Hyvor comment counts:', error)
    }

    return counts
}
