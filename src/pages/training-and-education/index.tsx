import { GridContainer, Grid } from '@trussworks/react-uswds'
import AnnouncementCard from 'components/MVP/AnnouncementCard/AnnouncementCard'
import LinkTo from 'components/util/LinkTo/LinkTo'

const TrainingAndEducation = () => {
  return (
    <>
      <section className="usa-section bg-about text-white">
        <div className="usa-prose grid-container">
          <span className="text-uppercase text-ls-3 text-primary-light text-bold">
            Training and Education
          </span>
          <h1 className="page-header">Learn and Grow</h1>
        </div>
      </section>

      <section className="usa-section">
        <GridContainer>
          <Grid row gap>
            <Grid tablet={{ col: 8 }}>
              <div className="usa-prose">
                <ul className="usa-card-group card-group--feature">
                  <AnnouncementCard
                    heading="Start your journey in digital fluency with our Force Multiplier program."
                    tag="training"
                    bgColor="gradient--blue bg-primary"
                    cols={6}
                    path="/training-and-education/force-multiplier/"
                  />
                </ul>

                <h2 id="digital-fluency" className="section-header">
                  Digital Fluency
                </h2>

                <div className="border-top border-base-lighter padding-y-2">
                  <LinkTo
                    href="/training-and-education/force-multiplier-program"
                    className="usa-link font-body-md">
                    Digital University Force Multiplier Program
                  </LinkTo>
                  <p className="margin-y-0">
                    Start your journey in digital fluency
                  </p>
                </div>
                <div className="border-top border-bottom border-base-lighter padding-y-2">
                  <LinkTo
                    href="https://spacecamp.il2.dsop.io/"
                    className="usa-link font-body-md">
                    Digital Innovation from Space CAMP
                  </LinkTo>
                  <p className="margin-y-0">
                    Space Camp is a software factory focused on development and
                    deployment of Space Force mission applications to the
                    warfighter.
                  </p>
                </div>

                <h2 id="other-training" className="section-header">
                  Other Training
                </h2>
                <div className="border-top border-base-lighter padding-y-2">
                  <LinkTo
                    href="https://www.dau.edu/"
                    className="usa-link font-body-md">
                    Defense Acquisition University
                  </LinkTo>
                </div>
                <div className="border-top border-bottom border-base-lighter padding-y-2">
                  <LinkTo
                    href="https://www2.peterson.af.mil/nssi/"
                    className="usa-link font-body-md">
                    National Security Space Institute
                  </LinkTo>
                </div>
              </div>
            </Grid>
          </Grid>
        </GridContainer>
      </section>
    </>
  )
}

export default TrainingAndEducation
