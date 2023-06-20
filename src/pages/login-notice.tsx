import { ReactNode } from 'react'
import { GridContainer } from '@trussworks/react-uswds'
import styles from './login/login.module.scss'
import LinkTo from 'components/util/LinkTo/LinkTo'
import Layout from 'layout/LoginLayout/LoginLayout'

const LoginNotice = () => {
  return (
    <div className={styles.loginPage}>
      <section className="usa-section padding-top-3">
        <GridContainer>
          <div className="display-flex flex-justify-center">
            <img
              className="maxw-10"
              src="/img/ussf-logo-vert.svg"
              alt="Space Force"
            />
          </div>
          <div className="display-flex flex-column flex-align-center margin-top-4">
            <div className="maxw-tablet shadow-1">
              <div className="usa-alert usa-alert--info">
                <div className="usa-alert__body usa-prose">
                  <h3 className="usa-alert__heading font-heading-xl text-bold">
                    Notice
                  </h3>
                  <p className="usa-alert__text usa-intro">
                    You are accessing a U.S. Government (USG) Information System
                    (IS) that is provided for USG-authorized use only.
                  </p>
                  <p className="usa-alert__text">
                    By using this IS (which includes any device attached to this
                    IS), you consent to the following conditions:
                  </p>
                  <ul className="font-body-2xs">
                    <li>
                      The USG routinely intercepts and monitors communications
                      on this IS for purposes including, but not limited to,
                      penetration testing, COMSEC monitoring, network operations
                      and defense, personnel misconduct (PM), law enforcement
                      (LE), and counterintelligence (CI) investigations
                    </li>
                    <li>
                      At any time, the USG may inspect and seize data stored on
                      this IS.
                    </li>
                    <li>
                      Communications using, or data stored on, this IS are not
                      private, are subject to routine monitoring, interception,
                      and search, and may be disclosed or used for any USG
                      authorized purpose.
                    </li>
                    <li>
                      This IS includes security measures (e.g., authentication
                      and access controls) to protect USG interests--not for
                      your personal benefit or privacy.
                    </li>
                    <li>
                      NOTICE: There is the potential that information presented
                      and exported from the AF Portal contains FOUO or
                      Controlled Unclassified Information (CUI). It is the
                      responsibility of all users to ensure information
                      extracted from the AF Portal is appropriately marked and
                      properly safeguarded. If you are not sure of the
                      safeguards necessary for the information, contact your
                      functional lead or Information Security Officer.
                    </li>
                    <li>
                      Notwithstanding the above, using this IS does not
                      constitute consent to PM, LE or CI investigative searching
                      or monitoring of the content of privileged communications,
                      or work product, related to personal representation or
                      services by attorneys, psychotherapists, or clergy, and
                      their assistants. Such communications and work product are
                      private and confidential. See User Agreement for details.
                    </li>
                  </ul>
                  <p className="usa-alert__text">
                    Last Modified: 14 OCTOBER 2019
                  </p>
                  <LinkTo
                    href="/login"
                    className="usa-button button-pill usa-button--big text-white text-no-underline">
                    I agree
                  </LinkTo>
                </div>
              </div>
            </div>
          </div>
        </GridContainer>
      </section>
    </div>
  )
}

export default LoginNotice

const LoginLayout = (page: ReactNode) => <Layout>{page}</Layout>

LoginLayout.displayName = 'LoginLayout'
LoginNotice.getLayout = LoginLayout

// The page title is parsed and displayed in _app.tsx
export const getStaticProps = async () => {
  return {
    props: {
      pageTitle: 'Login Notice',
    },
  }
}
