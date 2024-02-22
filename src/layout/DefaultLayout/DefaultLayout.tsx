import React, { useEffect, useState } from 'react'
import { GovBanner, GridContainer, Grid } from '@trussworks/react-uswds'
import styles from './DefaultLayout.module.scss'
import Header from 'components/Header/Header'
import PersonalData from 'components/PersonalData/PersonalData'
import PageHeader from 'components/PageHeader/PageHeader'
import PageNav from 'components/PageNav/PageNav'
import Footer from 'components/Footer/Footer'
import CustomModal from 'components/CustomModal/CustomModal'
import Loader from 'components/Loader/Loader'
import { useMySpaceContext } from 'stores/myspaceContext'
import { useSearchContext } from 'stores/searchContext'
import { useUser } from 'hooks/useUser'
import { MySpace } from 'types'

const DefaultLayout = ({
  rightSidebar = undefined,
  children,
}: {
  rightSidebar?: JSX.Element
  children: React.ReactNode
}) => {
  const { loading, portalUser } = useUser()
  const { initializeMySpace } = useMySpaceContext()
  const { searchQuery, setSearchQuery } = useSearchContext()
  const [displayName, setDisplayName] = useState<string>('')

  useEffect(() => {
    if (portalUser) {
      setDisplayName(portalUser.displayName)
      initializeMySpace(portalUser.mySpace as MySpace)
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
        <div className={styles.stickyHeader}>
          <GovBanner tld=".mil" />
          <Header />
        </div>
        <main>
          <PageHeader>
            <PersonalData userDisplayName={displayName} />
          </PageHeader>

          <GridContainer>
            <Grid row gap>
              {/* LEFT SIDEBAR */}
              <Grid desktop={{ col: 2 }} style={{ minWidth: '221px' }}>
                <PageNav />
              </Grid>
              <Grid id="main-content" desktop={{ col: true }}>
                {/* PAGE CONTENT */}
                {children}
              </Grid>
              {/* RIGHT SIDEBAR */}
              {rightSidebar && <Grid desktop={{ col: 4 }}>{rightSidebar}</Grid>}
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
  rightSidebar?: JSX.Element
) => {
  return <DefaultLayout rightSidebar={rightSidebar}>{page}</DefaultLayout>
}
