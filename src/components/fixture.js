import React from "react"

const Fixture = ({
  homeTeamName,
  guestTeamName,
  result,
  date,
  highlight,
  link,
}) => {
  const highlightClasses = highlight
    ? "has-background-primary has-text-white"
    : ""
  return (
    <a
      href={link}
      target="__blank"
      title="Go to Game Details"
      className={`box ${highlightClasses}`}
    >
      <div className="level">
        <div className="level-item has-text-centered">
          <span className={`title is-5 ${highlightClasses}`}>
            {homeTeamName}
          </span>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <div className={`title ${highlightClasses}`}>
              {result && result !== "Vorbericht"
                ? `${result[0]}:${result[1]}`
                : "vs."}
            </div>
            <div className={`is-6 ${highlightClasses}`}>
              {new Date(date).toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <span className={`title is-5 ${highlightClasses}`}>
            {guestTeamName}
          </span>
        </div>
      </div>
    </a>
  )
}

export default Fixture
