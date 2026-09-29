'use client'

import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import GitHubIcon from '@mui/icons-material/GitHub'
import { AppData } from '@Content/apps/appsData'

const PREFIX = 'AppCard'

const classes = {
    root: `${PREFIX}-root`
}

const StyledCard = styled(Card)(({ theme }) => ({
    [`&.${classes.root}`]: {
        width: '100%',
        borderColor: theme.vars ? theme.vars.palette.divider : theme.palette.divider,
        backgroundColor: theme.vars ? theme.vars.palette.background.paper : theme.palette.background.paper,
        position: 'relative'
    },
    // Stretch the card link and its hover highlight over the whole card, including the actions row
    '& .MuiCardActionArea-root': {
        position: 'static',
        '&::after': { content: '""', position: 'absolute', inset: 0 }
    },
    '& .MuiCardActions-root': {
        position: 'relative',
        zIndex: 1,
        pointerEvents: 'none',
        '& > *': { pointerEvents: 'auto' }
    }
}))

const formatCreated = (date: string) =>
    new Date(date).toLocaleDateString('en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' })

export default function AppCard({ app }: { app: AppData }) {
    return (
        <StyledCard className={classes.root} variant="outlined">
            <CardActionArea href={app.href}>
                <CardMedia
                    component="img"
                    alt={app.title}
                    height="140"
                    image={app.image}
                    title={app.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {app.title}
                    </Typography>
                    <Typography variant="caption" color="textSecondary" component="p" gutterBottom>
                        <time dateTime={app.created}>{formatCreated(app.created)}</time>
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {app.blurb}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {app.source && (
                <CardActions>
                    <IconButton
                        href={app.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${app.title} source code`}
                        title="Source code"
                        size="small"
                    >
                        <GitHubIcon fontSize="small" />
                    </IconButton>
                </CardActions>
            )}
        </StyledCard>
    )
}
