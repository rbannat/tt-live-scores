import * as React from 'react'
import { graphql, Link, PageProps } from 'gatsby'

import Hero from '../components/hero'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import ClubLogo from '../components/clubLogo'

const ClubsPage = ({ data }: PageProps<Queries.ClubsPageQuery>) => {
  function renderLogoByClubId(id: string, logos) {
    const logo = logos.find(logo => logo.clubId === id)
    return <ClubLogo logo={logo?.image} />
  }

  return (
    <Layout>
      <Hero title={'Vereine'}></Hero>
      <section className="section">
        <div className="container">
          <article className="panel is-primary">
            {[...data.allClub.nodes]
              .sort(function (a, b) {
                return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
              })
              .map(club => (
                <Link
                  key={club.id}
                  className="panel-block"
                  to={`/clubs/${club.id}`}
                >
                  {renderLogoByClubId(club.id, data.logos.nodes)}
                  {club.name}
                </Link>
              ))}
          </article>
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
              backgroundColor: "white"
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
