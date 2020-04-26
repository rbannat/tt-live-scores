import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import LeagueTable from "../components/leagueTable"
import Hero from "../components/hero"

const LeaguePage = ({ data }) => {
  const teams = data.allTeam.edges.map(({ node }) => node)
  return (
    <Layout>
      <SEO title={data.league.name} />
      <Hero title={data.league.name} subtitle="Tabelle"></Hero>
      <section className="section">
        <div className="container">
          <LeagueTable teams={teams}></LeagueTable>
        </div>
      </section>
    </Layout>
  )
}

export default LeaguePage

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
