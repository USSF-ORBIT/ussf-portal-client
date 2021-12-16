import React from 'react'
import { GovBanner, GridContainer } from '@trussworks/react-uswds'

import styles from './ErrorLayout.module.scss'

import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'

const ErrorLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <div className={`${styles.errorContainer} sfds`}>
        <GovBanner tld=".mil" />
        <Header />
        <main id="main-content">
          <GridContainer containerSize="widescreen">
            {/* PAGE CONTENT */}
            {children}
          </GridContainer>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default ErrorLayout

export const withErrorLayout = (page: React.ReactNode) => (
  <ErrorLayout>{page}</ErrorLayout>
)
