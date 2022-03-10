import React from 'react'
import { GovBanner } from '@trussworks/react-uswds'

import styles from './ErrorLayout.module.scss'

import Header from 'components/Header/Header'
import HeaderWithoutNav from 'components/Header/HeaderWithoutNav'
import Footer from 'components/Footer/Footer'

const ErrorLayout = ({
  hideNav = false,
  children,
}: {
  hideNav?: boolean
  children: React.ReactNode
}) => {
  return (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <div className={`${styles.errorContainer} sfds`}>
        <GovBanner tld=".mil" />
        {hideNav ? <HeaderWithoutNav /> : <Header />}

        <main id="main-content">
          {/* PAGE CONTENT */}
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default ErrorLayout

export const withErrorLayout = (page: React.ReactNode, hideNav?: boolean) => (
  <ErrorLayout hideNav={hideNav}>{page}</ErrorLayout>
)
