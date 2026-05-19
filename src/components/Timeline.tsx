'use client'
import Timeline from '@mui/lab/Timeline'
import TimelineItem from '@mui/lab/TimelineItem'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import TimelineContent from '@mui/lab/TimelineContent'
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent'
import TimelineDot from '@mui/lab/TimelineDot'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'

interface TimelineItemData {
    marker: string
    title: string
    description: string
    iconName: string
    color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | 'inherit' | 'grey'
}

const Item = ({ marker, title, description, iconName, color }: TimelineItemData) => (
    <TimelineItem>
        <TimelineOppositeContent
            sx={{ m: 'auto 0' }}
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
        <TimelineContent sx={{ py: '12px', px: 2, m: 'auto 0' }}>
            <Typography variant="h6" component="span">
                {title}
            </Typography>
            <Typography>{description}</Typography>
        </TimelineContent>
    </TimelineItem>
)

export default function CustomizedTimeline({ items }: { items: TimelineItemData[] }) {
    return (
        <Timeline position="alternate">
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
