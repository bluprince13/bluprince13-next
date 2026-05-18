import { MyComments } from '@Components/Comments'
import AppsList from '@Components/appsPage/AppsList'
import Title from '@Components/Title'
import { generateMetadata } from '@Modules/metadata'

export const metadata = generateMetadata({
    pageTitle: 'Apps',
    description: 'Apps that I make will be showcased here.',
    path: '/apps'
})

const Apps = () => (
    <div>
        <Title title="Apps" />
        <p>Apps that I make will be showcased here.</p>
        <AppsList />
        <MyComments id="apps" />
    </div>
)

export default Apps
