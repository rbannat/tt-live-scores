import { graphql, HeadProps, Link, PageProps } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'
import React, { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import FixtureList from '../components/fixtureList'
import Hero from '../components/hero'
import Layout from '../components/layout'
import { tableContainer } from '../components/leagueTable.module.scss'
import { SEO } from '../components/seo'
import { firstHalfCompleted } from '../utils/constants'

type Player = Queries.ClubPageQuery['allPlayer']['nodes'][number]
type PlayerScore = NonNullable<Player['scores']>[number]

type PlayerTableProps = {
  playerScores: NonNullable<PlayerScore>[]
}
const PlayerTable = ({ playerScores }: PlayerTableProps) => (
  <div className="box p-0">
    <div className={`${tableContainer} table-container`}>
      <table className="table is-fullwidth is-narrow is-striped">
        <thead>
          <tr>
            <th className="has-text-centered">#</th>
            <th>Name</th>
            <th className="has-text-centered">Sp</th>
            <th className="has-text-centered">PK1</th>
            <th className="has-text-centered">PK2</th>
            <th className="has-text-centered">Ges</th>
            <th className="has-text-centered">LPZ</th>
          </tr>
        </thead>
        <tbody>
          {playerScores.map(
            (
              { player, score, won, lost, gamesPlayed, pk1Diff, pk2Diff },
              index,
            ) => {
              return (
                <tr key={player?.id}>
                  <td className="is-vcentered has-text-centered">
                    <span className="has-text-weight-bold">{index + 1}</span>
                  </td>
                  <td className="is-vcentered">
                    <Link to={`/players/${player?.id}`}>{player?.name}</Link>
                  </td>
                  <td className="is-vcentered has-text-centered">
                    {gamesPlayed}
                  </td>
                  <td className="is-vcentered has-text-centered">
                    {pk1Diff && !pk1Diff[0] && !pk1Diff[1]
                      ? ''
                      : pk1Diff?.join(':')}
                  </td>
                  <td className="is-vcentered has-text-centered">
                    {pk2Diff && !pk2Diff[0] && !pk2Diff[1]
                      ? ''
                      : pk2Diff?.join(':')}
                  </td>
                  <td className="is-vcentered has-text-centered">
                    {won || lost ? [won, lost].join(':') : ''}
                  </td>
                  <td className="is-vcentered has-text-centered">{score}</td>
                </tr>
              )
            },
          )}
        </tbody>
      </table>
    </div>
  </div>
)

// Javascript program to convert Roman
// Numerals to Numberspublic
// This function returns value of
// a Roman symbol
function value(r: string) {
  if (r === 'I') return 1
  if (r === 'V') return 5
  if (r === 'X') return 10
  if (r === 'L') return 50
  if (r === 'C') return 100
  if (r === 'D') return 500
  if (r === 'M') return 1000
  return -1
}

// Finds decimal value of a given
// romal numeral
function romanToDecimal(str: string) {
  // Initialize result
  let res = 0

  for (let i = 0; i < str.length; i++) {
    // Getting value of symbol s[i]
    const s1 = value(str.charAt(i))

    // Getting value of symbol s[i+1]
    if (i + 1 < str.length) {
      const s2 = value(str.charAt(i + 1))

      // Comparing both values
      if (s1 >= s2) {
        // Value of current symbol
        // is greater or equalto
        // the next symbol
        res = res + s1
      } else {
        // Value of current symbol is
        // less than the next symbol
        res = res + s2 - s1
        i++
      }
    } else {
      res = res + s1
    }
  }
  return res
}

function sortByRomanNumeral(a: string, b: string) {
  const romanNumeralRegex =
    / M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/

  const aResult = a.match(romanNumeralRegex)
  const bResult = b.match(romanNumeralRegex)
  const romanNumeralA = aResult ? aResult[0].trim() : null
  const romanNumeralB = bResult ? bResult[0].trim() : null

  const newA = romanNumeralA ? romanToDecimal(romanNumeralA) : 0
  const newB = romanNumeralB ? romanToDecimal(romanNumeralB) : 0

  return newA < newB ? -1 : 1
}

function sumUpAllPlayerScores(playerScores: PlayerScore[]): PlayerScore {
  return playerScores.reduce<PlayerScore>(
    (summedUpScore, playerScore) => {
      return {
        ...summedUpScore,
        player: playerScore?.player ?? null,
        isSecondHalf: firstHalfCompleted,
        score:
          playerScore?.isSecondHalf || !summedUpScore?.score
            ? (playerScore?.score ?? null)
            : (summedUpScore?.score ?? null),
        gamesPlayed:
          (summedUpScore?.gamesPlayed ?? 0) + (playerScore?.gamesPlayed ?? 0),
        pk1Diff: [
          (summedUpScore?.pk1Diff?.[0] ?? 0) + (playerScore?.pk1Diff?.[0] ?? 0),
          (summedUpScore?.pk1Diff?.[1] ?? 0) + (playerScore?.pk1Diff?.[1] ?? 0),
        ],
        pk2Diff: [
          (summedUpScore?.pk2Diff?.[0] ?? 0) + (playerScore?.pk2Diff?.[0] ?? 0),
          (summedUpScore?.pk2Diff?.[1] ?? 0) + (playerScore?.pk2Diff?.[1] ?? 0),
        ],
        won: (summedUpScore?.won ?? 0) + (playerScore?.won ?? 0),
        lost: (summedUpScore?.lost ?? 0) + (playerScore?.lost ?? 0),
      }
    },
    {
      player: null,
      isSecondHalf: firstHalfCompleted,
      score: null,
      gamesPlayed: null,
      pk1Diff: null,
      pk2Diff: null,
      won: null,
      lost: null,
    },
  )
}

const ClubPage = ({ data }: PageProps<Queries.ClubPageQuery>) => {
  function handleFavClick() {
    if (favoriteClubs?.find(club => club.id === data.club?.id)) {
      setFavoriteClubs(prevState =>
        prevState.filter(club => club.id !== data.club?.id),
      )
      return
    }
    setFavoriteClubs(prevState => [
      ...new Set([
        ...prevState,
        { id: data.club?.id ?? '', name: data.club?.shortName ?? '' },
      ]),
    ])
  }

  const homeFixtures = [...data.homeFixtures.nodes]
  const guestFixtures = [...data.guestFixtures.nodes]
  const allFixtures = [...homeFixtures, ...guestFixtures].sort(
    (fixtureA, fixtureB) =>
      new Date(fixtureA?.date ?? '').getTime() -
      new Date(fixtureB.date ?? '').getTime(),
  )
  const fixtures = allFixtures.filter(
    ({ date }) => date && date >= new Date().toISOString().split('T')[0],
  )
  const results = allFixtures
    .filter(({ date }) => date && date < new Date().toISOString().split('T')[0])
    .reverse()

  const playerScores = data.allPlayer.nodes.reduce<NonNullable<PlayerScore>[]>(
    (playerScores, player) => {
      const score = player?.scores
        ? sumUpAllPlayerScores([...player.scores])
        : null
      return score ? [...playerScores, score] : playerScores
    },
    [],
  )

  playerScores.sort(
    (scoreA, scoreB) =>
      (scoreB ? (scoreB.score ?? 0) : 0) - (scoreA ? (scoreA.score ?? 0) : 0),
  )

  const groups = data.allTeam.group

  const [favoriteClubs, setFavoriteClubs] = useLocalStorage(
    'fav-clubs',
    [] as Array<{ id: string; name: string }>,
  )
  const [activeTab, setActiveTab] = useState<
    'teams' | 'results' | 'fixtures' | 'players'
  >('teams')

  return (
    <Layout>
      <Hero
        title={data.club?.name ?? ''}
        clubLogo={{ image: data?.logo?.image as ImageDataLike, size: 'large' }}
        isFav={favoriteClubs?.some(club => club.id === data.club?.id)}
        onFavClick={handleFavClick}
      ></Hero>
      <section className="section">
        <div className="container">
          <nav className="breadcrumb is-small" aria-label="breadcrumbs">
            <ul>
              <li>
                <Link to={`/clubs`}>Vereine</Link>
              </li>
              <li className="is-active">
                <Link to={`/clubs/${data.club?.id}`} aria-current="page">
                  {data.club?.shortName}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="tabs is-boxed">
            <ul>
              <li className={activeTab === 'teams' ? 'is-active' : ''}>
                <a className="title is-6" onClick={() => setActiveTab('teams')}>
                  Teams
                </a>
              </li>
              <li className={activeTab === 'results' ? 'is-active' : ''}>
                <a
                  className="title is-6"
                  onClick={() => setActiveTab('results')}
                >
                  Ergebnisse
                </a>
              </li>
              <li className={activeTab === 'fixtures' ? 'is-active' : ''}>
                <a
                  className="title is-6"
                  onClick={() => setActiveTab('fixtures')}
                >
                  Spielplan
                </a>
              </li>
              <li className={activeTab === 'players' ? 'is-active' : ''}>
                <a
                  className="title is-6"
                  onClick={() => setActiveTab('players')}
                >
                  Spieler
                </a>
              </li>
            </ul>
          </div>

          {activeTab === 'teams' ? (
            groups.map((group, index) => (
              <div className="block" key={group.fieldValue ?? index}>
                <h2 className="title is-5">{group.fieldValue}</h2>
                <ul>
                  {[...group.nodes]
                    .sort((teamA, teamB) =>
                      sortByRomanNumeral(
                        teamA.shortName ?? '',
                        teamB.shortName ?? '',
                      ),
                    )
                    .map(team => (
                      <li key={team.id} className="box p-0">
                        <Link
                          className="is-flex is-align-items-center px-4 py-3 title is-6 "
                          to={`/teams/${team.id}`}
                        >
                          <div>
                            {team.shortName} <br />
                            <span className="is-size-7 has-text-weight-normal">
                              {team.league?.name}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            ))
          ) : activeTab === 'results' ? (
            <FixtureList
              fixtures={results}
              groupByDate={true}
              showFilter={true}
              clubId={data.club?.id}
              noResultsText={'Es sind keine Ergebnisse verfügbar.'}
              itemsPerPage={3}
            ></FixtureList>
          ) : activeTab === 'fixtures' ? (
            <FixtureList
              fixtures={fixtures}
              groupByDate={true}
              showFilter={true}
              clubId={data.club?.id}
              noResultsText={'Es sind keine Spiele geplant.'}
              itemsPerPage={3}
            ></FixtureList>
          ) : (
            <PlayerTable playerScores={playerScores}></PlayerTable>
          )}
        </div>
      </section>
    </Layout>
  )
}

export const Head = ({ data }: HeadProps<Queries.ClubPageQuery>) => (
  <SEO title={data.club?.name ?? ''} />
)

export const query = graphql`
  query ClubPage($clubId: String!) {
    club(id: { eq: $clubId }) {
      id
      name
      shortName
    }
    allTeam(
      sort: [{ league: { name: ASC } }, { shortName: ASC }]
      filter: { club: { id: { eq: $clubId } } }
    ) {
      group(field: { league: { group: { name: SELECT } } }) {
        fieldValue
        nodes {
          id
          name
          shortName
          league {
            name
            group {
              name
            }
          }
        }
      }
    }
    allPlayer(
      filter: {
        scores: { elemMatch: { team: { club: { id: { eq: $clubId } } } } }
      }
    ) {
      nodes {
        scores {
          score
          isSecondHalf
          gamesPlayed
          pk1Diff
          pk2Diff
          won
          lost
          score
          player {
            id
            name
          }
        }
      }
    }
    homeFixtures: allFixture(
      sort: { date: ASC }
      filter: { homeTeam: { club: { id: { eq: $clubId } } } }
    ) {
      nodes {
        ...FixtureData
      }
    }
    guestFixtures: allFixture(
      sort: { date: ASC }
      filter: { guestTeam: { club: { id: { eq: $clubId } } } }
    ) {
      nodes {
        ...FixtureData
      }
    }
    logo: clubLogosJson(clubId: { eq: $clubId }) {
      image {
        childImageSharp {
          gatsbyImageData(
            height: 64
            width: 64
            transformOptions: { fit: CONTAIN }
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`

export default ClubPage
