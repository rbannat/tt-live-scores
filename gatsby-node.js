const path = require(`path`)

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

        allClub {
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

  // Create pages for each club
  result.data.allClub.nodes.forEach(club => {
    createPage({
      path: `/club/${club.id}`,
      component: path.resolve(`src/templates/clubPage.js`),
      context: {
        clubId: club.id,
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
