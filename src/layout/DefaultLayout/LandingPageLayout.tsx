import React from 'react'
import Head from 'next/head'
import { GovBanner } from '@trussworks/react-uswds'
import styles from './LandingPageLayout.module.scss'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'

const LandingPageLayout = ({
  pageTitle = 'USSF Portal',
  children,
}: {
  pageTitle?: string
  children: React.ReactNode
}) => {
  const { loading } = useUser()
  return loading ? (
    <Loader />
  ) : (
    <>
      <Head>
        <title>{`${pageTitle} - USSF Portal`}</title>
      </Head>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <div className={`${styles.siteContainer} sfds`}>
        <div className={styles.stickyHeader}>
          <GovBanner tld=".mil" />
          <Header />
        </div>
        <div className={styles.pageContent}>
          {/* PAGE CONTENT */}
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default LandingPageLayout

export const withLandingPageLayout = (page: JSX.Element, pageTitle: string) => {
  return <LandingPageLayout pageTitle={pageTitle}>{page}</LandingPageLayout>
}
