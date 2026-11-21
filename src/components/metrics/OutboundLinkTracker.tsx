'use client'

import { useEffect } from 'react'
import { track } from '@Modules/analytics'
import { referralProgramme } from '@Modules/referral'

export function outboundUrl(href: string, currentHost: string): string | null {
    let url: URL
    try {
        url = new URL(href)
    } catch {
        return null
    }
    if (!url.protocol.startsWith('http') || url.host === currentHost) return null
    return `${url.host}${url.pathname}`.slice(0, 200)
}

export function OutboundLinkTracker() {
    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            const anchor = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
            if (!anchor) return
            const url = outboundUrl(anchor.href, window.location.host)
            if (!url) return
            const page = window.location.pathname
            track('outbound-click', { url, page })
            const programme = referralProgramme(anchor.href)
            if (programme) track('referral-click', { programme, url, page })
        }
        // Capture phase, so links whose handlers stop propagation are still counted.
        document.addEventListener('click', onClick, true)
        return () => document.removeEventListener('click', onClick, true)
    }, [])

    return null
}
