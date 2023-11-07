import React from 'react'
import { GovBanner, GridContainer, Grid } from '@trussworks/react-uswds'
import styles from './LandingPageLayout.module.scss'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'

const LandingPageLayout = ({
  pageTitle,
  children,
}: {
  pageTitle: string
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
        <main id="main-content">
          <h1>{pageTitle}</h1>

          <GridContainer>
            <Grid row gap>
              <Grid tablet={{ col: true }}>
                {/* PAGE CONTENT */}
                {children}
              </Grid>
            </Grid>
          </GridContainer>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default LandingPageLayout

export const withLandingPageLayout = (page: JSX.Element) => {
  const { pageTitle, slug } = page?.props || {}

  return (
    <LandingPageLayout pageTitle={pageTitle} slug={slug}>
      {page}
    </LandingPageLayout>
  )
}
