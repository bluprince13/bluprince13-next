import { getSortedPosts } from '@Modules/posts'
import { getRssFeed } from '@Modules/generateRss'

export const dynamic = 'force-static'

export function GET() {
    return new Response(getRssFeed({ articles: getSortedPosts() }), {
        headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
    })
}
