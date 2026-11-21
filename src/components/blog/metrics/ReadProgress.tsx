'use client'

import { useEffect } from 'react'
import { track } from '@Modules/analytics'
import { POST_CONTENT_ID } from '@Modules/postAnchors'

const MILESTONES = [25, 50, 75, 100]

export function readDepth(contentTop: number, contentHeight: number, viewportBottom: number) {
    if (contentHeight <= 0) return 0
    return Math.min(100, Math.max(0, ((viewportBottom - contentTop) / contentHeight) * 100))
}

export default function ReadProgress({ slug }: { slug: string }) {
    useEffect(() => {
        const content = document.getElementById(POST_CONTENT_ID)
        if (!content) return

        const reached = new Set<number>()
        const onScroll = () => {
            const rect = content.getBoundingClientRect()
            const depth = readDepth(rect.top + window.scrollY, rect.height, window.scrollY + window.innerHeight)
            for (const milestone of MILESTONES) {
                if (depth >= milestone && !reached.has(milestone)) {
                    reached.add(milestone)
                    track('read-progress', { slug, depth: milestone })
                }
            }
            if (reached.size === MILESTONES.length) window.removeEventListener('scroll', onScroll)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [slug])

    return null
}
