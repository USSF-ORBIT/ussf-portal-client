import { GridContainer, Grid } from '@trussworks/react-uswds'

import AnnouncementCard from 'components/MVP/AnnouncementCard/AnnouncementCard'
import LinkTo from 'components/util/LinkTo/LinkTo'
import Loader from 'components/Loader'
import { useUser } from 'hooks/useUser'

const AboutUs = () => {
  const { user } = useUser()

  return !user ? (
    <Loader />
  ) : (
    <>
      <section className="usa-section bg-about text-white">
        <div className="usa-prose grid-container">
          <span className="text-uppercase text-ls-3 text-accent-about text-bold">
            About us
          </span>
          <h1 className="page-header">About the Space Force</h1>
        </div>
      </section>

      <section className="usa-section">
        <GridContainer>
          <Grid row gap>
            <Grid tablet={{ col: 8 }}>
              <div className="usa-prose">
                <ul className="usa-card-group card-group--feature">
                  <AnnouncementCard
                    heading="Happy Birthday! 🎉"
                    body="It's been a ONE-derful year!"
                    tag="about"
                    bgColor="birthdayCard"
                    cols={6}
                    path="/about-us/accomplishments/"
                  />
                </ul>

                <h2 id="essential-reading" className="section-header">
                  Essential Reading
                </h2>

                <div className="border-top border-base-lighter padding-y-2">
                  <LinkTo
                    href="https://www.spaceforce.mil/Portals/1/Space%20Capstone%20Publication_10%20Aug%202020.pdf"
                    className="usa-link font-body-md">
                    Space Capstone Publication: Spacepower. Doctrine for Space
                    Forces
                  </LinkTo>
                  <p className="margin-y-0">June 2020</p>
                </div>
                <div className="border-top border-base-lighter padding-y-2">
                  <LinkTo
                    href="https://media.defense.gov/2020/Nov/09/2002531998/-1/-1/0/CSO%20PLANNING%20GUIDANCE.PDF"
                    className="usa-link font-body-md">
                    CSO’s Planning Guidance
                  </LinkTo>
                  <p className="margin-y-0">November 2020</p>
                </div>
                <div className="border-y border-base-lighter padding-y-2">
                  <LinkTo
                    href="/about-us/accomplishments/"
                    className="usa-link font-body-md">
                    Our accomplishments
                  </LinkTo>
                </div>

                <h2 id="mission" className="section-header">
                  Mission
                </h2>
                <p>
                  The USSF is a military service that organizes, trains, and
                  equips space forces in order to protect U.S. and allied
                  interests in space and to provide space capabilities to the
                  joint force. USSF responsibilities include developing military
                  space professionals, acquiring military space systems,
                  maturing the military doctrine for space power, and organizing
                  space forces to present to our Combatant Commands.
                </p>

                <h2 id="activities" className="section-header">
                  Activities
                </h2>
                <p>
                  Read{' '}
                  <LinkTo
                    href="https://www.spaceforce.mil/About-Us/Fact-Sheets/"
                    className="usa-link">
                    fact sheets
                  </LinkTo>{' '}
                  on what the Space Force does.
                </p>

                <h2 id="leadership" className="section-header">
                  Leadership
                </h2>
                <p>
                  <LinkTo
                    href="https://www.spaceforce.mil/About-Us/Leadership/"
                    className="usa-link">
                    Space Force Leadership
                  </LinkTo>
                </p>
                <p>
                  <LinkTo
                    href="https://www.spoc.spaceforce.mil/About-Us/Leadership"
                    className="usa-link">
                    SpOC Leadership
                  </LinkTo>
                </p>
                <p>
                  <LinkTo
                    href="https://www.losangeles.spaceforce.mil/About-Us/Biographies/"
                    className="usa-link">
                    SMC Center Leadership
                  </LinkTo>
                </p>
                <p>
                  <LinkTo
                    href="https://www.peterson.spaceforce.mil/About/Biographies/"
                    className="usa-link">
                    Space Training and Readiness (STAR) Delta Leadership
                  </LinkTo>
                </p>
              </div>
            </Grid>
            <Grid tablet={{ col: 4 }}>
              <div className="blockquote usa-prose">
                <p>
                  “Space is a vital national interest. Activities on land, at
                  sea, in the air, through cyberspace, and in the
                  electromagnetic spectrum all depend on space superiority.
                </p>
                <p>
                  The nation established the U.S. Space Force to ensure freedom
                  of action for the United States in, from, and to space.“
                </p>
                <p className="text-normal text-italic">
                  <strong>Gen. Raymond,</strong> Chief of Space Operations
                </p>

                <h2 className="sidebar-header display-inline-block font-heading-md text-normal margin-top-4 border-0">
                  Rocket launches
                </h2>
                <div className="position-relative">
                  <img
                    className="launch-img"
                    src="/img/launch.jpg"
                    alt="Rocket launch"
                  />
                  <LinkTo
                    href="https://spaceflightnow.com/launch-schedule/"
                    className="launch-schedule-link external-link--alt position-absolute bottom-1 right-0 bg-base hover:bg-ink hover:text-base-lighter text-white padding-x-05">
                    All public launches worldwide
                  </LinkTo>
                </div>

                <p className="font-mono-3xs text-uppercase">
                  <span className="padding-y-2px padding-x-1 radius-pill border border-primary-vivid text-primary-vivid">
                    March 2021
                  </span>
                  &nbsp;
                  <span className="padding-y-2px padding-x-1 radius-pill border border-base text-base">
                    USSF 8
                  </span>
                </p>
                <p className="font-body-3xs">
                  <span className="font-mono-3xs text-bold text-uppercase">
                    Vehicle:
                  </span>{' '}
                  United Launch Alliance Atlas 5
                </p>
                <p className="launch-payload font-body-3xs margin-top-05">
                  <span className="font-mono-3xs text-bold text-uppercase">
                    Payload:
                  </span>{' '}
                  5th and 6th satellites for the Geosynchronous Space
                  Situational Awareness Program.
                </p>

                <div className="launch-border display-block border-top border-base-light margin-top-1 margin-bottom-2" />

                <p className="font-mono-3xs text-uppercase">
                  <span className="padding-y-2px padding-x-1 radius-pill border border-primary-vivid text-primary-vivid">
                    2nd Quarter 2021
                  </span>
                  &nbsp;
                  <span className="padding-y-2px padding-x-1 radius-pill border border-base text-base">
                    USSF 44
                  </span>
                </p>
                <p className="font-body-3xs">
                  <span className="font-mono-3xs text-bold text-uppercase">
                    Vehicle:
                  </span>{' '}
                  Space X Falcon Heavy
                </p>
                <p className="launch-payload font-body-3xs margin-top-05">
                  <span className="font-mono-3xs text-bold text-uppercase">
                    Payload:
                  </span>{' '}
                  Undisclosed
                </p>

                <h2 className="sidebar-header font-heading-md text-normal margin-top-4 border-0">
                  Social media
                </h2>
                <LinkTo
                  href="https://twitter.com/SpaceForceDoD?ref_src=twsrc%5Etfw"
                  className="twitter-timeline"
                  data-height="500">
                  Tweets by SpaceForceDoD
                </LinkTo>
                <script
                  async
                  src="https://platform.twitter.com/widgets.js"
                  charSet="utf-8"></script>
              </div>
            </Grid>
          </Grid>
        </GridContainer>
      </section>
    </>
  )
}

export default AboutUs
