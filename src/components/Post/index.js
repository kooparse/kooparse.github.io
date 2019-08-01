import React from 'react'
import Link from '../../components/Link'
import get from 'lodash/get'
import styled from 'styled-components'
import Header from './Header'

const Wrapper = styled.div`
  transition: 0.4s opacity;
  border-radius: 3px;
  padding: 25px;
  :hover {
    opacity: 0.6;
  }
`

const Exerpt = styled.p`
  line-height: 1.5;
  font-size: 16px;
  color: ${props => props.theme.textColor};
`

export default ({ node }) => {
  const title = get(node, 'frontmatter.title') || node.fields.slug
  return (
    <Link to={node.fields.slug}>
      <Wrapper>
        <Header title={title} date={node.frontmatter.date} />
        <Exerpt dangerouslySetInnerHTML={{ __html: node.excerpt }} />
      </Wrapper>
    </Link>
  )
}
