import React from 'react'
import styled from 'styled-components'
import State from '../../utils/context'
import Link from '../Link'
import Icon from '../Icon'

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
  transition: 0.4s opacity;
  color: ${props => props.theme.mainColor};

  :hover {
    opacity: 0.7;
  }
`

const NightSwitcher = styled.div`
  height: 60px;
  width: 100px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ItemLink = ({ children, ...props }) => (
  <Link {...props}>
    <NavItem>{children}</NavItem>
  </Link>
)

export default ({ isOnBlogPage }) => (
  <NavBarContainer>
    <NavWrapper>
      <ItemLink to="/" className={isOnBlogPage ? 'active_tab' : ''}>
        Writing
      </ItemLink>
      <ItemLink to="/about">About</ItemLink>
    </NavWrapper>
    <State.Consumer>
      {({ onSwapTheme, isNightMode }) => (
        <NightSwitcher onClick={onSwapTheme}>
          <Icon icon={isNightMode ? 'moon-solid' : 'moon-regular'} size={22} />
        </NightSwitcher>
      )}
    </State.Consumer>
  </NavBarContainer>
)
