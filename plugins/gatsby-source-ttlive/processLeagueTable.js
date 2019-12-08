const { createContentDigest } = require(`gatsby-core-utils`)

exports.processLeagueTable = ({ leagueTable, createNodeId }) => {
  const nodeId = createNodeId(`leagueTable`)
  const nodeContent = JSON.stringify(leagueTable)
  const nodeData = Object.assign({}, leagueTable, {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: `LeagueTable`,
      content: nodeContent,
      contentDigest: createContentDigest(leagueTable),
    },
  })
  return nodeData
}
