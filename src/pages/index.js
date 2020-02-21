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
        homeTeamName: fixture.homeTeam.shortName,
        homeTeamId: fixture.homeTeam.id,
        guestTeamId: fixture.guestTeam.id,
        guestTeamName: fixture.guestTeam.shortName,
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
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <h2 className="title is-4">Neueste Ergebnisse</h2>
          {Object.keys(fixturesByDate)
            .filter(date => date < new Date().toISOString().split("T")[0])
            .reverse()
            .slice(0, 3)
            .map((date, index) => {
              return (
                <GameDay
                  key={index}
                  date={date}
                  fixtures={fixturesByDate[date]}
                ></GameDay>
              )
            })}
          <h2 className="title is-4">Nächste Spiele</h2>
          {Object.keys(fixturesByDate)
            .filter(date => date >= new Date().toISOString().split("T")[0])
            .slice(0, 2)
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
      association {
        name
      }
    }
    allFixture {
      edges {
        node {
          date
          result
          guestTeam {
            ... on Team {
              id
              name
              shortName
            }
          }
          homeTeam {
            ... on Team {
              id
              name
              shortName
            }
          }
          link
        }
      }
    }
  }
`

export default IndexPage
