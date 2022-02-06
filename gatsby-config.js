const path = require('path')

module.exports = {
  pathPrefix: '/z-game',
  siteMetadata: {
    title: 'z-game',
    siteUrl: 'https://doramanjyu.github.io/z-game',
  },
  plugins: [
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@doramanjyu/z-game': path.resolve(__dirname, 'src'),
        },
      },
    },
  ],
}
