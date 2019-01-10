import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import { MainContainer } from '../components/Container'
import Layout from '../components/Layout'
import Post from '../components/Post'

export default props => {
  const title = get(props, 'data.site.siteMetadata.title')
  const description = get(props, 'data.site.siteMetadata.description')
  const posts = get(props, 'data.allMarkdownRemark.edges')

  return (
    <Layout location={props.location}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[
          { name: 'description', content: description },
          { name: 'twitter:description', content: description },
          { name: 'og:description', content: description },
        ]}
        title={title}
      />
      <MainContainer>
        {posts.map(({ node }) => (
          <Post key={node.fields.slug} node={node} footer />
        ))}
      </MainContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { regex: "/^/blog/" } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
