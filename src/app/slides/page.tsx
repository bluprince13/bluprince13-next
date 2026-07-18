import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Title from '@Components/Title'
import Breadcrumbs from '@Components/blog/Breadcrumbs'
import SlideCard from '@Components/SlideCard'
import { getSlideDecks } from '@Modules/slides'
import { generateMetadata } from '@Modules/metadata'

export const revalidate = 3600

export const metadata = generateMetadata({
    pageTitle: 'Slides',
    description: 'List of all my slide decks',
    path: '/slides'
})

const SlidesPage = async () => {
    const decks = await getSlideDecks()

    return (
        <>
            <Breadcrumbs items={[{ label: 'Slides' }]} />
            <Title title="Slides" />
            {decks.length === 0 ? (
                <Typography sx={{ mt: 2 }}>
                    Could not load the slide decks. Please try again later.
                </Typography>
            ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                    {decks.map(deck => (
                        <SlideCard key={deck.slug} {...deck} />
                    ))}
                </Box>
            )}
        </>
    )
}

export default SlidesPage
