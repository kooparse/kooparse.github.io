import React from 'react'
import get from 'lodash/get'
import Link from '../../components/Link'
import Header from './Header'

export default ({ node }) => {
  const title = get(node, 'frontmatter.title') || node.fields.slug
  return (
    <Link to={node.fields.slug}>
      <div className="posts__wrapper">
        <Header title={title} date={node.frontmatter.date} />
        <p
          className="posts__exerpt"
          dangerouslySetInnerHTML={{ __html: node.excerpt }}
        />
      </div>
    </Link>
  )
}
