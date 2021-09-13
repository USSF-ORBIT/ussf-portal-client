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
                      <LinkTo href="#">Privacy Policy</LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo href="#">Section508.gov Privacy Policy</LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo href="#">Budget and Performance</LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo href="#">Orders &amp; Directives</LinkTo>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="grid-col">
                <section className="usa-footer__primary-content usa-footer__primary-content--collapsible">
                  <ul className="usa-list usa-list--unstyled">
                    <li className="usa-footer__secondary-link">
                      <LinkTo href="#">
                        Freedom of Information Act Requests
                      </LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo href="#">No FEAR Act</LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo href="#">Reports</LinkTo>
                    </li>
                    <li className="usa-footer__secondary-link">
                      <LinkTo href="#">Help &amp; Support</LinkTo>
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
