import Skeleton from '@mui/material/Skeleton'
import format from 'comma-number'

export default function ViewCount({ views }: { views: number | null }) {
    if (views === null) {
        return (
            <span aria-busy="true">
                <Skeleton variant="text" width="3ch" sx={{ display: 'inline-block', verticalAlign: 'middle' }} /> views
            </span>
        )
    }
    return <span>{format(views)} views</span>
}
