'use client'

import { useEffect, useState } from 'react'
import format from 'comma-number'

export default function ViewCounter({ slug }: { slug: string }) {
    const [views, setViews] = useState<number | null>(null)

    useEffect(() => {
        fetch(`/api/views/${slug}`)
            .then((res) => res.json())
            .then((data) => setViews(data.total))
    }, [slug])

    useEffect(() => {
        fetch(`/api/views/${slug}`, { method: 'POST' })
    }, [slug])

    return <div>{`${views ? format(views) : '–––'} views`}</div>
}
