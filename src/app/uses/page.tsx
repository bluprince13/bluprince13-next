import data from '@Content/uses'
import { compileMdx } from '@Modules/mdx'
import { generateMetadata } from '@Modules/metadata'
import Breadcrumbs from '@Components/blog/Breadcrumbs'
import UsesThis from './UsesThis'

export const metadata = generateMetadata({
    pageTitle: 'Uses',
    description: 'The apps I use',
    path: '/uses',
    bannerPath: '/uses/banner.jpeg'
})

export default async function UsesPage() {
    const compiledData = await Promise.all(
        data.map(async (app) => {
            const compiledSource = app.description
                ? await compileMdx(app.description)
                : ''
            return { ...app, description: compiledSource }
        })
    )

    return (
        <>
            <Breadcrumbs items={[{ label: 'Uses' }]} />
            <UsesThis data={compiledData} />
        </>
    )
}
