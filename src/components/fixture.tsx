import { graphql, Link } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'
import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'
import ClubLogo from './clubLogo'
import {
  container,
  dateContainer,
  draw,
  lose,
  team,
  teamsContainer,
  win,
} from './fixture.module.scss'

type FixtureProps = Queries.FixtureDataFragment & {
  variant?: 'win' | 'lose' | 'draw'
  showDate?: boolean
}

const Fixture = ({
  guestTeam,
  homeTeam,
  result,
  date: dateString,
  link,
  variant,
  showDate = true,
}: FixtureProps) => {
  const date = new Date(dateString ?? '')
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
  const isGuestTeamWinner =
    result && result[0] !== null && result[1] !== null && result[0] < result[1]

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
            <div className="is-flex is-align-items-center">
              <div className="mr-4 is-flex-shrink-0">
                <ClubLogo
                  logo={
                    (homeTeam.club?.logo?.image as ImageDataLike) ?? undefined
                  }
                />
              </div>
              <Link to={`/teams/${homeTeam.id}`}>
                <span className={`is-size-6`}>{homeTeam.shortName}</span>
              </Link>
            </div>
          )}
          <span>{result && `${result[0]}`}</span>
        </div>
        <div
          className={`${team} ${
            result && isGuestTeamWinner ? 'has-text-weight-bold' : ''
          }`}
        >
          {guestTeam?.id && (
            <div className="is-flex is-align-items-center">
              <div className="mr-4 is-flex-shrink-0">
                <ClubLogo
                  logo={
                    (guestTeam.club?.logo?.image as ImageDataLike) ?? undefined
                  }
                />
              </div>
              <Link to={`/teams/${guestTeam.id}`}>
                <span className={`is-size-6`}>{guestTeam.shortName}</span>
              </Link>
            </div>
          )}
          <span>{result && `${result[1]}`}</span>
        </div>
      </div>
      <div className={`${dateContainer}`}>
        {showDate && <div className={`is-size-7`}>{day}</div>}
        {<div className="has-text-weight-bold">{time}</div>}
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
        club {
          id
          logo {
            image {
              childImageSharp {
                gatsbyImageData(
                  width: 32
                  height: 32
                  transformOptions: { fit: CONTAIN }
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
    homeTeam {
      ... on Team {
        id
        name
        shortName
        club {
          id
          logo {
            image {
              childImageSharp {
                gatsbyImageData(
                  width: 32
                  height: 32
                  transformOptions: { fit: CONTAIN }
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
    link
  }
`

export default Fixture
