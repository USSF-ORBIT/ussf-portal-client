import { ReactNode } from 'react'
import {
  GridContainer,
  Accordion,
  Button,
  HeadingLevel,
} from '@trussworks/react-uswds'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'
import styles from './login.module.scss'
import Layout from 'layout/LoginLayout/LoginLayout'
import { useAuthContext } from 'stores/authContext'

const Login = () => {
  const { login } = useAuthContext()

  const contactAccordion: AccordionItemProps[] = [
    {
      headingLevel: 'h4' as HeadingLevel,
      title: 'Contact the Help Desk',
      content: (
        <>
          <p>
            For 24/7 support with a live agent, please contact the Field
            Assistance Service:
          </p>
          <p>
            <b>DNS:</b> 596-5771 opt 7 (Country Code 312)
          </p>
          <p>
            <b>Commercial:</b> (334) 416-5771 opt 7
          </p>
          <p>
            <b>Toll free:</b> 1-877-596-5771 opt 7
          </p>
        </>
      ),
      expanded: false,
      id: 'a1',
    },
  ]

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
            <div className="bg-white padding-4 shadow-1">
              <div className="usa-prose">
                <h1>Space Force Portal Login</h1>
                <p className="usa-intro">
                  Insert your CAC / ECA to begin your login
                </p>
                <Button
                  type="button"
                  className="usa-button button-pill usa-button--big text-white text-no-underline"
                  onClick={login}>
                  Log In
                </Button>
                <p className="font-body-2xs">
                  The security accreditation level of this site is
                  UNCLASSIFIED// FOUO and below. Do not process, store, or
                  transmit information classified above the accreditation level
                  of this system. Privacy Act Information: information accessed
                  through this system must be protected in accordance with the
                  Privacy Act of 1974, as amended, and AFI 33-332.
                </p>

                <Accordion items={contactAccordion} bordered={true} />
              </div>
            </div>
            <section className="page-login--notice usa-prose text-ink margin-top-10 maxw-tabletx">
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
                  The USG routinely intercepts and monitors communications on
                  this IS for purposes including, but not limited to,
                  penetration testing, COMSEC monitoring, network operations and
                  defense, personnel misconduct (PM), law enforcement (LE), and
                  counterintelligence (CI) investigations
                </li>
                <li>
                  At any time, the USG may inspect and seize data stored on this
                  IS.
                </li>
                <li>
                  Communications using, or data stored on, this IS are not
                  private, are subject to routine monitoring, interception, and
                  search, and may be disclosed or used for any USG authorized
                  purpose.
                </li>
                <li>
                  This IS includes security measures (e.g., authentication and
                  access controls) to protect USG interests--not for your
                  personal benefit or privacy.
                </li>
                <li>
                  NOTICE: There is the potential that information presented and
                  exported from the AF Portal contains FOUO or Controlled
                  Unclassified Information (CUI). It is the responsibility of
                  all users to ensure information extracted from the AF Portal
                  is appropriately marked and properly safeguarded. If you are
                  not sure of the safeguards necessary for the information,
                  contact your functional lead or Information Security Officer.
                </li>
                <li>
                  Notwithstanding the above, using this IS does not constitute
                  consent to PM, LE or CI investigative searching or monitoring
                  of the content of privileged communications, or work product,
                  related to personal representation or services by attorneys,
                  psychotherapists, or clergy, and their assistants. Such
                  communications and work product are private and confidential.
                  See User Agreement for details.
                </li>
              </ul>
              <p className="usa-alert__text">Last Modified: 14 OCTOBER 2019</p>
            </section>
          </div>
        </GridContainer>
      </section>
    </div>
  )
}

export default Login

const LoginLayout = (page: ReactNode) => <Layout>{page}</Layout>

LoginLayout.displayName = 'LoginLayout'
Login.getLayout = LoginLayout

// The page title is parsed and displayed in _app.tsx
export async function getStaticProps() {
  return {
    props: {
      pageTitle: 'Log In',
    },
  }
}
