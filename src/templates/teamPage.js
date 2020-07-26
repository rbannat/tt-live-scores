import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import FixtureList from "../components/fixtureList"
import Hero from "../components/hero"
import PlayerTable from "../components/playerTable"

const TeamPage = ({ data }) => {
  const firstHalfCompleted = false
  const [activeTab, setActiveTab] = useState(
    firstHalfCompleted ? "secondHalf" : "firstHalf"
  )
  const fixtures = data.team.fixtures
    ? data.team.fixtures.reduce((fixtures, fixture) => {
        return !fixture.result &&
          fixture.date >= new Date().toISOString().split("T")[0]
          ? [...fixtures, fixture]
          : fixtures
      }, [])
    : []
  const latestResults = data.team.fixtures
    ? data.team.fixtures
        .reduce((fixtures, fixture) => {
          return fixture.result &&
            fixture.date < new Date().toISOString().split("T")[0]
            ? [...fixtures, fixture]
            : fixtures
        }, [])
        .reverse()
    : []
  const players = sortPlayersByPosition(
    data && data.team
      ? activeTab === "firstHalf"
        ? data.playersFirstHalf.nodes
        : data.playersSecondHalf.nodes
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
              <FixtureList
                fixtures={latestResults}
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

function sortPlayersByPosition(players) {
  const substitutes = []
  players = players.reduce((players, player) => {
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
      nodes {
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

    playersSecondHalf: allPlayerScore(
      filter: { team: { id: { eq: $teamId } }, isSecondHalf: { eq: true } }
      sort: { fields: position }
    ) {
      nodes {
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
`

export default TeamPage
