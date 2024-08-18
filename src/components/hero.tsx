import React from 'react'
import { favButton, hero } from './hero.module.scss'
import { FaRegHeart, FaHeart } from 'react-icons/fa'

type HeroProps = {
  title: string
  subtitle?: React.ReactElement
  showLastUpdated?: boolean
  isFav?: boolean
  onFavClick?: () => void
}
const Hero = ({ title, subtitle, isFav, onFavClick }: HeroProps) => {
  return (
    <>
      <div className={`${hero} hero is-small is-primary`}>
        <div className="hero-body">
          <div className="container">
            <div className="is-flex is-justify-content-space-between is-align-items-center">
              <h1 className="title mb-0 is-size-4-mobile is-size-3-tablet">
                {title}
              </h1>
              {onFavClick && (
                <button
                  className={`button is-danger is-large has-background-inherit is-inverted ${favButton}`}
                  onClick={onFavClick}
                >
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
    </>
  )
}

export default Hero
