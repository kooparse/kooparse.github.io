import React from 'react'
import styled from 'styled-components'

const Icon = ({ icon, size }) => {
  return <Style className={`icon-${icon}`} size={size} />
}

const Style = styled.span`
  color: ${props => props.theme.iconColor};
  font-size: ${props => props.size}px;
`

export default Icon
