import React, { useEffect } from 'react'
import { GovBanner, GridContainer } from '@trussworks/react-uswds'
import { useTheme } from 'next-themes'
import styles from './DefaultLayout.module.scss'
import Header from 'components/Header/Header'
import PageHeader from 'components/PageHeader/PageHeader'
import Footer from 'components/Footer/Footer'
import { useGetUserQuery } from 'operations/portal/queries/getUser.g'
import { useAuthContext } from 'stores/authContext'
import { useSearchContext } from 'stores/searchContext'
import { PortalUser } from 'types'
import Loader from 'components/Loader/Loader'

const PageLayout = ({
  header,
  children,
}: {
  header: React.ReactNode
  children: React.ReactNode
}) => {
  const { setPortalUser } = useAuthContext()
  const { searchQuery, setSearchQuery } = useSearchContext()
  const { setTheme } = useTheme()

  const { loading, data }: PortalUser | any = useGetUserQuery()

  useEffect(() => {
    setPortalUser(data)
    if (data) {
      setTheme(data.theme)
    }
  }, [data])

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
          <PageHeader>{header}</PageHeader>

          <GridContainer>
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
