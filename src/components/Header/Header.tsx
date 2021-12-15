import React, { useState } from 'react'
import {
  Header as USWDSHeader,
  Title,
  PrimaryNav,
  NavMenuButton,
  Button,
} from '@trussworks/react-uswds'

import styles from './Header.module.scss'

import Logo from 'components/Logo/Logo'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { useAuthContext } from 'stores/authContext'

const Header = () => {
  const { logout } = useAuthContext()
  const [expanded, setExpanded] = useState(false)
  const handleNavButtonClick = (): void =>
    setExpanded((prevExpanded) => !prevExpanded)

  const navItems = [
    <LinkTo
      href="https://ussf-orbit.github.io/ussf-portal/"
      key="nav_microsite"
      target="_blank"
      rel="noreferrer noopener">
      <span>About this portal</span>
    </LinkTo>,
    <Button
      secondary
      className={styles.logoutButton}
      type="button"
      onClick={logout}
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
