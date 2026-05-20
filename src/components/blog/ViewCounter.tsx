'use client'

import { useEffect, useState } from 'react'
import format from 'comma-number'

function useViewCount(slug: string, initialCount?: number) {
    const [views, setViews] = useState<number | null>(initialCount ?? null)

    useEffect(() => {
        if (initialCount !== undefined) return
        fetch(`/api/views/${slug}`)
            .then((res) => res.json())
            .then((data) => setViews(data.total))
    }, [slug, initialCount])

    return views
}

export function ViewCount({ slug, initialCount }: { slug: string; initialCount?: number }) {
    const views = useViewCount(slug, initialCount)

    return <>{views !== null ? `${format(views)} views` : '–––'}</>
}

export default function BlogPostViewCounter({ slug }: { slug: string }) {
    useEffect(() => {
        fetch(`/api/views/${slug}`, { method: 'POST' })
    }, [slug])

    return <div><ViewCount slug={slug} /></div>
}
