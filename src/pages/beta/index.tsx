import { ReactNode } from 'react'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'
import { Alert } from '@trussworks/react-uswds'
import router from 'next/router'

const Home = () => {
  const deleteCookie = async () => {
    await fetch('http://localhost:3000/api/beta/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    router.push('/')
  }
  return (
    <>
      <section className={`usa-section padding-top-4 padding-bottom-0`}>
        <div className="grid-container">
          <Alert type="success" heading="Success status">
            Welcome to the Beta USSF Portal. This site is under development and
            is subject to change without notice.
          </Alert>
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-4">
              <div className="quick-links usa-prose border-top padding-top-2">
                <h2 className="display-inline-block text-normal font-heading-md">
                  Beta Quick Links
                </h2>
                <ul className="usa-list usa-list--unstyled margin-top-2 font-body-xs">
                  <li>
                    <button type="button" onClick={deleteCookie}>
                      Leave the Beta
                    </button>
                  </li>
                  <li>
                    <a href="https://mypay.dfas.mil/">myPay</a>
                  </li>
                  <li className="margin-top-05">
                    <a href="https://dtsproweb.defensetravel.osd.mil/dts-app/pubsite/all/view/">
                      DTS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

const BetaLayout = (page: ReactNode) => <Layout>{page}</Layout>

BetaLayout.displayName = 'BetaLayout'
Home.getLayout = BetaLayout
