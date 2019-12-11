import React from "react"

const Fixture = ({ homeTeamName, guestTeamName, result, date }) => {
  return (
    <div className="box">
      <div className="level">
        <div className="level-item has-text-centered">
          <span className="title is-5">{homeTeamName}</span>
        </div>
        <div className="level-item has-text-centered">
          <span className="subtitle is-5">{result || "vs."}</span>
        </div>
        <div className="level-item has-text-centered">
          <span className="title is-5">{guestTeamName}</span>
        </div>
      </div>
    </div>
  )
}

export default Fixture
