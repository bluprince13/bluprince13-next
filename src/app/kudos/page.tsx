import { generateMetadata } from '@Modules/metadata'
import Breadcrumbs from '@Components/blog/Breadcrumbs'
import KudosContent from './content.mdx'

export const metadata = generateMetadata({
    pageTitle: 'Kudos',
    description: "People I've learned from",
    path: '/kudos'
})

export default function KudosPage() {
    return (
        <>
            <Breadcrumbs items={[{ label: 'Kudos' }]} />
            <KudosContent />
        </>
    )
}
