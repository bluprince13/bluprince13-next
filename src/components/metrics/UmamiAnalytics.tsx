import Script from 'next/script'
import { UMAMI_HOST, UMAMI_WEBSITE_ID } from '@Modules/analytics'

export function UmamiAnalytics() {
    if (!UMAMI_WEBSITE_ID) return null

    return (
        <Script
            src={`${UMAMI_HOST}/script.js`}
            data-website-id={UMAMI_WEBSITE_ID}
            data-domains="bluprince13.com"
            data-exclude-search="true"
            strategy="afterInteractive"
        />
    )
}
