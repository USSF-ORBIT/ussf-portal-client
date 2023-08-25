import React, { useEffect } from 'react'
import { GovBanner } from '@trussworks/react-uswds'
import styles from './DefaultLayout.module.scss'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import { useSearchContext } from 'stores/searchContext'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'

const ArticleLayout = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useUser()
  const { searchQuery, setSearchQuery } = useSearchContext()

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
          {/* PAGE CONTENT */}
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default ArticleLayout

export const withArticleLayout = (page: React.ReactNode) => (
  <ArticleLayout>{page}</ArticleLayout>
)
