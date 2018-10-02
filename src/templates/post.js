import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { MainContainer } from '../components/Container'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Header from '../components/Post/Header'

const Text = styled.div`
  overflow: hidden;
  margin: 25px auto;
  line-height: 1.6;
  font-size: 18px;
`

const Footer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style: none;
  padding: 0;
`
const FooterBlock = styled.li`
  display: flex;
  flex: 1;
`

const PrevBlock = FooterBlock.extend`
  justify-content: flex-start;
`
const NextBlock = FooterBlock.extend`
  justify-content: flex-end;
`

const Spacer = styled.div`
  padding: 25px;
`

const Date = styled.span`
  font-size: 16px;
`

const Separator = styled.div`
  height: 3px;
  width: 10%;
  margin: 30px 0px 0px;
  font-style: italic;
  background-color: #fbb250;
`

export default ({ data, pathContext, ...props }) => {
  const { markdownRemark: post } = data
  const { previous, next } = pathContext

  return (
    <Layout location={props.location}>
      <MainContainer>
        <Helmet>
          <title>{post.frontmatter.title}</title>
          <meta
            name="article:published_time"
            content={post.frontmatter.rawDate}
          />
          <meta name="og:title" content={post.frontmatter.title} />
          <meta name="og:description" content={post.frontmatter.description} />
          <meta name="twitter:title" content={post.frontmatter.title} />
          <meta name="twitter:description" content={post.frontmatter.description} />
        </Helmet>
        <Spacer>
          <Header title={post.frontmatter.title} size={38} />
          <Date>{post.frontmatter.date}</Date>
          <Separator />
          <Text dangerouslySetInnerHTML={{ __html: post.html }} />
          <hr
            style={{
              marginBottom: 1,
            }}
          />
          <Footer>
            <PrevBlock>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </PrevBlock>

            <NextBlock>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </NextBlock>
          </Footer>
        </Spacer>
      </MainContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
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
