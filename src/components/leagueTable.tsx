import React from 'react'
import { Link } from 'gatsby'

const LeagueTable = ({
  teams,
}: {
  teams: Queries.LeaguePageQuery['allTeam']['nodes']
}) => {
  return (
    <div className="table-container u-grow">
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>#</th>
            <th>Mannschaft</th>
            <th>S</th>
            <th>U</th>
            <th>N</th>
            <th>Pkt</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => {
            return (
              <tr key={team.id}>
                <td>{team.position}</td>
                <td>
                  <Link to={`/teams/${team.id}`}>
                    <span>{team.shortName}</span>
                  </Link>
                </td>
                <td>{team.won}</td>
                <td>{team.drawn}</td>
                <td>{team.lost}</td>
                <td>
                  {team.pointsWon}:{team.pointsLost}
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
