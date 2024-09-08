import React from 'react'
import {
  scrollContainer,
  scrollContainerItem,
  scrollContainerLink,
} from './scrollContainer.module.scss'
import { Link } from 'gatsby'

type ScrollContainerProps = {
  children?: React.ReactNode
}

type ScrollContainerItemProps = {
  children?: React.ReactNode
  toUrl?: string
}

export function ScrollContainer({ children }: ScrollContainerProps) {
  return <ul className={scrollContainer}>{children}</ul>
}

export function ScrollContainerItem({
  children,
  toUrl,
}: ScrollContainerItemProps) {
  return (
    <li className={`${scrollContainerItem} box`}>
      {toUrl && (
        <Link className={scrollContainerLink} to={toUrl}>
          {children}
        </Link>
      )}
    </li>
  )
}
