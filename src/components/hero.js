import React from "react"
import LastUpdated from "./lastUpdated"

const Hero = ({ title, subtitle }) => {
  return (
    <>
      <div className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{title}</h1>
            {subtitle && <h2 className="subtitle">{subtitle}</h2>}
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
