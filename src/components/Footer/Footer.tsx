import React from 'react'
import {
  Footer as USWDSFooter,
  Logo as USWDSFooterLogo,
} from '@trussworks/react-uswds'

import styles from './Footer.module.scss'

import Logo from 'components/Logo/Logo'
import LinkTo from 'components/util/LinkTo/LinkTo'

const Footer = () => {
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
            <br />
            <br />
            <LinkTo
              href="https://ussf-orbit.github.io/ussf-portal/"
              target="_blank"
              rel="noreferrer noopener"
              className={styles.madeByLink}
              aria-label="Made with love and code by ORBIT">
              Made with ❤️&nbsp; and{' '}
              <span className="font-body-lg">&lsaquo;&rsaquo;</span> by ORBIT{' '}
              <span className="usa-sr-only">(opens in a new window)</span>
            </LinkTo>
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
                        target="_blank"
                        rel="noreferrer noopener">
                        Privacy Policy
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://dodcio.defense.gov/DoDSection508/Std_Stmt/"
                        target="_blank"
                        rel="noreferrer noopener">
                        Section508.gov
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://comptroller.defense.gov/Budget-Materials/"
                        target="_blank"
                        rel="noreferrer noopener">
                        Budget and Performance
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="http://www.esd.whs.mil/DD/index.html"
                        target="_blank"
                        rel="noreferrer noopener">
                        Orders &amp; Directives
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
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
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://www.foia.af.mil/"
                        target="_blank"
                        rel="noreferrer noopener">
                        FOIA Requests
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://www.af.mil/Equal-Opportunity/"
                        target="_blank"
                        rel="noreferrer noopener">
                        No FEAR Act
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://www.usa.gov/"
                        target="_blank"
                        rel="noreferrer noopener">
                        USA.gov
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="https://www.resilience.af.mil/SAPR/"
                        target="_blank"
                        rel="noreferrer noopener">
                        Sexual Assault Prevention and Response
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
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
