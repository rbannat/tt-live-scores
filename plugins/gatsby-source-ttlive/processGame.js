const { createContentDigest } = require(`gatsby-core-utils`)

exports.processGame = ({ id, game, createNodeId }) => {
  const nodeId = createNodeId(id)
  const nodeContent = JSON.stringify(game)
  const nodeData = Object.assign({}, game, {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: `Game`,
      content: nodeContent,
      contentDigest: createContentDigest(game),
    },
  })
  return nodeData
}
