export const UMAMI_HOST = 'https://metrics.bluprince13.com'
export const UMAMI_WEBSITE_ID = 'edc52b82-9184-4248-ba25-4ccfc03ec2f0'

export type AnalyticsEvent =
    | 'read-progress'
    | 'search'
    | 'outbound-click'
    | 'related-post-click'
    | 'toc-click'
    | 'blog-filter'
    | 'subscribe-click'
    | 'share-click'
    | 'code-copy'
    | '404'

type EventData = Record<string, string | number>

declare global {
    interface Window {
        umami?: { track: (event: string, data?: EventData) => void }
    }
}

export function track(event: AnalyticsEvent, data?: EventData) {
    window.umami?.track(event, data)
}
