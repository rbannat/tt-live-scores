import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Fixture from "../components/fixture"
import Hero from "../components/hero"

const IndexPage = ({ data }) => {
  const latestResults = data.results.edges.map(
    ({ node: { id, homeTeam, guestTeam, result, date, link } }) => {
      return (
        <div key={id} className="panel-block">
          <Fixture
            homeTeam={homeTeam}
            guestTeam={guestTeam}
            date={date}
            result={result}
            link={link}
          ></Fixture>
        </div>
      )
    }
  )
  const fixtures = data.fixtures.edges
    .filter(
      ({ node: { date } }) => date >= new Date().toISOString().split("T")[0]
    )
    .slice(0, 5)
    .map(({ node: { id, homeTeam, guestTeam, result, date, link } }) => {
      return (
        <div key={id} className="panel-block">
          <Fixture
            homeTeam={homeTeam}
            guestTeam={guestTeam}
            date={date}
            result={result}
            link={link}
          ></Fixture>
        </div>
      )
    })
  return (
    <Layout>
      <SEO title="Übersicht" />
      <Hero title={"Übersicht"}></Hero>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <article className="panel has-background-white">
                <h2 className="panel-heading">Neueste Ergebnisse</h2>
                {latestResults}
              </article>
            </div>
            <div className="column">
              <article className="panel has-background-white">
                <h2 className="panel-heading">Nächste Spiele</h2>
                {fixtures.length ? (
                  fixtures
                ) : (
                  <div className="panel-block">
                    Es sind keine kommenden Spiele verfügbar.
                  </div>
                )}
              </article>
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
