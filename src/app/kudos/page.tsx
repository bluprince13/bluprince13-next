import { generateMetadata } from '@Modules/metadata'
import KudosContent from './content.mdx'

export const metadata = generateMetadata({
    pageTitle: 'Kudos',
    description: "People I've learned from",
    path: '/kudos'
})

export default function KudosPage() {
    return <KudosContent />
}
