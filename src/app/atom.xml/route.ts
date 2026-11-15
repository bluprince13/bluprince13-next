import { getSortedPosts } from '@Modules/posts'
import { getAtomFeed } from '@Modules/generateRss'

export const dynamic = 'force-static'

export function GET() {
    return new Response(getAtomFeed({ articles: getSortedPosts() }), {
        headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' }
    })
}
