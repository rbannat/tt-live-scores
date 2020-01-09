import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GameDay from "../components/gameDay"

const SchedulePage = ({ data }) => {
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
      <SEO title="Spielplan" />
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Spielplan</h1>
            <h2 className="subtitle">{data.leagueTable.liga}</h2>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          {Object.keys(gamesByDate).map((date, index) => {
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

export default SchedulePage
