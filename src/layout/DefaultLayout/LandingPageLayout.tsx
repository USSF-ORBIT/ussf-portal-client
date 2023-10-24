import React, { useEffect } from 'react'
import { GovBanner, GridContainer, Grid } from '@trussworks/react-uswds'
import styles from './LandingPageLayout.module.scss'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'
import Header from 'components/Header/Header'
import PageHeader from 'components/PageHeader/PageHeader'
import PageNav from 'components/PageNav/PageNav'
import Footer from 'components/Footer/Footer'
import CustomModal from 'components/CustomModal/CustomModal'
import Loader from 'components/Loader/Loader'
import { useSearchContext } from 'stores/searchContext'
import { useUser } from 'hooks/useUser'

const LandingPageLayout = ({
  pageTitle,
  slug,
  children,
}: {
  pageTitle: string
  slug: string
  children: React.ReactNode
}) => {
  const { loading } = useUser()
  const { searchQuery, setSearchQuery } = useSearchContext()
  useEffect(() => {
    // If there is a search query, and the url does not contain /search, then empty the search query
    if (searchQuery && !window.location.pathname.includes('/search')) {
      setSearchQuery('')
    }
  }, [window.location.pathname])

  const navItems = [
    { path: '/', label: 'My Space' },
    {
      path: '/sites-and-applications',
      label: <>Sites &amp; applications</>,
    },
    { path: '/ussf-documentation', label: 'USSF documentation' },
    { path: '/landing-pages', label: 'Landing Pages', current: true },
  ]

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
            <div>
              <h1>{pageTitle}</h1>
              <BreadcrumbNav
                navItems={[
                  { path: '/', label: 'Service portal home' },
                  { path: '/landing-pages', label: 'Landing Pages' },
                  {
                    path: `/landing-pages/${slug}`,
                    label: pageTitle,
                    current: true,
                  },
                ]}
              />
            </div>
          </PageHeader>

          <GridContainer>
            <Grid row gap>
              <Grid tablet={{ col: 2 }}>
                {/* LEFT SIDEBAR */}
                {/* TODO we can add the subnav here */}
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

        <CustomModal />
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
