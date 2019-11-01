import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, siteSubtitle }) => (
  <header
   className="hero is-primary"
  >
    <div className="hero-body">
      <div className="container">
      <h1 className="title">
          {siteTitle}
      </h1>
      <h2 className="subtitle">{siteSubtitle}</h2>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
