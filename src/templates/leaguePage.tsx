import React, { useState } from 'react'
import { HeadProps, Link, PageProps, graphql } from 'gatsby'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import LeagueTable from '../components/leagueTable'
import FixtureList from '../components/fixtureList'
import Hero from '../components/hero'

const LeaguePage = ({ data }: PageProps<Queries.LeaguePageQuery>) => {
  const fixtures = data.fixtures.nodes.filter(
    ({ date }) => date && date >= new Date().toISOString().split('T')[0],
  )

  const [activeTab, setActiveTab] = useState<'table' | 'results' | 'fixtures'>(
    'table',
  )

  return (
    <Layout>
      <Hero title={data.league?.name ?? ''}></Hero>
      <section className="section">
        <div className="container">
          <nav className="breadcrumb is-small" aria-label="breadcrumbs">
            <ul>
              <li>
                <Link to={`/leagues`}>Ligen</Link>
              </li>
              <li>
                <Link to={`/groups/${data.league?.group?.id}`}>
                  {data.league?.group?.name}
                </Link>
              </li>
              <li className="is-active">
                <Link to={`/leagues/${data.league?.id}`} aria-current="page">
                  {data.league?.shortName}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="tabs is-boxed">
            <ul>
              <li className={activeTab === 'table' ? 'is-active' : ''}>
                <a className="title is-6" onClick={() => setActiveTab('table')}>
                  Tabelle
                </a>
              </li>
              <li className={activeTab === 'results' ? 'is-active' : ''}>
                <a
                  className="title is-6"
                  onClick={() => setActiveTab('results')}
                >
                  Ergebnisse
                </a>
              </li>
              <li className={activeTab === 'fixtures' ? 'is-active' : ''}>
                <a
                  className="title is-6"
                  onClick={() => setActiveTab('fixtures')}
                >
                  Spielplan
                </a>
              </li>
            </ul>
          </div>

          {activeTab === 'table' ? (
            <div className="box p-0">
              <LeagueTable teams={data.allTeam.nodes}></LeagueTable>
            </div>
          ) : activeTab === 'results' ? (
            <FixtureList
              fixtures={data.results.nodes}
              groupByDate={true}
              noResultsText={'Es sind keine Ergebnisse verfügbar.'}
            ></FixtureList>
          ) : (
            <FixtureList
              fixtures={fixtures}
              groupByDate={true}
              noResultsText={'Es sind keine kommenden Spiele verfügbar.'}
            ></FixtureList>
          )}
        </div>
      </section>
    </Layout>
  )
}

export default LeaguePage

export const Head = ({ data }: HeadProps<Queries.LeaguePageQuery>) => (
  <SEO title={data.league?.name ?? ''} />
)

export const query = graphql`
  query LeaguePage($leagueId: String!) {
    league(id: { eq: $leagueId }) {
      id
      name
      shortName
      group {
        id
        name
      }
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
        club {
          id
          logo {
            image {
              childImageSharp {
                gatsbyImageData(
                  width: 32
                  height: 32
                  layout: FIXED
                  transformOptions: { fit: CONTAIN }
                  backgroundColor: "white"
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
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
