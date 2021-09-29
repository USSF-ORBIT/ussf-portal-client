import { GridContainer, Grid } from '@trussworks/react-uswds'
import LinkTo from 'components/util/LinkTo/LinkTo'

const ForceMultiplierProgram = () => {
  return (
    <>
      <section className="banner usa-section bg-training text-white">
        <div className="usa-prose grid-container">
          <span className="text-uppercase text-ls-3 text-primary-light text-bold">
            Training and Education
          </span>
          <h1 className="page-header">Become Digitally Fluent</h1>
          <p className="usa-intro text-light font-heading-lg">
            The Digital University Force Multiplier Program
          </p>
          <LinkTo
            className="usa-button button-pill usa-button--big external-link--alt text-white text-no-underline"
            href="http://digitalu.udemy.com">
            Register
          </LinkTo>
        </div>
      </section>

      <section className="usa-section">
        <GridContainer>
          <Grid row gap>
            <Grid tablet={{ col: 8 }}>
              <div className="usa-prose">
                <p className="usa-intro">
                  To be successful in space operations, we must all acquire and
                  use cutting-edge digital skills. This service-wide program
                  introduces and builds digital fluency in four key areas.
                </p>
                <Grid row className="margin-top-8 training">
                  <Grid
                    tablet={{ col: 8 }}
                    className="usa-prose bg-gray-cool-3 padding-3">
                    <div className="squares position-relative padding-top-5">
                      {/* We can only access this FA Pro icon using the compiled css, not the FontAwesome component */}
                      <i className="fas fa-triangle position-absolute top-0 z-500 text-blue-20 left-1"></i>
                      <i className="fas fa-triangle position-absolute z-top top-1 text-primary-vivid"></i>
                    </div>
                    <h2 className="training-heading">
                      Introduction to Modern Infrastructure
                    </h2>
                    <p className="text-base-darker">
                      Learn about the capabilities of modern infrastructure.
                      Understand the benefits they can bring our service.
                    </p>
                  </Grid>
                  <Grid
                    tablet={{ col: 4 }}
                    className="usa-prose bg-primary-vivid text-white padding-3">
                    <h3 className="training-heading text-uppercase font-heading-3xs text-ls-3">
                      Topics
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      cloud, microservices
                    </p>
                    <hr className="opacity-30" />
                    <h3 className="training-heading text-uppercase font-heading-3xs text-ls-3">
                      Duration
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      56 minutes
                    </p>
                  </Grid>
                </Grid>

                <Grid row className="margin-top-4">
                  <Grid
                    tablet={{ col: 8 }}
                    className="usa-prose bg-gray-cool-3 padding-3">
                    <div className="squares position-relative padding-top-5">
                      <i className="fas fa-circle position-absolute top-0 z-500 text-blue-20 left-1"></i>
                      <i className="fas fa-circle position-absolute z-top top-1 text-primary-vivid"></i>
                    </div>
                    <h2 className="training-heading">
                      Digital Product Development
                    </h2>
                    <p className="text-base-darker">
                      Learn how digital products that serve the needs of the
                      user and the mission are built.
                    </p>
                  </Grid>
                  <Grid
                    tablet={{ col: 4 }}
                    className="usa-prose bg-primary-vivid text-white padding-3">
                    <h3 className="training-heading text-uppercase font-heading-3xs text-ls-3">
                      Topics
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      user-centered design, DevOps
                    </p>
                    <hr className="opacity-30" />
                    <h3 className="training-heading text-uppercase font-heading-3xs text-ls-3">
                      Duration
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      2 hours, 20 minutes
                    </p>
                  </Grid>
                </Grid>
                <Grid row className="margin-top-4">
                  <Grid
                    tablet={{ col: 8 }}
                    className="usa-prose bg-gray-cool-3 padding-3">
                    <div className="squares position-relative padding-top-5">
                      <i className="fas fa-square position-absolute top-0 z-500 text-blue-20 left-1"></i>
                      <i className="fas fa-square position-absolute z-top top-1 text-primary-vivid"></i>
                    </div>
                    <h2 className="training-heading">
                      Data Science and Artificial Intelligence
                    </h2>
                    <p className="text-base-darker">
                      Learn how we can analyze raw data using data science and
                      artificial intelligence to create a warfighting advantage.
                    </p>
                  </Grid>
                  <div className="tablet:grid-col-4 usa-prose bg-primary-vivid text-white padding-3">
                    <h3 className="training-heading text-uppercase font-heading-3xs text-ls-3">
                      Topics
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      artificial intelligence
                    </p>
                    <hr className="opacity-30" />
                    <h3 className="training-heading training-heading text-uppercase font-heading-3xs text-ls-3">
                      Duration
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      1 hour, 43 minutes
                    </p>
                  </div>
                </Grid>
                <Grid row className="margin-top-4">
                  <Grid
                    tablet={{ col: 8 }}
                    className="usa-prose bg-gray-cool-3 padding-3">
                    <div className="squares position-relative padding-top-5">
                      {/* We can only access this FA Pro icon using the compiled css, not the FontAwesome component */}
                      <i className="fas fa-hexagon position-absolute top-0 z-500 text-blue-20 left-1"></i>
                      <i className="fas fa-hexagon position-absolute z-top top-1 text-primary-vivid"></i>
                    </div>
                    <h2 className="training-heading">
                      Cybersecurity in the DOD
                    </h2>
                    <p className="text-base-darker">
                      Get tactical knowledge of how cybersecurity is protecting
                      our space enterprise networks from threats.
                    </p>
                  </Grid>
                  <div className="tablet:grid-col-4 usa-prose bg-primary-vivid text-white padding-3">
                    <h3 className="training-heading training-heading text-uppercase font-heading-3xs text-ls-3">
                      Topics
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      information security management fundamentals, network
                      security
                    </p>
                    <hr className="opacity-30" />
                    <h3 className="training-heading training-heading text-uppercase font-heading-3xs text-ls-3">
                      Duration
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      2 hours, 32 minutes
                    </p>
                  </div>
                </Grid>
              </div>
            </Grid>
            <Grid
              tablet={{ col: 4 }}
              className="margin-top-4 tablet:margin-top-0">
              <div className="training__sidebar bg-base-lightest usa-prose padding-3 font-body-2xs">
                <h3 className="font-heading-sm">HOW TO REGISTER</h3>
                <p>
                  Go to{' '}
                  <LinkTo className="usa-link" href="http://digitalu.udemy.com">
                    digitalu.udemy.com
                  </LinkTo>{' '}
                  and create an account using your .mil email address.
                </p>
                <h3 className="font-heading-sm">
                  LEARN AT YOUR PACE, FROM ANYWHERE
                </h3>
                <ul className="margin-left-neg-1">
                  <li>
                    You can complete the courses at your own pace from work or
                    home
                  </li>
                  <li>
                    Courses can be started and stopped, and progress is tracked
                    between devices and locations.
                  </li>
                  <li>
                    Courses are not required. But, you are strongly encouraged
                    to complete the courses for each force multiplier.
                  </li>
                </ul>
                <h3 className="font-heading-sm">COURSE COMPLETION</h3>
                <p>
                  Courses are registered as completed when you’ve viewed all
                  sections of the course assigned to you.
                </p>
                <h3 className="font-heading-sm">HOW TO GET HELP</h3>
                <p>
                  For questions about the Force Multiplier program, or issues
                  getting registered, email{' '}
                  <LinkTo className="usa-link" href="mailto:digitalu@us.af.mil">
                    digitalu@us.af.mil
                  </LinkTo>
                  .
                </p>
                <p>
                  For technical support issues with the Udemy website, email{' '}
                  <LinkTo
                    className="usa-link"
                    href="mailto:ufbsupport@udemy.com">
                    ufbsupport@udemy.com
                  </LinkTo>
                  .
                </p>
              </div>
            </Grid>
          </Grid>
        </GridContainer>
      </section>
    </>
  )
}

export default ForceMultiplierProgram
