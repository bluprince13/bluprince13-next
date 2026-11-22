import { getLifetimeViews } from '@Modules/views'

export const dynamic = 'force-dynamic'

export async function GET() {
    try {
        const views = await getLifetimeViews({ live: true })
        return Response.json({ views }, { headers: { 'Cache-Control': 'no-store' } })
    } catch (error) {
        console.error('Live views failed', error)
        return Response.json({ error: 'Views unavailable' }, { status: 502 })
    }
}
