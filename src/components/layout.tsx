/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from 'react'
import Header from './header'
import Footer from './footer'
import { useLocalStorage } from 'usehooks-ts'
import { currentSeason } from '../utils/constants'
import { main, pageWrapper } from './layout.module.scss'

const Layout = ({ children }: React.PropsWithChildren) => {
  const [, setFavoriteClubs] = useLocalStorage(
    'fav-clubs',
    [] as Array<{ id: string; name: string }>,
  )
  const [, setFavoriteTeams] = useLocalStorage(
    'fav-teams',
    [] as Array<{ id: string; name: string }>,
  )

  const [season, setSeason] = useLocalStorage('season', '')

  useEffect(() => {
    // reset favorite teams and leagues for new season as id's will change
    if (!season || season !== currentSeason) {
      setFavoriteClubs([])
      setFavoriteTeams([])
      setSeason(currentSeason)
    }
  }, [])

  return (
    <div className={pageWrapper}>
      <Header />
      <main className={`${main}`}>{children}</main>
      <Footer></Footer>
    </div>
  )
}

export default Layout
