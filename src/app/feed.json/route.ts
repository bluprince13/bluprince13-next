import { getSortedPosts } from '@Modules/posts'
import { getJsonFeed } from '@Modules/generateRss'

export const dynamic = 'force-static'

export function GET() {
    return new Response(getJsonFeed({ articles: getSortedPosts() }), {
        headers: { 'Content-Type': 'application/feed+json; charset=utf-8' }
    })
}
