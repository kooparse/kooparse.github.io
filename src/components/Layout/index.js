import 'normalize.css'
import 'prismjs/themes/prism-solarizedlight.css'
import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import { injectGlobal } from 'styled-components'
import Navbar from '../../components/Navbar'
import thumbnail from './calvin_hobbes.jpg'

const defaultTitle = "Alex's Thinking Box"

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=PT+Sans:400,700');

  html, body, p {
    font-family: -apple-system, PT Sans, Helvetica, SF Pro Text, sans-serif;
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

export default ({ children, location, ...props }) => {
  let rootPath = `/`
  const isOnBlogPage = location.pathname.includes('blog')

  if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
    rootPath = __PATH_PREFIX__ + `/`
  }
  return (
    <div style={{ margin: 0 }}>
      <Helmet meta={[]} />
      <Helmet
        defaultTitle={defaultTitle}
        titleTemplate={`%s | ${defaultTitle}`}
        meta={[
          { name: 'image', content: thumbnail },

          { name: 'twitter:site', content: '@kooparse' },
          { name: 'twitter:creator', content: '@kooparse' },
          { name: 'twitter:title', content: defaultTitle },
          { name: 'twitter:image', content: thumbnail },
          { name: 'twitter:card', content: 'summary_large_image' },

          { name: 'og:title', content: defaultTitle },
          { name: 'og:type', content: 'website' },
          { name: 'og:image', content: thumbnail },
          { name: 'og:site_name', content: defaultTitle },
        ]}
        link={[
          {
            rel: 'canonical',
            href: `https://kooparse.com${location.pathname}`,
          },
        ]}
      />
      <Navbar isOnBlogPage={isOnBlogPage} />
      {children}
    </div>
  )
}
