import { graphql, Link } from "gatsby"
import React from "react"
import Hero from "../components/hero"
import Layout from "../components/layout"
import { SEO } from "../components/seo"

const ClubPage = ({ data }) => {
  const groups = data.allTeam.group

  return (
    <Layout>
      <Hero title={data.club.name}></Hero>
      <section className="section">
        {groups.map(group => (
          <article class="panel is-primary">
            <p class="panel-heading">{group.fieldValue}</p>
            {group.nodes.map(team => (
              <Link class="panel-block" to={`/teams/${team.id}`}>
                {team.shortName}
                <br />
                {team.league.name}
              </Link>
            ))}
          </article>
        ))}
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
    }
    allTeam(
      sort: [{ league: { name: ASC } }, { shortName: ASC }]
      filter: { club: { id: { eq: $clubId } } }
    ) {
      group(field: { league: { group: { name: SELECT } } }) {
        fieldValue
        nodes {
          id
          name
          shortName
          league {
            name
            group {
              name
            }
          }
        }
      }
    }
  }
`

export default ClubPage
