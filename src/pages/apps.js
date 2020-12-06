import Comments from '@Components/common/Comments'
import AppsList from '@Components/appsPage/AppsList'
import Title from '@Components/common/Title'

export default () => (
    <div>
        <Title title="Apps" />
        <p>Apps that I made will be showcased here.</p>
        <AppsList />
        <Comments.Embed id="apps" />
    </div>
)
