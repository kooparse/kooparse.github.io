import React from 'react'
import styled from 'styled-components'
import Link from '../Link'

const ActiveBackgroundColor = {
  backgroundColor: '#F0F0F0',
}

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 100px;
`

const NavWrapper = styled.div`
  display: flex;
`

const NavItem = styled.div`
  height: 60px;
  width: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s background-color;

  :hover {
    background-color: ${ActiveBackgroundColor};
  }
`
const ItemLink = ({ className, children, to, ...props }) => (
  <Link to={to} activeStyle={ActiveBackgroundColor} {...props}>
    <NavItem>{children}</NavItem>
  </Link>
)

export default ({ isOnBlogPage }) => (
  <NavBarContainer>
    <NavWrapper>
      <ItemLink to="/" style={isOnBlogPage ? ActiveBackgroundColor : {}}>
        Writing
      </ItemLink>
      <ItemLink to="/about">About</ItemLink>
    </NavWrapper>
  </NavBarContainer>
)
