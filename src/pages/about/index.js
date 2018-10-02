import React from 'react'
import styled from 'styled-components'

import Layout from '../../components/Layout'
import { WideContainer } from '../../components/Container'
import profile from './profile.jpg'

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

const TwitterLink = styled.a`
  text-decoration: none;
  color: #37474f;
  font-weight: bold;
`

const ProfileBackground = styled.div`
  flex: 1;
  min-width: 500px;
  height: 700px;
  background-image: url(${profile});
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05),
    inset 0 0 0.25em 0 rgba(0, 0, 0, 0.25);
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #d3d3d340;

  @media (max-width: 1100px) {
    display: none;
  }
`

export default props => (
  <Layout location={props.location}>
    <WideContainer>
      <Content>
        <ProfileBackground />
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
          You can also find me on{' '}
          <TwitterLink href="https://twitter.com/kooparse" target="_blank">
            twitter
          </TwitterLink>
          .
        </Description>
      </Content>
    </WideContainer>
  </Layout>
)
