import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Fixture from "../components/fixture"

const TeamPage = ({ data }) => {
  const [activeTab, setActiveTab] = useState("firstHalf")
  const fixtures = data.team.fixtures.filter(
    (fixture) =>
      !fixture.result && fixture.date >= new Date().toISOString().split("T")[0]
  )
  const results = data.team.fixtures
    .filter(
      (fixture) =>
        fixture.result && fixture.date < new Date().toISOString().split("T")[0]
    )
    .reverse()
  const players =
    data && data.team
      ? activeTab === "firstHalf"
        ? data.team.playersFirstHalf
        : data.team.playersSecondHalf
      : []
  return (
    <Layout>
      <SEO title={data.team.name} />
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{data.team.name}</h1>
            <h2 className="subtitle">{data.team.league.shortName}</h2>
          </div>
        </div>
      </div>
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

          <div className="table-container">
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Pos</th>
                  <th>Name</th>
                  <th>Sp</th>
                  <th>S</th>
                  <th>N</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {players.map(
                  ({
                    player: {
                      id,
                      name,
                      playerScoresFirstHalf,
                      playerScoresSecondHalf,
                    },
                    position,
                  }) => {
                    const playerScores =
                      activeTab === "firstHalf"
                        ? playerScoresFirstHalf
                        : playerScoresSecondHalf

                    const { score, won, lost, gamesPlayed } = playerScores || {
                      score: null,
                      won: null,
                      lost: null,
                      gamesPlayed: null,
                    }

                    return (
                      <tr key={id}>
                        <td>{position}</td>
                        <td>{name}</td>
                        <td>{gamesPlayed}</td>
                        <td>{won}</td>
                        <td>{lost}</td>
                        <td>{score}</td>
                      </tr>
                    )
                  }
                )}
              </tbody>
            </table>
          </div>

          <div className="columns">
            <div className="column">
              <h3 className="title is-3">Neueste Ergebnisse</h3>
              {results.map(
                ({ id, homeTeam, guestTeam, result, date, link }) => {
                  return (
                    <Fixture
                      key={id}
                      homeTeam={homeTeam}
                      guestTeam={guestTeam}
                      date={date}
                      result={result}
                      link={link}
                    ></Fixture>
                  )
                }
              )}
            </div>
            <div className="column">
              <h3 className="title is-3">Nächste Spiele</h3>
              {fixtures.map(
                ({ id, homeTeam, guestTeam, result, date, link }) => {
                  return (
                    <Fixture
                      key={id}
                      homeTeam={homeTeam}
                      guestTeam={guestTeam}
                      date={date}
                      result={result}
                      link={link}
                    ></Fixture>
                  )
                }
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query TeamPageQuery($teamId: String!) {
    team(id: { eq: $teamId }) {
      league {
        shortName
      }
      name
      playersFirstHalf {
        position
        player {
          ... on Player {
            id
            name
            playerScoresFirstHalf {
              score
              won
              lost
              gamesPlayed
            }
          }
        }
      }
      playersSecondHalf {
        position
        player {
          ... on Player {
            id
            name
            playerScoresSecondHalf {
              score
              won
              lost
              gamesPlayed
            }
          }
        }
      }
      fixtures {
        ...FixtureData
      }
    }
  }
`

export default TeamPage
