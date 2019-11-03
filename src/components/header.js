import PropTypes from "prop-types"
import React, { useState }from "react"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => {
  const [isActive, setIsActive] = useState(
    false
  );
  
  return (
  <header
  >
     <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item is-size-4">
            {siteTitle}
          </Link>

          <a role="button" className={isActive ? 'navbar-burger burger is-active' : 'navbar-burger burger'}
      onClick={ () => setIsActive(!isActive) } aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className={isActive ? 'navbar-menu is-active' : 'navbar-menu'}>
    <div className="navbar-start">
      <Link to="/" className="navbar-item">
        Tabelle
      </Link>

      <a className="navbar-item">
        Spielplan
      </a>
    </div>
  </div>
</nav>
  </header>
)}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
