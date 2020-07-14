import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Fixture from "../components/fixture"
import Hero from "../components/hero"
import PlayerTable from "../components/playerTable"

const TeamPage = ({ data }) => {
  const firstHalfCompleted = false
  const [activeTab, setActiveTab] = useState(
    firstHalfCompleted ? "secondHalf" : "firstHalf"
  )
  const fixtures = data.team.fixtures
    ? data.team.fixtures.reduce(
        (fixtures, { id, homeTeam, guestTeam, result, date, link }) => {
          return !result && date >= new Date().toISOString().split("T")[0]
            ? [
                ...fixtures,
                <div key={id} className="panel-block">
                  <Fixture
                    key={id}
                    homeTeam={homeTeam}
                    guestTeam={guestTeam}
                    date={date}
                    result={result}
                    link={link}
                  ></Fixture>
                </div>,
              ]
            : fixtures
        },
        []
      )
    : []
  const latestResults = data.team.fixtures
    ? data.team.fixtures.reduce(
        (results, { id, homeTeam, guestTeam, result, date, link }) => {
          return result && date < new Date().toISOString().split("T")[0]
            ? [
                ...results,
                <div key={id} className="panel-block">
                  <Fixture
                    homeTeam={homeTeam}
                    guestTeam={guestTeam}
                    date={date}
                    result={result}
                    link={link}
                  ></Fixture>
                </div>,
              ]
            : results
        },
        []
      )
    : [].reverse()
  const players = sortPlayersByPosition(
    data && data.team
      ? activeTab === "firstHalf"
        ? data.playersFirstHalf.edges
        : data.playersSecondHalf.edges
      : []
  )
  return (
    <Layout>
      <SEO title={data.team.name} />
      <Hero title={data.team.name} subtitle={data.team.league.shortName}></Hero>
      <section className="section">
        <div className="container">
          <article className="panel has-background-white">
            <h2 className="panel-heading">Spieler</h2>
            <div className="panel-tabs">
              <a
                className={activeTab === "firstHalf" ? "is-active" : ""}
                onClick={() => setActiveTab("firstHalf")}
              >
                Hinrunde
              </a>
              {firstHalfCompleted && (
                <a
                  className={activeTab === "secondHalf" ? "is-active" : ""}
                  onClick={() => setActiveTab("secondHalf")}
                >
                  Rückrunde
                </a>
              )}
            </div>
            <div className="panel-block">
              <PlayerTable players={players}></PlayerTable>
            </div>
          </article>
          <div className="columns">
            <div className="column">
              <article className="panel has-background-white">
                <h2 className="panel-heading">Neueste Ergebnisse</h2>
                {latestResults.length ? (
                  latestResults
                ) : (
                  <div className="panel-block">
                    Es sind keine Ergebnisse verfügbar.
                  </div>
                )}
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

function sortPlayersByPosition(players) {
  const substitutes = []
  players = players.reduce((players, { node: player }) => {
    if (player.position.length > 1) {
      substitutes.push(player)
      return players
    }
    return [...players, player]
  }, [])
  return [...players, ...substitutes]
}

export const query = graphql`
  query TeamPageQuery($teamId: String!) {
    team(id: { eq: $teamId }) {
      league {
        shortName
      }
      name
      fixtures {
        ...FixtureData
      }
    }

    playersFirstHalf: allPlayerScore(
      filter: { team: { id: { eq: $teamId } }, isSecondHalf: { eq: false } }
      sort: { fields: position }
    ) {
      edges {
        node {
          position
          score
          won
          lost
          gamesPlayed
          player {
            id
            name
          }
        }
      }
    }

    playersSecondHalf: allPlayerScore(
      filter: { team: { id: { eq: $teamId } }, isSecondHalf: { eq: true } }
      sort: { fields: position }
    ) {
      edges {
        node {
          position
          score
          won
          lost
          gamesPlayed
          player {
            id
            name
          }
        }
      }
    }
  }
`

export default TeamPage
