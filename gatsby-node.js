/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for teams to use in creating pages.
  const result = await graphql(
    `
      {
        allTeam {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create pages for each team.
  const component = path.resolve(`src/components/team-page.js`)
  result.data.allTeam.edges.forEach(({ node: team }) => {
    const path = `/team/${team.id}`
    createPage({
      path,
      component,
      context: {
        teamId: team.id,
      },
    })
  })
}
