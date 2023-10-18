import React from 'react'
import { Header as USWDSHeader, Title } from '@trussworks/react-uswds'
import Link from 'next/link'
import styles from './Header.module.scss'
import Logo from 'components/Logo/Logo'

const HeaderWithoutNav = () => {
  return (
    <div>
      <USWDSHeader basic className={styles.header}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>
              <Link href="/" title="USSF Portal Home">
                <Logo darkBg />
              </Link>
            </Title>
          </div>
        </div>
      </USWDSHeader>
    </div>
  )
}

export default HeaderWithoutNav
