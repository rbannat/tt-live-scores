import path from 'path'
import { GatsbyNode } from 'gatsby'

export const createPages: GatsbyNode['createPages'] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions

  // Query for teams, leagues, ... to create pages
  const { data, errors } = await graphql(`
    query Pages {
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

      allGroup {
        nodes {
          id
        }
      }

      allPlayer {
        nodes {
          id
        }
      }
    }
  `)

  // Handle errors
  if (errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create pages for each team
  const component = path.resolve(`src/templates/teamPage.tsx`)
  data.allTeam.nodes.forEach(team => {
    createPage({
      path: `/teams/${team.id}`,
      component,
      context: {
        teamId: team.id,
      },
    })
  })

  // Create pages for each club
  data.allClub.nodes.forEach(club => {
    createPage({
      path: `/clubs/${club.id}`,
      component: path.resolve(`src/templates/clubPage.tsx`),
      context: {
        clubId: club.id,
      },
    })
  })

  // Create pages for each league
  data.allGroup.nodes.forEach(group => {
    createPage({
      path: `/groups/${group.id}`,
      component: path.resolve(`src/templates/groupPage.tsx`),
      context: {
        groupId: group.id,
      },
    })
  })

  // Create pages for each league
  data.allLeague.nodes.forEach(league => {
    createPage({
      path: `/leagues/${league.id}`,
      component: path.resolve(`src/templates/leaguePage.tsx`),
      context: {
        leagueId: league.id,
      },
    })
  })

  // Create pages for each player
  data.allPlayer.nodes.forEach(player => {
    createPage({
      path: `/players/${player.id}`,
      component: path.resolve(`src/templates/playerPage.tsx`),
      context: {
        playerId: player.id,
      },
    })
  })
}
