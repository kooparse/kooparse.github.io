import React from 'react'
import { Link } from 'gatsby'

export default ({ bold, ...props }) => (
  <Link {...props} style={{ fontWeight: bold }} activeClassName="active_tab">
    {props.children}
  </Link>
)
