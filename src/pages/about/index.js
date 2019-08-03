import React from 'react'
import Layout from '../../components/Layout'
import { WideContainer } from '../../components/Container'

export default props => (
  <Layout location={props.location}>
    <WideContainer>
      <div className="blog__content">
        <p className="blog__description">
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
          <a
            className="blog__link"
            href="https://twitter.com/kooparse"
            target="_blank"
          >
            twitter
          </a>
          &nbsp;or&nbsp;
          <a
            className="blog__link"
            href="https://github.com/kooparse"
            target="_blank"
          >
            github
          </a>
          .
        </p>
      </div>
    </WideContainer>
  </Layout>
)
