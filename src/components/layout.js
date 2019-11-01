/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.scss"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      league {
          Ergebnistabelle {
            Liga
            Ligalink
          }
        }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} siteSubtitle={data.league.Ergebnistabelle.Liga} />
      <section class="section">
        <div className="container">
          <main>{children}</main>
        </div>
      </section>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
