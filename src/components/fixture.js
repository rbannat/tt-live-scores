import React from "react"
import fixtureStyles from "./fixture.module.scss"

const Fixture = ({ homeTeamName, guestTeamName, result, date, link }) => {
  return (
    <a
      href={link}
      target="__blank"
      title="Go to Game Details"
      className={`box`}
    >
      <div className={fixtureStyles.container}>
        <div className={`${fixtureStyles.team} has-text-right`}>
          <span className={`is-size-6`}>{homeTeamName}</span>
        </div>
        <div className={`${fixtureStyles.resultContainer} has-text-centered`}>
          <div>
            <div className={`is-size-7`}>
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
          </div>
        </div>
        <div className={`${fixtureStyles.team} has-text-left`}>
          <span className={`is-size-6`}>{guestTeamName}</span>
        </div>
      </div>
    </a>
  )
}

export default Fixture
