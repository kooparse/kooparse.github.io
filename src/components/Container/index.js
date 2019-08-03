import React from 'react'

const MainContainer = ({ children }) => (
  <div className="main__container">{children}</div>
)

const WideContainer = ({ children }) => (
  <div className="wide__container">{children}</div>
)

export { MainContainer, WideContainer }
