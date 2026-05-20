'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import Link from 'next/link'
import type { PostData } from '@Modules/posts'
import { ViewCount } from '@Components/blog/ViewCounter'
import { MyCommentCount } from '@Components/Comments'

type PostCardProps = Pick<
    PostData,
    'slug' | 'title' | 'banner' | 'dateFormatted' | 'categories' | 'readingTime' | 'excerpt'
> & { initialViewCount?: number }

export default function PostCard({
    slug,
    title,
    banner,
    dateFormatted,
    categories,
    readingTime,
    excerpt,
    initialViewCount,
}: PostCardProps) {
    return (
        <Link href={`/blog/${slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
            <Card
                variant="outlined"
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    transition: 'box-shadow 0.2s',
                    '&:hover': { boxShadow: 3 },
                }}
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
                    <Image src={banner} alt={title} fill style={{ objectFit: 'cover' }} />
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
                            {categories.map(cat => (
                                <Chip key={cat} label={cat} size="small" />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Card>
        </Link>
    )
}
