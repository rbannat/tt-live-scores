import React from "react"
import LastUpdated from "./lastUpdated"
import { hero } from "./hero.module.scss"

const Hero = ({ title, subtitle, showLastUpdated = false }) => {
  return (
    <>
      <div className={`${hero} hero is-small is-primary`}>
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-size-4-mobile is-size-3-tablet">{title}</h1>
            {subtitle && <h2 className="subtitle">{subtitle}</h2>}
          </div>
        </div>
      </div>
      {showLastUpdated && (
        <div className="container has-text-right px-5 py-2">
          <LastUpdated></LastUpdated>
        </div>
      )}
    </>
  )
}

export default Hero
