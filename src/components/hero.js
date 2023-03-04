import React from "react"
import LastUpdated from "./lastUpdated"

const Hero = ({ title, subtitle, description }) => {
  return (
    <>
      <div className="hero is-small is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-4-mobile is-size-3-tablet">{title}</h1>
            {subtitle && <h2 className="subtitle">{subtitle}</h2>}
            {description && <h3 className="subtitle">{description}</h3>}
          </div>
        </div>
      </div>
      <div className="container has-text-right px-5 py-2">
        <LastUpdated></LastUpdated>
      </div>
    </>
  )
}

export default Hero
