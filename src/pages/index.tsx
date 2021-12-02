import { InferGetServerSidePropsType } from 'next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons'
import { CardGroup } from '@trussworks/react-uswds'

import CovidSiteAlert from 'components/MVP/CovidSiteAlert/CovidSiteAlert'
import type { AnnouncementCardProps } from 'components/MVP/AnnouncementCard/AnnouncementCard'
import AnnouncementCard from 'components/MVP/AnnouncementCard/AnnouncementCard'
import LinkTo from 'components/util/LinkTo/LinkTo'
import { useUser } from 'hooks/useUser'
import { requireAuth } from 'lib/requireAuth'

import styles from 'styles/mvp/index.module.scss'

const Home = ({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  useUser(user)

  const manageYourLife = [
    {
      path: 'https://www.defensetravel.dod.mil/site/bahCalc.cfm',
      heading: 'Base housing allowance calculator',
      text: 'Find an area’s housing allowance that helps cover the cost of housing in the private sector.',
    },
    {
      path: 'https://milconnect.dmdc.osd.mil/milconnect',
      heading: 'milConnect',
      text: 'Check your health insurance coverage. Schedule a CAC appointment or update your contact info.',
    },
    {
      path: 'https://www.militaryonesource.mil',
      heading: 'Military OneSource',
      text: 'Get help for many aspects of military life. This includes tax services, spouse employment and deployment tools.',
    },
    {
      path: 'https://move.mil/',
      heading: 'move.mil',
      text: 'Plan and execute your relocation.',
    },
    {
      path: 'https://mypay.dfas.mil',
      heading: 'myPay',
      text: 'View your paycheck, leave balance, and salary.',
    },
  ]

  const workTools = [
    {
      path: 'https://conference.apps.mil/',
      heading: 'Defense Collaboration Services (DCS)',
      text: 'Schedule and attend online web conferences. Record and share meetings. Manage and engage attendees.',
    },
    {
      path: 'https://dtsproweb.defensetravel.osd.mil/dts-app/pubsite/all/view',
      heading: 'Defense Travel System (DTS)',
      text: 'Create authorizations for work travel (TDY), prepare reservations, receive approval and get reimbursed.',
    },
    {
      path: 'http://www.esd.whs.mil/DD/index.html',
      heading: 'DoD Directives and Issuances',
      text: 'Find all the published DoD directives, forms and issuances.',
    },
    {
      path: 'https://dots.dodiis.mil/',
      heading: 'DoDIIS One-way Transfer Service (DOTS)',
      text: 'Send files from a lower classification network to a higher classification network.',
    },
    {
      path: 'https://www.intelink.gov',
      heading: 'Intelink.gov',
      text: 'Intelligence and data: access all the resources of the intelligence community.',
    },
    {
      path: 'https://www.milsuite.mil',
      heading: 'milSuite',
      text: 'Collaborate and create with the milSuite tools.',
    },
  ]

  const guardianIdealAnnouncement: AnnouncementCardProps = {
    heading: <>Read it here – The Guardian Ideal</>,
    tag: 'news',
    bgColor: 'gradient--orange bg-accent-warm-dark',
    cols: true,
    path: '/uploads/Guardian Ideal - FINAL - 1600 17Sept21.pdf',
  }

  const insigniasAnnouncement: AnnouncementCardProps = {
    heading: <>View the new Guardian Enlisted Rank insignia</>,
    tag: 'news',
    bgColor: 'gradient--orange bg-accent-warm-dark',
    cols: true,
    path: '/uploads/US Space Force Enlisted Rank Insig Info Sheet (1).pdf',
  }

  return (
    <>
      <CovidSiteAlert />
      <section
        className={`usa-section padding-top-4 padding-bottom-0 ${styles.home}`}>
        <div className="grid-container">
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-8 usa-prose">
              <CardGroup>
                <AnnouncementCard {...insigniasAnnouncement} />
                <AnnouncementCard {...guardianIdealAnnouncement} />
              </CardGroup>
            </div>
            <div className="tablet:grid-col-4">
              <div className="quick-links usa-prose border-top padding-top-2">
                <h2 className="display-inline-block text-normal font-heading-md">
                  Quick Links
                </h2>
                <ul className="usa-list usa-list--unstyled margin-top-2 font-body-xs">
                  <li>
                    <a className="usa-link" href="https://mypay.dfas.mil/">
                      myPay
                    </a>
                  </li>
                  <li className="margin-top-05">
                    <a
                      className="usa-link"
                      href="https://dtsproweb.defensetravel.osd.mil/dts-app/pubsite/all/view/">
                      DTS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`usa-section padding-top-6 padding-bottom-0 bg-base-lightestx ${styles.home}`}>
        <div className="grid-container usa-prose">
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-8">
              <div className={`${styles.contentLinks}`}>
                <h2 className="font-heading-md text-normal border-top padding-top-2 margin-top-0">
                  Manage Your Life
                </h2>
                <div className="section__links margin-top-3">
                  {manageYourLife.map((i) => (
                    <LinkTo
                      href={i.path}
                      key={i.path}
                      className="section-links__item grid-row">
                      <div className="tablet:grid-col-4">
                        <h3>{i.heading}</h3>
                      </div>
                      <div className="tablet:grid-col-8">
                        <p>{i.text}</p>
                      </div>
                    </LinkTo>
                  ))}
                </div>
              </div>

              <div className={`${styles.contentLinks}`}>
                <h2 className="font-heading-md text-normal border-top padding-top-2 margin-top-10">
                  Work Tools
                </h2>
                <div className="section__links margin-top-3">
                  {workTools.map((i) => (
                    <LinkTo
                      href={i.path}
                      key={i.path}
                      className="section-links__item grid-row">
                      <div className="tablet:grid-col-4">
                        <h3>{i.heading}</h3>
                      </div>
                      <div className="tablet:grid-col-8">
                        <p>{i.text}</p>
                      </div>
                    </LinkTo>
                  ))}
                </div>
              </div>

              <h2 className="font-heading-md text-normal margin-top-10 border-top padding-top-2">
                Learn and Grow
              </h2>
              <div className="grid-row grid-gap margin-top-3">
                <div className="grid-col-4">
                  <div className="education-media bg-base-lightest height-full display-flex flex-align-center flex-justify-center padding-y-4 radius-lg">
                    <FontAwesomeIcon
                      icon={faLaptopCode}
                      className="education-icon education-icon--gradient fas"
                    />
                    <svg width="0" height="0">
                      <linearGradient id="lg" gradientTransform="rotate(-10)">
                        <stop stopColor="#0050d8" offset="0" />
                        <stop stopColor="#00bde3" offset="1" />
                      </linearGradient>
                    </svg>
                  </div>
                </div>
                <div className="grid-col-8 usa-prose">
                  <p className="font-body-md">
                    Start your journey in digital fluency with our{' '}
                    <LinkTo
                      className="usa-link"
                      href="/training-and-education/force-multiplier-program/">
                      Force Multiplier program
                    </LinkTo>
                    .
                  </p>
                  <LinkTo
                    className="usa-button button-pill text-white text-no-underline"
                    href="/training-and-education/">
                    More in Training + Education
                  </LinkTo>
                </div>
              </div>
              <h2 className="font-heading-md text-normal margin-top-10 border-top padding-top-2">
                Service portals
              </h2>
              <div className="portal-links usa-prose margin-top-3 margin-bottom-8">
                <ul className="usa-list usa-list--unstyled display-flex flex-row flex-justify service-logos maxw-mobile">
                  <li>
                    <LinkTo
                      className="usa-link usa-media-link display-flex flex-column flex-align-center"
                      href="https://www.hrcapps.army.mil/portal/">
                      <img src="img/army-logo-png.png" alt="Army" />
                    </LinkTo>
                  </li>
                  <li>
                    <LinkTo
                      className="usa-link usa-media-link display-flex flex-column flex-align-center"
                      href="https://my.navy.mil/">
                      <img src="img/navy-logo-102.png" alt="Navy" />
                    </LinkTo>
                  </li>
                  <li>
                    <LinkTo
                      className="usa-link usa-media-link display-flex flex-column flex-align-center"
                      href="https://www.my.af.mil/">
                      <img src="img/air-force-vector-101.png" alt="Air Force" />
                    </LinkTo>
                  </li>
                  <li>
                    <LinkTo
                      className="usa-link usa-media-link display-flex flex-column flex-align-center"
                      href="https://mol.tfs.usmc.mil/">
                      <img src="img/marines-png-logo.png" alt="Marines" />
                    </LinkTo>
                  </li>
                  <li>
                    <LinkTo
                      className="usa-link usa-media-link display-flex flex-column flex-align-center"
                      href="https://cgportal2.uscg.mil/">
                      <img
                        src="img/Coast-Guard-Emblem-logo.png"
                        alt="Coast Guard"
                      />
                    </LinkTo>
                  </li>
                </ul>
              </div>
            </div>
            <div className="tablet:grid-col-4 usa-prose"></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home

export const getServerSideProps = requireAuth()
