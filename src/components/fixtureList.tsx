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
}: {
  fixtures: NonNullable<Queries.FixtureDataFragment[]>
  title: string
  noResultsText: string
  isPaginated?: boolean
  itemsPerPage?: number
}) => {
  const items = fixtures.map((fixture: Queries.FixtureDataFragment | null) => {
    return (
      fixture && (
        <div key={fixture.id} className="box">
          <Fixture
            id={fixture.id}
            homeTeam={fixture.homeTeam}
            guestTeam={fixture.guestTeam}
            date={fixture.date}
            result={fixture.result}
            link={fixture.link}
          ></Fixture>
        </div>
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
