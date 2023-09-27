import React from 'react'
import {
  container,
  team,
  dateContainer,
  teamsContainer,
  lose,
  win,
  draw,
} from './fixture.module.scss'
import { FaExternalLinkAlt } from 'react-icons/fa'
import { graphql, Link } from 'gatsby'

type FixtureProps = Queries.FixtureDataFragment & {
  variant?: 'win' | 'lose' | 'draw'
}

const Fixture = ({
  guestTeam,
  homeTeam,
  result,
  date: dateString,
  link,
  variant,
}: FixtureProps) => {
  const date = new Date(dateString)
  const day = date.toLocaleDateString('de-DE', {
    weekday: 'short',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
  })
  const time = date.toLocaleTimeString('de-DE', {
    hour: '2-digit',
    minute: '2-digit',
  })

  const isHomeTeamWinner =
    result && result[0] !== null && result[1] !== null && result[0] > result[1]

  return (
    <div
      className={`box ${container} ${
        variant === 'win'
          ? win
          : variant === 'lose'
          ? lose
          : variant === 'draw'
          ? draw
          : ''
      }`}
    >
      <div className={`${teamsContainer}`}>
        <div
          className={`${team} mb-2 ${
            result && isHomeTeamWinner ? 'has-text-weight-bold' : ''
          }`}
        >
          {homeTeam?.id && (
            <Link to={`/teams/${homeTeam.id}`}>
              <span className={`is-size-6`}>{homeTeam.shortName}</span>
            </Link>
          )}
          <span>{result && `${result[0]}`}</span>
        </div>
        <div
          className={`${team} ${
            result && !isHomeTeamWinner ? 'has-text-weight-bold' : ''
          }`}
        >
          {guestTeam?.id && (
            <Link to={`/teams/${guestTeam.id}`}>
              <span className={`is-size-6`}>{guestTeam.shortName}</span>
            </Link>
          )}
          <span>{result && `${result[1]}`}</span>
        </div>
      </div>
      <div className={`${dateContainer}`}>
        <div>
          <div className={`is-size-7`}>{day}</div>
          {!result && (
            <div className="has-text-centered has-text-weight-bold">{time}</div>
          )}
          {link && (
            <a
              className="is-size-7"
              href={link}
              target="__blank"
              title="Zur TT-Live Seite"
            >
              Zu TT-Live <FaExternalLinkAlt aria-hidden="true" />
            </a>
          )}
        </div>
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
