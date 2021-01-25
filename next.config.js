const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const withMDX = require('@next/mdx')({
    extension: /\.(md|mdx)$/
})

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
        source: '/slides/:path*',
        destination: `https://bluprince13-slides.vercel.app/slides/:path*`
    },
    {
        source: '/reveal.js/:path*',
        destination: `https://bluprince13-slides.vercel.app/slides/reveal.js/:path*`
    }
]

module.exports = withPlugins(
    [
        [
            withMDX,
            {
                pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
            }
        ],
        withImages
    ],
    {
        rewrites: async () => rewritesConfig
    }
)
