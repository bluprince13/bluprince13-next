export const UMAMI_HOST = 'https://metrics.bluprince13.com'
export const UMAMI_WEBSITE_ID = 'edc52b82-9184-4248-ba25-4ccfc03ec2f0'

export type AnalyticsEvent =
    | 'read-progress'
    | 'search'
    | 'outbound-click'
    | 'referral-click'
    | 'related-post-click'
    | 'blog-filter'
    | 'subscribe-click'
    | 'share-click'

type EventData = Record<string, string | number>

declare global {
    interface Window {
        umami?: { track: (event: string, data?: EventData) => void }
    }
}

const RETRY_MS = 500
const MAX_RETRIES = 10

// Events fired on mount can beat the afterInteractive tracker script, so wait
// a few seconds for it rather than dropping them. Blocked trackers never load.
export function track(event: AnalyticsEvent, data?: EventData, retries = MAX_RETRIES) {
    if (window.umami) window.umami.track(event, data)
    else if (retries > 0) setTimeout(() => track(event, data, retries - 1), RETRY_MS)
}
