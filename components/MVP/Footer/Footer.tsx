import React from 'react'

import {
  Footer as USWDSFooter,
  FooterNav,
  Logo,
  Grid,
} from '@trussworks/react-uswds'
import classNames from 'classnames'

import styles from './Footer.module.scss'
import LinkTo from 'components/LinkTo/LinkTo'

const Footer = () => {
  const returnToTopLink = (
    <div className="grid-container usa-footer__return-to-top">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a href="#">Return to top</a>
    </div>
  )

  const primaryLinks = [
    { path: 'https://www.vandenberg.spaceforce.mil/', label: 'Vandenberg' },
    {
      path: 'https://www.losangeles.spaceforce.mil/',
      label: 'Los Angeles',
    },
    {
      path: 'https://www.peterson.spaceforce.mil/',
      label: 'Peterson',
    },
    {
      path: 'https://www.buckley.spaceforce.mil/',
      label: 'Buckley',
    },
    {
      path: 'https://www.schriever.spaceforce.mil/',
      label: 'Schriever',
    },
    {
      path: 'https://www.patrick.spaceforce.mil/',
      label: 'Patrick',
    },
  ].map((i) => (
    <LinkTo href={i.path} key={i.path} className="usa-footer__primary-link">
      {i.label}
    </LinkTo>
  ))

  const primaryContent = (
    <FooterNav
      links={primaryLinks}
      aria-label="Footer navigation"
      size="medium"
    />
  )

  const secondaryLinks = [
    { path: 'https://www.spoc.spaceforce.mil/', label: 'SpOC' },
    {
      path: 'https://www.afspc.af.mil/About-Us/Fact-Sheets/Display/Article/1012587/space-and-missile-systems-center/',
      label: 'SMC',
    },
    {
      path: 'https://www.kirtland.af.mil/Units/Space-Rapid-Capabilities-Office/',
      label: 'Space RCO',
    },
    {
      path: 'https://afresearchlab.com/technology/space-vehicles/',
      label: 'AFRL',
    },
  ].map((i) => (
    <LinkTo
      href={i.path}
      key={i.path}
      className="usa-footer__primary-link padding-y-05 display-inline-block">
      {i.label}
    </LinkTo>
  ))

  const socialLinks = [
    {
      path: 'https://www.facebook.com/USSpaceForceDoD/',
      label: 'Facebook',
      className: 'usa-social-link--facebook',
    },
    {
      path: 'https://twitter.com/SpaceForceDoD',
      label: 'Twitter',
      className: 'usa-social-link--twitter',
    },
    {
      path: 'https://www.linkedin.com/company/united-states-space-force',
      label: 'LinkedIn',
      className: 'social-link--linkedin',
    },
  ].map((i) => (
    <LinkTo
      href={i.path}
      key={i.path}
      className={classNames('usa-social-link', i.className)}>
      <span>{i.label}</span>
    </LinkTo>
  ))

  const secondaryContent = (
    <Grid row gap>
      <Logo
        size="medium"
        className="tablet:grid-col-6 flex-align-end"
        image={
          <img
            src="/img/ussf-logo.svg"
            alt="United States Space Force"
            className="usa-footer__logo-img maxw-card-lg"
          />
        }
      />
      <div className="usa-footer__contact-links tablet:grid-col-6">
        <ul className="usa-list--unstyled">
          {secondaryLinks.map((l, i) => (
            <li
              key={`secondaryLink_${i}`}
              className="usa-footer__primary-content">
              {l}
            </li>
          ))}
        </ul>
        <div className="usa-footer__social-links grid-row grid-gap-1 display-flex flex-align-end flex-justify-end margin-top-2">
          <a href="#identifier" className="usa-sr-only">
            Skip social media
          </a>
          {socialLinks.map((l, i) => (
            <div className="grid-col-auto" key={`socialLink_${i}`}>
              {l}
            </div>
          ))}
        </div>
      </div>
    </Grid>
  )

  return (
    <USWDSFooter
      className={styles.Footer}
      returnToTop={returnToTopLink}
      primary={primaryContent}
      secondary={secondaryContent}
    />
  )
}

export default Footer
