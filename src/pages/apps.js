import Comments from '@Components/Comments'
import AppsList from '@Components/appsPage/AppsList'
import Title from '@Components/Title'
import StandardSeo from '@Components/StandardSeo'

const Apps = () => (
    <div>
        <StandardSeo
            pageTitle="Apps"
            description="Apps that I make will be showcased here."
            path="/apps"
        />
        <Title title="Apps" />
        <p>Apps that I make will be showcased here.</p>
        <AppsList />
        <Comments.Embed id="apps" />
    </div>
)

export default Apps
