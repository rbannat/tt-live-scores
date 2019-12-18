import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Table = () => {
  const data = useStaticQuery(
    graphql`
      query {
        leagueTable {
          content {
            mannschaft {
              mannschaft
              platz
              niederlagen
              punktedif
              punkteplus
              siege
              spiele
              unentschieden
            }
          }
        }
      }
    `
  )
  const teams = data.leagueTable.content.mannschaft
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
          {teams.map((team, index) => {
            return (
              <tr key={index}>
                <td>{team.platz}</td>
                <td>
                  <Link to={`/team/${team.mannschaft}`}>{team.mannschaft}</Link>
                </td>
                <td>{team.spiele}</td>
                <td>{team.siege}</td>
                <td>{team.unentschieden}</td>
                <td>{team.niederlagen}</td>
                <td>{team.punkteplus}</td>
                <td>{team.punktedif}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
