import {
  GridContainer,
  Grid,
  ProcessList,
  ProcessListItem,
  ProcessListHeading,
} from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRocket } from '@fortawesome/free-solid-svg-icons'

import { useUser } from 'hooks/useUser'

const Accomplishments = () => {
  useUser()

  return (
    <>
      <section className="usa-section bg-about text-white">
        <div className="usa-prose grid-container">
          <span className="text-uppercase text-ls-3 text-accent-about text-bold">
            About us
          </span>
          <h1 className="page-header">Things we’re proud of</h1>
        </div>
      </section>

      <section className="usa-section">
        <GridContainer>
          <Grid row gap>
            <Grid tablet={{ col: 12 }}>
              <div>
                <h2 className="section-header margin-top-0">Accomplishments</h2>
                <ProcessList reversed className="accomplishments-list">
                  <ProcessListItem className="grid-row grid-gap">
                    <Grid tablet={{ col: true }}>
                      <ProcessListHeading type="h4">
                        October 20, 2020
                      </ProcessListHeading>
                      <p className="text-light font-body-lg line-height-body-3 margin-top-05">
                        The first seven professionals enlist directly into the
                        Space Force.
                      </p>
                    </Grid>
                    <Grid
                      tablet={{ col: true }}
                      className="margin-left-neg-2 tablet:margin-left-0">
                      <img
                        className="padding-1 shadow-2"
                        src="/img/201020-X-MF529-0074.jpeg"
                        alt="The Vice Chief of Space Operations Gen. David D. “DT” Thompson swears in the first four Space Force recruits at the Baltimore Military Entrance Processing Station, Fort George Meade, Md."
                      />
                    </Grid>
                  </ProcessListItem>
                  <ProcessListItem className="grid-row grid-gap">
                    <Grid tablet={{ col: true }}>
                      <ProcessListHeading type="h4">
                        June, 2020
                      </ProcessListHeading>
                      <p className="text-light font-body-lg line-height-body-3 margin-top-05">
                        Col. Michael S. Hopkins is nominated to be the first
                        astronaut in the Space Force.
                      </p>
                    </Grid>
                    <Grid
                      tablet={{ col: true }}
                      className="margin-left-neg-2 tablet:margin-left-0">
                      <img
                        className="padding-1 shadow-2"
                        src="/img/hopkins-6-20.jpeg"
                        alt="NASA Astronaut Col. Michael S. Hopkins leaning on a desk."
                      />
                    </Grid>
                  </ProcessListItem>
                  <ProcessListItem className="grid-row grid-gap">
                    <Grid tablet={{ col: true }}>
                      <ProcessListHeading type="h4">
                        March 26, 2020
                      </ProcessListHeading>
                      <p className="text-light font-body-lg line-height-body-3 margin-top-05">
                        First space launch as an independent service. The
                        Advanced Extremely High Frequency (AEHF) satellite was
                        launched by an Atlas V from Cape Canaveral Air Force
                        Station.
                      </p>
                    </Grid>
                    <Grid
                      tablet={{ col: true }}
                      className="margin-left-neg-2 tablet:margin-left-0">
                      <img
                        className="padding-1 shadow-2"
                        src="/img/200326-F-KD758-1007.jpeg"
                        alt="An Atlas V Advanced Extremely High Frequency vehicle number 6 rocket successfully launches from Space Launch Complex-41 at Cape Canaveral Air Force Station, Fla., March 26, 2020."
                      />
                    </Grid>
                  </ProcessListItem>
                  <ProcessListItem className="grid-row grid-gap">
                    <Grid tablet={{ col: true }}>
                      <ProcessListHeading type="h4">
                        December 20th, 2019
                      </ProcessListHeading>
                      <p className="text-light font-body-lg line-height-body-3 margin-top-05">
                        The United States Space Force Act was signed as part of
                        the National Defense Authorization Act for 2020,
                        establishing the Space Force as an independent military
                        branch.
                      </p>
                    </Grid>
                    <Grid
                      tablet={{ col: true }}
                      className="margin-left-neg-2 tablet:margin-left-0">
                      <img
                        className="padding-1 shadow-2"
                        src="/img/Security_Spaceforce_GettyImages-1189672147.jpeg"
                        alt="Defense Secretary Dr. Mark T. Esper attends the National Defense Authorization Act signing by President Donald J. Trump at Joint Base Andrews, Md., Dec. 20, 2019."
                      />
                    </Grid>
                  </ProcessListItem>
                  <ProcessListItem className="grid-row grid-gap">
                    <Grid tablet={{ col: 6 }}>
                      <ProcessListHeading type="h4">
                        February 19, 2019{' '}
                        <FontAwesomeIcon
                          icon={faRocket}
                          className="margin-left-1"
                        />
                      </ProcessListHeading>
                      <p className="text-light font-body-lg line-height-body-3 margin-top-05">
                        Space Policy Directive 4 is signed, directing the DoD to
                        create the Space Force as the fifth and newest branch of
                        the military since 1947.
                      </p>
                    </Grid>
                  </ProcessListItem>
                </ProcessList>
              </div>
            </Grid>
          </Grid>
        </GridContainer>
      </section>
    </>
  )
}

export default Accomplishments
