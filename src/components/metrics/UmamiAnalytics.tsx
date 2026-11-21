import Script from 'next/script'
import { UMAMI_HOST, UMAMI_WEBSITE_ID } from '@Modules/analytics'
import { UMAMI_BEFORE_SEND, umamiBeforeSend } from '@Modules/umamiBeforeSend'

// The tracker looks the hook up on window at each send. Registering it here,
// in client code that runs before afterInteractive scripts, beats the first pageview.
if (typeof window !== 'undefined') window[UMAMI_BEFORE_SEND] = umamiBeforeSend

export function UmamiAnalytics() {
    if (!UMAMI_WEBSITE_ID) return null

    return (
        <Script
            src={`${UMAMI_HOST}/script.js`}
            data-website-id={UMAMI_WEBSITE_ID}
            data-domains="bluprince13.com"
            data-exclude-search="true"
            data-before-send={UMAMI_BEFORE_SEND}
            data-performance="true"
            data-errors="true"
            strategy="afterInteractive"
        />
    )
}
