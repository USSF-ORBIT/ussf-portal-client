import React from 'react'
import { GovBanner, GridContainer, Grid } from '@trussworks/react-uswds'

import styles from './DefaultLayout.module.scss'

import Header from 'components/Header/Header'
import PersonalData from 'components/PersonalData/PersonalData'
import PageHeader from 'components/PageHeader/PageHeader'
import PageNav from 'components/PageNav/PageNav'
import FeedbackCard from 'components/FeedbackCard/FeedbackCard'
import Footer from 'components/Footer/Footer'

const DefaultLayout = ({
  displayFeedbackCard = true,
  children,
}: {
  displayFeedbackCard?: boolean
  children: React.ReactNode
}) => {
  const navItems = [
    { path: '/', label: 'My Space' },
    {
      path: '/sites-and-applications',
      label: <>All sites &amp; applications</>,
    },
    { path: '/ussf-documentation', label: 'USSF documentation' },
  ]

  return (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <div className={`${styles.siteContainer} sfds`}>
        <GovBanner tld=".mil" />
        <Header />
        <main id="main-content">
          <PageHeader disableSearch>
            <PersonalData />
          </PageHeader>

          <GridContainer>
            <Grid row gap>
              <Grid tablet={{ col: 3 }}>
                <PageNav navItems={navItems} />
                {displayFeedbackCard && <FeedbackCard />}
              </Grid>
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

export default DefaultLayout

export const withDefaultLayout = (
  page: React.ReactNode,
  displayFeedbackCard?: boolean
) => (
  <DefaultLayout displayFeedbackCard={displayFeedbackCard}>
    {page}
  </DefaultLayout>
)
