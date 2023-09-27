import React from 'react'

type PlayerTableProps = {
  players:
    | Queries.TeamPageQuery['playersFirstHalf']['nodes']
    | Queries.TeamPageQuery['playersSecondHalf']['nodes']
}
const PlayerTable = ({ players }: PlayerTableProps) => (
  <div className="table-container u-grow">
    <table className="table is-fullwidth is-narrow is-striped">
      <thead>
        <tr>
          <th>Pos</th>
          <th>Name</th>
          <th>Sp</th>
          <th>PK 1</th>
          <th>PK 2</th>
          <th>Ges</th>
          <th>LivePZ</th>
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
                <td>{position}</td>
                <td>{player?.name}</td>
                <td>{gamesPlayed}</td>
                <td>{pk1Diff?.join(':')}</td>
                <td>{pk2Diff?.join(':')}</td>
                <td>{(won || lost) && [won, lost].join(':')}</td>
                <td>{score}</td>
              </tr>
            )
          },
        )}
      </tbody>
    </table>
  </div>
)

export default PlayerTable
