import React from "react"
import { graphql } from "gatsby"
import Layout from "./layout"
import SEO from "./seo"

const TeamPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Team" />
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{data.team.name}</h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query TeamPageQuery($teamId: String!) {
    team(id: { eq: $teamId }) {
      name
    }
  }
`

export default TeamPage
