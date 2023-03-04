import { graphql, Link } from "gatsby"
import React from "react"
import Hero from "../components/hero"
import Layout from "../components/layout"
import { SEO } from "../components/seo"

const ClubPage = ({ data }) => {
  const teams = data.club.teams

  return (
    <Layout>
      <Hero title={data.club.name}></Hero>
      <section className="section">
        <div className="container">
          <div class="content">
            <h2 class="title">Teams</h2>
            <ul>
              {teams.map(team => (
                <li>
                  <Link to={`/team/${team.id}`}>{team.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const Head = ({ data }) => <SEO title={data.club.name} />

export const query = graphql`
  query ClubPageQuery($clubId: String!) {
    club(id: { eq: $clubId }) {
      id
      name
      shortName
      teams {
        id
        name
        shortName
      }
    }
  }
`

export default ClubPage
