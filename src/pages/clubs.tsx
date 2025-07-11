import { graphql, Link, PageProps } from 'gatsby'
import * as React from 'react'

import ClubLogo from '../components/clubLogo'
import Layout from '../components/layout'
import { SEO } from '../components/seo'

const ClubsPage = ({ data }: PageProps<Queries.ClubsPageQuery>) => {
  function renderLogoByClubId(
    id: string,
    logos: Queries.ClubsPageQuery['logos']['nodes'],
  ) {
    const logo = logos.find(logo => logo.clubId === id)
    return (
      <div className="mr-4 is-flex-shrink-0">
        <ClubLogo logo={logo?.image} />
      </div>
    )
  }

  return (
    <Layout>
      <section className="section">
        <div className="container">
          <h1 className="title is-4">Vereine</h1>
          <ul>
            {[...data.allClub.nodes]
              .sort(function (a, b) {
                return (a.name?.toLowerCase() ?? 0) <
                  (b.name?.toLowerCase() ?? 0)
                  ? -1
                  : 1
              })
              .map(club => (
                <li key={club.id} className="box p-0">
                  <Link
                    to={`/clubs/${club.id}`}
                    className="is-flex is-align-items-center px-4 py-3 title is-6 "
                  >
                    {renderLogoByClubId(club.id, data.logos.nodes)}
                    {club.name}
                  </Link>
                </li>
              ))}
          </ul>
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
    logos: allClubLogosJson {
      nodes {
        clubId
        image {
          childImageSharp {
            gatsbyImageData(
              width: 32
              height: 32
              transformOptions: { fit: CONTAIN }
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`

export default ClubsPage
