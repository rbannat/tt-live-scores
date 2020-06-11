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
      <Hero title={data.league.name}></Hero>
      <section className="section">
        <div className="container">
          <div className="panel has-background-white">
            <h2 className="panel-heading">Tabelle</h2>
            <div className="panel-block">
              <LeagueTable teams={teams}></LeagueTable>
            </div>
          </div>
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
