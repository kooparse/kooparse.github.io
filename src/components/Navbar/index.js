import React from 'react'
import styled from 'styled-components'
import { nightTheme, lightTheme, State } from '../../utils/theme'
import Link from '../Link'
import Icon from '../Icon'

const ItemLink = ({ text, ...props }) => (
  <Link {...props}>
    <NavItem>{text}</NavItem>
  </Link>
)

const NavBar = ({ isOnBlogPage }) => {
  return (
    <NavBarContainer>
      <NavLeft>
        <ItemLink
          to="/"
          className={isOnBlogPage ? 'active_tab' : ''}
          text="Writing"
        />
        <ItemLink to="/about" text="About" />
      </NavLeft>
      <NavRight>
        <State.Consumer>
          {({ onSwapTheme, isNightMode }) => (
            <NightSwitcher onClick={onSwapTheme}>
              <Icon
                icon={isNightMode ? 'moon-solid' : 'moon-regular'}
                size={26}
              />
            </NightSwitcher>
          )}
        </State.Consumer>
      </NavRight>
    </NavBarContainer>
  )
}

const NavBarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0px 0px 100px;
`

const NavLeft = styled.div`
  display: flex;
`

const NavRight = styled.div`
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

  &:hover {
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

export default NavBar
