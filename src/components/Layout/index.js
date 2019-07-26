import get from 'lodash/get'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import styled, { ThemeProvider } from 'styled-components'
import { StaticQuery, Link, graphql } from 'gatsby'
import Navbar from '../../components/Navbar'
import { nightTheme, lightTheme, State } from '../../utils/theme'
import thumbnail from './calvin.jpg'

class Layout extends Component {
  render() {
    // const { isNightMode } = this.state
    const { data, children, location } = this.props
    const title = get(data, 'site.siteMetadata.title')
    const description = get(data, 'site.siteMetadata.description')
    const favicon = get(data, 'site.siteMetadata.favicon')

    let rootPath = `/`
    const isOnBlogPage = location.pathname.includes('blog')

    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Wrapper>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          defaultTitle={title}
          titleTemplate={`%s | ${title}`}
          meta={[
            { name: 'description', content: description },
            { name: 'image', content: thumbnail },
            { name: 'twitter:site', content: '@kooparse' },
            { name: 'twitter:creator', content: '@kooparse' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: description },
            { name: 'twitter:image', content: thumbnail },
            { name: 'twitter:card', content: 'summary_large_image' },

            { name: 'og:title', content: title },
            { name: 'og:description', content: description },
            { name: 'og:type', content: 'website' },
            { name: 'og:image', content: thumbnail },
            { name: 'og:site_name', content: title },
          ]}
          link={[
            {
              rel: 'canonical',
              href: `https://kooparse.com${location.pathname}`,
            },
            { rel: 'icon', href: favicon },
            {
              rel: 'stylesheet',
              href: 'https://fonts.googleapis.com/css?family=Lato:400, 700',
            },
          ]}
        />
        <Navbar isOnBlogPage={isOnBlogPage} />
        {children}
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  margin: 0;
`

export default props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            description
            favicon
          }
        }
      }
    `}
    render={data => <Layout data={data} {...props} />}
  />
)
