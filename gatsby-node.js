/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const axios = require("axios")
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
