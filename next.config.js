const withMDX = require('@next/mdx')({
    extension: /\.(md|mdx)$/
})

module.exports = withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx']
})

module.exports = {
    webpack: (config, { isServer }) => {
        // Fixes npm packages that depend on `fs` module
        if (!isServer) {
            // eslint-disable-next-line no-param-reassign
            config.node = {
                fs: 'empty'
            }
        }

        return config
    }
}
