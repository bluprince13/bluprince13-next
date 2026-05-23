import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Image from 'next/image'
import Link from 'next/link'
import type { PostData } from '@Modules/posts'

function RelatedPostCard({ slug, title, dateFormatted, banner, categories }: PostData) {
    return (
        <Link href={`/blog/${slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <Card variant="outlined" sx={{ height: '100%', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 3 } }}>
                <Box sx={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                    <Image src={banner} alt={title} fill sizes="(min-width: 600px) 33vw, 75vw" style={{ objectFit: 'cover' }} />
                </Box>
                <Box sx={{ p: 1.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, lineHeight: 1.3, mb: 0.5 }}>
                        {title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.75 }}>
                        {dateFormatted}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(categories ?? []).map(cat => (
                            <Chip key={cat} label={cat} size="small" />
                        ))}
                    </Box>
                </Box>
            </Card>
        </Link>
    )
}

export function RelatedPosts({ posts }: { posts: PostData[] }) {
    if (posts.length === 0) return null
    return (
        <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="h6" gutterBottom>More articles</Typography>
            <Box sx={{
                display: 'grid',
                gridAutoFlow: { xs: 'column', sm: 'row' },
                gridAutoColumns: { xs: '75%', sm: 'unset' },
                gridTemplateColumns: { xs: 'none', sm: 'repeat(3, 1fr)' },
                gap: 2,
                overflowX: { xs: 'auto', sm: 'visible' },
                pb: { xs: 1, sm: 0 },
            }}>
                {posts.map(p => <RelatedPostCard key={p.slug} {...p} />)}
            </Box>
        </Box>
    )
}
