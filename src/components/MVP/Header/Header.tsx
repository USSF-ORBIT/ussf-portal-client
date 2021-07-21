import React, { useState } from 'react'
import { useRouter } from 'next/router'
import classnames from 'classnames'
import {
  Header as USWDSHeader,
  Title,
  NavMenuButton,
  PrimaryNav,
  Menu,
  NavDropDownButton,
  NavList,
} from '@trussworks/react-uswds'

import styles from './Header.module.scss'
import LinkTo from 'components/util/LinkTo/LinkTo'
import NavLink from 'components/util/NavLink/NavLink'

const Header = () => {
  const router = useRouter()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [servicePortalNavOpen, setServicePortalNavOpen] = useState(false)

  const isHomePage = router.pathname === '/'

  const handleToggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen)
  }

  const handleToggleServicePortalMenu = () => {
    setServicePortalNavOpen(!servicePortalNavOpen)
  }

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/news', label: 'News', className: styles.newsLink },
    {
      path: '/training-and-education',
      label: 'Training and education',
      className: styles.trainingLink,
    },
    { path: '/about-us', label: 'About us', className: styles.aboutLink },
  ].map((i) => (
    <NavLink
      href={i.path}
      key={i.path}
      className={classnames('usa-nav__link', i.className)}
      exact={i.path === '/'}>
      <span>{i.label}</span>
    </NavLink>
  ))

  const servicePortalItems = [
    { path: 'https://www.hrcapps.army.mil/portal/', label: 'Army' },
    { path: 'https://my.navy.mil/', label: 'Navy' },
    { path: 'https://www.my.af.mil/', label: 'Air Force' },
    { path: 'https://mol.tfs.usmc.mil/', label: 'Marines' },
    { path: 'https://cgportal2.uscg.mil/', label: 'Coast Guard' },
  ].map((i) => (
    <LinkTo href={i.path} key={i.path}>
      {i.label}
    </LinkTo>
  ))

  const homeNavItems = [
    { path: '/#manage-your-life', label: 'Manage your life' },
    { path: '/#work-tools', label: 'Work tools' },
  ].map((i) => (
    <LinkTo href={i.path} key={i.path} className="usa-nav__link">
      {i.label}
    </LinkTo>
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
      <div
        className={`usa-overlay ${mobileNavOpen ? 'is-visible' : ''}`}
        data-testid="overlay"
      />

      <USWDSHeader basic className={styles.Header}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>
              <LinkTo href="/" title="Home" aria-label="Home">
                <img
                  className="logo-img"
                  src="/img/ussf-logo.svg"
                  alt="Space Force"
                />

                {isHomePage ? (
                  <h1 className="usa-sr-only">Space Force Portal home</h1>
                ) : (
                  <span className="usa-sr-only">Space Force Portal</span>
                )}
              </LinkTo>
            </Title>
            <NavMenuButton label="Menu" onClick={handleToggleMobileNav} />
          </div>

          <PrimaryNav
            aria-label="Primary navigation"
            items={navItems}
            mobileExpanded={mobileNavOpen}
            onToggleMobileNav={handleToggleMobileNav}>
            {isHomePage && (
              <div>
                <div className="margin-x-neg-2 desktop:margin-right-0 margin-top-3 border-top border-base-light padding-y-105"></div>
                <h2 className="text-heading font-mono-3xs text-bold text-ls-1 margin-y-0">
                  On this page
                </h2>
                <NavList items={homeNavItems} type="primary" />
              </div>
            )}
          </PrimaryNav>
        </div>
      </USWDSHeader>
    </>
  )
}

export default Header
