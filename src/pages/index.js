import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Hero from "../components/hero"
import FixtureList from "../components/fixtureList"

const IndexPage = ({ data }) => {
  const fixtures = data.fixtures.nodes.filter(
    ({ date }) => date >= new Date().toISOString().split("T")[0]
  )
  return (
    <Layout>
      <SEO title="Übersicht" />
      <Hero title={"Übersicht"}></Hero>
      <section className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <FixtureList
                fixtures={data.results.nodes}
                title={"Neueste Ergebnisse"}
                noResultsText={"Es sind keine Ergebnisse verfügbar."}
              ></FixtureList>
            </div>
            <div className="column">
              <FixtureList
                fixtures={fixtures}
                title={"Nächste Spiele"}
                noResultsText={"Es sind keine kommenden Spiele verfügbar."}
              ></FixtureList>
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
      sort: { fields: date, order: DESC }
      filter: { result: { ne: null } }
    ) {
      nodes {
        ...FixtureData
      }
    }
    fixtures: allFixture(
      sort: { fields: date }
      filter: { result: { eq: null } } # all fixtures without score = upcoming matches
    ) {
      nodes {
        ...FixtureData
      }
    }
  }
`

export default IndexPage
