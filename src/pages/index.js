import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const {
    league: { Ergebnistabelle: table },
  } = useStaticQuery(
    graphql`
      query {
        league {
          Ergebnistabelle {
            Liga
            Ligalink
            Verband
            Zeit
            Content {
              Mannschaft {
                Mannschaft
                Platz
                Niederlagen
                PunkteDif
                PunkteMinus
                PunktePlus
                SaetzeDif
                Siege
                Spiele
                SpieleDif
                SpieleMinus
                SpielePlus
                Unentschieden
              }
            }
          }
        }
      }
    `
  )
  const teams = table.Content[0].Mannschaft
  return (
    <Layout>
      <SEO title="Home" />
      <h2>{table.Liga}</h2>
      <table>
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
                <td>{team.Mannschaft}</td>
                <td>{team.Spiele}</td>
                <td>{team.Siege}</td>
                <td>{team.Unentschieden}</td>
                <td>{team.Niederlagen}</td>
                <td>
                  {team.PunktePlus}
                </td>
                <td>
                  {team.PunkteDif}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  )
}

export default IndexPage
