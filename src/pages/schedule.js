import React, { useState } from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GameDay from "../components/gameDay"

const SchedulePage = ({ data }) => {
  const [activeTab, setActiveTab] = useState("firstHalf")

  const fixturesByDate = data.allFixture.edges.reduce(
    (fixturesByDate, { node: fixture }) => {
      const date = fixture.date.split("T")[0]
      if (!fixturesByDate[date]) {
        fixturesByDate[date] = []
      }
      fixturesByDate[date].push({
        isFirstHalf: fixture.isFirstHalf,
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
      <SEO title="Spielplan" />
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Spielplan</h1>
            <h2 className="subtitle">{data.league.name}</h2>
          </div>
        </div>
      </div>
      <section className="section">
        <div className="container">
          <div className="tabs">
            <ul>
              <li className={activeTab === "firstHalf" ? "is-active" : ""}>
                <a onClick={() => setActiveTab("firstHalf")}>Hinrunde</a>
              </li>
              <li className={activeTab === "secondHalf" ? "is-active" : ""}>
                <a onClick={() => setActiveTab("secondHalf")}>Rückrunde</a>
              </li>
            </ul>
          </div>

          {activeTab === "firstHalf"
            ? Object.keys(fixturesByDate)
                .filter(date => fixturesByDate[date][0].isFirstHalf)
                .map((date, index) => {
                  return (
                    <GameDay
                      key={index}
                      date={date}
                      fixtures={fixturesByDate[date]}
                    ></GameDay>
                  )
                })
            : Object.keys(fixturesByDate)
                .filter(date => !fixturesByDate[date][0].isFirstHalf)
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
          isFirstHalf
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

export default SchedulePage
