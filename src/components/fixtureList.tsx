import React from 'react'
import Pagination from './pagination'
import usePagination from './usePagination'
import Fixture from './fixture'

const FixtureList = ({
  fixtures,
  title,
  noResultsText,
  isPaginated = true,
  itemsPerPage = 5,
  teamId,
}: {
  fixtures: NonNullable<Queries.FixtureDataFragment[]>
  title: string
  noResultsText: string
  isPaginated?: boolean
  itemsPerPage?: number
  teamId?: string
}) => {
  const items = fixtures.map((fixture: Queries.FixtureDataFragment | null) => {
    const hasResult =
      !!fixture?.result &&
      fixture.result[0] !== null &&
      fixture.result[1] !== null
    const hasTeam =
      teamId &&
      (fixture?.homeTeam?.id === teamId || fixture?.guestTeam?.id === teamId)
    const variant =
      hasTeam && hasResult
        ? (fixture?.homeTeam?.id === teamId &&
            fixture.result[0] !== null &&
            fixture.result[1] !== null &&
            fixture.result[0] > fixture.result[1]) ||
          (fixture?.guestTeam?.id === teamId &&
            fixture.result[0] !== null &&
            fixture.result[1] !== null &&
            fixture.result[1] > fixture.result[0])
          ? 'win'
          : 'lose'
        : undefined

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
          variant={variant}
        ></Fixture>
      )
    )
  })
  const pagination = usePagination({
    items,
    itemsPerPage,
  })
  return (
    <section>
      <h2 className="title is-4">{title}</h2>
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
