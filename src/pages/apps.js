import Comments from '@Components/Comments'
import AppsList from '@Components/appsPage/AppsList'
import Title from '@Components/Title'

export default () => (
    <div>
        <Title title="Apps" />
        <p>Apps that I made will be showcased here.</p>
        <AppsList />
        <Comments.Embed id="apps" />
    </div>
)
