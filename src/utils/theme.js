import React from 'react'

const lightTheme = {
  bgColor: '#fff',
  activeTab: '#F0F0F0',
  activeTextColor: '#37474f',
  textColor: '#37474f',
  linkColor: '#37474f',
  iconColor: '#000',
  separatorColor: '#37474f',
}

const nightTheme = {
  bgColor: '#222129',
  activeTab: '#fbb250',
  activeTextColor: '#000',
  linkColor: '#f0f0f0',
  textColor: '#fff',
  iconColor: '#fbb250',
  separatorColor: '#fff',
}

const State = React.createContext({
  isNightMode: false,
  onSwapTheme: () => {},
})

export { nightTheme, lightTheme, State }
