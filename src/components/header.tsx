import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Search from "./search"
import { navbarBurger } from "./header.module.scss"

const Header = () => {
  const [isActive, setIsActive] = useState(false)
  const data = useStaticQuery(graphql`
    query Site {
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
          <Link
            to="/"
            className="navbar-item is-size-5-mobile is-size-4-tablet"
          >
            {data.site.siteMetadata.title}
          </Link>

          <Search className={"is-align-self-center ml-auto"}></Search>

          <a
            role="button"
            className={`${navbarBurger} ml-1 navbar-burger burger ${
              isActive ? "is-active" : ""
            }`}
            onClick={() => setIsActive(!isActive)}
            aria-label="menu"
            aria-expanded={isActive ? "true" : "false"}
            data-target="mainMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div
          id="mainMenu"
          className={isActive ? "navbar-menu is-active" : "navbar-menu"}
        >
          <div className="navbar-start">
            <Link to="/" className="navbar-item">
              Übersicht
            </Link>
            <Link to="/clubs" className="navbar-item">
              Vereine
            </Link>
            <Link to="/leagues" className="navbar-item">
              Ligen
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
