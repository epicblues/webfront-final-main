import React, { FunctionComponent } from 'react'
import navStyles from '../styles/Nav.module.css'
import Link from 'next/link'

const Nav: FunctionComponent = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>

        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>


      </ul>
    </nav>
  )
}

export default Nav
