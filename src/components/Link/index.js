import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

export default styled(props => (
  <Link {...props} activeClassName="active_tab">
    {props.children}
  </Link>
))`
  font-weight: ${props => (props.bold ? 'bold' : '')};
  color: ${props => props.theme.linkColor};
  text-decoration: none;
  background-color: transparent;

  &.active_tab {
    background-color: ${props => props.theme.activeTab} !important;
    color: ${props => props.theme.activeTextColor} !important;
  }

  &:hover {
    opacity: 0.9;
  }
`
