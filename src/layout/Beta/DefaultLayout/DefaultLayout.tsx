import React from 'react'
import { GovBanner, GridContainer, Grid } from '@trussworks/react-uswds'

import styles from './DefaultLayout.module.scss'

import Header from 'components/Header/Header'
import PersonalData from 'components/PersonalData/PersonalData'
import Search from 'components/Search/Search'
import PageNav from 'components/PageNav/PageNav'
import Footer from 'components/Footer/Footer'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const navItems = [
    { path: '/', label: 'My Space' },
    {
      path: '/sites-and-applications',
      label: <>All sites &amp; applications</>,
    },
    {
      path: '/leavebeta',
      label: 'Leave Beta',
    },
  ]

  return (
    <>
      <a className="usa-skipnav" href="#main-content">
        Skip to main content
      </a>
      <div className={`${styles.siteContainer} ${styles.defaultTheme}`}>
        <GovBanner tld=".mil" />
        <Header />
        <main id="main-content">
          <GridContainer containerSize="widescreen">
            <Grid className={styles.pageHeader} row gap>
              <Grid col="auto" desktop={{ col: 6 }}>
                <PersonalData />
              </Grid>
              <Grid col="auto" desktop={{ col: 6 }}>
                <Search />
              </Grid>
            </Grid>

            <Grid row gap>
              <Grid tablet={{ col: 'auto' }}>
                <PageNav navItems={navItems} />
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

export const withBetaLayout = (page: React.ReactNode) => (
  <DefaultLayout>{page}</DefaultLayout>
)
