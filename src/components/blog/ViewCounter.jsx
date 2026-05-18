'use client'

import { useEffect, useState } from 'react'
import format from 'comma-number'

export default function ViewCounter({ slug }) {
    const [views, setViews] = useState(null)

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
