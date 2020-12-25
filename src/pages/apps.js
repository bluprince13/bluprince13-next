import Comments from '@Components/Comments'
import AppsList from '@Components/appsPage/AppsList'
import Title from '@Components/Title'

const Apps = () => (
    <div>
        <Title title="Apps" />
        <p>Apps that I made will be showcased here.</p>
        <AppsList />
        <Comments.Embed id="apps" />
    </div>
)

export default Apps
