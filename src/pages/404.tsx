import * as React from "react"

import Layout from "../components/layout"
import { SEO } from "../components/seo"
import Hero from "../components/hero"

const NotFoundPage = () => (
  <Layout>
    <Hero title={"NOT FOUND"}></Hero>
    <section className="section">
      <div className="container">
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </div>
    </section>
  </Layout>
)

export const Head = () => <SEO title="404: Not found" />

export default NotFoundPage
