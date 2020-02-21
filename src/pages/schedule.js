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
        homeTeamName: fixture.homeTeam.shortName,
        homeTeamId: fixture.homeTeam.id,
        guestTeamId: fixture.guestTeam.id,
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
    allFixture {
      edges {
        node {
          isFirstHalf
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

export default SchedulePage
