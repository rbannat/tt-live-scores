import React, { useState } from 'react'
import { HeadProps, Link, PageProps, graphql } from 'gatsby'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import FixtureList from '../components/fixtureList'
import Hero from '../components/hero'
import PlayerTable from '../components/playerTable'
import { useLocalStorage } from 'usehooks-ts'

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

  const firstHalfCompleted = false
  const [activeTab, setActiveTab] = useState(
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
      ? activeTab === 'firstHalf'
        ? data.playersFirstHalf.nodes
        : data.playersSecondHalf.nodes
      : [],
  )
  const subtitle = (
    <>
      <Link to={`/leagues/${data.team?.league?.id}`}>
        {data.team?.league?.name}
      </Link>
      <br />
      <Link className="is-size-6" to={`/clubs/${data.team?.club?.id}`}>
        {data.team?.club?.shortName}
      </Link>
    </>
  )

  return (
    <Layout>
      <Hero
        title={data.team?.shortName ?? ''}
        subtitle={subtitle}
        showLastUpdated={true}
        isFav={favoriteTeams.some(team => team.id === data.team?.id)}
        onFavClick={handleFavClick}
      ></Hero>

      <section className="section">
        <div className="container">
          <h2 className="title is-4">Team</h2>
          <div className="block">
            <div className="tabs">
              <ul>
                <li className={activeTab === 'firstHalf' ? 'is-active' : ''}>
                  <a onClick={() => setActiveTab('firstHalf')}>Hinrunde</a>
                </li>
                <li className={activeTab === 'secondHalf' ? 'is-active' : ''}>
                  <a
                    className={activeTab === 'secondHalf' ? 'is-active' : ''}
                    onClick={() =>
                      firstHalfCompleted && setActiveTab('secondHalf')
                    }
                  >
                    Rückrunde
                  </a>
                </li>
              </ul>
            </div>

            <PlayerTable players={players}></PlayerTable>
          </div>

          <FixtureList
            fixtures={fixtures}
            title={'Spiele'}
            noResultsText={'Es sind keine Spiele geplant.'}
            isPaginated={false}
            teamId={data.team?.id}
          ></FixtureList>
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
  query TeamPage($teamId: String!) {
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
  }
`

export default TeamPage
