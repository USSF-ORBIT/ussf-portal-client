import React from 'react'
import { GovBanner, GridContainer } from '@trussworks/react-uswds'

import styles from './DefaultLayout.module.scss'

import Header from 'components/Header/Header'
import PageHeader from 'components/PageHeader/PageHeader'
import Footer from 'components/Footer/Footer'

const PageLayout = ({
  header,
  children,
}: {
  header: React.ReactNode
  children: React.ReactNode
}) => {
  return (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <div className={`${styles.siteContainer} sfds`}>
        <GovBanner tld=".mil" />
        <Header />
        <main id="main-content">
          <PageHeader disableSearch>{header}</PageHeader>

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

export default PageLayout

export const withPageLayout = (
  header: React.ReactNode,
  page: React.ReactNode
) => <PageLayout header={header}>{page}</PageLayout>
