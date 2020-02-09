import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "./layout"
import SEO from "./seo"

const TeamPage = ({ data }) => {
  const [activeTab, setActiveTab] = useState("firstHalf")
  return (
    <Layout>
      <SEO title="Team" />
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{data.team.name}</h1>
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
                {(activeTab === "firstHalf"
                  ? data.team.playersFirstHalf
                  : data.team.playersSecondHalf
                ).map(
                  ({
                    player: {
                      id,
                      name,
                      playerScoresFirstHalf,
                      playerScoresSecondHalf,
                    },
                    position,
                  }) => {
                    const { score, won, lost, gamesPlayed } =
                      activeTab === "firstHalf"
                        ? playerScoresFirstHalf
                        : playerScoresSecondHalf
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
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query TeamPageQuery($teamId: String!) {
    team(id: { eq: $teamId }) {
      name
      playersFirstHalf {
        position
        player {
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
      playersSecondHalf {
        position
        player {
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
  }
`

export default TeamPage
