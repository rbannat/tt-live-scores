import React from "react"
import fixtureStyles from "./fixture.module.scss"
import { FaExternalLinkAlt } from "react-icons/fa"
import { Link } from "gatsby"

const Fixture = ({
  homeTeamId,
  guestTeamId,
  homeTeamName,
  guestTeamName,
  result,
  date,
  link,
}) => {
  return (
    <div className={`box`}>
      <div className={fixtureStyles.container}>
        <div className={`${fixtureStyles.team} has-text-right`}>
          <Link className="single-line-truncate" to={`/team/${homeTeamId}`}>
            <span className={`is-size-6`}>{homeTeamName}</span>
          </Link>
        </div>
        <div className={`${fixtureStyles.resultContainer} has-text-centered`}>
          <div>
            <div className={`is-size-6`}>
              {new Date(date).toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <div className={`is-size-4 has-text-weight-bold`}>
              {result && result !== "Vorbericht"
                ? `${result[0]} : ${result[1]}`
                : "vs."}
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
        <div className={`${fixtureStyles.team} has-text-left`}>
          <Link className="single-line-truncate" to={`/team/${guestTeamId}`}>
            <span className={`is-size-6`}>{guestTeamName}</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Fixture
