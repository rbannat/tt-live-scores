import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import { SEO } from "../components/seo"
import Hero from "../components/hero"

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <Hero title={"Übersicht"}></Hero>
      <section className="section">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <Link class="tile is-child notification is-primary" to={`/clubs`}>
              <article>
                <p class="title">Alle Vereine</p>
              </article>
            </Link>
          </div>
        </div>
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <Link class="tile is-child notification is-warning" to={`/leagues`}>
              <article>
                <p class="title">Alle Ligen</p>
              </article>
            </Link>
          </div>
          {data.allGroup.nodes.map(group => (
            <div class="tile is-parent">
              <Link
                class="tile is-child notification is-warning"
                to={`/groups/${group.id}`}
              >
                <article>
                  <p class="title">{group.name}</p>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => <SEO title="Übersicht" />

export const query = graphql`
  {
    league {
      name
      association {
        name
      }
    }
    allGroup(limit: 5) {
      nodes {
        id
        name
      }
    }
  }
`

export default IndexPage
