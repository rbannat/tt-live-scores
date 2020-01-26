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
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Mannschaft</th>
            <th>Sp</th>
            <th className="is-hidden-touch">S</th>
            <th className="is-hidden-touch">U</th>
            <th className="is-hidden-touch">N</th>
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
                  <Link to={`/team/${team.id}`}>
                    <span>{team.name}</span>
                  </Link>
                </td>
                <td>{team.gamesPlayed}</td>
                <td className="is-hidden-touch">{team.won}</td>
                <td className="is-hidden-touch">{team.drawn}</td>
                <td className="is-hidden-touch">{team.lost}</td>
                <td>{team.pointsWon}</td>
                <td>
                  {team.pointsDiff > 0
                    ? `+${team.pointsDiff}`
                    : team.pointsDiff}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
