import React from 'react'
import LastUpdated from './lastUpdated'

export default function Footer() {
  return (
    <footer className="footer p-3">
      <div className="container has-text-right px-5 py-2">
        <LastUpdated></LastUpdated>
      </div>
    </footer>
  )
}
