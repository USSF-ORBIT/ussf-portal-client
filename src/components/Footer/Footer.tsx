import React from 'react'
import {
  Footer as USWDSFooter,
  Logo as USWDSFooterLogo,
} from '@trussworks/react-uswds'

import styles from './Footer.module.scss'
import LinkTo from 'components/util/LinkTo/LinkTo'

const PortalLogo = () => {
  return <img src="/img/ussf-portal.svg" alt="USSF Portal" />
}

const Footer = () => {
  return (
    <USWDSFooter
      className={styles.footer}
      primary={<></>}
      secondary={
        <div className="grid-row grid-gap">
          <div className="grid-col-auto">
            <LinkTo
              href="https://ussf-orbit.github.io/ussf-portal/"
              target="_blank"
              rel="noreferrer noopener">
              <USWDSFooterLogo
                className="flex-justify-center"
                image={<PortalLogo />}
              />
            </LinkTo>
            <br />
            <small>
              ©{new Date().getFullYear()} All rights reserved, USSF Portal
            </small>
          </div>

          <div className="grid-col-fill" />

          <nav className="grid-col-auto usa-footer__nav">
            <div className="grid-row grid-gap">
              <div className="grid-col">
                <section className="usa-footer__primary-content usa-footer__primary-content--collapsible">
                  <ul className="usa-list usa-list--unstyled">
                    <li className="usa-footer__secondary-link">
                      <LinkTo href="/" rel="noreferrer noopener">
                        My Space
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="/sites-and-applications"
                        rel="noreferrer noopener">
                        Sites & Applications
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="/ussf-documentation"
                        rel="noreferrer noopener">
                        USSF Documentation
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo href="/about-us" rel="noreferrer noopener">
                        About the USSF
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="/about-us/orbit-blog"
                        rel="noreferrer noopener">
                        Orbit Blog
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo
                        href="/news-announcements"
                        rel="noreferrer noopener">
                        News & Announcements
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
