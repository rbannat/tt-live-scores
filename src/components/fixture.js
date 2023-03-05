import React from "react"
import { container, team, resultContainer } from "./fixture.module.scss"
import { FaExternalLinkAlt } from "react-icons/fa"
import { graphql, Link } from "gatsby"

const Fixture = ({ guestTeam, homeTeam, result, date: dateString, link }) => {
  const date = new Date(dateString)
  const day = date.toLocaleDateString("de-DE", {
    weekday: "short",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })
  const time = date.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <div className={container}>
      <div className={`${team} has-text-centered`}>
        <Link to={`/teams/${homeTeam.id}`}>
          <span className={`is-size-6`}>{homeTeam.shortName}</span>
        </Link>
      </div>
      <div className={`${resultContainer} has-text-centered`}>
        <div>
          <div className={`is-size-7`}>{day}</div>
          <div className={`is-size-4 has-text-weight-bold`}>
            {result ? `${result[0]} - ${result[1]}` : time}
          </div>
          <a
            className="is-size-7"
            href={link}
            target="__blank"
            title="Zur TT-Live Seite"
          >
            Zu TT-Live <FaExternalLinkAlt aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className={`${team} has-text-centered`}>
        <Link to={`/teams/${guestTeam.id}`}>
          <span className={`is-size-6`}>{guestTeam.shortName}</span>
        </Link>
      </div>
    </div>
  )
}

export const fixtureDataFragment = graphql`
  fragment FixtureData on Fixture {
    id
    date
    result
    guestTeam {
      ... on Team {
        id
        name
        shortName
      }
    }
    homeTeam {
      ... on Team {
        id
        name
        shortName
      }
    }
    link
  }
`

export default Fixture
