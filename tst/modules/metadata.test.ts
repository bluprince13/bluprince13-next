import { generateMetadata } from '@Modules/metadata'
import type { Metadata } from 'next'

describe('generateMetadata', () => {
    it('formats title as "PageTitle - Vipin Ajayakumar"', () => {
        const meta = generateMetadata({ pageTitle: 'My Page', description: 'desc', path: '/my-page' })
        expect(meta.title).toBe('My Page - Vipin Ajayakumar')
    })

    it('sets openGraph.url to https://bluprince13.com + path', () => {
        const meta = generateMetadata({ pageTitle: 'Test', description: 'desc', path: '/test' })
        expect((meta.openGraph as NonNullable<Metadata['openGraph']>).url).toBe('https://bluprince13.com/test')
    })

    it('includes og image when bannerPath is provided', () => {
        const meta = generateMetadata({
            pageTitle: 'Test',
            description: 'desc',
            path: '/test',
            bannerPath: '/img/banner.jpg'
        })
        const images = (meta.openGraph as NonNullable<Metadata['openGraph']>).images as Array<{ url: string }>
        expect(images).toHaveLength(1)
        expect(images[0].url).toBe('https://bluprince13.com/img/banner.jpg')
    })

    it('has empty images when no bannerPath', () => {
        const meta = generateMetadata({ pageTitle: 'Test', description: 'desc', path: '/test' })
        const images = (meta.openGraph as NonNullable<Metadata['openGraph']>).images as unknown[]
        expect(images).toHaveLength(0)
    })
})
