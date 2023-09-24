import React from 'react'
import Pagination from './pagination'
import usePagination from './usePagination'
import Fixture from './fixture'

const FixtureList = ({
  fixtures,
  title,
  noResultsText,
  itemsPerPage = 5,
}: {
  fixtures: NonNullable<Queries.FixtureDataFragment[]>
  title: string
  noResultsText: string
  itemsPerPage?: number
}) => {
  const items = fixtures.map((fixture: Queries.FixtureDataFragment | null) => {
    return (
      fixture && (
        <div key={fixture.id} className="panel-block">
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
    <article className="panel has-background-white">
      <h2 className="panel-heading">{title}</h2>
      {items.length ? (
        <>
          {pagination.currentItems()}
          <div className="panel-block">
            <div>
              <Pagination {...pagination}></Pagination>
            </div>
          </div>
        </>
      ) : (
        <div className="panel-block">
          {noResultsText || `Es sind keine Ergebnisse verfügbar.`}
        </div>
      )}
    </article>
  )
}

export default FixtureList
