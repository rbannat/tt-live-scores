import React from 'react'
import { hero } from './hero.module.scss'
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import LastUpdated from './lastUpdated'

type HeroProps = {
  title: string
  subtitle?: React.ReactElement
  showLastUpdated?: boolean
  isFav?: boolean
  onFavClick?: () => void
}
const Hero = ({
  title,
  subtitle,
  showLastUpdated = false,
  isFav,
  onFavClick,
}: HeroProps) => {
  return (
    <>
      <div className={`${hero} hero is-small is-primary`}>
        <div className="hero-body">
          <div className="container">
            <div className="is-flex is-justify-content-space-between">
              <h1 className="title mb-0 is-size-4-mobile is-size-3-tablet">
                {title}
              </h1>
              {onFavClick && (
                <button className="button is-ghost" onClick={onFavClick}>
                  <span className="icon">
                    {isFav ? (
                      <FaHeart aria-hidden="true" />
                    ) : (
                      <FaRegHeart aria-hidden="true" />
                    )}
                  </span>
                </button>
              )}
            </div>
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
