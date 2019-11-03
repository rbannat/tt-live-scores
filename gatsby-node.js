/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const axios = require("axios")
const path = require(`path`)
const { parseStringPromise } = require("xml2js")

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const { createNode } = actions
  const response = await axios({
    method: "get",
    url:
      "https://bettv.tischtennislive.de/Export/default.aspx?LigaID=12970&Format=XML&SportArt=96&Area=Tabelle",
    responseType: "text",
  })

  const data = await parseStringPromise(response.data)

  const nodeMeta = {
    id: createNodeId(`league`),
    parent: null,
    children: [],
    internal: {
      type: "League",
      mediaType: `text/html`,
      content: JSON.stringify(data),
      contentDigest: createContentDigest(data),
    },
  }

  const node = Object.assign({}, data, nodeMeta)
  createNode(node)

  return
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for teams to use in creating pages.
  const result = await graphql(
    `
      {
        league {
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
  result.data.league.Ergebnistabelle.Content[0].Mannschaft.forEach(({ Mannschaft }) => {
    const path = `/team/${Mannschaft}`
    createPage({
      path,
      component,
      context: {
        team: Mannschaft,
      },
    })
  })
}
