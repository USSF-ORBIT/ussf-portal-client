import React from 'react'
import { GovBanner } from '@trussworks/react-uswds'
import classnames from 'classnames'

import styles from './LoginLayout.module.scss'

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <div className={styles.siteContainer}>
        <div className={classnames(styles.mainContainer, styles.layoutLogin)}>
          <GovBanner tld=".mil" />
          <main id="main-content">{children}</main>
        </div>
      </div>
    </>
  )
}

export default LoginLayout
