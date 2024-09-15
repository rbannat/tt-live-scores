import React, { useState } from 'react'
import Pagination from './pagination'
import usePagination from './usePagination'
import Fixture from './fixture'
import { FaAngleDown } from 'react-icons/fa'

const FixtureList = ({
  fixtures,
  title,
  noResultsText,
  isPaginated = true,
  itemsPerPage = 5,
  teamId,
  clubId,
  groupByDate = false,
  showFilter = false,
}: {
  fixtures: NonNullable<Queries.FixtureDataFragment[]>
  title?: string
  noResultsText: string
  isPaginated?: boolean
  itemsPerPage?: number
  teamId?: string
  clubId?: string
  groupByDate?: boolean
  showFilter?: boolean
}) => {
  const [matchesFilter, setMatchesFilter] = useState<'Alle' | 'Heim' | 'Gast'>(
    'Alle',
  )
  const [dropDownActive, setDropDownActive] = useState<boolean>(false)

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

  const dateKeyGetter = function ({ date }: Queries.FixtureDataFragment) {
    if (!date) return 'notSpecified'
    const dateObj = new Date(date)
    return `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`
  }

  const allDates = groupBy(fixtures, dateKeyGetter)
  const homeDates = groupBy(
    fixtures.filter(fixture => fixture.homeTeam?.club?.id === clubId),
    dateKeyGetter,
  )
  const guestDates = groupBy(
    fixtures.filter(fixture => fixture.guestTeam?.club?.id === clubId),
    dateKeyGetter,
  )

  function handleMatchFilterSelect(option: typeof matchesFilter) {
    setMatchesFilter(option)
    setDropDownActive(false)
  }

  function toggleDropDown() {
    setDropDownActive(!dropDownActive)
  }

  function getFixtureVariant({
    fixture,
    teamId,
    clubId,
  }: {
    fixture: Queries.FixtureDataFragment
    teamId?: string
    clubId?: string
  }) {
    // Early exits for missing teamId or clubId
    if (!teamId && !clubId) return

    const { homeTeam, guestTeam, result } = fixture

    // Validate fixture data
    if (
      !homeTeam?.id ||
      !guestTeam?.id ||
      !homeTeam.club?.id ||
      !guestTeam.club?.id ||
      !result ||
      result[0] === null ||
      result[1] === null
    ) {
      return undefined
    }

    const [homeResult, guestResult] = result

    // Check if teamId or clubId matches either home or guest team
    const isTeamInvolved =
      teamId && (homeTeam.id === teamId || guestTeam.id === teamId)
    const isClubInvolved =
      clubId && (homeTeam.club.id === clubId || guestTeam.club.id === clubId)

    if (teamId && !isTeamInvolved) return undefined
    if (clubId && !isClubInvolved) return undefined

    // Determine the match result variant
    if (homeResult === guestResult) return 'draw'

    const isHomeWin = homeResult > guestResult
    const isGuestWin = guestResult > homeResult

    const isTeamHome = homeTeam.id === teamId
    const isClubHome = homeTeam.club.id === clubId

    const isWin = teamId
      ? (isTeamHome && isHomeWin) || (!isTeamHome && isGuestWin)
      : (isClubHome && isHomeWin) || (!isClubHome && isGuestWin)

    return isWin ? 'win' : 'lose'
  }

  const renderFixture = (fixture: Queries.FixtureDataFragment | null) => {
    return (
      fixture && (
        <Fixture
          key={fixture.id}
          id={fixture.id}
          homeTeam={fixture.homeTeam}
          guestTeam={fixture.guestTeam}
          date={fixture.date}
          result={fixture.result}
          link={fixture.link}
          variant={getFixtureVariant({ fixture, clubId, teamId })}
          showDate={!groupByDate}
        ></Fixture>
      )
    )
  }

  const items = !groupByDate
    ? fixtures.map(renderFixture)
    : Object.entries<Queries.FixtureDataFragment[]>(
        matchesFilter === 'Heim'
          ? homeDates
          : matchesFilter === 'Gast'
            ? guestDates
            : allDates,
      ).map(([key, value]) => (
        <div key={key} className="block">
          <h2 className="title is-6">
            {new Date(key).toLocaleDateString('de-DE', {
              weekday: 'long',
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
            })}
          </h2>
          {value.map(renderFixture)}
        </div>
      ))

  const pagination = usePagination({
    items,
    itemsPerPage,
  })

  const filter = (
    <div className="block">
      <div className={`dropdown ${dropDownActive ? 'is-active' : ''}`}>
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
  )

  return (
    <section>
      <h2 className="title is-5">{title}</h2>

      {showFilter && filter}

      {items.length ? (
        <>
          {isPaginated ? (
            <>
              {pagination.currentItems()}
              <div className="panel-block">
                <div>
                  <Pagination {...pagination}></Pagination>
                </div>
              </div>
            </>
          ) : (
            items
          )}
        </>
      ) : (
        <div className="block">
          {noResultsText || `Es sind keine Ergebnisse verfügbar.`}
        </div>
      )}
    </section>
  )
}

export default FixtureList
