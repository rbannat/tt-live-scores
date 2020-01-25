import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Table from "../components/table"

const TablePage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Tabelle" />
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Tabelle</h1>
            <h2 className="subtitle">{data.league.name}</h2>
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
    league {
      name
      link
      association {
        name
      }
    }
  }
`

export default TablePage
