import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Table from "../components/table"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title={data.league.name} />
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{data.league.name}</h1>
            <h2 className="subtitle">Tabelle</h2>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <Table
            teams={data.allTeam.edges.map(({ node }) => ({ ...node }))}
          ></Table>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query LeaguePageQuery($leagueId: String!) {
    league(id: { eq: $leagueId }) {
      name
    }
    allTeam(
      filter: { league: { id: { eq: $leagueId } } }
      sort: { fields: position, order: ASC }
    ) {
      edges {
        node {
          drawn
          gamesPlayed
          id
          lost
          matchesDiff
          matchesLost
          matchesWon
          name
          shortName
          pointsDiff
          pointsLost
          pointsWon
          position
          setsDiff
          won
        }
      }
    }
  }
`
