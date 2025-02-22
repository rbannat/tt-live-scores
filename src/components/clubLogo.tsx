import React from 'react'
import { clubLogoWrapper, large } from './clubLogo.module.scss'
import {
  GatsbyImage,
  getImage,
  ImageDataLike,
  StaticImage,
} from 'gatsby-plugin-image'

type ClubLogoProps = { logo?: ImageDataLike; size?: 'normal' | 'large' }

export default function ClubLogo({ logo, size = 'normal' }: ClubLogoProps) {
  const image = logo && getImage(logo)
  return (
    <div className={`${clubLogoWrapper} ${size === 'large' ? large : ''}`}>
      {image ? (
        <GatsbyImage image={image} alt={'Club logo'} />
      ) : (
        <StaticImage
          src="../images/badge-placeholder.png"
          alt="Club logo placeholder"
          placeholder="blurred"
          width={64}
          transformOptions={{ fit: 'contain' }}
        />
      )}
    </div>
  )
}
