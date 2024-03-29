import * as React from "react"
import { graphql, Link, PageProps } from "gatsby"

import Hero from "../components/hero"
import Layout from "../components/layout"
import { SEO } from "../components/seo"

const GroupsPage = ({ data }: PageProps<Queries.GroupsPageQuery>) => {
  return (
    <Layout>
      <Hero title={"Ligen"}></Hero>
      <section className="section">
        <div className="container">
          <article className="panel is-primary">
            {data.allGroup.nodes.map(group => (
              <Link className="panel-block" to={`/groups/${group.id}`}>
                {group.name}
              </Link>
            ))}
          </article>
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => <SEO title="Ligen" />

export const query = graphql`
  query GroupsPage {
    allGroup {
      nodes {
        id
        name
      }
    }
  }
`

export default GroupsPage
