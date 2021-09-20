import { ReactNode } from 'react'
import { Alert, Button } from '@trussworks/react-uswds'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'
import { useBetaContext } from 'stores/betaContext'

const Home = () => {
  const { leaveBeta } = useBetaContext()

  return (
    <>
      <section className={`usa-section padding-top-0`}>
        <div className="grid-container">
          <Alert type="success" heading="Success">
            Welcome to the Beta USSF Portal. This site is under development and
            is subject to change without notice.
          </Alert>
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-4">
              <div className="padding-top-2">
                <Button
                  type="button"
                  accentStyle="warm"
                  className="usa-button"
                  onClick={leaveBeta}>
                  Leave Beta
                </Button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </>
  )
}

export default Home

const BetaLayout = (page: ReactNode) => <Layout>{page}</Layout>

BetaLayout.displayName = 'BetaLayout'
Home.getLayout = BetaLayout
