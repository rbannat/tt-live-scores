import React from "react"
import Pagination from "./pagination"
import usePagination from "./usePagination"
import Fixture from "./fixture"

const FixtureList = ({ fixtures, title, noResultsText }) => {
  const items = fixtures.map(
    ({ id, homeTeam, guestTeam, result, date, link }) => {
      return (
        <div key={id} className="panel-block">
          <Fixture
            homeTeam={homeTeam}
            guestTeam={guestTeam}
            date={date}
            result={result}
            link={link}
          ></Fixture>
        </div>
      )
    }
  )
  const pagination = usePagination({
    items,
    itemsPerPage: 5,
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
