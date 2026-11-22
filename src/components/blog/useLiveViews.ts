'use client'

import { useEffect, useState } from 'react'

export type LiveViews =
    | { status: 'loading' }
    | { status: 'ready'; views: Record<string, number> }
    | { status: 'failed' }

export function useLiveViews(): LiveViews {
    const [live, setLive] = useState<LiveViews>({ status: 'loading' })

    useEffect(() => {
        const controller = new AbortController()
        fetch('/api/views', { cache: 'no-store', signal: controller.signal })
            .then(res => (res.ok ? res.json() : null))
            .then(data => setLive(data?.views ? { status: 'ready', views: data.views } : { status: 'failed' }))
            .catch(error => {
                if (error?.name !== 'AbortError') setLive({ status: 'failed' })
            })
        return () => controller.abort()
    }, [])

    return live
}

/** The live count once loaded, never below the cached one; null while loading. */
export function resolveViews(live: LiveViews, slug: string, cached: number): number | null {
    if (live.status === 'loading') return null
    if (live.status === 'failed') return cached
    return Math.max(live.views[slug] ?? 0, cached)
}
