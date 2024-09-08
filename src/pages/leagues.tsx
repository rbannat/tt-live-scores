import * as React from 'react'
import { graphql, Link, PageProps } from 'gatsby'

import Layout from '../components/layout'
import { SEO } from '../components/seo'

const GroupsPage = ({ data }: PageProps<Queries.GroupsPageQuery>) => {
  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title is-4">Ligen</h1>
          <ul>
            {data.allGroup.nodes.map(group => (
              <li key={group.id} className="box p-0">
                <Link
                  to={`/groups/${group.id}`}
                  className="is-flex is-align-items-center px-4 py-3 title is-6"
                >
                  {group.name}
                </Link>
              </li>
            ))}
          </ul>
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
