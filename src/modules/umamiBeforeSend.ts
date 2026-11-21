export const UMAMI_BEFORE_SEND = 'umamiBeforeSend'

declare global {
    interface Window {
        umamiBeforeSend?: typeof umamiBeforeSend
    }
}

type Payload = { url?: string; name?: string; [key: string]: unknown }

// data-exclude-search strips the whole query string before this runs, so the
// UTM tags are read back from the address bar and only they are restored.
// Pageviews are the payloads without an event name.
export function umamiBeforeSend(type: string, payload: Payload): Payload {
    if (type !== 'event' || payload.name || !payload.url || payload.url.includes('?')) return payload

    const utm = new URLSearchParams()
    new URLSearchParams(window.location.search).forEach((value, key) => {
        if (key.startsWith('utm_')) utm.append(key, value)
    })

    const query = utm.toString()
    return query ? { ...payload, url: `${payload.url}?${query}` } : payload
}
