import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GameDay from "../components/gameDay"

const IndexPage = ({ data }) => {
  const fixturesByDate = data.allFixture.edges.reduce(
    (fixturesByDate, { node: fixture }) => {
      const date = fixture.date.split("T")[0]
      if (!fixturesByDate[date]) {
        fixturesByDate[date] = []
      }
      fixturesByDate[date].push({
        date: fixture.date,
        homeTeamName: fixture.homeTeam,
        guestTeamName: fixture.guestTeam,
        result: fixture.result,
        link: fixture.link,
      })
      return fixturesByDate
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
            <h2 className="subtitle">{data.league.name}</h2>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <h2 className="title is-4">Nächste Spiele</h2>
          {Object.keys(fixturesByDate)
            .filter(date => date >= new Date().toISOString().split("T")[0])
            .map((date, index) => {
              return (
                <GameDay
                  key={index}
                  date={date}
                  fixtures={fixturesByDate[date]}
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
    league {
      name
      link
      association {
        name
      }
    }
    allFixture {
      edges {
        node {
          date
          result
          guestTeam
          homeTeam
          link
        }
      }
    }
  }
`

export default IndexPage
