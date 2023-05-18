import React from "react"
import { HeadProps, PageProps, graphql } from "gatsby"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import LeagueTable from "../components/leagueTable"
import FixtureList from "../components/fixtureList"
import Hero from "../components/hero"

const LeaguePage = ({ data }: PageProps<Queries.LeaguePageQuery>) => {
  const fixtures = data.fixtures.nodes.filter(
    ({ date }) => date >= new Date().toISOString().split("T")[0]
  )
  return (
    <Layout>
      <Hero title={data.league?.name ?? ""} showLastUpdated={true}></Hero>
      <section className="section">
        <div className="container">
          <div className="panel has-background-white">
            <h2 className="panel-heading">Tabelle</h2>
            <div className="panel-block">
              <LeagueTable teams={data.allTeam.nodes}></LeagueTable>
            </div>
          </div>
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

export default LeaguePage

export const Head = ({ data }: HeadProps<Queries.LeaguePageQuery>) => (
  <SEO title={data.league?.name ?? ""} />
)

export const query = graphql`
  query LeaguePage($leagueId: String!) {
    league(id: { eq: $leagueId }) {
      name
    }
    allTeam(
      filter: { league: { id: { eq: $leagueId } } }
      sort: { position: ASC }
    ) {
      nodes {
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
    results: allFixture(
      sort: { date: DESC }
      filter: { result: { ne: null }, league: { id: { eq: $leagueId } } }
    ) {
      nodes {
        ...FixtureData
      }
    }
    fixtures: allFixture(
      sort: { date: ASC }
      filter: { result: { eq: null }, league: { id: { eq: $leagueId } } }
    ) {
      nodes {
        ...FixtureData
      }
    }
  }
`
