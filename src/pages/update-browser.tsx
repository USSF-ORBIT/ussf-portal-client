import React from 'react'
import { GridContainer } from '@trussworks/react-uswds'

import { withErrorLayout } from 'layout/Beta/ErrorLayout/ErrorLayout'
import Logo from 'components/Logo/Logo'

export default function UpdateBrowser() {
  return (
    <>
      <GridContainer containerSize="widescreen">
        <section>
          <Logo noText />

          <h2>I’m sorry, Dave. I’m afraid you have an outdated browser.</h2>

          <h3>
            For a better experience, please keep your internet browser up to
            date or choose from one of the options below:
          </h3>
        </section>
      </GridContainer>
    </>
  )
}

UpdateBrowser.getLayout = (page: React.ReactNode) => withErrorLayout(page, true)

export async function getStaticProps() {
  // no op, forces the page to be static generated
  return {
    props: {},
  }
}
