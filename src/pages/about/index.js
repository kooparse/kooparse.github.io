import React from 'react'
import styled from 'styled-components'

import Layout from '../../components/Layout'
import { WideContainer } from '../../components/Container'

export default props => (
  <Layout location={props.location}>
    <WideContainer>
      <Content>
        <Description>
          Hello, my name is Alexandre Chêne!
          <br />I am an independant software engineer.
          <br />
          <br />I love coding for mostly one reason: It gives me a limitless
          power to create whatever I have in my head. There is such a powerful
          feeling that comes from creating something out of nothing.
          <br />
          <br />I am 200% on game dev right now. Working mostly by myself.
          <br />
          <br />
          You can also find me on&nbsp;
          <Link href="https://twitter.com/kooparse" target="_blank">
            twitter
          </Link>
          &nbsp;or&nbsp;
          <Link href="https://github.com/kooparse" target="_blank">
            github
          </Link>
          .
        </Description>
      </Content>
    </WideContainer>
  </Layout>
)

const Image = styled.img`
  width: 100%;
  max-width: 500px;
  pointer-events: none;
  user-select: none;

  @media (max-width: 700px) {
    display: none;
  }
`

const Content = styled.div`
  padding: 25px;
  display: flex;
  flex-wrap: wrap-reverse;
  justify-content: center;
`

const Description = styled.p`
  flex: 1;
  padding-bottom: 25px;
  font-size: 18px;
  line-height: 1.6;
  margin: 0px 35px;
  user-select: none;
  max-width: 450px;
`

const Link = styled.a`
  text-decoration: none;
  color: ${props => props.theme.textColor};
  font-weight: bold;
`
