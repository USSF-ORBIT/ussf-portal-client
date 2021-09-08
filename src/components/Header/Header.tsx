import React, { useState } from 'react'
import {
  Header as USWDSHeader,
  Title,
  PrimaryNav,
  NavMenuButton,
} from '@trussworks/react-uswds'

import Logo from 'components/Logo/Logo'
import NavLink from 'components/util/NavLink/NavLink'
import LinkTo from 'components/util/LinkTo/LinkTo'

const Header = () => {
  const [expanded, setExpanded] = useState(false)
  const handleNavButtonClick = (): void =>
    setExpanded((prevExpanded) => !prevExpanded)

  const navItems = [
    <NavLink href="#" key="nav_about">
      <span>About Space Force</span>
    </NavLink>,
    <NavLink href="#" key="nav_news">
      <span>News, Announcements &amp; Events</span>
    </NavLink>,
    <NavLink href="#" key="nav_support">
      <span>Help &amp; Support</span>
    </NavLink>,
  ]

  return (
    <>
      <div className={`usa-overlay ${expanded ? 'is-visible' : ''}`} />
      <USWDSHeader basic>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>
              <LinkTo href="/" title="USSF Portal Home">
                <Logo abbreviated />
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
    </>
  )
}

export default Header
