import { ImageDataLike } from 'gatsby-plugin-image'
import React from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import ClubLogo from './clubLogo'
import { favButton, hero } from './hero.module.scss'

type HeroProps = {
  title: string
  subtitle?: React.ReactElement
  isFav?: boolean
  clubLogo?: { image: ImageDataLike; size?: 'large' | 'normal' }
  onFavClick?: () => void
}
const Hero = ({ title, subtitle, isFav, onFavClick, clubLogo }: HeroProps) => {
  return (
    <div className={`${hero} hero is-small`}>
      <div className="hero-body">
        <div className="container">
          <div className="is-flex is-justify-content-space-between is-align-items-center">
            <div className="is-flex is-align-items-center">
              {clubLogo?.image && (
                <div className="mr-4 is-flex-shrink-0">
                  <ClubLogo logo={clubLogo.image} size={clubLogo.size} />
                </div>
              )}
              <div>
                <h1 className="title mb-0 is-size-4-mobile is-size-3-tablet">
                  {title}
                </h1>
                {subtitle && <h2 className="subtitle">{subtitle}</h2>}
              </div>
            </div>
            {onFavClick && (
              <button
                className={`button is-danger is-large has-background-inherit is-inverted ${favButton}`}
                onClick={onFavClick}
              >
                <span className="is-sr-only">Zu Favoriten hinzufügen</span>
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
        </div>
      </div>
    </div>
  )
}

export default Hero
