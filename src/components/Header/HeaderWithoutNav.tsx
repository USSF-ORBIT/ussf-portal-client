import React from 'react'
import { Header as USWDSHeader, Title } from '@trussworks/react-uswds'

import styles from './Header.module.scss'

import Logo from 'components/Logo/Logo'
import LinkTo from 'components/util/LinkTo/LinkTo'

const HeaderWithoutNav = () => {
  return (
    <div>
      <USWDSHeader basic className={styles.header}>
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <Title>
              <LinkTo href="/" title="USSF Portal Home">
                <Logo darkBg />
              </LinkTo>
            </Title>
          </div>
        </div>
      </USWDSHeader>
    </div>
  )
}

export default HeaderWithoutNav
