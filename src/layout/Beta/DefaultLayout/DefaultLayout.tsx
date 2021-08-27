import React from 'react'
import { GovBanner } from '@trussworks/react-uswds'
import classnames from 'classnames'

import styles from './DefaultLayout.module.scss'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <div className={styles.siteContainer}>
        <div className={classnames(styles.mainContainer, styles.layoutDefault)}>
          <GovBanner tld=".mil" />
          <main id="main-content">{children}</main>
        </div>
      </div>
    </>
  )
}

export default DefaultLayout
