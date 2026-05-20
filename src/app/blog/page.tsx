import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import Title from '@Components/Title'
import PostCard from '@Components/PostCard'
import { getSortedPosts } from '@Modules/posts'
import { generateMetadata } from '@Modules/metadata'
import db from '@Modules/firebase'

export const metadata = generateMetadata({
    pageTitle: 'Blog',
    description: 'List of all my articles',
    path: '/blog'
})

const BlogPage = async () => {
    const allPostsData = getSortedPosts()
    const snapshot = await db.ref('views').once('value')
    const viewCounts: Record<string, number> = snapshot.val() ?? {}

    return (
        <>
            <Title title="Blog" />
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {allPostsData.length} articles
            </Typography>
            <Stack spacing={2}>
                {allPostsData.map(post => (
                    <PostCard key={post.slug} {...post} initialViewCount={viewCounts[post.slug]} />
                ))}
            </Stack>
        </>
    )
}

export default BlogPage
