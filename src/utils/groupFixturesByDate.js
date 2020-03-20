export default function groupFixturesByDate(fixturesByDate, { node: fixture }) {
  const date = fixture.date.split("T")[0]
  if (!fixturesByDate[date]) {
    fixturesByDate[date] = []
  }
  fixturesByDate[date].push({
    date: fixture.date,
    homeTeamName: fixture.homeTeam.shortName,
    homeTeamId: fixture.homeTeam.id,
    guestTeamId: fixture.guestTeam.id,
    guestTeamName: fixture.guestTeam.shortName,
    result: fixture.result,
    link: fixture.link,
  })
  return fixturesByDate
}
