'use client'

import ViewCount from '@Components/blog/ViewCount'
import { resolveViews, useLiveViews } from '@Components/blog/useLiveViews'

export default function PostViewCount({ slug, fallbackViews }: { slug: string; fallbackViews: number }) {
    const live = useLiveViews()
    return (
        <div>
            <ViewCount views={resolveViews(live, slug, fallbackViews)} />
        </div>
    )
}
