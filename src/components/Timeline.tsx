'use client'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import Timeline from '@mui/lab/Timeline'
import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import Markdown from 'react-markdown'
import remarkCitations from '@Modules/remarkCitations'
import MaterialIcon from '@Components/MaterialIcon'
import type { IconName } from '@Components/MaterialIcon'

interface TimelineItemData {
    marker: string
    title: string
    description: string
    iconName: IconName
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit' | 'grey'
}

interface PhaseData {
    phase: string
    subtitle?: string
}

type TimelineEntry = TimelineItemData | PhaseData

const Item = ({ marker, title, description, iconName, color }: TimelineItemData) => (
    <TimelineItem sx={{ '&::before': { flex: { xs: 0, sm: 1 }, padding: { xs: 0, sm: '6px 16px' } } }}>
        <TimelineOppositeContent
            sx={{ m: 'auto 0', flex: '1 1 0%', minWidth: 0, display: { xs: 'none', sm: 'block' } }}
            align="right"
            variant="body2"
            color="text.secondary"
        >
            {marker}
        </TimelineOppositeContent>
        <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color={color ? color : 'primary'}>
                <MaterialIcon name={iconName} />
            </TimelineDot>
            <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: '12px', px: 2, m: 'auto 0', flex: '1 1 0%', minWidth: 0 }}>
            <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', sm: 'none' } }}>
                {marker}
            </Typography>
            <Typography variant="h6" component="span">
                {title}
            </Typography>
            <Typography component="div" sx={{ '& p': { m: 0 } }}>
                <Markdown remarkPlugins={[remarkCitations]}>{description}</Markdown>
            </Typography>
        </TimelineContent>
    </TimelineItem>
)

const Phase = ({ phase, subtitle, isMobile }: PhaseData & { isMobile: boolean }) => (
    <Box
        component="li"
        sx={{
            position: 'relative',
            display: 'flex',
            justifyContent: isMobile ? 'flex-start' : 'center',
            py: 1.5,
            '&::before': isMobile
                ? undefined
                : {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      left: '50%',
                      width: 2,
                      transform: 'translateX(-50%)',
                      bgcolor: 'grey.400',
                  },
        }}
    >
        <Chip
            color="primary"
            sx={{ position: 'relative', height: 'auto', py: 0.75, '& .MuiChip-label': { whiteSpace: 'normal' } }}
            label={
                <>
                    <Typography component="span" variant="subtitle2" sx={{ fontWeight: 700 }}>
                        {phase}
                    </Typography>
                    {subtitle && (
                        <Typography component="span" variant="body2">
                            {' · '}
                            {subtitle}
                        </Typography>
                    )}
                </>
            }
        />
    </Box>
)

export default function CustomizedTimeline({ items }: { items: TimelineEntry[] }) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Timeline position={isMobile ? 'right' : 'alternate'}>
            {items.map((item, index) =>
                'phase' in item ? (
                    <Phase key={index} {...item} isMobile={isMobile} />
                ) : (
                    <Item key={index} {...item} />
                )
            )}
        </Timeline>
    )
}
