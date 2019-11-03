import React from "react"

import Layout from "./layout"
import SEO from "./seo"

const TeamPage = ({pageContext: {team}}) => {
  return (
    <Layout>
      <SEO title="Team" />
      <h1 className="title is-1">{team}</h1>
    </Layout>
  )
}

export default TeamPage
