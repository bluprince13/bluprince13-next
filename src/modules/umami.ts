import { UMAMI_HOST, UMAMI_WEBSITE_ID } from '@Modules/analytics'

const REVALIDATE_SECONDS = 3600
const HOUR_MS = 3600 * 1000

type ExpandedMetric = { name: string; pageviews: number }

// Rounded up to the hour so the URL, and with it Next's fetch cache key, stays
// the same between revalidations.
export function cacheableEndAt(now = Date.now()): number {
    return Math.ceil(now / HOUR_MS) * HOUR_MS
}

export async function umamiFetch<T>(
    endpoint: string,
    params: Record<string, string | number>,
    { live = false } = {}
): Promise<T> {
    const apiKey = process.env.UMAMI_API_KEY
    if (!apiKey) throw new Error('UMAMI_API_KEY is not set')

    const query = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, String(value)])
    )
    const url = `${UMAMI_HOST}/api/websites/${UMAMI_WEBSITE_ID}${endpoint}?${query}`
    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${apiKey}`, Accept: 'application/json' },
        ...(live ? { cache: 'no-store' } : { next: { revalidate: REVALIDATE_SECONDS } })
    })

    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    return response.json()
}

export async function getPageviewsByPath(
    startAt: number,
    { live = false } = {},
    limit = 1000
): Promise<Record<string, number>> {
    if (!process.env.UMAMI_API_KEY && !process.env.VERCEL) return {}

    const endAt = live ? Date.now() : cacheableEndAt()
    const rows = await umamiFetch<ExpandedMetric[]>(
        '/metrics/expanded',
        { type: 'path', startAt, endAt, limit },
        { live }
    )
    return Object.fromEntries(rows.map(row => [row.name, Number(row.pageviews) || 0]))
}
