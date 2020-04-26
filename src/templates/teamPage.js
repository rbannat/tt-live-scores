import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Fixture from "../components/fixture"
import Hero from "../components/hero"
import PlayerTable from "../components/playerTable"

const TeamPage = ({ data }) => {
  const [activeTab, setActiveTab] = useState("firstHalf")
  const fixtures = data.team.fixtures.reduce(
    (fixtures, { id, homeTeam, guestTeam, result, date, link }) => {
      return !result && date >= new Date().toISOString().split("T")[0]
        ? [
            ...fixtures,
            <Fixture
              key={id}
              homeTeam={homeTeam}
              guestTeam={guestTeam}
              date={date}
              result={result}
              link={link}
            ></Fixture>,
          ]
        : fixtures
    },
    []
  )
  const latestResults = data.team.fixtures
    .reduce((results, { id, homeTeam, guestTeam, result, date, link }) => {
      return result && date < new Date().toISOString().split("T")[0]
        ? [
            ...results,
            <Fixture
              key={id}
              homeTeam={homeTeam}
              guestTeam={guestTeam}
              date={date}
              result={result}
              link={link}
            ></Fixture>,
          ]
        : results
    }, [])
    .reverse()
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
          <div className="tabs">
            <ul>
              <li className={activeTab === "firstHalf" ? "is-active" : ""}>
                <a onClick={() => setActiveTab("firstHalf")}>Hinrunde</a>
              </li>
              <li className={activeTab === "secondHalf" ? "is-active" : ""}>
                <a onClick={() => setActiveTab("secondHalf")}>Rückrunde</a>
              </li>
            </ul>
          </div>
          <h3 className="title is-3">Spieler</h3>
          <PlayerTable players={players}></PlayerTable>
          <div className="columns">
            <div className="column">
              <h3 className="title is-3">Neueste Ergebnisse</h3>
              {latestResults}
            </div>
            <div className="column">
              <h3 className="title is-3">Nächste Spiele</h3>
              {fixtures}
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
