import { graphql, Link } from "gatsby"
import React from "react"
import Hero from "../components/hero"
import Layout from "../components/layout"
import { SEO } from "../components/seo"

const GroupPage = ({ data }) => {
  const leagues = data.allLeague.nodes

  return (
    <Layout>
      <Hero title={data.group.name}></Hero>
      <section className="section">
        <article className="panel">
          <p className="panel-heading">Staffeln</p>
          {leagues.map(league => (
            <Link
              key={league.id}
              className="panel-block"
              to={`/leagues/${league.id}`}
            >
              {league.name}
            </Link>
          ))}
        </article>
      </section>
    </Layout>
  )
}

export const Head = ({ data }) => <SEO title={data.group.name} />

export const query = graphql`
  query GroupPageQuery($groupId: String!) {
    group(id: { eq: $groupId }) {
      id
      name
    }
    allLeague(filter: { group: { id: { eq: $groupId } } }) {
      nodes {
        id
        name
      }
    }
  }
`

export default GroupPage
