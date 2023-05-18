import React, { useState } from "react"
import { HeadProps, Link, PageProps, graphql } from "gatsby"
import Layout from "../components/layout"
import { SEO } from "../components/seo"
import FixtureList from "../components/fixtureList"
import Hero from "../components/hero"
import PlayerTable from "../components/playerTable"
import { useLocalStorage } from "../hooks/use-local-storage"

const TeamPage = ({ data }: PageProps<Queries.TeamPageQuery>) => {
  function handleFavClick() {
    if (favoriteTeams?.find(team => team.id === data.team.id)) {
      setFavoriteTeams(prevState =>
        prevState.filter(team => team.id !== data.team.id)
      )
      return
    }
    setFavoriteTeams(prevState => [
      ...new Set([
        ...prevState,
        { id: data.team.id, name: data.team.shortName },
      ]),
    ])
  }
  const [favoriteTeams, setFavoriteTeams] = useLocalStorage("fav-teams", [])

  const firstHalfCompleted = true
  const [activeTab, setActiveTab] = useState(
    firstHalfCompleted ? "secondHalf" : "firstHalf"
  )
  const fixtures = data.team.fixtures
    ? data.team.fixtures.reduce((fixtures, fixture) => {
        return !fixture.result &&
          fixture.date >= new Date().toISOString().split("T")[0]
          ? [...fixtures, fixture]
          : fixtures
      }, [])
    : []
  const latestResults = data.team.fixtures
    ? data.team.fixtures
        .reduce((fixtures, fixture) => {
          return fixture.result &&
            fixture.date < new Date().toISOString().split("T")[0]
            ? [...fixtures, fixture]
            : fixtures
        }, [])
        .reverse()
    : []
  const players = sortPlayersByPosition(
    data && data.team
      ? activeTab === "firstHalf"
        ? data.playersFirstHalf.nodes
        : data.playersSecondHalf.nodes
      : []
  )
  const subtitle = (
    <>
      <Link to={`/leagues/${data.team.league.id}`}>
        {data.team.league.name}
      </Link>
      <br />
      <Link className="is-size-6" to={`/clubs/${data.team.club.id}`}>
        {data.team.club.shortName}
      </Link>
    </>
  )

  return (
    <Layout>
      <Hero
        title={data.team.shortName}
        subtitle={subtitle}
        showLastUpdated={true}
        isFav={favoriteTeams?.find(team => team.id === data.team.id)}
        onFavClick={handleFavClick}
      ></Hero>
      <section className="section">
        <div className="container">
          <article className="panel has-background-white">
            <h2 className="panel-heading">Spieler</h2>
            <div className="panel-tabs">
              <a
                className={activeTab === "firstHalf" ? "is-active" : ""}
                onClick={() => setActiveTab("firstHalf")}
              >
                Hinrunde
              </a>
              {firstHalfCompleted && (
                <a
                  className={activeTab === "secondHalf" ? "is-active" : ""}
                  onClick={() => setActiveTab("secondHalf")}
                >
                  Rückrunde
                </a>
              )}
            </div>
            <div className="panel-block">
              <PlayerTable players={players}></PlayerTable>
            </div>
          </article>
          <div className="columns">
            <div className="column">
              <FixtureList
                fixtures={latestResults}
                title={"Neueste Ergebnisse"}
                noResultsText={"Es sind keine Ergebnisse verfügbar."}
              ></FixtureList>
            </div>
            <div className="column">
              <FixtureList
                fixtures={fixtures}
                title={"Nächste Spiele"}
                noResultsText={"Es sind keine kommenden Spiele verfügbar."}
              ></FixtureList>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

function sortPlayersByPosition(players) {
  const substitutes = []
  players = players.reduce((players, player) => {
    if (player.position.length > 1) {
      substitutes.push(player)
      return players
    }
    return [...players, player]
  }, [])
  return [...players, ...substitutes]
}

export const Head = ({ data }: HeadProps<Queries.TeamPageQuery>) => (
  <SEO title={data.team?.name ?? ""} />
)

export const query = graphql`
  query TeamPage($teamId: String!) {
    team(id: { eq: $teamId }) {
      id
      league {
        id
        name
        shortName
      }
      name
      shortName
      club {
        id
        shortName
      }
      fixtures {
        ...FixtureData
      }
    }
    playersFirstHalf: allPlayerScore(
      filter: { team: { id: { eq: $teamId } }, isSecondHalf: { eq: false } }
      sort: { position: ASC }
    ) {
      nodes {
        position
        score
        won
        lost
        gamesPlayed
        player {
          id
          name
        }
      }
    }
    playersSecondHalf: allPlayerScore(
      filter: { team: { id: { eq: $teamId } }, isSecondHalf: { eq: true } }
      sort: { position: ASC }
    ) {
      nodes {
        position
        score
        won
        lost
        gamesPlayed
        player {
          id
          name
        }
      }
    }
  }
`

export default TeamPage
