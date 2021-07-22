import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopCode } from '@fortawesome/free-solid-svg-icons'
import { CardGroup } from '@trussworks/react-uswds'
import CovidSiteAlert from 'components/MVP/CovidSiteAlert/CovidSiteAlert'
import type { AnnouncementCardProps } from 'components/MVP/AnnouncementCard/AnnouncementCard'
import AnnouncementCard from 'components/MVP/AnnouncementCard/AnnouncementCard'
import ContentListGroup from 'components/MVP/ContentList/ContentListGroup'
import ContentListItem from 'components/MVP/ContentList/ContentListItem'
import styles from 'styles/mvp/index.module.scss'
const Home = () => {
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

  const physicalAssessment: AnnouncementCardProps = {
    heading: 'Physical fitness assessments will resume July 1st 2021',
    tag: 'news',
    bgColor: 'gradient--orange bg-accent-warm-dark',
    cols: true,
    path: 'https://www.spaceforce.mil/News/Article/2525699/pt-test-pushed-to-july-updates-to-scoring-physical-components-ahead/',
  }

  const videoCSO: AnnouncementCardProps = {
    heading: "Video from the Chief of Space Operations's latest townhall",
    tag: 'news',
    bgColor: 'gradient--orange bg-accent-warm-dark',
    cols: true,
    path: 'https://www.milsuite.mil/video/watch/video/40363',
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
                <AnnouncementCard {...physicalAssessment} />
                <AnnouncementCard {...videoCSO} />
              </CardGroup>
            </div>
            <div className="tablet:grid-col-4">
              <div className="quick-links usa-prose border-top padding-top-2">
                <h2 className="display-inline-block text-normal font-heading-md">
                  Quick Links
                </h2>
                <ul className="usa-list usa-list--unstyled margin-top-2 font-body-xs">
                  <li>
                    <a href="https://mypay.dfas.mil/">myPay</a>
                  </li>
                  <li className="margin-top-05">
                    <a href="https://dtsproweb.defensetravel.osd.mil/dts-app/pubsite/all/view/">
                      DTS
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="usa-section padding-top-6 padding-bottom-0 bg-base-lightestx">
        <div className="grid-container usa-prose">
          <div className="grid-row grid-gap">
            <ContentListGroup heading="Manage Your Life">
              {manageYourLife.map((i) => (
                <ContentListItem heading={i.heading} path={i.path} key={i.path}>
                  {i.text}
                </ContentListItem>
              ))}
            </ContentListGroup>

            <ContentListGroup heading="Work Tools" className="margin-top-10">
              {workTools.map((i) => (
                <ContentListItem heading={i.heading} path={i.path} key={i.path}>
                  {i.text}
                </ContentListItem>
              ))}
            </ContentListGroup>

            {/* Training and Education */}

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
              <div className="grid-col-8">
                <p className="font-body-md margin-top-0">
                  Start your journey in digital fluency with our{' '}
                  <a href="/training-and-education/force-multiplier-program/">
                    Force Multiplier program
                  </a>
                  .
                </p>
                <a
                  className="usa-button text-white text-no-underline"
                  href="/training-and-education/">
                  More in Training + Education
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
