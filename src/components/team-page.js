import React from "react"
import { graphql } from "gatsby"
import Layout from "./layout"
import SEO from "./seo"

const TeamPage = ({ data }) => {
  const players = data.allPlayer.edges
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
          <div className="table-container">
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Score</th>
                </tr>
              </thead>
              <tbody>
                {players.map(({ node: { name, score, id } }) => {
                  return (
                    <tr key={id}>
                      <td>
                        {name}
                      </td>
                      <td>{score}</td>
                    </tr>
                  )
                })}
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
    }
    allPlayer(sort: {fields: position}, filter: {team: {id: {eq: $teamId}}}) {
      edges {
        node {
          id
          name
          score
        }
      }
    }
  }
`

export default TeamPage
