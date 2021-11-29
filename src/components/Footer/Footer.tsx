import React from 'react'
import {
  Footer as USWDSFooter,
  Logo as USWDSFooterLogo,
} from '@trussworks/react-uswds'

import styles from './Footer.module.scss'

import Logo from 'components/Logo/Logo'
import LinkTo from 'components/util/LinkTo/LinkTo'

const Footer = () => {
  // PROTOTYPE: Disabling this rule while this component is used for prototyping only!
  /* eslint-disable jsx-a11y/anchor-is-valid */

  return (
    <USWDSFooter
      className={styles.footer}
      primary={<></>}
      secondary={
        <div className="grid-row grid-gap">
          <div className="grid-col-auto">
            <USWDSFooterLogo image={<Logo abbreviated />} />
            <small>©2021 All rights reserved, ORBIT Space Force</small>
          </div>

          <div className="grid-col-fill" />

          <nav className="grid-col-auto usa-footer__nav">
            <div className="grid-row grid-gap">
              <div className="grid-col">
                <section className="usa-footer__primary-content usa-footer__primary-content--collapsible">
                  <ul className="usa-list usa-list--unstyled">
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://www.my.af.mil/afp/netstorage/faq/privacy_advisory.html"
                        target="_blank">
                        Privacy Policy
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://dodcio.defense.gov/DoDSection508/Std_Stmt/"
                        target="_blank">
                        Section508.gov
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://comptroller.defense.gov/Budget-Materials/"
                        target="_blank">
                        Budget and Performance
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="http://www.esd.whs.mil/DD/index.html"
                        target="_blank">
                        Orders &amp; Directives
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo href="https://www.dodig.mil/" target="_blank">
                        Office of the Inspector General
                      </LinkTo>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="grid-col">
                <section className="usa-footer__primary-content usa-footer__primary-content--collapsible">
                  <ul className="usa-list usa-list--unstyled">
                    <li className="usa-footer__secondary-link">
                      <LinkTo href="https://www.foia.af.mil/" target="_blank">
                        Freedom of Information Act Requests
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://www.af.mil/Equal-Opportunity/"
                        target="_blank">
                        No FEAR Act
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo href="https://www.usa.gov/" target="_blank">
                        USA.gov
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo href="#">Help &amp; Support</LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://www.resilience.af.mil/SAPR/"
                        target="_blank">
                        Sexual Assualt Prevention and Response
                      </LinkTo>
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </nav>
        </div>
      }
    />
  )
}

export default Footer
