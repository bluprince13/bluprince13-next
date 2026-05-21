import { generateMetadata } from '@Modules/metadata'
import Breadcrumbs from '@Components/blog/Breadcrumbs'
import ValuesContent from './content.mdx'

export const metadata = generateMetadata({
    pageTitle: 'Values',
    description: 'My list of personal values.',
    path: '/values'
})

export default function ValuesPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: 'Values' }]} />
            <ValuesContent />
        </>
    )
}
