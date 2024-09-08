import { graphql, HeadProps, Link, PageProps } from 'gatsby'
import React, { useState } from 'react'
import Hero from '../components/hero'
import Layout from '../components/layout'
import { SEO } from '../components/seo'
import { useLocalStorage } from 'usehooks-ts'
import { ImageDataLike } from 'gatsby-plugin-image'
import { FaAngleDown } from 'react-icons/fa'
import FixtureList from '../components/fixtureList'
import { firstHalfCompleted } from '../utils/constants'
import { tableContainer } from '../components/leagueTable.module.scss'

type PlayerTableProps = {
  players:
    | Queries.TeamPageQuery['playersFirstHalf']['nodes']
    | Queries.TeamPageQuery['playersSecondHalf']['nodes']
}
const PlayerTable = ({ players }: PlayerTableProps) => (
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
          {players.map(
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
                    {pk1Diff?.join(':')}
                  </td>
                  <td className="is-vcentered has-text-centered">
                    {pk2Diff?.join(':')}
                  </td>
                  <td className="is-vcentered has-text-centered">
                    {(won || lost) && [won, lost].join(':')}
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

  function handleMatchFilterSelect(option: typeof matchesFilter) {
    setMatchesFilter(option)
    setDropDownActive(false)
  }

  function toggleDropDown() {
    setDropDownActive(!dropDownActive)
  }

  const homeFixtures = [...data.homeFixtures.nodes]
  const guestFixtures = [...data.guestFixtures.nodes]
  const allFixtures = [...homeFixtures, ...guestFixtures].sort(
    (fixtureA, fixtureB) =>
      new Date(fixtureA?.date ?? '').getTime() -
      new Date(fixtureB.date ?? '').getTime(),
  )
  const groupBy = (array: any[], keyGetter: (item: any) => string) => {
    return array.reduce(
      (result, currentItem) => {
        const key = keyGetter(currentItem)
        if (!result[key]) {
          result[key] = []
        }
        result[key].push(currentItem)
        return result
      },
      {} as Record<string, any[]>,
    )
  }
  const allDates = groupBy(allFixtures, ({ date }) => date ?? 'notSpecified')
  const homeDates = groupBy(homeFixtures, ({ date }) => date ?? 'notSpecified')
  const guestDates = groupBy(
    guestFixtures,
    ({ date }) => date ?? 'notSpecified',
  )

  const playerScores = data.allPlayer.nodes.reduce((playerScores, player) => {
    return [
      ...playerScores,
      player.scores?.find(score => score?.isSecondHalf === firstHalfCompleted),
    ]
  }, [])

  playerScores.sort((scoreA, scoreB) => scoreB.score - scoreA.score)

  const groups = data.allTeam.group

  const [favoriteClubs, setFavoriteClubs] = useLocalStorage(
    'fav-clubs',
    [] as Array<{ id: string; name: string }>,
  )
  const [activeTab, setActiveTab] = useState<'teams' | 'matches' | 'players'>(
    'teams',
  )
  const [matchesFilter, setMatchesFilter] = useState<'Alle' | 'Heim' | 'Gast'>(
    'Alle',
  )
  const [dropDownActive, setDropDownActive] = useState<boolean>(false)
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
              <li className={activeTab === 'matches' ? 'is-active' : ''}>
                <a
                  className="title is-6"
                  onClick={() => setActiveTab('matches')}
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
            groups.map(group => (
              <div className="block" key={group.fieldValue}>
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
          ) : activeTab === 'matches' ? (
            <>
              <div className="block">
                <div
                  className={`dropdown ${dropDownActive ? 'is-active' : ''}`}
                >
                  <div className="dropdown-trigger">
                    <button
                      className="button"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                      onClick={toggleDropDown}
                    >
                      <span>{matchesFilter}</span>
                      <span className="icon">
                        <FaAngleDown aria-hidden="true" />
                      </span>
                    </button>
                  </div>

                  <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                      <a
                        href="#"
                        className={`dropdown-item ${matchesFilter === 'Alle' ? 'is-active' : ''}`}
                        onClick={() => handleMatchFilterSelect('Alle')}
                      >
                        Alle
                      </a>
                      <a
                        className={`dropdown-item ${matchesFilter === 'Heim' ? 'is-active' : ''}`}
                        onClick={() => handleMatchFilterSelect('Heim')}
                      >
                        Heim
                      </a>
                      <a
                        href="#"
                        className={`dropdown-item ${matchesFilter === 'Gast' ? 'is-active' : ''}`}
                        onClick={() => handleMatchFilterSelect('Gast')}
                      >
                        Gast
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {Object.entries(
                matchesFilter === 'Heim'
                  ? homeDates
                  : matchesFilter === 'Gast'
                    ? guestDates
                    : allDates,
              ).map(([key, value]) => (
                <div className="block">
                  <h2 className="title is-6">
                    {new Date(key).toLocaleDateString('de-DE', {
                      weekday: 'long',
                      year: '2-digit',
                      month: '2-digit',
                      day: '2-digit',
                    })}
                  </h2>
                  <FixtureList
                    fixtures={value}
                    isPaginated={false}
                    showDate={false}
                    noResultsText={'Es sind keine Spiele geplant.'}
                  ></FixtureList>
                </div>
              ))}
            </>
          ) : (
            <PlayerTable players={playerScores}></PlayerTable>
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
    allFixture(
      sort: { date: ASC }
      filter: { homeTeam: { club: { id: { eq: $clubId } } } }
    ) {
      nodes {
        ...FixtureData
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
            backgroundColor: "white"
            placeholder: BLURRED
            formats: [AUTO, WEBP, AVIF]
          )
        }
      }
    }
  }
`

export default ClubPage
