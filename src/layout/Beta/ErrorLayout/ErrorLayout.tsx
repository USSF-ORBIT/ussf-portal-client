import React from 'react'
import { GovBanner } from '@trussworks/react-uswds'
import classnames from 'classnames'

import styles from './ErrorLayout.module.scss'

import Header from 'components/Header/Header'
import HeaderWithoutNav from 'components/Header/HeaderWithoutNav'
import Footer from 'components/Footer/Footer'

const ErrorLayout = ({
  hideNav = false,
  ieCompat = false,
  children,
}: {
  hideNav?: boolean
  ieCompat?: boolean
  children: React.ReactNode
}) => {
  const containerClasses = classnames(styles.errorContainer, 'sfds', {
    [styles.errorContainerIECompat]: ieCompat,
  })

  return (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <div className={containerClasses}>
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

export const withErrorLayout = (
  page: React.ReactNode,
  hideNav?: boolean,
  ieCompat?: boolean
) => (
  <ErrorLayout hideNav={hideNav} ieCompat={ieCompat}>
    {page}
  </ErrorLayout>
)
