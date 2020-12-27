const withMDX = require('@next/mdx')({
    extension: /\.(md|mdx)$/
})

module.exports = withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
})

module.exports = {
    async rewrites() {
        return [
            {
                source: '/cv/pdf',
                destination:
                    'https://bluprince13.gitlab.io/cv/ajayakumar_vipin_cv.pdf'
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
            }
        ]
    }
}
