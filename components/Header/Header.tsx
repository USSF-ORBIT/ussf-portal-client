import React from 'react'
import {
  Header as USWDSHeader,
  Title,
  NavMenuButton,
} from '@trussworks/react-uswds'

// TODO - display current page title in sr-only
// TODO - mobile menu expand/collapse

const Header = () => (
  <USWDSHeader basic>
    <div className="usa-nav-container">
      <div className="usa-navbar">
        <Title>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/" title="Home" aria-label="Home">
            <img src="/img/ussf-logo.svg" alt="Space Force" />
          </a>
        </Title>
        <NavMenuButton label="Menu" />
      </div>
    </div>
  </USWDSHeader>
)

export default Header
