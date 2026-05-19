import type { MetadataRoute } from 'next'

const SITE_ROOT = 'https://bluprince13.com'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
        },
        sitemap: `${SITE_ROOT}/sitemap.xml`,
    }
}
