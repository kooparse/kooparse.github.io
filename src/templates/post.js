import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import { graphql } from 'gatsby'
import { MainContainer } from '../components/Container'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Header from '../components/Post/Header'

export default ({ data, pageContext, ...props }) => {
  const { markdownRemark: post } = data
  const { previous, next } = pageContext
  const withFooter = props.uri.includes('blog')

  return (
    <Layout location={props.location}>
      <MainContainer>
        <Helmet
          title={post.frontmatter.title}
          meta={[
            { name: 'description', content: post.frontmatter.description },
            {
              name: 'article:published_time',
              content: post.frontmatter.rawDate,
            },
            { name: 'og:title', content: post.frontmatter.title },
            { name: 'og:description', content: post.frontmatter.description },
            { name: 'twitter:title', content: post.frontmatter.title },
            {
              name: 'twitter:description',
              content: post.frontmatter.description,
            },
          ]}
        />
        <div className="post__spacer">
          <Header title={post.frontmatter.title} size={38} />
          <div className="post__date">{post.frontmatter.date}</div>
          <div className="post__separator" />
          <div
            className="post__text"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <hr className="post__end_liner" />
          {withFooter && (
            <ul className="post__footer">
              <li className="post__footer_block post__prev_block">
                {previous && (
                  <Link to={previous.fields.slug} rel="prev">
                    ← {previous.frontmatter.title}
                  </Link>
                )}
              </li>

              <li className="post__footer_block post__next_block">
                {next && (
                  <Link to={next.fields.slug} rel="next">
                    {next.frontmatter.title} →
                  </Link>
                )}
              </li>
            </ul>
          )}
        </div>
      </MainContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      html
      frontmatter {
        title
        description
        date(formatString: "MMMM DD, YYYY")
        rawDate: date
      }
    }
  }
`
