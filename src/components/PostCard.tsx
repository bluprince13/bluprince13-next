'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'motion/react'
import { useRouter, useSearchParams } from 'next/navigation'
import type { PostData } from '@Modules/posts'
import { buildTagUrl } from '@Modules/tagUrl'
import { ViewCount } from '@Components/blog/ViewCounter'
import { MyCommentCount } from '@Components/Comments'

export type PostCardProps = Pick<
    PostData,
    'slug' | 'title' | 'banner' | 'dateFormatted' | 'categories' | 'readingTime' | 'excerpt'
> & { initialViewCount?: number; priority?: boolean }

export default function PostCard({
    slug,
    title,
    banner,
    dateFormatted,
    categories,
    readingTime,
    excerpt,
    initialViewCount,
    priority = false,
}: PostCardProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const activeTags = searchParams.getAll('tag')

    function handleTagClick(e: React.MouseEvent, cat: string) {
        e.preventDefault()
        e.stopPropagation()
        const next = activeTags.includes(cat) ? activeTags.filter(t => t !== cat) : [...activeTags, cat]
        router.push(buildTagUrl(next))
    }

    return (
        <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.15 }}>
        <Link href={`/blog/${slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <Card
                variant="outlined"
                sx={theme => ({
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    transition: 'box-shadow 0.2s',
                    '&:hover': {
                        boxShadow: 3,
                        ...theme.applyStyles('dark', {
                            boxShadow: '0 2px 12px rgba(255, 255, 255, 0.12)',
                        }),
                    },
                })}
            >
                <Box
                    sx={{
                        position: 'relative',
                        width: { xs: '100%', sm: 220 },
                        flexShrink: 0,
                        aspectRatio: { xs: '16/9', sm: 'unset' },
                        minHeight: { sm: 140 },
                    }}
                >
                    <Image src={banner} alt={title} fill sizes="(min-width: 600px) 220px, 100vw" style={{ objectFit: 'cover' }} priority={priority} />
                </Box>
                <Box
                    sx={{
                        p: 2,
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: 1,
                    }}
                >
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, lineHeight: 1.3, mb: 1 }}>
                            {title}
                        </Typography>
                        {excerpt && (
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                {excerpt}
                            </Typography>
                        )}
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: 1,
                        }}
                    >
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', gap: 0.5 }}>
                            <span>{dateFormatted} · {readingTime} min read</span>
                            <span>·</span>
                            <ViewCount slug={slug} initialCount={initialViewCount} />
                            <span>·</span>
                            <MyCommentCount id={slug} />
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {categories.map(cat => {
                                const active = activeTags.includes(cat)
                                return (
                                    <Chip
                                        key={cat}
                                        label={cat}
                                        size="small"
                                        variant={active ? 'filled' : 'outlined'}
                                        color={active ? 'primary' : 'default'}
                                        clickable
                                        onClick={e => handleTagClick(e, cat)}
                                        onDelete={active ? e => handleTagClick(e, cat) : undefined}
                                    />
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Link>
        </motion.div>
    )
}
