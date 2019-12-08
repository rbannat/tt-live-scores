import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const Header = () => {
  const [isActive, setIsActive] = useState(false)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
  return (
    <header>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item is-size-4">
            {data.site.siteMetadata.title}
          </Link>

          <div
            role="button"
            className={
              isActive
                ? "navbar-burger burger is-active"
                : "navbar-burger burger"
            }
            onClick={() => setIsActive(!isActive)}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </div>
        </div>

        <div
          id="navbarBasicExample"
          className={isActive ? "navbar-menu is-active" : "navbar-menu"}
        >
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Übersicht
            </Link>
            <Link to="/table" className="navbar-item">
              Tabelle
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
