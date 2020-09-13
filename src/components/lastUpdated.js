import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const LastUpdated = () => {
    const data = useStaticQuery(graphql`
    query {
        siteBuildMetadata {
            buildTime(locale: "de", formatString: "dd, DD.MM.YYYY HH:mm")
        }
    }
`)
return (
<div className="is-size-7">Stand: {data.siteBuildMetadata.buildTime} Uhr</div>
)
}

export default LastUpdated
