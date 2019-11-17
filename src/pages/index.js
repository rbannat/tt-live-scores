import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
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
  const teams = data.league.Ergebnistabelle.Content[0].Mannschaft
  return (
    <Layout>
      <SEO title="Tabelle" />
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Tabelle</h1>
            <h2 className="subtitle">{data.league.Ergebnistabelle.Liga}</h2>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
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
                        <Link to={`/team/${team.Mannschaft}`}>
                          {team.Mannschaft}
                        </Link>
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
        </div>
      </section>
    </Layout>
  )
}

export default IndexPage
