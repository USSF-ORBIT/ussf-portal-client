import React, { useEffect } from 'react'
import { GovBanner, GridContainer, Grid } from '@trussworks/react-uswds'
import { ApolloError } from 'apollo-server-micro'
import { useTheme } from 'next-themes'
import styles from './DefaultLayout.module.scss'
import Header from 'components/Header/Header'
import PersonalData from 'components/PersonalData/PersonalData'
import PageHeader from 'components/PageHeader/PageHeader'
import PageNav from 'components/PageNav/PageNav'
import FeedbackCard from 'components/FeedbackCard/FeedbackCard'
import Footer from 'components/Footer/Footer'
import CustomModal from 'components/CustomModal/CustomModal'
import Loader from 'components/Loader/Loader'
import { useGetUserQuery } from 'operations/portal/queries/getUser.g'
import { useAuthContext } from 'stores/authContext'
import { PortalUser } from 'types'

const DefaultLayout = ({
  displayFeedbackCard = true,
  rightSidebar = undefined,
  children,
}: {
  displayFeedbackCard?: boolean
  rightSidebar?: JSX.Element
  children: React.ReactNode
}) => {
  const { setPortalUser } = useAuthContext()
  const { setTheme } = useTheme()
  const navItems = [
    { path: '/', label: 'My Space' },
    {
      path: '/sites-and-applications',
      label: <>All sites &amp; applications</>,
    },
    { path: '/ussf-documentation', label: 'USSF documentation' },
  ]

  const { loading, error, data }: PortalUser | any = useGetUserQuery()

  useEffect(() => {
    setPortalUser(data)
    if (data) {
      setTheme(data.theme)
    }
  }, [data])

  if (!loading && error)
    throw new ApolloError('getUser query failed', 'SERVER_ERROR')

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
            <PersonalData userDisplayName={data.displayName} />
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
