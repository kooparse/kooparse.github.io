import 'normalize.css'
import 'prismjs/themes/prism-solarizedlight.css'
import './src/styles/global.css'
import React, { Component } from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { nightTheme, lightTheme, State } from './src/utils/theme'

class Browser extends Component {
  state = {
    isNightMode: !!window.localStorage.getItem('isNightMode'),
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
    const { isNightMode } = this.state
    const theme = isNightMode ? nightTheme : lightTheme
    return (
      <State.Provider value={{ onSwapTheme: this.onSwapTheme, isNightMode }}>
        <ThemeProvider theme={theme}>
          <div>
            <Global />
            {this.props.element}
          </div>
        </ThemeProvider>
      </State.Provider>
    )
  }
}

const Global = createGlobalStyle`
  html, body {
    color: ${props => props.theme.textColor};
    background-color: ${props => props.theme.bgColor};
  }
`

export const wrapRootElement = ({ element }) => <Browser element={element} />
