import React from "react"

const PlayerTable = ({ players }) => (
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
        {players.map(
          ({
            player: { id, name },
            score,
            won,
            lost,
            gamesPlayed,
            position,
          }) => {
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
)

export default PlayerTable
