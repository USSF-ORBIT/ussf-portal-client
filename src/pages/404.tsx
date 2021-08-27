import { ReactNode } from 'react'
import { Alert } from '@trussworks/react-uswds'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'
import LinkTo from 'components/util/LinkTo/LinkTo'

export default function Custom404() {
  return (
    <>
      <section className={`usa-section padding-top-4 padding-bottom-0`}>
        <div className="grid-container">
          <Alert type="error" heading="Error status">
            404 - Page Not Found
          </Alert>
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-4">
              <div className="padding-top-2">
                <LinkTo className="usa-button usa-button--secondary" href="/">
                  Go Home
                </LinkTo>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

const BetaLayout = (page: ReactNode) => <Layout>{page}</Layout>

BetaLayout.displayName = 'BetaLayout'
Custom404.getLayout = BetaLayout
