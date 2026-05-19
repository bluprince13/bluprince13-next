import { Metadata } from 'next'

const SITE_ROOT = 'https://bluprince13.com'
const title = 'bluprince13'
const description = 'Full-stack web developer'

export const siteMetadata: Metadata = {
    title,
    description,
    alternates: {
        canonical: SITE_ROOT,
        types: {
            'application/rss+xml': `${SITE_ROOT}/feed.xml`,
            'application/atom+xml': `${SITE_ROOT}/atom.xml`,
            'application/json': `${SITE_ROOT}/feed.json`
        }
    },
    openGraph: {
        type: 'website',
        locale: 'en_GB',
        url: SITE_ROOT,
        title,
        description,
        images: [
            {
                url: `${SITE_ROOT}/photo.jpg`,
                alt: title
            }
        ]
    },
    twitter: {
        creator: '@vipinajayakumar',
        site: '@vipinajayakumar',
        card: 'summary_large_image'
    }
}

interface MetadataProps {
    pageTitle: string
    description: string
    path: string
    bannerPath?: string
}

export const generateMetadata = ({
    pageTitle,
    description,
    path,
    bannerPath
}: MetadataProps): Metadata => {
    const title = `${pageTitle} - Vipin Ajayakumar`
    const url = `${SITE_ROOT}${path}`
    const featuredImage = bannerPath ? `${SITE_ROOT}${bannerPath}` : undefined

    return {
        title,
        description,
        alternates: {
            canonical: url
        },
        openGraph: {
            url,
            title,
            description,
            images: featuredImage ? [{ url: featuredImage, alt: title }] : []
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: featuredImage ? [featuredImage] : []
        }
    }
}
