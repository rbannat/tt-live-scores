import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Table = () => {
  const data = useStaticQuery(
    graphql`
      query {
        leagueTable {
          Ergebnistabelle {
            Content {
              Mannschaft {
                Mannschaft
                Platz
                Niederlagen
                PunkteDif
                PunktePlus
                Siege
                Spiele
                Unentschieden
              }
            }
          }
        }
      }
    `
  )
  const teams = data.leagueTable.Ergebnistabelle.Content[0].Mannschaft
  return (
    <div className="table-container">
      <table className="table is-striped">
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
                <td>{team.Platz}</td>
                <td>
                  <Link to={`/team/${team.Mannschaft}`}>{team.Mannschaft}</Link>
                </td>
                <td>{team.Spiele}</td>
                <td>{team.Siege}</td>
                <td>{team.Unentschieden}</td>
                <td>{team.Niederlagen}</td>
                <td>{team.PunktePlus}</td>
                <td>{team.PunkteDif}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Table
