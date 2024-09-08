import { graphql, HeadProps, Link, PageProps } from 'gatsby'
import React from 'react'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import Hero from '../components/hero'

const GroupPage = ({ data }: PageProps<Queries.GroupPageQuery>) => {
  const leagues = data.allLeague.nodes

  return (
    <Layout>
      <Hero title={data.group?.name ?? ''}></Hero>
      <section className="section">
        <div className="container">
          <nav className="breadcrumb is-small" aria-label="breadcrumbs">
            <ul>
              <li>
                <Link to={`/leagues`}>Ligen</Link>
              </li>
              <li className="is-active">
                <Link to={`/groups/${data.group?.id}`} aria-current="page">
                  {data.group?.name}
                </Link>
              </li>
            </ul>
          </nav>

          <ul>
            {leagues.map(league => (
              <li key={league.id} className="box p-0">
                <Link
                  className="is-flex is-align-items-center px-4 py-3 title is-6"
                  to={`/leagues/${league.id}`}
                >
                  {league.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  )
}

export const Head = ({ data }: HeadProps<Queries.GroupPageQuery>) => (
  <SEO title={data.group?.name ?? ''} />
)

export const query = graphql`
  query GroupPage($groupId: String!) {
    group(id: { eq: $groupId }) {
      id
      name
    }
    allLeague(filter: { group: { id: { eq: $groupId } } }) {
      nodes {
        id
        name
        shortName
      }
    }
  }
`

export default GroupPage
