const fetch = require("node-fetch")
const { parseStringPromise } = require("xml2js")
const { processLeagueTable } = require("./processLeagueTable")
const { processAssociation } = require("./processAssociation")
const { processTeamReport } = require("./processTeamReport")

exports.sourceNodes = async ({ actions, createNodeId }, configOptions) => {
  const { createNode } = actions
  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins
  const { leagueId, homeTeamId } = configOptions

  const teamReportUrl = `https://bettv.tischtennislive.de/Export/default.aspx?TeamID=${homeTeamId}&WettID=${leagueId}&Format=XML&SportArt=96&Area=TeamReport`
  const teamReportResponse = await fetch(teamReportUrl)
  const teamReport = await parseStringPromise(await teamReportResponse.text())

  const leagueTableUrl = `https://bettv.tischtennislive.de/Export/default.aspx?LigaID=${leagueId}&Format=XML&SportArt=96&Area=Tabelle`
  const leagueTableResponse = await fetch(leagueTableUrl)
  const leagueTable = await parseStringPromise(await leagueTableResponse.text())

  const associationsUrl = "https://app.web4sport.de/ajax/Verband.ashx"
  const associationsResponse = await fetch(associationsUrl)
  const {
    data: { verband: associations },
  } = await parseStringPromise(await associationsResponse.text())

  associations.forEach(association => {
    createNode(processAssociation({ association, createNodeId }))
  })
  createNode(processLeagueTable({ leagueTable, createNodeId }))
  createNode(processTeamReport({ teamReport, createNodeId }))
  return
}
