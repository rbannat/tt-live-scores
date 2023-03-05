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
        <article className="panel is-primary">
          {data.allClub.nodes
            .sort(function (a, b) {
              return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
            })
            .map(club => (
              <Link
                key={club.id}
                className="panel-block"
                to={`/clubs/${club.id}`}
              >
                {club.name}
              </Link>
            ))}
        </article>
      </section>
    </Layout>
  )
}

export const Head = () => <SEO title="Vereine" />

export const query = graphql`
  {
    allClub(sort: { shortName: ASC }) {
      nodes {
        id
        name
        shortName
      }
    }
  }
`

export default ClubsPage
