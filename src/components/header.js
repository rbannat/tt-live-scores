import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle, siteSubtitle }) => (
  <header
   class="hero is-primary"
  >
    <div class="hero-body">
      <div className="container">
      <h1 class="title">
          {siteTitle}
      </h1>
      <h2 class="subtitle">{siteSubtitle}</h2>
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
