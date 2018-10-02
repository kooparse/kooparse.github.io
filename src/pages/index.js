import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import { MainContainer } from '../components/Container'
import Layout from '../components/Layout'
import Post from '../components/Post'

export default props => {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const siteDescription = get(props, 'data.site.siteMetadata.description')
  const posts = get(props, 'data.allMarkdownRemark.edges')

  return (
    <Layout location={props.location}>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        meta={[{ name: 'description', content: siteDescription }]}
        title={siteTitle}
      />
      <MainContainer>
        {posts.map(({ node }) => (
          <Post key={node.fields.slug} node={node} />
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
