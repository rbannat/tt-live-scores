import { useState } from "react"

function usePagination({ items, itemsPerPage }) {
  const [currentPage, setCurrentPage] = useState(1)
  const maxPage = Math.ceil(items.length / itemsPerPage)
  function currentItems() {
    const begin = (currentPage - 1) * itemsPerPage
    const end = begin + itemsPerPage
    return items.slice(begin, end)
  }

  function next() {
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage))
  }

  function prev() {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1))
  }

  function jump(page) {
    const pageNumber = Math.max(1, page)
    setCurrentPage(Math.min(pageNumber, maxPage))
  }

  return { next, prev, jump, currentItems, currentPage, maxPage }
}

export default usePagination
