import get from 'lodash/get'
import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, Link, graphql } from 'gatsby'
import Navbar from '../../components/Navbar'
import thumbnail from './calvin.jpg'
import State from '../../utils/context'

class Layout extends Component {
  state = {
    isNightMode: false,
  }

  componentDidMount() {
    // Sync inner state with initial state.
    this.setState({
      isNightMode: window.__isNightMode,
    })
  }

  onSwapTheme = () => {
    window.__setTheme()
    this.setState(() => ({ isNightMode: window.__isNightMode }))
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

    return (
      <State.Provider value={{ onSwapTheme: this.onSwapTheme, isNightMode }}>
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
              {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Lato:400, 700',
              },
            ]}
          />
          <Navbar isOnBlogPage={isOnBlogPage} />
          {children}
        </div>
      </State.Provider>
    )
  }
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
