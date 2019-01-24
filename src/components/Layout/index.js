import 'normalize.css'
import 'prismjs/themes/prism-solarizedlight.css'
import get from 'lodash/get'
import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, Link } from 'gatsby'
import { injectGlobal } from 'styled-components'
import Navbar from '../../components/Navbar'
import thumbnail from './calvin.jpg'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700');

  html, body, p {
    font-family: Lato, Helvetica, SF Pro Text, sans-serif;
		color: #37474f;
  }
	.gatsby-highlight pre[class*="language-"] {
		font-size: 16px;
  }

  p a {
    font-weight: bold;
    color: #37474f;
    text-decoration: underline;
    transition: 0.4s opacity;
  }

  p a:hover,
  p a:hover {
    opacity: 0.9;
  }
`

const Layout = ({ data, children, location }) => {
  const title = get(data, 'site.siteMetadata.title')
  const description = get(data, 'site.siteMetadata.description')
  const favicon = get(data, 'site.siteMetadata.favicon')

  let rootPath = `/`
  const isOnBlogPage = location.pathname.includes('blog')

  if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
    rootPath = __PATH_PREFIX__ + `/`
  }
  return (
    <div style={{ margin: 0 }}>
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
        ]}
      />
      <Navbar isOnBlogPage={isOnBlogPage} />
      {children}
    </div>
  )
}

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
