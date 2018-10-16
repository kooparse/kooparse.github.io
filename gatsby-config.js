module.exports = {
  siteMetadata: {
    title: 'Thinking Box',
    author: 'Alexandre Chêne',
    description: "Alexandre's thinking box",
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
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Thinking Box',
        start_url: `/`,
      },
    },
    `gatsby-plugin-feed`,
    `gatsby-plugin-offline`,
    'gatsby-plugin-styled-components',
    `gatsby-plugin-react-helmet`,
  ],
}
