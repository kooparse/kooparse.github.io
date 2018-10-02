import React from 'react'
import Layout from '../components/Layout'
import { MainContainer } from '../components/Container'

const NotFoundPage = props => (
  <Layout location={props.location}>
    <MainContainer>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </MainContainer>
  </Layout>
)

export default NotFoundPage
