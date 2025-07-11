import { Link } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'
import React from 'react'
import ClubLogo from './clubLogo'
import { tableContainer } from './leagueTable.module.scss'

const LeagueTable = ({
  teams,
  teamId,
}: {
  teams: Queries.LeaguePageQuery['allTeam']['nodes']
  teamId?: string
}) => {
  return (
    <div className={`${tableContainer} table-container`}>
      <table className="table is-fullwidth is-narrow is-striped">
        <thead>
          <tr>
            <th className="has-text-centered">#</th>
            <th colSpan={2}>Team</th>
            <th className="has-text-centered">Sp</th>
            <th className="has-text-centered">S</th>
            <th className="has-text-centered">U</th>
            <th className="has-text-centered">N</th>
            <th className="has-text-centered">P</th>
          </tr>
        </thead>
        <tbody>
          {teams.map(team => {
            return (
              <tr
                key={team.id}
                className={teamId === team.id ? 'is-selected' : undefined}
              >
                <td className="is-vcentered has-text-centered">
                  <span className="has-text-weight-bold">{team.position}</span>
                </td>
                <td className="is-vcentered">
                  <ClubLogo
                    logo={
                      (team.club?.logo?.image as ImageDataLike) ?? undefined
                    }
                  />
                </td>
                <td className="is-vcentered">
                  <div className="is-flex is-align-items-center">
                    <Link to={`/teams/${team.id}`}>
                      <span className="is-size-6">{team.shortName}</span>
                    </Link>
                  </div>
                </td>
                <td className="is-vcentered has-text-centered">
                  {team.gamesPlayed}
                </td>
                <td className="is-vcentered has-text-centered">{team.won}</td>
                <td className="is-vcentered has-text-centered">{team.drawn}</td>
                <td className="is-vcentered has-text-centered">{team.lost}</td>
                <td className="is-vcentered has-text-centered">
                  {team.pointsWon}
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
