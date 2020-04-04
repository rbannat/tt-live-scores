import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Fixture from "../components/fixture"

const IndexPage = ({ data }) => {
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
          <div className="columns">
            <div className="column">
              <h2 className="title is-4">Neueste Ergebnisse</h2>
              {data.results.edges.map(
                ({ node: { id, homeTeam, guestTeam, result, date, link } }) => {
                  return (
                    <Fixture
                      key={id}
                      homeTeam={homeTeam}
                      guestTeam={guestTeam}
                      date={date}
                      result={result}
                      link={link}
                    ></Fixture>
                  )
                }
              )}
            </div>
            <div className="column">
              <h2 className="title is-4">Nächste Spiele</h2>
              {data.fixtures.edges
                .filter(
                  ({ node: { date } }) =>
                    date >= new Date().toISOString().split("T")[0]
                )
                .slice(0, 5)
                .map(
                  ({
                    node: { id, homeTeam, guestTeam, result, date, link },
                  }) => {
                    return (
                      <Fixture
                        key={id}
                        homeTeam={homeTeam}
                        guestTeam={guestTeam}
                        date={date}
                        result={result}
                        link={link}
                      ></Fixture>
                    )
                  }
                )}
            </div>
          </div>
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
      limit: 5
      sort: { fields: date, order: DESC }
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
