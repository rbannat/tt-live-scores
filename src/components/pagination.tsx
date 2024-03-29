import React from 'react'
import usePagination from './usePagination'

type PaginationProps = ReturnType<typeof usePagination>

const Pagination = ({
  next,
  prev,
  jump,
  currentPage,
  maxPage,
}: PaginationProps) => {
  const getRange = (start, end) => {
    return Array(end - start + 1)
      .fill()
      .map((v, i) => i + start)
  }

  const paginate = (currentPage: number, pageCount: number) => {
    let delta
    if (pageCount <= 7) {
      // delta === 7: [1 2 3 4 5 6 7]
      delta = 7
    } else {
      // delta === 2: [1 ... 4 5 6 ... 10]
      // delta === 4: [1 2 3 4 5 ... 10]
      delta = currentPage > 4 && currentPage < pageCount - 3 ? 2 : 4
    }

    const range = {
      start: Math.round(currentPage - delta / 2),
      end: Math.round(currentPage + delta / 2),
    }

    if (range.start - 1 === 1 || range.end + 1 === pageCount) {
      range.start += 1
      range.end += 1
    }

    let pages =
      currentPage > delta
        ? getRange(
            Math.min(range.start, pageCount - delta),
            Math.min(range.end, pageCount),
          )
        : getRange(1, Math.min(pageCount, delta + 1))

    const withDots = (value: number, pair: (string | number)[]) =>
      pages.length + 1 !== pageCount ? pair : [value]

    if (pages[0] !== 1) {
      pages = withDots(1, [1, '...']).concat(pages)
    }

    if (pages[pages.length - 1] < pageCount) {
      pages = pages.concat(withDots(pageCount, ['...', pageCount]))
    }

    return pages
  }
  return (
    <nav
      className="pagination is-small"
      role="navigation"
      aria-label="pagination"
    >
      <a
        className={`pagination-previous ${
          currentPage === 1 ? 'is-disabled' : ''
        }`}
        onClick={() => prev()}
      >
        Vorherige
      </a>
      <a
        className={`pagination-next ${
          maxPage === currentPage ? 'is-disabled' : ''
        }`}
        onClick={() => next()}
      >
        Nächste Seite
      </a>
      <ul className="pagination-list">
        {paginate(currentPage, maxPage).map((page, index) =>
          page === '...' ? (
            <li key={`${page}${index}`}>
              <span className="pagination-ellipsis">&hellip;</span>
            </li>
          ) : (
            <li key={page}>
              <a
                className={`pagination-link ${
                  currentPage === page ? 'is-current' : ''
                }`}
                aria-label={`Gehe zu Seite ${page}`}
                onClick={() => jump(page)}
              >
                {page}
              </a>
            </li>
          ),
        )}
      </ul>
    </nav>
  )
}

export default Pagination
