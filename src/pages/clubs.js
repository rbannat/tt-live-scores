import { graphql, Link } from "gatsby"
import React from "react"

import Hero from "../components/hero"
import Layout from "../components/layout"
import { SEO } from "../components/seo"

const ClubsPage = ({ data }) => {
  return (
    <Layout>
      <Hero title={"Vereine"}></Hero>
      <section className="section">
        <div className="container">
          <div class="content">
            <ul>
              {data.allClub.nodes.map(club => (
                <li>
                  <Link to={`/club/${club.id}`}>{club.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => <SEO title="Vereine" />

export const query = graphql`
  {
    allClub {
      nodes {
        id
        name
        shortName
      }
    }
  }
`

export default ClubsPage
