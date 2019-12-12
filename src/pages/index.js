import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Fixture from "../components/fixture"

const IndexPage = ({ data }) => {
  const nextGames = data.teamReport.content.spielplan.spiel.reduce(
    (acc, prev) => {
      if (new Date(prev.datum) > new Date()) {
        acc.push({
          date: prev.datum,
          homeTeamName: prev.heimmannschaft,
          guestTeamName: prev.gastmannschaft,
        })
      }
      return acc
    },
    []
  )
  return (
    <Layout>
      <SEO title="Übersicht" />
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Übersicht</h1>
            <h2 className="subtitle">{data.leagueTable.liga}</h2>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container content">
          <h2 className="title is-4">Nächste Spiele</h2>
          {nextGames.map(
            ({ homeTeamName, guestTeamName, date, result }, index) => {
              return (
                <div className="fixture-container" key={index}>
                  <h3 className="is-size-6">
                    {new Date(date).toLocaleDateString("de-DE", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </h3>
                  <Fixture
                    homeTeamName={homeTeamName}
                    guestTeamName={guestTeamName}
                    date={date}
                    result={result}
                  ></Fixture>
                </div>
              )
            }
          )}
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query {
    leagueTable {
      liga
      ligalink
      verband
      zeit
    }
    teamReport {
      content {
        spielplan {
          spiel {
            datum
            ergebnis
            gastmannschaft
            heimmannschaft
          }
        }
      }
    }
  }
`

export default IndexPage
