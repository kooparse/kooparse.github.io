import React from 'react'
import Helmet from 'react-helmet'
import get from 'lodash/get'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import { MainContainer } from '../components/Container'
import Layout from '../components/Layout'
import Link from '../components/Link'
import Header from '../components/Post/Header'

export default ({ data, pageContext, ...props }) => {
  const { markdownRemark: post } = data
  const { previous, next } = pageContext

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
        <Spacer>
          <Header title={post.frontmatter.title} size={38} />
          <Date>{post.frontmatter.date}</Date>
          <Separator />
          <Text dangerouslySetInnerHTML={{ __html: post.html }} />
          <Line />
          {props.footer && (
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
          )}
        </Spacer>
      </MainContainer>
    </Layout>
  )
}

const Text = styled.article`
  overflow: hidden;
  margin: 25px auto;
  line-height: 1.6;
  font-size: 18px;
  color: ${props => props.theme.textColor};

  a {
    font-weight: bold;
    color: ${props => props.theme.linkColor};
    text-decoration: underline;
    transition: 0.4s opacity;
  }

  a:hover {
    opacity: 0.9;
  }
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

const PrevBlock = styled(FooterBlock)`
  justify-content: flex-start;
`
const NextBlock = styled(FooterBlock)`
  justify-content: flex-end;
`

const Spacer = styled.div`
  padding: 25px;
`

const Date = styled.span`
  font-size: 16px;
`

const Line = styled.hr`
  margin-bottom: 1px;
  color: ${props => props.theme.separatorColor};
  opacity: 0.6;
`

const Separator = styled.div`
  height: 3px;
  width: 10%;
  margin: 30px 0px 0px;
  font-style: italic;
  background-color: #fbb250;
`

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
