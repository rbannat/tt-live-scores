const { createContentDigest } = require(`gatsby-core-utils`)

exports.processTeamReport = ({ teamReport, createNodeId }) => {
  const nodeId = createNodeId(`teamReport`)
  const nodeContent = JSON.stringify(teamReport)
  const nodeData = Object.assign({}, teamReport, {
    id: nodeId,
    parent: null,
    children: [],
    internal: {
      type: `TeamReport`,
      content: nodeContent,
      contentDigest: createContentDigest(teamReport),
    },
  })
  return nodeData
}
