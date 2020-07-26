import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import headerStyles from "./header.module.scss"

const Header = () => {
  const [isActive, setIsActive] = useState(false)
  const [activeSubmenu, setActiveSubmenu] = useState("")
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      allLeague {
        nodes {
          id
          name
          shortName
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

          <a
            className={
              isActive
                ? "navbar-burger burger is-active"
                : "navbar-burger burger"
            }
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
            <div className={`navbar-item has-dropdown is-active`}>
              <a
                className="navbar-link"
                onClick={() =>
                  setActiveSubmenu(activeSubmenu === "men" ? "" : "men")
                }
              >
                Herren
              </a>
              <div
                className={`navbar-dropdown ${
                  activeSubmenu === "men" ? "" : "is-hidden"
                }`}
              >
                <div className={headerStyles.subMenuTwoColumns}>
                  {data.allLeague.nodes.map(league => (
                    <Link
                      key={league.id}
                      to={`/league/${league.id}`}
                      className={`${headerStyles.subMenuNavbarItem} navbar-item`}
                    >
                      {league.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
