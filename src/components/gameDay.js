import React from "react"
import Fixture from "./fixture"

const GameDay = ({ date, games }) => (
  <div className="columns">
    <div className="column is-full">
      <h3 className="is-size-6">
        {new Date(date).toLocaleDateString("de-DE", {
          weekday: "long",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </h3>

      {games.map(
        ({ homeTeamName, guestTeamName, date, result, link }, index) => {
          const highlight = [homeTeamName, guestTeamName].some(
            name => name === "SV Berl. Brauereien IX"
          )
          return (
            <Fixture
              key={index}
              highlight={highlight}
              homeTeamName={homeTeamName}
              guestTeamName={guestTeamName}
              date={date}
              result={result}
              link={link}
            ></Fixture>
          )
        }
      )}
    </div>
  </div>
)

export default GameDay
