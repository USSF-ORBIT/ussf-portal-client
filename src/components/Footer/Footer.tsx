import React from 'react'
import {
  Footer as USWDSFooter,
  Logo as USWDSFooterLogo,
} from '@trussworks/react-uswds'
import Link from 'next/link'
import styles from './Footer.module.scss'

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
            <USWDSFooterLogo
              className="flex-justify-center"
              image={<PortalLogo />}
            />
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
                      <Link href="/" rel="noreferrer noopener">
                        My Space
                      </Link>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <Link
                        href="/sites-and-applications"
                        rel="noreferrer noopener">
                        Sites & Applications
                      </Link>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <Link
                        href="/ussf-documentation"
                        rel="noreferrer noopener">
                        USSF Documentation
                      </Link>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <Link href="/about-us" rel="noreferrer noopener">
                        About the USSF
                      </Link>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <Link
                        href="/about-us/orbit-blog"
                        rel="noreferrer noopener">
                        Orbit Blog
                      </Link>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <Link
                        href="/news-announcements"
                        rel="noreferrer noopener">
                        News & Announcements
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="grid-col">
                <section className="usa-footer__primary-content usa-footer__primary-content--collapsible">
                  <ul className="usa-list usa-list--unstyled">
                    <li className="usa-footer__secondary-link">
                      <Link
                        href="https://www.my.af.mil/afp/netstorage/faq/privacy_advisory.html"
                        target="_blank"
                        rel="noreferrer noopener">
                        Privacy Policy
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </Link>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <Link
                        href="https://dodcio.defense.gov/DoDSection508/Std_Stmt/"
                        target="_blank"
                        rel="noreferrer noopener">
                        Section508.gov
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </Link>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <Link
                        href="https://comptroller.defense.gov/Budget-Materials/"
                        target="_blank"
                        rel="noreferrer noopener">
                        Budget and Performance
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </Link>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <Link
                        href="http://www.esd.whs.mil/DD/index.html"
                        target="_blank"
                        rel="noreferrer noopener">
                        Orders &amp; Directives
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </Link>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="grid-col">
                <section className="usa-footer__primary-content usa-footer__primary-content--collapsible">
                  <ul className="usa-list usa-list--unstyled">
                    <li className="usa-footer__secondary-link">
                      <Link
                        href="https://www.dodig.mil/"
                        target="_blank"
                        rel="noreferrer noopener">
                        Office of the Inspector General
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </Link>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <Link
                        href="https://www.foia.af.mil/"
                        target="_blank"
                        rel="noreferrer noopener">
                        FOIA Requests
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </Link>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <Link
                        href="https://www.af.mil/Equal-Opportunity/"
                        target="_blank"
                        rel="noreferrer noopener">
                        No FEAR Act
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </Link>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <Link
                        href="https://www.usa.gov/"
                        target="_blank"
                        rel="noreferrer noopener">
                        USA.gov
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </Link>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <Link
                        href="https://www.resilience.af.mil/SAPR/"
                        target="_blank"
                        rel="noreferrer noopener">
                        Sexual Assault Prevention and Response
                        <span className="usa-sr-only">
                          (opens in a new window)
                        </span>
                      </Link>
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
