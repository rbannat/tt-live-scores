import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import { SEO } from "../components/seo"
import Hero from "../components/hero"
import { useLocalStorage } from "../hooks/use-local-storage"

const IndexPage = ({ data }) => {
  const [favoriteClubs] = useLocalStorage("fav-clubs", [])
  const [favoriteTeams] = useLocalStorage("fav-teams", [])

  return (
    <Layout>
      <Hero title={"Übersicht"}></Hero>
      <section className="section">
        <div className="container">
          {favoriteTeams?.length > 0 && (
            <h2 className="title is-4">Meine Teams</h2>
          )}
          <div className="columns is-multiline">
            {favoriteTeams &&
              favoriteTeams.map(favoriteTeam => (
                <div className="column is-one-quarter">
                  <Link
                    className="is-block notification is-primary"
                    to={`/teams/${favoriteTeam.id}`}
                  >
                    <span className="title is-size-4">{favoriteTeam.name}</span>
                  </Link>
                </div>
              ))}
          </div>

          {favoriteClubs?.length > 0 && (
            <h2 className="title is-4">Meine Vereine</h2>
          )}
          <div className="columns is-multiline">
            {favoriteClubs &&
              favoriteClubs.map(favoriteClub => (
                <div className="column is-one-quarter">
                  <Link
                    className="is-block notification is-primary"
                    to={`/clubs/${favoriteClub.id}`}
                  >
                    <span className="title is-size-4">{favoriteClub.name}</span>
                  </Link>
                </div>
              ))}
          </div>

          <div className="columns is-multiline">
            <div className="column is-one-quarter">
              <Link className="is-block notification is-primary" to={`/clubs`}>
                <span className="title is-size-4">Alle Vereine</span>
              </Link>
            </div>
          </div>

          <div className="columns is-multiline">
            <div className="column is-one-quarter">
              <Link
                className="is-block notification is-warning"
                to={`/leagues`}
              >
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
