import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GameDay from "../components/gameDay"

const IndexPage = ({ data }) => {
  const gamesByDate = data.allGame.edges.reduce(
    (gamesByDate, { node: game }) => {
      const date = game.datum.split("T")[0]
      if (!gamesByDate[date]) {
        gamesByDate[date] = []
      }
      gamesByDate[date].push({
        date: game.datum,
        homeTeamName: game.heimmannschaft,
        guestTeamName: game.gastmannschaft,
        result: game.ergebnis,
        link: game.link,
      })
      return gamesByDate
    },
    {}
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
        <div className="container">
          <h2 className="title is-4">Nächste Spiele</h2>
          {Object.keys(gamesByDate)
            .filter(date => date >= new Date().toISOString().split("T")[0])
            .map((date, index) => {
              return (
                <GameDay
                  key={index}
                  date={date}
                  games={gamesByDate[date]}
                ></GameDay>
              )
            })}
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
    allGame {
      edges {
        node {
          datum
          ergebnis
          gastmannschaft
          heimmannschaft
          link
        }
      }
    }
  }
`

export default IndexPage
