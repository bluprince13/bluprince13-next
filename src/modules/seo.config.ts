interface SEOConfig {
    title: string
    description: string
    canonical: string
    openGraph: {
        type: string
        locale: string
        url: string
        title: string
        description: string
        images: { url: string; alt: string }[]
    }
    twitter: {
        handle: string
        site: string
        cardType: string
    }
}

const title = 'bluprince13'
const description = 'Full-stack web developer'

const SEO: SEOConfig = {
    title,
    description,
    canonical: 'https://bluprince13.com',
    openGraph: {
        type: 'website',
        locale: 'en_GB',
        url: 'https://bluprince13.com',
        title,
        description,
        images: [
            {
                url: 'https://bluprince13.com/photo.jpg',
                alt: title
            }
        ]
    },
    twitter: {
        handle: '@vipinajayakumar',
        site: '@vipinajayakumar',
        cardType: 'summary_large_image'
    }
}

export default SEO
