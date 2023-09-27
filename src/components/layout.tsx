/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from 'react'
import Header from './header'
import Footer from './footer'

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer></Footer>
    </>
  )
}

export default Layout
