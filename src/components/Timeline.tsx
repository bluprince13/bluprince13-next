'use client'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineDot from '@mui/lab/TimelineDot'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import Timeline from '@mui/lab/Timeline'
import Icon from '@mui/material/Icon'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'

interface TimelineItemData {
    marker: string
    title: string
    description: string
    iconName: string
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit' | 'grey'
}

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
                <Icon>{iconName}</Icon>
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
            <Typography>{description}</Typography>
        </TimelineContent>
    </TimelineItem>
)

export default function CustomizedTimeline({ items }: { items: TimelineItemData[] }) {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Timeline position={isMobile ? 'right' : 'alternate'}>
            {items.map(({ marker, title, description, iconName, color }, index) => (
                <Item
                    key={index}
                    marker={marker}
                    title={title}
                    description={description}
                    iconName={iconName}
                    color={color}
                />
            ))}
        </Timeline>
    )
}
