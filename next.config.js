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
            }
        ]
    }
}
