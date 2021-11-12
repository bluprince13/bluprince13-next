import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

const useStyles = makeStyles({
    root: {
        width: '100%'
    }
})

export default function AppCard({ app }) {
    const classes = useStyles()

    return (
        <Card className={classes.root} variant="outlined">
            <CardActionArea
                href={app.href}
            >
                <CardMedia
                    component="img"
                    alt={app.alt}
                    height="140"
                    image={app.image}
                    title={app.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {app.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {app.blurb}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
