import React, { useState } from 'react'
import {
  Header as USWDSHeader,
  Title,
  PrimaryNav,
  NavMenuButton,
  Button,
  Menu,
  NavDropDownButton,
} from '@trussworks/react-uswds'

import styles from './Header.module.scss'

import Logo from 'components/Logo/Logo'
import NavLink from 'components/util/NavLink/NavLink'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { useAuthContext } from 'stores/authContext'
import { useAnalytics } from 'stores/analyticsContext'

const Header = () => {
  const { logout } = useAuthContext()
  const { trackEvent } = useAnalytics()
  const [expanded, setExpanded] = useState(false)
  const [isOpen, setIsOpen] = useState([false, false])
  const handleNavButtonClick = (): void =>
    setExpanded((prevExpanded) => !prevExpanded)

  const handleLogout = () => {
    trackEvent('Top nav', 'Log out')
    logout()
  }

  const onToggle = (index: number): void => {
    setIsOpen((prevIsOpen) => {
      const newIsOpen = [false, false]

      // eslint-disable-next-line
      newIsOpen[index] = !prevIsOpen[index]
      return newIsOpen
    })
  }

  const aboutUsDropdownItems = [
    <NavLink href="/about-us" key="one" onClick={() => setIsOpen([false])}>
      About the USSF
    </NavLink>,
    <NavLink
      href="/about-us/orbit-blog"
      key="two"
      onClick={() => setIsOpen([false])}>
      ORBIT blog
    </NavLink>,
  ]

  const navItems = [
    <>
      <NavDropDownButton
        menuId="aboutUsDropdown"
        onToggle={(): void => {
          onToggle(0)
        }}
        onMouseOver={() => setIsOpen([true])}
        onMouseOut={() => setIsOpen([false])}
        isOpen={isOpen[0]}
        label="About Us"
        isCurrent={true}
      />
      <Menu
        key="nav_about"
        onMouseOver={() => setIsOpen([true])}
        onMouseOut={() => setIsOpen([false])}
        items={aboutUsDropdownItems}
        isOpen={isOpen[0]}
        id="aboutUsDropdown">
        About us
      </Menu>
    </>,
    <NavLink key="nav_news" href="/news">
      News
    </NavLink>,
    <Button
      secondary
      className={styles.logoutButton}
      type="button"
      onClick={handleLogout}
      key="nav_logout">
      <span>Log out</span>
    </Button>,
  ]

  // The wrapper div is needed for mobile nav to work, so the header/overlay are not flex children */
  return (
    <div>
      <div
        className={`usa-overlay ${expanded ? 'is-visible' : ''}`}
        onClick={() => setExpanded(false)}
        role="presentation"
      />
      <USWDSHeader basic className={styles.header}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>
              <LinkTo href="/" title="USSF Portal Home">
                <Logo darkBg />
              </LinkTo>
            </Title>
            <NavMenuButton onClick={handleNavButtonClick} label="Menu" />
          </div>
          <PrimaryNav
            items={navItems}
            mobileExpanded={expanded}
            onToggleMobileNav={handleNavButtonClick}
          />
        </div>
      </USWDSHeader>
    </div>
  )
}

export default Header
