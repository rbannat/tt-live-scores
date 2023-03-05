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
        <div className="columns is-multiline">
          <div className="column is-one-quarter">
            <Link className="is-block notification is-primary" to={`/clubs`}>
              <span className="title is-size-4">Alle Vereine</span>
            </Link>
          </div>
        </div>

        <div className="columns is-multiline">
          <div className="column is-one-quarter">
            <Link className="is-block notification is-warning" to={`/leagues`}>
              <span className="title is-size-4">Alle Ligen</span>
            </Link>
          </div>
          {data.allGroup.nodes.map(group => (
            <div key={group.id} className="column is-one-quarter">
              <Link
                className="is-block notification is-warning"
                to={`/groups/${group.id}`}
              >
                <span className="title is-size-4">{group.name}</span>
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
