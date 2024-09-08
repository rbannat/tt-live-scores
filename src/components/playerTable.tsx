import { Link } from 'gatsby'
import React from 'react'
import { tableContainer } from './leagueTable.module.scss'

type PlayerTableProps = {
  players:
    | Queries.TeamPageQuery['playersFirstHalf']['nodes']
    | Queries.TeamPageQuery['playersSecondHalf']['nodes']
}
const PlayerTable = ({ players }: PlayerTableProps) => (
  <div className="box p-0">
    <div className={`${tableContainer} table-container`}>
      <table className="table is-fullwidth is-narrow is-striped">
        <thead>
          <tr>
            <th className="has-text-centered">Pos</th>
            <th>Name</th>
            <th className="has-text-centered">Sp</th>
            <th className="has-text-centered">PK1</th>
            <th className="has-text-centered">PK2</th>
            <th className="has-text-centered">Ges</th>
            <th className="has-text-centered">LPZ</th>
          </tr>
        </thead>
        <tbody>
          {players.map(
            ({
              player,
              score,
              won,
              lost,
              gamesPlayed,
              position,
              pk1Diff,
              pk2Diff,
            }) => {
              return (
                <tr key={player?.id}>
                  <td className="is-vcentered has-text-centered">
                    <span className="has-text-weight-bold">{position}</span>
                  </td>
                  <td className="is-vcentered">
                    <Link to={`/players/${player?.id}`}>{player?.name}</Link>
                  </td>
                  <td className="is-vcentered has-text-centered">
                    {gamesPlayed}
                  </td>
                  <td className="is-vcentered has-text-centered">
                    {pk1Diff?.join(':')}
                  </td>
                  <td className="is-vcentered has-text-centered">
                    {pk2Diff?.join(':')}
                  </td>
                  <td className="is-vcentered has-text-centered">
                    {(won || lost) && [won, lost].join(':')}
                  </td>
                  <td className="is-vcentered has-text-centered">{score}</td>
                </tr>
              )
            },
          )}
        </tbody>
      </table>
    </div>
  </div>
)

export default PlayerTable
