import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
    youtubeWrapper: {
        position: 'relative',
        width: '100%',
        height: 0,
        paddingBottom: '56.25%',
        '& iframe': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 0
        }
    }
}))

export default ({ id }) => {
    const classes = useStyles()
    return (
        <div className={classes.youtubeWrapper}>
            <iframe
                title={id}
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${id}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    )
}
