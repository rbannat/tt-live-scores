import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Table from "../components/table"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Tabelle" />
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Tabelle</h1>
            <h2 className="subtitle">{data.leagueTable.liga}</h2>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <Table></Table>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    leagueTable {
      liga
      ligalink
      verband
      zeit
    }
  }
`

export default IndexPage
