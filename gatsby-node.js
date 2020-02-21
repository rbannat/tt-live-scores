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

  // Query for teams and leagues to create pages
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

        allLeague {
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

  // Create pages for each team
  const component = path.resolve(`src/templates/team.js`)
  result.data.allTeam.edges.forEach(({ node: team }) => {
    createPage({
      path: `/team/${team.id}`,
      component,
      context: {
        teamId: team.id,
      },
    })
  })

  // Create pages for each league
  result.data.allLeague.edges.forEach(({ node: league }) => {
    createPage({
      path: `/league/${league.id}`,
      component: path.resolve(`src/templates/league.js`),
      context: {
        leagueId: league.id,
      },
    })
  })
}
