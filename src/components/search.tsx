import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { useFlexSearch } from "react-use-flexsearch"
import { Formik, Form, Field } from "formik"
import { FaSearch } from "react-icons/fa"

type SearchProps = {
  className: string
}
const Search = ({ className }: SearchProps) => {
  const [query, setQuery] = useState<string | null>(null)
  const data: Queries.SearchQuery = useStaticQuery(graphql`
    query Search {
      localSearchPages {
        index
        store
      }
    }
  `)
  const index = data.localSearchPages?.index
  const store = data.localSearchPages?.store
  const results = useFlexSearch(query, index, store, { limit: 10 })

  return (
    <div className={className}>
      <Formik
        initialValues={{ query: "" }}
        onSubmit={(values, { setSubmitting }) => {
          setQuery(values.query)
          setSubmitting(false)
        }}
      >
        <Form
          onChange={e => {
            setQuery(e.target.value)
          }}
        >
          <div
            className={`dropdown is-right ${
              results.length > 0 ? "is-active" : ""
            }`}
          >
            <div className="dropdown-trigger">
              <div className="control has-icons-left">
                <Field
                  type="search"
                  name="query"
                  placeholder="Search"
                  className="input is-small is-rounded"
                />
                <span className="icon is-small is-left">
                  <FaSearch></FaSearch>
                </span>
              </div>
            </div>
            <div className="dropdown-menu" role="menu">
              {results.length > 0 && (
                <div className="dropdown-content">
                  {results.map(result => (
                    <Link
                      className="dropdown-item"
                      key={result.id}
                      to={`/${result.nodeType}/${result.id}`}
                    >
                      {result.name}
                    </Link>
                    // <a href="#" className="dropdown-item" key={result.id}>
                    //   {result.name}
                    // </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  )
}
export default Search
