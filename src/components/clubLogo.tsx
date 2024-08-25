import React from 'react'
import { clubLogoWrapper } from './clubLogo.module.scss'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'

type ClubLogoProps = {
  logo: IGatsbyImageData
}

export default function ClubLogo({ logo }: ClubLogoProps) {
  const image = getImage(logo)
  return (
    <div className={`${clubLogoWrapper} mr-4 is-flex-shrink-0`}>
      {image && <GatsbyImage image={image} alt={'Club logo'} />}
    </div>
  )
}
