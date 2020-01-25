import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Table = () => {
  const data = useStaticQuery(
    graphql`
      query Table {
        allTeam(sort: { fields: position, order: ASC }) {
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
  )
  const teams = data.allTeam.edges
  return (
    <div className="table-container">
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Mannschaft</th>
            <th>Sp</th>
            <th>S</th>
            <th>U</th>
            <th>N</th>
            <th>Pkt</th>
            <th>Diff</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(({ node: team }) => {
            return (
              <tr key={team.id}>
                <td>{team.position}</td>
                <td>
                  <Link to={`/team/${team.id}`}>{team.name}</Link>
                </td>
                <td>{team.gamesPlayed}</td>
                <td>{team.won}</td>
                <td>{team.drawn}</td>
                <td>{team.lost}</td>
                <td>{team.pointsWon}</td>
                <td>{team.pointsDiff}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
