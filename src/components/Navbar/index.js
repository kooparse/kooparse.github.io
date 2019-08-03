import React from 'react'
import State from '../../utils/context'
import Link from '../Link'
import Icon from '../Icon'

const ItemLink = ({ children, ...props }) => (
  <Link {...props}>
    <div className="navbar__item">{children}</div>
  </Link>
)

export default ({ isOnBlogPage }) => (
  <div className="navbar__container">
    <div className="navbar__wrapper">
      <ItemLink to="/" className={isOnBlogPage ? 'active_tab' : ''}>
        Writing
      </ItemLink>
      <ItemLink to="/about">About</ItemLink>
    </div>
    <State.Consumer>
      {({ onSwapTheme, isNightMode }) => (
        <div className="navbar__night_switcher" onClick={onSwapTheme}>
          <Icon icon={isNightMode ? 'moon-solid' : 'moon-regular'} size={22} />
        </div>
      )}
    </State.Consumer>
  </div>
)
