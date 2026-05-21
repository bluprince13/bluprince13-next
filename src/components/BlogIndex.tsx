'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PostCard, { type PostCardProps } from '@Components/PostCard'
import { buildTagUrl } from '@Modules/tagUrl'

type Props = {
    posts: PostCardProps[]
}

export default function BlogIndex({ posts }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeTags = searchParams.getAll('tag')

    const filteredPosts = activeTags.length
        ? posts.filter(p => activeTags.every(t => p.categories.includes(t)))
        : posts

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="body2" color="text.secondary">
                    {activeTags.length
                        ? `${filteredPosts.length} of ${posts.length} articles`
                        : `${posts.length} articles`}
                </Typography>
                {activeTags.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'flex-end' }}>
                        {activeTags.map(tag => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                variant="filled"
                                color="primary"
                                onDelete={() => router.push(buildTagUrl(activeTags.filter(t => t !== tag)))}
                            />
                        ))}
                    </Box>
                )}
            </Box>
            <Stack spacing={2}>
                {filteredPosts.map(post => (
                    <PostCard key={post.slug} {...post} />
                ))}
            </Stack>
        </>
    )
}
