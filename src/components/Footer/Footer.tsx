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
            <USWDSFooterLogo image={<Logo darkBg />} />
            <br />
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
                        href="https://ussf-orbit.github.io/ussf-portal/"
                        target="_blank"
                        rel="noreferrer noopener">
                        About this portal
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://www.my.af.mil/afp/netstorage/faq/privacy_advisory.html"
                        target="_blank"
                        rel="noreferrer noopener">
                        Privacy Policy
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://dodcio.defense.gov/DoDSection508/Std_Stmt/"
                        target="_blank"
                        rel="noreferrer noopener">
                        Section508.gov
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://comptroller.defense.gov/Budget-Materials/"
                        target="_blank"
                        rel="noreferrer noopener">
                        Budget and Performance
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="http://www.esd.whs.mil/DD/index.html"
                        target="_blank"
                        rel="noreferrer noopener">
                        Orders &amp; Directives
                      </LinkTo>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="grid-col">
                <section className="usa-footer__primary-content usa-footer__primary-content--collapsible">
                  <ul className="usa-list usa-list--unstyled">
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://www.dodig.mil/"
                        target="_blank"
                        rel="noreferrer noopener">
                        Office of the Inspector General
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://www.foia.af.mil/"
                        target="_blank"
                        rel="noreferrer noopener">
                        FOIA Requests
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://www.af.mil/Equal-Opportunity/"
                        target="_blank"
                        rel="noreferrer noopener">
                        No FEAR Act
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://www.usa.gov/"
                        target="_blank"
                        rel="noreferrer noopener">
                        USA.gov
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://www.resilience.af.mil/SAPR/"
                        target="_blank"
                        rel="noreferrer noopener">
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
