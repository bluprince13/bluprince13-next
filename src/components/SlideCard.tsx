'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import SlideshowIcon from '@mui/icons-material/Slideshow'

import type { SlideDeck } from '@Modules/slides'

const dateFormatted = (date: string) =>
    new Date(date).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

export default function SlideCard({ slug, title, description, banner, date }: SlideDeck) {
    return (
        <a
            href={`/slides/${slug}/`}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
        >
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
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                    }}
                >
                    {banner ? (
                        <Box
                            component="img"
                            src={banner}
                            alt={title}
                            sx={{
                                position: 'absolute',
                                inset: 0,
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    ) : (
                        <SlideshowIcon sx={{ fontSize: 48 }} />
                    )}
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
                        {description && description !== title && (
                            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                                {description}
                            </Typography>
                        )}
                    </Box>
                    {date && (
                        <Typography variant="caption" color="text.secondary">
                            {dateFormatted(date)}
                        </Typography>
                    )}
                </Box>
            </Card>
        </a>
    )
}
