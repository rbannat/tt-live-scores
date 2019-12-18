import React from "react"

const Fixture = ({ homeTeamName, guestTeamName, result, date }) => (
  <div className="box">
    <div className="level">
      <div className="level-item has-text-centered">
        <span className="title is-5">{homeTeamName}</span>
      </div>
      <div className="level-item has-text-centered">
        <div>
          <div className="title">
            {result && result !== "Vorbericht" ? result : "vs."}
          </div>
          <div className="is-6">
            {new Date(date).toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <span className="title is-5">{guestTeamName}</span>
      </div>
    </div>
  </div>
)

export default Fixture
