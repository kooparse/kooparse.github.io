import React from 'react'
import styled from 'styled-components'

const Date = styled.div`
  font-size: 14px;
  text-align: right;
  min-width: 120px;
`

const Title = styled.h3.attrs({
  size: ({ size }) => size,
})`
  margin: 0;
  font-size: ${({ size }) => size}px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`

export default ({ date, title, size = 26 }) => (
  <Header>
    <Title size={size}>{title}</Title>
    {!!date && <Date>{date}</Date>}
  </Header>
)
