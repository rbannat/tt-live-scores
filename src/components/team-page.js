import React from "react"

import Layout from "./layout"
import SEO from "./seo"

const TeamPage = ({ pageContext: { team } }) => {
  return (
    <Layout>
      <SEO title="Team" />
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{team}</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default TeamPage
