import 'normalize.css'
import 'prismjs/themes/prism-solarizedlight.css'
import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import { injectGlobal } from 'styled-components'
import Navbar from '../../components/Navbar'
import profile from './profile.jpg'

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

const defaultTitle = "Alex's Thinking Box"

export default ({ children, location }) => {
  let rootPath = `/`
  const isOnBlogPage = location.pathname.includes('blog')

  if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
    rootPath = __PATH_PREFIX__ + `/`
  }
  return (
    <div style={{ margin: 0 }}>
      <Helmet
        defaultTitle={defaultTitle}
        titleTemplate={`%s | ${defaultTitle}`}
      >
        <meta name="twitter:site" content="@kooparse" />
        <meta name="og:type" content="website" />
        <meta name="og:image" content={profile} />
        <meta name="og:site_name" content={defaultTitle} />
        <link
          rel="canonical"
          href={`https://kooparse.com${location.pathname}`}
        />
      </Helmet>
      <Navbar isOnBlogPage={isOnBlogPage} />
      {children}
    </div>
  )
}
