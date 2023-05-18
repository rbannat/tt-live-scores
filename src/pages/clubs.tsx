import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"

import Hero from "../components/hero"
import Layout from "../components/layout"
import { SEO } from "../components/seo"

const ClubsPage = ({ data }: PageProps<Queries.ClubsPageQuery>) => {
  return (
    <Layout>
      <Hero title={"Vereine"}></Hero>
      <section className="section">
        <div className="container">
          <article className="panel is-primary">
            {[...data.allClub.nodes]
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
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => <SEO title="Vereine" />

export const query = graphql`
  query ClubsPage {
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
