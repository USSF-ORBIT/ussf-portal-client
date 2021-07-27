import { GridContainer, Grid } from '@trussworks/react-uswds'
import AnnouncementCard from 'components/MVP/AnnouncementCard/AnnouncementCard'
import LinkTo from 'components/util/LinkTo/LinkTo'

const TrainingAndEducation = () => {
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
        </div>
      </section>

      <section className="usa-section">
        <div className="grid-container">
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-8">
              <div className="usa-prose">
                <p className="usa-intro">
                  To be successful in space operations, we must all acquire and
                  use cutting-edge digital skills. This service-wide program
                  introduces and builds digital fluency in four key areas.
                </p>
                <div className="grid-row margin-top-8">
                  <div className="tablet:grid-col-8 usa-prose bg-gray-cool-3 padding-3">
                    <div className="squares position-relative padding-top-5">
                      <i className="fas fa-triangle position-absolute top-0 z-500 text-blue-20 left-1"></i>
                      <i className="fas fa-triangle position-absolute z-top top-1 text-primary-vivid"></i>
                    </div>
                    <h2 className="text-no-uppercase text-ls-auto text-bold">
                      Introduction to Modern Infrastructure
                    </h2>
                    <p className="text-base-darker">
                      Learn about the capabilities of modern infrastructure.
                      Understand the benefits they can bring our service.
                    </p>
                  </div>
                  <div className="tablet:grid-col-4 usa-prose bg-primary-vivid text-white padding-3">
                    <h3 className="text-uppercase font-heading-3xs text-ls-3">
                      Topics
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      cloud, microservices
                    </p>
                    <hr className="opacity-30" />
                    <h3 className="text-uppercase font-heading-3xs text-ls-3">
                      Duration
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      56 minutes
                    </p>
                  </div>
                </div>
                <div className="grid-row margin-top-4">
                  <div className="tablet:grid-col-8 usa-prose bg-gray-cool-3 padding-3">
                    <div className="squares position-relative padding-top-5">
                      <i className="fas fa-circle position-absolute top-0 z-500 text-blue-20 left-1"></i>
                      <i className="fas fa-circle position-absolute z-top top-1 text-primary-vivid"></i>
                    </div>
                    <h2 className="text-no-uppercase text-ls-auto text-bold">
                      Digital Product Development
                    </h2>
                    <p className="text-base-darker">
                      Learn how digital products that serve the needs of the
                      user and the mission are built.
                    </p>
                  </div>
                  <div className="tablet:grid-col-4 usa-prose bg-primary-vivid text-white padding-3">
                    <h3 className="text-uppercase font-heading-3xs text-ls-3">
                      Topics
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      user-centered design, DevOps
                    </p>
                    <hr className="opacity-30" />
                    <h3 className="text-uppercase font-heading-3xs text-ls-3">
                      Duration
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      2 hours, 20 minutes
                    </p>
                  </div>
                </div>
                <div className="grid-row margin-top-4">
                  <div className="tablet:grid-col-8 usa-prose bg-gray-cool-3 padding-3">
                    <div className="squares position-relative padding-top-5">
                      <i className="fas fa-square position-absolute top-0 z-500 text-blue-20 left-1"></i>
                      <i className="fas fa-square position-absolute z-top top-1 text-primary-vivid"></i>
                    </div>
                    <h2 className="text-no-uppercase text-ls-auto text-bold">
                      Data Science and Artificial Intelligence
                    </h2>
                    <p className="text-base-darker">
                      Learn how we can analyze raw data using data science and
                      artificial intelligence to create a warfighting advantage.
                    </p>
                  </div>
                  <div className="tablet:grid-col-4 usa-prose bg-primary-vivid text-white padding-3">
                    <h3 className="text-uppercase font-heading-3xs text-ls-3">
                      Topics
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      artificial intelligence
                    </p>
                    <hr className="opacity-30" />
                    <h3 className="text-uppercase font-heading-3xs text-ls-3">
                      Duration
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      1 hour, 43 minutes
                    </p>
                  </div>
                </div>
                <div className="grid-row margin-top-4">
                  <div className="tablet:grid-col-8 usa-prose bg-gray-cool-3 padding-3">
                    <div className="squares position-relative padding-top-5">
                      <i className="fas fa-hexagon position-absolute top-0 z-500 text-blue-20 left-1"></i>
                      <i className="fas fa-hexagon position-absolute z-top top-1 text-primary-vivid"></i>
                    </div>
                    <h2 className="text-no-uppercase text-ls-auto text-bold">
                      Cybersecurity in the DOD
                    </h2>
                    <p className="text-base-darker">
                      Get tactical knowledge of how cybersecurity is protecting
                      our space enterprise networks from threats.
                    </p>
                  </div>
                  <div className="tablet:grid-col-4 usa-prose bg-primary-vivid text-white padding-3">
                    <h3 className="text-uppercase font-heading-3xs text-ls-3">
                      Topics
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      information security management fundamentals, network
                      security
                    </p>
                    <hr className="opacity-30" />
                    <h3 className="text-uppercase font-heading-3xs text-ls-3">
                      Duration
                    </h3>
                    <p className="margin-top-05 text-white font-body-3xs">
                      2 hours, 32 minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="tablet:grid-col-4 margin-top-4 tablet:margin-top-0">
              <div className="training__sidebar bg-base-lightest usa-prose padding-3 font-body-2xs">
                <h3 className="font-heading-sm">HOW TO REGISTER</h3>
                <p>
                  Go to{' '}
                  <a href="http://digitalu.udemy.com">digitalu.udemy.com</a> and
                  create an account using your .mil email address.
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
                  <a href="mailto:digitalu@us.af.mil">digitalu@us.af.mil</a>.
                </p>
                <p>
                  For technical support issues with the Udemy website, email{' '}
                  <a href="mailto:ufbsupport@udemy.com">ufbsupport@udemy.com</a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
        `
      </section>
    </>
  )
}

export default TrainingAndEducation
