import React from 'react'
import { GovBanner } from '@trussworks/react-uswds'
import styles from './LandingPageLayout.module.scss'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'

const LandingPageLayout = ({
  children,
}: {
  slug: string
  children: React.ReactNode
}) => {
  const { loading } = useUser()

  return loading ? (
    <Loader />
  ) : (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <div className={`${styles.siteContainer} sfds`}>
        <GovBanner tld=".mil" />
        <Header />
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

export const withLandingPageLayout = (page: JSX.Element) => {
  const { slug } = page?.props || {}

  return <LandingPageLayout slug={slug}>{page}</LandingPageLayout>
}
