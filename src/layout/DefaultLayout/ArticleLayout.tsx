import React, { useEffect } from 'react'
import { GovBanner } from '@trussworks/react-uswds'
import { useTheme } from 'next-themes'

import styles from './DefaultLayout.module.scss'

import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import { useGetThemeQuery } from 'operations/portal/queries/getTheme.g'

const ArticleLayout = ({ children }: { children: React.ReactNode }) => {
  const { data } = useGetThemeQuery()
  const { setTheme } = useTheme()

  useEffect(() => {
    if (data) setTheme(data.theme)
  }, [data])

  if (!data) {
    return null
  }

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
