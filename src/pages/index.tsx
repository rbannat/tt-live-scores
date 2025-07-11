import { graphql, Link, PageProps } from 'gatsby'
import * as React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import ClubLogo from '../components/clubLogo'
import Layout from '../components/layout'
import {
  ScrollContainer,
  ScrollContainerItem,
} from '../components/scrollContainer'
import { SEO } from '../components/seo'
import './styles.scss'

const IndexPage = ({ data }: PageProps<Queries.IndexPageQuery>) => {
  const [favoriteClubs] = useLocalStorage(
    'fav-clubs',
    [] as Array<{ id: string; name: string }>,
  )
  const [favoriteTeams] = useLocalStorage(
    'fav-teams',
    [] as Array<{ id: string; name: string }>,
  )

  function renderLogoByTeamId(
    id: string,
    teams: Queries.IndexPageQuery['teams']['nodes'],
  ) {
    const club = teams.find(team => team.id === id)?.club
    const image = club?.logo?.image
    return (
      <div className="mb-4">
        <ClubLogo logo={image} size="large" />
      </div>
    )
  }

  function renderLogoByClubId(
    id: string,
    clubs: Queries.IndexPageQuery['clubs']['nodes'],
  ) {
    const club = clubs.find(club => club.id === id)
    const image = club?.logo?.image
    return (
      <div className="mb-4">
        <ClubLogo logo={image} size="large" />
      </div>
    )
  }

  return (
    <Layout>
      <div className="container">
        <section className="section">
          <h2 className="title is-4">Meine Teams</h2>
          {favoriteTeams?.length > 0 ? (
            <ScrollContainer>
              {favoriteTeams &&
                favoriteTeams.map(favoriteTeam => (
                  <ScrollContainerItem
                    key={favoriteTeam.id}
                    toUrl={`/teams/${favoriteTeam.id}`}
                  >
                    {renderLogoByTeamId(favoriteTeam.id, data.teams.nodes)}
                    <span className="title is-6">{favoriteTeam.name}</span>
                  </ScrollContainerItem>
                ))}
            </ScrollContainer>
          ) : (
            <p>Es wurden keine Favoriten hinzugefügt.</p>
          )}
        </section>
        <section className="section">
          <div className="level is-mobile">
            <div className="level-left">
              <div className="level-item">
                <h2 className="title is-4">Meine Vereine</h2>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <Link to={`/clubs`}>Alle Vereine</Link>
              </div>
            </div>
          </div>
          {favoriteClubs?.length > 0 ? (
            <ScrollContainer>
              {favoriteClubs &&
                favoriteClubs.map(favoriteClub => (
                  <ScrollContainerItem
                    key={favoriteClub.id}
                    toUrl={`/clubs/${favoriteClub.id}`}
                  >
                    {renderLogoByClubId(favoriteClub.id, data.clubs.nodes)}
                    <span className="title is-6">{favoriteClub.name}</span>
                  </ScrollContainerItem>
                ))}
            </ScrollContainer>
          ) : (
            <p>Es wurden keine Favoriten hinzugefügt.</p>
          )}
        </section>
        <section className="section">
          <div className="level is-mobile">
            <div className="level-left">
              <div className="level-item">
                <h2 className="title is-4">Ligen</h2>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                <Link to={`/leagues`}>Alle Ligen</Link>
              </div>
            </div>
          </div>

          <ScrollContainer>
            {data.allGroup.nodes.map(group => (
              <ScrollContainerItem key={group.id} toUrl={`/groups/${group.id}`}>
                <span className="title is-6">{group.name}</span>
              </ScrollContainerItem>
            ))}
          </ScrollContainer>
        </section>
      </div>
    </Layout>
  )
}

export const Head = () => <SEO title="Start" />

export const query = graphql`
  query IndexPage {
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
    teams: allTeam {
      nodes {
        id
        club {
          id
          logo {
            image {
              childImageSharp {
                gatsbyImageData(
                  width: 64
                  transformOptions: { fit: CONTAIN }
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
    clubs: allClub {
      nodes {
        id
        logo {
          image {
            childImageSharp {
              gatsbyImageData(
                width: 64
                transformOptions: { fit: CONTAIN }
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
    }
  }
`

export default IndexPage
