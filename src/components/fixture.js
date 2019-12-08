import React from "react"

const Fixture = ({ homeTeamName, guestTeamName, result, date }) => {
  return (
    <div className="box">
      <div className="level">
        <div className="level-item has-text-centered">
          <p className="title is-5">{homeTeamName}</p>
        </div>
        <div className="level-item has-text-centered">
          <p className="subtitle is-5">{result || "vs."}</p>
        </div>
        <div className="level-item has-text-centered">
          <p className="title is-5">{guestTeamName}</p>
        </div>
      </div>
    </div>
  )
}

export default Fixture
