import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

export default styled(({ className, children, to, ...props }) => (
  <Link className={className} to={to} {...props}>
    {children}
  </Link>
))`
  font-weight: ${({ bold }) => (bold ? 'bold' : '')};
  color: #37474f;
  text-decoration: none;
`
