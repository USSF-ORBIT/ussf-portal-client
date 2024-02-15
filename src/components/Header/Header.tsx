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
import Link from 'next/link'
import { useGetSiteHeaderQuery } from '../../operations/portal/queries/getSiteHeader.g'
import styles from './Header.module.scss'
import Logo from 'components/Logo/Logo'
import NavLink from 'components/util/NavLink/NavLink'
import { useAuthContext } from 'stores/authContext'
import { useAnalytics } from 'stores/analyticsContext'
import ThemeToggle from 'components/ThemeToggle/ThemeToggle'

const Header = () => {
  const { logout } = useAuthContext()
  const { trackEvent } = useAnalytics()
  const [expanded, setExpanded] = useState(false)
  const [isOpen, setIsOpen] = useState([false, false])
  const { data } = useGetSiteHeaderQuery()
  const { getSiteHeader } = data || {}

  const dropdownItems = []
  // Walk through the getSiteHeader object and pull out the dropdown items. Create an object for each
  // dropdown item that contains the label and corresponding source. If the label or the source is empty,
  // don't include it.
  for (const key in getSiteHeader) {
    if (
      key.startsWith('dropdownItem') &&
      key.includes('Label') &&
      getSiteHeader[key as keyof typeof getSiteHeader]!.length > 0 &&
      getSiteHeader[
        key.replace('Label', 'Source') as keyof typeof getSiteHeader
      ]!.length > 0
    ) {
      dropdownItems.push({
        label: getSiteHeader[key as keyof typeof getSiteHeader],
        source:
          getSiteHeader[
            key.replace('Label', 'Source') as keyof typeof getSiteHeader
          ],
      })
    }
  }

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

  const headerDropdownItems = dropdownItems.map((item, index) => {
    return (
      <NavLink
        data-testid={`nav-dropdown-item-${index}`}
        href={item.source!}
        key={`dropdown-${index}`}
        onClick={() => setIsOpen([false])}>
        {item.label}
      </NavLink>
    )
  })

  const navItems = [
    <>
      <NavDropDownButton
        data-testid="nav-header-dropdown"
        menuId="headerDropdown"
        onToggle={(): void => {
          onToggle(0)
        }}
        onMouseLeave={() => setIsOpen([false])}
        isOpen={isOpen[0]}
        label={getSiteHeader?.dropdownLabel || ''}
        isCurrent={true}
      />
      <Menu
        key="nav_header_dropdown"
        items={headerDropdownItems}
        onMouseEnter={() => setIsOpen([true])}
        onMouseLeave={() => setIsOpen([false])}
        isOpen={isOpen[0]}
        id="headerDropdown">
        {getSiteHeader?.dropdownLabel}
      </Menu>
    </>,
    <NavLink key="nav_header_button" href={getSiteHeader?.buttonSource || '/'}>
      {getSiteHeader?.buttonLabel}
    </NavLink>,
    <Button
      data-testid="nav_logout"
      secondary
      className={styles.logoutButton}
      type="button"
      onClick={handleLogout}
      key="nav_logout">
      <span>Log out</span>
    </Button>,
  ]

  const logoutButton = [
    <Button
      data-testid="nav_logout"
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
      <ThemeToggle />
      <USWDSHeader basic className={styles.header}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>
              <Link href="/" title="USSF Portal Home">
                <Logo darkBg />
              </Link>
            </Title>
            <NavMenuButton onClick={handleNavButtonClick} label="Menu" />
          </div>
          <PrimaryNav
            items={getSiteHeader ? navItems : logoutButton}
            mobileExpanded={expanded}
            onToggleMobileNav={handleNavButtonClick}
          />
        </div>
      </USWDSHeader>
    </div>
  )
}

export default Header
