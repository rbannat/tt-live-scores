const path = require(`path`)

// Create type defs for when there is no date to infer the type from
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    type Fixture implements Node {
      id: ID!
      date: Date @dateformat
      result: [String]
      guestTeam: Team
      homeTeam: Team
      link: String
    }

    type Team implements Node {
      fixtures: [Fixture]
    }

    type PlayerScore implements Node {
      won: Int
      lost: Int
      gamesPlayed: Int
    }
  `
  createTypes(typeDefs)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for teams and leagues to create pages
  const result = await graphql(
    `
      {
        allTeam {
          nodes {
            id
          }
        }

        allLeague {
          nodes {
            id
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
  const component = path.resolve(`src/templates/teamPage.js`)
  result.data.allTeam.nodes.forEach(team => {
    createPage({
      path: `/team/${team.id}`,
      component,
      context: {
        teamId: team.id,
      },
    })
  })

  // Create pages for each league
  result.data.allLeague.nodes.forEach(league => {
    createPage({
      path: `/league/${league.id}`,
      component: path.resolve(`src/templates/leaguePage.js`),
      context: {
        leagueId: league.id,
      },
    })
  })
}
