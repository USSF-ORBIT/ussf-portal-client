import React from 'react'
import {
  Footer as USWDSFooter,
  Grid,
  GridContainer,
} from '@trussworks/react-uswds'
import Link from 'next/link'
import FeedbackCard from '../FeedbackCard/FeedbackCard'
import styles from './Footer.module.scss'

const PortalLogo = () => {
  return <img src="/img/ussf-portal.svg" alt="USSF Portal" />
}

const returnToTop = (
  <div className="usa-footer__return-to-top width-full margin-x-0 maxw-none">
    <GridContainer>
      <a href="#main-content">Return to top</a>
    </GridContainer>
  </div>
)

const Footer = () => {
  return (
    <USWDSFooter
      returnToTop={returnToTop}
      className={styles.footer}
      primary={<></>}
      secondary={
        <Grid row gap className={`flex-justify` + ` ` + styles.footerWrap}>
          <Grid row gap col="auto">
            <PortalLogo />
            <Grid col role="navigation" aria-labelledby="portal">
              <h3 id="portal">Space Force Portal</h3>
              <Grid row gap className={styles.miniRow}>
                <Grid col className={styles.miniCol}>
                  <ul className="usa-list usa-list--unstyled">
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
                </Grid>
                <Grid col className={styles.miniCol}>
                  <ul className="usa-list usa-list--unstyled ">
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
                  </ul>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid col="auto" className={styles.border}></Grid>
          <Grid col="auto" role="navigation" aria-labelledby="ql">
            <h3 id="ql">Quick Links</h3>
            <Grid row gap className={styles.miniRow}>
              <Grid col className={styles.miniCol}>
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
                </ul>
              </Grid>
              <Grid col className={styles.miniCol}>
                <ul className="usa-list usa-list--unstyled">
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
              </Grid>
            </Grid>
          </Grid>
          <Grid col="auto" className={styles.border}></Grid>
          <Grid col="auto">
            <FeedbackCard />
            <p> ©{new Date().getFullYear()} All rights reserved, USSF Portal</p>
          </Grid>
        </Grid>
      }
    />
  )
}

export default Footer
