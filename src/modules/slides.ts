// Overridable for local development, e.g. when the deployed manifest does not
// exist yet: SLIDES_HOST=http://localhost:4000 yarn dev
const SLIDES_HOST = process.env.SLIDES_HOST ?? 'https://bluprince13-slides.vercel.app'

export interface SlideDeck {
    slug: string
    title: string
    description: string | null
    author: string | null
    banner: string | null
    date: string | null
}

export async function getSlideDecks(): Promise<SlideDeck[]> {
    try {
        const res = await fetch(`${SLIDES_HOST}/slides/index.json`, {
            next: { revalidate: 3600 }
        })
        if (!res.ok) return []
        const { decks } = await res.json()
        return decks ?? []
    } catch {
        return []
    }
}
