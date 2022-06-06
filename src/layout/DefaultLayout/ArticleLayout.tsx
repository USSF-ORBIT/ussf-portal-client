import React from 'react'
import { GovBanner } from '@trussworks/react-uswds'

import styles from './DefaultLayout.module.scss'

import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'

const ArticleLayout = ({ children }: { children: React.ReactNode }) => {
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
