import React from "react"
import { Link } from "gatsby"

const LeagueTable = ({ teams }) => {
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
          {teams.map((team) => {
            return (
              <tr key={team.id}>
                <td>{team.position}</td>
                <td>
                  <Link to={`/team/${team.id}`}>
                    <span>{team.shortName}</span>
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

export default LeagueTable
