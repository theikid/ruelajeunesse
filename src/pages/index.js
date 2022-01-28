import * as React from "react"
import Helmet from "react-helmet"
import { withPrefix } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

import "../scss/index.scss"

import Checkout from "../components/checkout"

const IndexPage = () => (
  <Layout>
    <Helmet>
      <script src={withPrefix("script.js")} type="text/javascript" />
    </Helmet>
    <Seo title="Rue la Jeunesse" />
    <h1>Mothers can</h1>
    <Checkout />
  </Layout>
)

export default IndexPage
