import React, { useEffect } from 'react'
import { GovBanner } from '@trussworks/react-uswds'
import { useTheme } from 'next-themes'
import styles from './DefaultLayout.module.scss'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import { useGetUserQuery } from 'operations/portal/queries/getUser.g'
import { useAuthContext } from 'stores/authContext'
import { PortalUser } from 'types'

const ArticleLayout = ({ children }: { children: React.ReactNode }) => {
  const { setPortalUser } = useAuthContext()
  const { setTheme } = useTheme()

  const { data }: PortalUser | any = useGetUserQuery()

  useEffect(() => {
    setPortalUser(data)
    if (data) {
      setTheme(data.theme)
    }
  }, [data])

  return (
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
