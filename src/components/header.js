import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { subMenu, subMenuNavbarItem } from "./header.module.scss"
import Search from "./search"

const GroupNavLink = ({ group, isActive, handleClick }) => (
  <div className={`navbar-item has-dropdown is-active`}>
    <a className="navbar-link" onClick={handleClick}>
      {group.name}
    </a>
    <div className={`navbar-dropdown ${isActive ? "" : "is-hidden"}`}>
      <div className={subMenu}>
        {group.leagues.map(league => (
          <Link
            key={league.id}
            to={`/league/${league.id}`}
            className={`${subMenuNavbarItem} navbar-item`}
          >
            {league.shortName}
          </Link>
        ))}
      </div>
    </div>
  </div>
)

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
      allGroup {
        nodes {
          id
          name
          leagues {
            id
            name
            shortName
          }
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

          <Search className={"is-align-self-center ml-auto"}></Search>

          <a
            className={`ml-1 navbar-burger burger ${
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
            {data.allGroup.nodes.map(group => (
              <GroupNavLink
                key={group.id}
                group={group}
                isActive={activeSubmenu === group.name}
                handleClick={() =>
                  setActiveSubmenu(
                    activeSubmenu === group.name ? "" : group.name
                  )
                }
              />
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
