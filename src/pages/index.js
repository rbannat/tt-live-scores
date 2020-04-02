import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GameDay from "../components/gameDay"
import groupFixturesByDate from "../utils/groupFixturesByDate"

const IndexPage = ({ data }) => {
  const fixturesByDate = data.fixtures.edges
    .map((edge) => edge.node)
    .reduce(groupFixturesByDate, {})
  const resultsByDate = data.results.edges
    .map((edge) => edge.node)
    .reduce(groupFixturesByDate, {})
  return (
    <Layout>
      <SEO title="Übersicht" />
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Übersicht</h1>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <h2 className="title is-4">Neueste Ergebnisse</h2>
          {Object.keys(resultsByDate)
            .filter((date) => date < new Date().toISOString().split("T")[0])
            .reverse()
            .slice(0, 3)
            .map((date, index) => {
              return (
                <GameDay
                  key={index}
                  date={date}
                  fixtures={resultsByDate[date]}
                ></GameDay>
              )
            })}
          <h2 className="title is-4">Nächste Spiele</h2>
          {Object.keys(fixturesByDate)
            .filter((date) => date >= new Date().toISOString().split("T")[0])
            .slice(0, 2)
            .map((date, index) => {
              return (
                <GameDay
                  key={index}
                  date={date}
                  fixtures={fixturesByDate[date]}
                ></GameDay>
              )
            })}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    league {
      name
      association {
        name
      }
    }
    results: allFixture(
      sort: { fields: date }
      filter: { result: { ne: null } }
    ) {
      edges {
        node {
          ...FixtureData
        }
      }
    }
    fixtures: allFixture(
      sort: { fields: date }
      filter: { result: { eq: null } }
    ) {
      edges {
        node {
          ...FixtureData
        }
      }
    }
  }
`

export default IndexPage
