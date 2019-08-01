import 'normalize.css'
import 'prismjs/themes/prism-solarizedlight.css'
import get from 'lodash/get'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, Link, graphql } from 'gatsby'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Navbar from '../../components/Navbar'
import thumbnail from './calvin.jpg'
import { nightTheme, lightTheme } from '../../utils/theme'
import State from '../../utils/context'

class Layout extends Component {
  state = {
    isNightMode: false,
  }

  componentDidMount() {
    this.setState({
      isNightMode: !!window.localStorage.getItem('isNightMode'),
    })
  }

  onSwapTheme = () => {
    const isNightMode = window.localStorage.getItem('isNightMode')

    if (isNightMode) {
      window.localStorage.removeItem('isNightMode')
      this.setState({ isNightMode: false })
    } else {
      window.localStorage.setItem('isNightMode', 'true')
      this.setState({ isNightMode: true })
    }
  }

  render() {
    const { data, location, children } = this.props
    const { isNightMode } = this.state
    const title = get(data, 'site.siteMetadata.title')
    const description = get(data, 'site.siteMetadata.description')
    const favicon = get(data, 'site.siteMetadata.favicon')

    let rootPath = `/`
    const isOnBlogPage = location.pathname.includes('blog')

    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    const theme = isNightMode ? nightTheme : lightTheme

    return (
      <State.Provider value={{ onSwapTheme: this.onSwapTheme, isNightMode }}>
        <ThemeProvider theme={theme}>
          <div style={{ margin: 0 }}>
            <GlobalStyle />
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
          </div>
        </ThemeProvider>
      </State.Provider>
    )
  }
}

const GlobalStyle = createGlobalStyle`
  html, body {
    font-family: Lato, Helvetica, SF Pro Text, sans-serif;
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.bgColor};
  }

  p a {
    font-weight: bold;
    color: ${props => props.theme.linkColor};
    text-decoration: underline;
    transition: 0.4s opacity;
  }

  p a:hover {
    opacity: 0.9;
  }
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
