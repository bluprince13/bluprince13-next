import createMDX from '@next/mdx'

const SLIDES_HOST = process.env.SLIDES_HOST ?? 'https://bluprince13-slides.vercel.app'

const rewritesConfig = [
    {
        source: '/cv/pdf',
        destination: 'https://bluprince13.gitlab.io/cv/ajayakumar_vipin_cv.pdf'
    },
    {
        source: '/cv/source',
        destination:
            'https://bluprince13.gitlab.io/cv/ajayakumar_vipin_cv.tar.gz'
    },
    {
        source: '/apps/renting-vs-buying',
        destination: `https://renting-vs-buying.vercel.app/`
    },
    {
        source: '/apps/renting-vs-buying/:path*',
        destination: `https://renting-vs-buying.vercel.app/:path*`
    },
    {
        source: '/apps/coding-interview-prep',
        destination: `https://coding-interview-prep.netlify.app/`
    },
    {
        source: '/apps/coding-interview-prep/:path*',
        destination: `https://coding-interview-prep.netlify.app/:path*`
    },
    {
        source: '/slides/:path*',
        destination: `${SLIDES_HOST}/slides/:path*`
    },
    {
        source: '/reveal.js/:path*',
        destination: `${SLIDES_HOST}/slides/reveal.js/:path*`
    }
]

const withMDX = createMDX({})

export default withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
    experimental: { mdxRs: true },
    rewrites: async () => rewritesConfig,
})
