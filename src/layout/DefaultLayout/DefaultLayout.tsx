import React from 'react'
import { GovBanner, GridContainer, Grid } from '@trussworks/react-uswds'
import styles from './DefaultLayout.module.scss'
import Header from 'components/Header/Header'
import PersonalData from 'components/PersonalData/PersonalData'
import PageHeader from 'components/PageHeader/PageHeader'
import PageNav from 'components/PageNav/PageNav'
import FeedbackCard from 'components/FeedbackCard/FeedbackCard'
import Footer from 'components/Footer/Footer'
import CustomModal from 'components/CustomModal/CustomModal'

const DefaultLayout = ({
  displayFeedbackCard = true,
  rightSidebar = undefined,
  secondaryNav,
  children,
}: {
  displayFeedbackCard?: boolean
  rightSidebar?: JSX.Element
  secondaryNav?: any
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
          <PageHeader>
            <PersonalData />
          </PageHeader>

          <GridContainer>
            <Grid row gap>
              {/* LEFT SIDEBAR */}
              <Grid tablet={{ col: displayFeedbackCard ? 3 : 2 }}>
                <PageNav navItems={secondaryNav.links} />
                {displayFeedbackCard && <FeedbackCard />}
              </Grid>
              <Grid tablet={{ col: true }}>
                {/* PAGE CONTENT */}
                {children}
              </Grid>
              {/* RIGHT SIDEBAR */}
              {rightSidebar && <Grid tablet={{ col: 4 }}>{rightSidebar}</Grid>}
            </Grid>
          </GridContainer>
        </main>
        <Footer />

        <CustomModal />
      </div>
    </>
  )
}

export default DefaultLayout

export const withDefaultLayout = (
  page: React.ReactNode,
  displayFeedbackCard?: boolean,
  rightSidebar?: JSX.Element,
  secondaryNav?: any
) => {
  return (
    <DefaultLayout
      displayFeedbackCard={displayFeedbackCard}
      rightSidebar={rightSidebar}
      secondaryNav={secondaryNav}>
      {page}
    </DefaultLayout>
  )
}
