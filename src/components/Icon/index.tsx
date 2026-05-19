import Box from '@mui/material/Box'
import { Icon as IconifyIcon } from '@iconify/react'

const sx = {
    display: 'inline-block',
    marginRight: '15px',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
        opacity: 0.75
    }
}

const SIZE = 30

const iconNames: Record<string, string> = {
    github: 'simple-icons:github',
    twitter: 'simple-icons:x',
    linkedin: 'simple-icons:linkedin',
    youtube: 'simple-icons:youtube',
    rss: 'simple-icons:rss',
    goodreads: 'simple-icons:goodreads',
    letterboxd: 'simple-icons:letterboxd',
}

const iconColors: Record<string, string> = {
    github: '#24292e',
    twitter: '#1da1f2',
    linkedin: '#0077b5',
    youtube: '#ff0000',
    rss: '#f26522',
    goodreads: '#372213',
    letterboxd: '#202830'
}

const getNetwork = (url: string): string | null => {
    if (!url) return null
    if (url.includes('github.com')) return 'github'
    if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter'
    if (url.includes('linkedin.com')) return 'linkedin'
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube'
    return null
}

const Icon = ({ url, network }: { url: string; network?: string }) => {
    const resolvedNetwork = network || getNetwork(url)
    const iconName = resolvedNetwork && iconNames[resolvedNetwork]
    const bgColor = (resolvedNetwork && iconColors[resolvedNetwork]) || '#666'

    return (
        <Box component="a" href={url} target="_blank" rel="noopener noreferrer" sx={sx}>
            <Box
                sx={{
                    width: SIZE,
                    height: SIZE,
                    borderRadius: '50%',
                    bgcolor: bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {iconName && <IconifyIcon icon={iconName} color="white" width={SIZE * 0.6} />}
            </Box>
        </Box>
    )
}

export default Icon
