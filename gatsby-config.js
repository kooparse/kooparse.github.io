module.exports = {
  siteMetadata: {
    title: 'Thinking Box',
    author: 'Alexandre Chêne',
    description: "Alexandre's thinking box",
    favicon: '/favicon.png?v=1',
    siteUrl: 'https://kooparse.com',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              withWebp: true,
              quality: 90,
              maxWidth: 800,
              wrapperStyle: 'margin: 10px 0px 10px 0px;',
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem;`,
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-prismjs',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Thinking Box',
        short_name: "Alex's blog",
        start_url: '/',
        background_color: '#fff',
        theme_color: '#fbb250',
        display: 'standalone',
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
}
