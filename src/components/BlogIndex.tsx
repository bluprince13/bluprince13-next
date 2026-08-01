'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import PostCard, { type PostCardProps } from '@Components/PostCard'
import BlogSortMenu from '@Components/BlogSortMenu'
import { parseSort, sortPosts, type Sort } from '@Modules/blogSort'
import { buildBlogUrl } from '@Modules/blogUrl'

export type BlogIndexPost = PostCardProps & {
    dateISO?: string
}

type Props = {
    posts: BlogIndexPost[]
}

export default function BlogIndex({ posts }: Props) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeTags = searchParams.getAll('tag')
    const sort = parseSort(searchParams.get('sort'), searchParams.get('dir'))

    const filteredPosts = activeTags.length
        ? posts.filter(p => activeTags.every(t => p.categories.includes(t)))
        : posts
    const visiblePosts = sortPosts(filteredPosts, sort)

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: 1,
                    mb: 3
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    {activeTags.length
                        ? `${filteredPosts.length} of ${posts.length} articles`
                        : `${posts.length} articles`}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                    {activeTags.map(tag => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="filled"
                            color="primary"
                            onDelete={() =>
                                router.push(buildBlogUrl(activeTags.filter(t => t !== tag), sort))
                            }
                        />
                    ))}
                    <BlogSortMenu
                        sort={sort}
                        onChange={(next: Sort) => router.push(buildBlogUrl(activeTags, next))}
                    />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <AnimatePresence initial={false}>
                    {visiblePosts.map((post, index) => (
                        <motion.div
                            key={post.slug}
                            layout
                            exit={{ opacity: 0, scale: 0.97 }}
                            transition={{ duration: 0.2 }}
                        >
                            <PostCard {...post} priority={index === 0} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </Box>
        </>
    )
}
