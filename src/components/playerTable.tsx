import React from 'react'

type PlayerTableProps = {
  players:
    | Queries.TeamPageQuery['playersFirstHalf']['nodes']
    | Queries.TeamPageQuery['playersSecondHalf']['nodes']
}
const PlayerTable = ({ players }: PlayerTableProps) => (
  <div className="table-container u-grow">
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
        {players.map(({ player, score, won, lost, gamesPlayed, position }) => {
          return (
            <tr key={player?.id}>
              <td>{position}</td>
              <td>{player?.name}</td>
              <td>{gamesPlayed}</td>
              <td>{won}</td>
              <td>{lost}</td>
              <td>{score}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default PlayerTable
