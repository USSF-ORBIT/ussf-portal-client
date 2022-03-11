import React from 'react'
import { GridContainer } from '@trussworks/react-uswds'

import { withErrorLayout } from 'layout/Beta/ErrorLayout/ErrorLayout'
import Logo from 'components/Logo/Logo'
import LinkTo from 'components/util/LinkTo/LinkTo'

import styles from 'styles/pages/updateBrowser.module.scss'

export default function UpdateBrowser() {
  const MS_EDGE_DOWNLOAD = 'https://www.microsoft.com/edge'
  const GOOGLE_CHROME_DOWNLOAD = 'https://www.google.com/chrome'
  const FIREFOX_DOWNLOAD = 'https://www.mozilla.org/firefox'

  return (
    <>
      <GridContainer containerSize="widescreen">
        <section className={styles.updateBrowser}>
          <Logo noText />

          <h2>
            I’m sorry, Dave. I’m afraid you can’t use that outdated browser.
          </h2>

          <h3>
            For a better experience, please keep your internet browser up to
            date or choose from one of the options below:
          </h3>

          <ul className={styles.browserList}>
            <li>
              <img
                src="/assets/images/logo_msedge.png"
                alt="Microsoft Edge logo"
                width={150}
              />
              <LinkTo
                href={MS_EDGE_DOWNLOAD}
                className="usa-button usa-button--accent-cool">
                Download MS Edge
              </LinkTo>
            </li>
            <li>
              <img
                src="/assets/images/logo_googlechrome.png"
                alt="Google Chrome logo"
                width={150}
              />
              <LinkTo
                href={GOOGLE_CHROME_DOWNLOAD}
                className="usa-button usa-button--accent-cool">
                Download Google Chrome
              </LinkTo>
            </li>
            <li>
              <img
                src="/assets/images/logo_firefox.png"
                alt="Firefox logo"
                width={150}
              />
              <LinkTo
                href={FIREFOX_DOWNLOAD}
                className="usa-button usa-button--accent-cool">
                Download Firefox
              </LinkTo>
            </li>
          </ul>
        </section>
      </GridContainer>
    </>
  )
}

UpdateBrowser.getLayout = (page: React.ReactNode) =>
  withErrorLayout(page, true, true)

export async function getStaticProps() {
  // no op, forces the page to be static generated
  return {
    props: {},
  }
}
