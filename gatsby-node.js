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
        leagueTable {
          Ergebnistabelle {
            Liga
            Ligalink
            Verband
            Zeit
            Content {
              Mannschaft {
                Mannschaft
                Platz
                Niederlagen
                PunkteDif
                PunkteMinus
                PunktePlus
                SaetzeDif
                Siege
                Spiele
                SpieleDif
                SpieleMinus
                SpielePlus
                Unentschieden
              }
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
  result.data.leagueTable.Ergebnistabelle.Content[0].Mannschaft.forEach(
    ({ Mannschaft }) => {
      const path = `/team/${Mannschaft}`
      createPage({
        path,
        component,
        context: {
          team: Mannschaft,
        },
      })
    }
  )
}
