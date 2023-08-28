import React, { useEffect, useState } from 'react'
import { GovBanner, GridContainer, Grid } from '@trussworks/react-uswds'
import styles from './DefaultLayout.module.scss'
import Header from 'components/Header/Header'
import PersonalData from 'components/PersonalData/PersonalData'
import PageHeader from 'components/PageHeader/PageHeader'
import PageNav from 'components/PageNav/PageNav'
import FeedbackCard from 'components/FeedbackCard/FeedbackCard'
import Footer from 'components/Footer/Footer'
import CustomModal from 'components/CustomModal/CustomModal'
import Loader from 'components/Loader/Loader'
import { useMySpaceContext } from 'stores/myspaceContext'
import { useSearchContext } from 'stores/searchContext'
import { useUser } from 'hooks/useUser'

const DefaultLayout = ({
  displayFeedbackCard = true,
  rightSidebar = undefined,
  children,
}: {
  displayFeedbackCard?: boolean
  rightSidebar?: JSX.Element
  children: React.ReactNode
}) => {
  const { loading, portalUser } = useUser()
  const { initializeMySpace } = useMySpaceContext()
  const { searchQuery, setSearchQuery } = useSearchContext()
  const [displayName, setDisplayName] = useState<string>('')
  const navItems = [
    { path: '/', label: 'My Space' },
    {
      path: '/sites-and-applications',
      label: <>All sites &amp; applications</>,
    },
    { path: '/ussf-documentation', label: 'USSF documentation' },
  ]

  useEffect(() => {
    if (portalUser) {
      setDisplayName(portalUser.displayName)
      initializeMySpace(portalUser.mySpace)
    }
  }, [portalUser])

  useEffect(() => {
    // If there is a search query, and the url does not contain /search, then empty the search query
    if (searchQuery && !window.location.pathname.includes('/search')) {
      setSearchQuery('')
    }
  }, [window.location.pathname])

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
          <PageHeader>
            <PersonalData userDisplayName={displayName} />
          </PageHeader>

          <GridContainer>
            <Grid row gap>
              {/* LEFT SIDEBAR */}
              <Grid tablet={{ col: displayFeedbackCard ? 3 : 2 }}>
                <PageNav navItems={navItems} />
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
  rightSidebar?: JSX.Element
) => {
  return (
    <DefaultLayout
      displayFeedbackCard={displayFeedbackCard}
      rightSidebar={rightSidebar}>
      {page}
    </DefaultLayout>
  )
}
