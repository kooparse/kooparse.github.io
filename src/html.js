import React from 'react'
import PropTypes from 'prop-types'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />

        {props.postBodyComponents}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.__isNightMode = window.localStorage.getItem('isNightMode');
            const body = document.getElementsByTagName('body')[0];
            body.classList.add(window.__isNightMode ? 'dark' : 'light');

            window.__setTheme = function() {
                const isNightMode = window.localStorage.getItem('isNightMode')

                if (isNightMode) {
                  window.localStorage.removeItem('isNightMode')
                  body.classList.remove('dark');
                  body.classList.add('light');
                } else {
                  window.localStorage.setItem('isNightMode', 'true')
                  body.classList.remove('light');
                  body.classList.add('dark');
                }
            }
        `,
          }}
        />
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
