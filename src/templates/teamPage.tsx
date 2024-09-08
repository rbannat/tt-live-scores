import React, { useState } from 'react'
import { HeadProps, Link, PageProps, graphql } from 'gatsby'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import FixtureList from '../components/fixtureList'
import Hero from '../components/hero'
import PlayerTable from '../components/playerTable'
import { useLocalStorage } from 'usehooks-ts'
import { firstHalfCompleted } from '../utils/constants'

const TeamPage = ({ data }: PageProps<Queries.TeamPageQuery>) => {
  function handleFavClick() {
    if (favoriteTeams?.find(team => team.id === data.team?.id)) {
      setFavoriteTeams(prevState =>
        prevState.filter(team => team.id !== data.team?.id),
      )
      return
    }
    setFavoriteTeams(prevState => [
      ...new Set([
        ...prevState,
        { id: data.team?.id ?? '', name: data.team?.shortName ?? '' },
      ]),
    ])
  }
  const [favoriteTeams, setFavoriteTeams] = useLocalStorage(
    'fav-teams',
    [] as Array<{ id: string; name: string }>,
  )
  const [activeTab, setActiveTab] = useState<'team' | 'matches'>('team')

  const [activeHalfTab, setActiveHalfTab] = useState(
    firstHalfCompleted ? 'secondHalf' : 'firstHalf',
  )

  const fixtures = data.team?.fixtures
    ? data.team.fixtures
        .reduce<NonNullable<Queries.FixtureDataFragment[]>>(
          (fixtures, fixture) => {
            return fixture ? [...(fixtures ? fixtures : []), fixture] : fixtures
          },
          [],
        )
        .sort((a, b) => {
          return a.date && b.date
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : 0
        })
    : []
  const players = sortPlayersByPosition(
    data && data.team
      ? activeHalfTab === 'firstHalf'
        ? data.playersFirstHalf.nodes
        : data.playersSecondHalf.nodes
      : [],
  )
  const subtitle = (
    <>
      <Link
        className="has-text-inherit"
        to={`/leagues/${data.team?.league?.id}`}
      >
        {data.team?.league?.name}
      </Link>
    </>
  )

  return (
    <Layout>
      <Hero
        title={data.team?.shortName ?? ''}
        clubLogo={{ image: data?.logo?.image, size: 'large' }}
        subtitle={subtitle}
        showLastUpdated={true}
        isFav={favoriteTeams.some(team => team.id === data.team?.id)}
        onFavClick={handleFavClick}
      ></Hero>

      <section className="section">
        <div className="container">
          <nav className="breadcrumb is-small" aria-label="breadcrumbs">
            <ul>
              <li>
                <Link to={`/clubs`}>Vereine</Link>
              </li>
              <li>
                <Link to={`/clubs/${data.team?.club?.id}`}>
                  {data.team?.club?.shortName}
                </Link>
              </li>
              <li className="is-active">
                <Link to={`/teams/${data.team?.id}`} aria-current="page">
                  {data.team?.club?.shortName}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="tabs is-boxed">
            <ul>
              <li className={activeTab === 'team' ? 'is-active' : ''}>
                <a className="title is-6" onClick={() => setActiveTab('team')}>
                  Team
                </a>
              </li>
              <li className={activeTab === 'matches' ? 'is-active' : ''}>
                <a
                  className="title is-6"
                  onClick={() => setActiveTab('matches')}
                >
                  Spielplan
                </a>
              </li>
            </ul>
          </div>

          {activeTab === 'team' ? (
            <>
              {firstHalfCompleted && (
                <div className="tabs is-small is-toggle">
                  <ul>
                    <li
                      className={
                        activeHalfTab === 'firstHalf' ? 'is-active' : ''
                      }
                    >
                      <a onClick={() => setActiveHalfTab('firstHalf')}>
                        Hinrunde
                      </a>
                    </li>
                    <li
                      className={
                        activeHalfTab === 'secondHalf' ? 'is-active' : ''
                      }
                    >
                      <a
                        onClick={() =>
                          firstHalfCompleted && setActiveHalfTab('secondHalf')
                        }
                      >
                        Rückrunde
                      </a>
                    </li>
                  </ul>
                </div>
              )}

              <PlayerTable players={players}></PlayerTable>
            </>
          ) : (
            <FixtureList
              fixtures={fixtures}
              noResultsText={'Es sind keine Spiele geplant.'}
              isPaginated={false}
              teamId={data.team?.id}
            ></FixtureList>
          )}
        </div>
      </section>
    </Layout>
  )
}

function sortPlayersByPosition(
  players:
    | Queries.TeamPageQuery['playersFirstHalf']['nodes']
    | Queries.TeamPageQuery['playersSecondHalf']['nodes'],
) {
  const originalPlayers = players.filter(
    player => !player.position?.length || player.position?.length <= 1,
  )
  const substitutes = players.filter(
    player => player.position?.length && player.position?.length > 1,
  )
  return [...originalPlayers, ...substitutes]
}

export const Head = ({ data }: HeadProps<Queries.TeamPageQuery>) => (
  <SEO title={data.team?.name ?? ''} />
)

export const query = graphql`
  query TeamPage($teamId: String!, $clubId: String!) {
    team(id: { eq: $teamId }) {
      id
      league {
        id
        name
        shortName
      }
      name
      shortName
      club {
        id
        shortName
      }
      fixtures {
        ...FixtureData
      }
    }
    playersFirstHalf: allPlayerScore(
      filter: { team: { id: { eq: $teamId } }, isSecondHalf: { eq: false } }
      sort: { position: ASC }
    ) {
      nodes {
        position
        score
        won
        lost
        pk1Diff
        pk2Diff
        gamesPlayed
        player {
          id
          name
        }
      }
    }
    playersSecondHalf: allPlayerScore(
      filter: { team: { id: { eq: $teamId } }, isSecondHalf: { eq: true } }
      sort: { position: ASC }
    ) {
      nodes {
        position
        score
        won
        lost
        pk1Diff
        pk2Diff
        gamesPlayed
        player {
          id
          name
        }
      }
    }
    logo: clubLogosJson(clubId: { eq: $clubId }) {
      image {
        childImageSharp {
          gatsbyImageData(
            height: 64
            width: 64
            transformOptions: { fit: CONTAIN }
            backgroundColor: "white"
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
    placeholderImage: file(relativePath: { eq: "badge-placeholder.png" }) {
      childImageSharp {
        gatsbyImageData(
          height: 64
          width: 64
          transformOptions: { fit: CONTAIN }
          backgroundColor: "white"
          placeholder: BLURRED
          formats: [AUTO, WEBP, AVIF]
        )
      }
    }
  }
`

export default TeamPage
