import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const LastUpdated = () => {
  const data = useStaticQuery(graphql`
    query LastUpdated {
      siteBuildMetadata {
        buildTime
      }
    }
  `)
  return (
    <div className="is-size-7">
      {`Stand: ${new Intl.DateTimeFormat("de-DE", {
        weekday: "short",
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }).format(new Date(data.siteBuildMetadata.buildTime))} Uhr`}
    </div>
  )
}

export default LastUpdated
