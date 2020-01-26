import React from "react"
import fixtureStyles from "./fixture.module.scss"
import { FaExternalLinkAlt } from "react-icons/fa"

const Fixture = ({ homeTeamName, guestTeamName, result, date, link }) => {
  return (
    <div className={`box`}>
      <div className={fixtureStyles.container}>
        <div className={`${fixtureStyles.team} has-text-right`}>
          <span className={`is-size-6 single-line-truncate`}>
            {homeTeamName}
          </span>
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
                ? `${result[0]}:${result[1]}`
                : "vs."}
            </div>
            <a
              class="is-size-7"
              href={link}
              target="__blank"
              title="Zur TT-Live Seite"
            >
              Zu TT-Live <FaExternalLinkAlt aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className={`${fixtureStyles.team} has-text-left`}>
          <span className={`is-size-6 single-line-truncate`}>
            {guestTeamName}
          </span>
        </div>
      </div>
    </div>
  )
}

export default Fixture
