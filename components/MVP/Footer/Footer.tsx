import React from 'react'
import Link from 'next/link'
import {
  Footer as USWDSFooter,
  FooterNav,
  Logo,
  Grid,
  SocialLinks,
} from '@trussworks/react-uswds'
import classNames from 'classnames'

const Footer = () => {
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
    <Link href={i.path} key={i.path}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="usa-footer__primary-link">{i.label}</a>
    </Link>
  ))

  const primaryContent = <FooterNav links={primaryLinks} />

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
    <Link href={i.path} key={i.path}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="usa-footer__primary-link padding-y-05 display-inline-block">
        {i.label}
      </a>
    </Link>
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
    <Link href={i.path} key={i.path}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={classNames('usa-social-link', i.className)}>
        <span>{i.label}</span>
      </a>
    </Link>
  ))

  const secondaryContent = (
    <Grid row gap>
      <Logo
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
        <SocialLinks links={socialLinks} />
      </div>
    </Grid>
  )

  return <USWDSFooter primary={primaryContent} secondary={secondaryContent} />
}

export default Footer
