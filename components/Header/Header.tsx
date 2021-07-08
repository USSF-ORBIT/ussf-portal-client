import React, { useState } from 'react'
import Link from 'next/link'
import {
  Header as USWDSHeader,
  Title,
  NavMenuButton,
  PrimaryNav,
  Menu,
  NavDropDownButton,
} from '@trussworks/react-uswds'

import styles from './Header.module.scss'

// TODO - display current page title in sr-only
// TODO - current page class

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [servicePortalNavOpen, setServicePortalNavOpen] = useState(false)

  const handleToggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen)
  }

  const handleToggleServicePortalMenu = () => {
    setServicePortalNavOpen(!servicePortalNavOpen)
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/news', label: 'News' },
    { path: '/training-and-education', label: 'Training and education' },
    { path: '/about-us', label: 'About us' },
  ].map((i) => (
    <Link href={i.path} key={i.path}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="usa-nav__link">
        <span>{i.label}</span>
      </a>
    </Link>
  ))

  const servicePortalItems = [
    { path: 'https://www.hrcapps.army.mil/portal/', label: 'Army' },
    { path: 'https://my.navy.mil/', label: 'Navy' },
    { path: 'https://www.my.af.mil/', label: 'Air Force' },
    { path: 'https://mol.tfs.usmc.mil/', label: 'Marines' },
    { path: 'https://cgportal2.uscg.mil/', label: 'Coast Guard' },
  ].map((i) => (
    <Link href={i.path} key={i.path}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>{i.label}</a>
    </Link>
  ))

  const servicePortalMenu = (
    <>
      <NavDropDownButton
        label="Your Service Portal"
        isOpen={servicePortalNavOpen}
        menuId="basic-nav-section-one"
        onToggle={handleToggleServicePortalMenu}
      />
      <Menu
        items={servicePortalItems}
        isOpen={servicePortalNavOpen}
        id="basic-nav-section-one"
      />
    </>
  )

  navItems.push(servicePortalMenu)

  return (
    <>
      <div className={`usa-overlay ${mobileNavOpen ? 'is-visible' : ''}`} />

      <USWDSHeader basic className={styles.Header}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/" title="Home" aria-label="Home">
                <img
                  className="logo-img"
                  src="/img/ussf-logo.svg"
                  alt="Space Force"
                />
              </a>
            </Title>
            <NavMenuButton label="Menu" onClick={handleToggleMobileNav} />
          </div>

          <PrimaryNav
            aria-label="Primary navigation"
            items={navItems}
            mobileExpanded={mobileNavOpen}
            onToggleMobileNav={handleToggleMobileNav}
          />
        </div>
      </USWDSHeader>
    </>
  )
}

export default Header
