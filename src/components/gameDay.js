import React from "react"
import Fixture from "./fixture"

const GameDay = ({ date, fixtures }) => (
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

      {fixtures.map(
        (
          {
            homeTeamId,
            homeTeamName,
            guestTeamName,
            guestTeamId,
            date,
            result,
            link,
          },
          index
        ) => {
          return (
            <Fixture
              key={index}
              homeTeamName={homeTeamName}
              homeTeamId={homeTeamId}
              guestTeamName={guestTeamName}
              guestTeamId={guestTeamId}
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
