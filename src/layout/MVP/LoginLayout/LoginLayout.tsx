import React from 'react'
import { GovBanner } from '@trussworks/react-uswds'
import styles from './LoginLayout.module.scss'

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>

      <div className={`mvp ${styles.layoutLogin}`}>
        <GovBanner tld=".mil" />
        <main id="main-content">{children}</main>
      </div>
    </>
  )
}

export default LoginLayout
