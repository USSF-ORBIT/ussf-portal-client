import { Grid } from '@trussworks/react-uswds'
import { withPageLayout } from 'layout/DefaultLayout/PageLayout'
import LinkTo from 'components/util/LinkTo/LinkTo'
import styles from 'styles/pages/aboutUs.module.scss'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'

const AboutUs = () => {
  const { user } = useUser()

  return !user ? (
    <Loader />
  ) : (
    <div className={styles.aboutUsPage}>
      <Grid row gap>
        <Grid tablet={{ col: 8 }}>
          <div>
            <div>
              <h3 id="mission">Mission</h3>
              <p>
                The USSF is a military service that organizes, trains, and
                equips space forces in order to protect U.S. and allied
                interests in space and to provide space capabilities to the
                joint force. USSF responsibilities include developing military
                space professionals, acquiring military space systems, maturing
                the military doctrine for space power, and organizing space
                forces to present to our Combatant Commands.
              </p>
            </div>

            <div>
              <h3 id="leadership">Leadership</h3>
              <ul>
                <li>
                  <LinkTo
                    target="_blank"
                    rel="noreferrer noopener"
                    href="https://www.spaceforce.mil/About-Us/Leadership/">
                    Space Force Leadership
                  </LinkTo>
                </li>
                <li>
                  <LinkTo
                    target="_blank"
                    rel="noreferrer noopener"
                    href="https://www.spoc.spaceforce.mil/About-Us/Leadership">
                    SpOC Leadership
                  </LinkTo>
                </li>
                <li>
                  <LinkTo
                    target="_blank"
                    rel="noreferrer noopener"
                    href="https://www.losangeles.spaceforce.mil/About-Us/Biographies/">
                    SMC Center Leadership
                  </LinkTo>
                </li>
                <li>
                  <LinkTo
                    target="_blank"
                    rel="noreferrer noopener"
                    href="https://www.peterson.spaceforce.mil/About-Us/Biographies/">
                    Space Training and Readiness (STAR) Delta Leadership
                  </LinkTo>
                </li>
              </ul>
            </div>
          </div>
        </Grid>
        <Grid tablet={{ col: 4 }} className={styles.sidebar}>
          <div>
            <figure>
              <blockquote>
                <p>
                  “Space is a vital national interest. Activities on land, at
                  sea, in the air, through cyberspace, and in the
                  electromagnetic spectrum all depend on space superiority.
                </p>
                <p>
                  The nation established the U.S. Space Force to ensure freedom
                  of action for the United States in, from, and to space.”
                </p>
              </blockquote>
              <figcaption>
                <strong>Gen. Raymond</strong>, Chief of Space Operations
              </figcaption>
            </figure>
          </div>
          <div>
            <h3>Social media</h3>
            <ul>
              <li>
                <LinkTo
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://twitter.com/SpaceForceDoD?ref_src=twsrc%5Etfw"
                  data-height="500">
                  Tweets by SpaceForceDoD
                </LinkTo>
              </li>
            </ul>

            <script
              async
              src="https://platform.twitter.com/widgets.js"></script>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default AboutUs

AboutUs.getLayout = (page: React.ReactNode) =>
  withPageLayout(
    <div>
      <h1>About us</h1>
      <BreadcrumbNav
        navItems={[
          { path: '/', label: 'Service portal home' },
          {
            path: '/about-us',
            label: 'About Us',
            current: true,
          },
        ]}
      />
    </div>,
    page
  )

// The page title is parsed and displayed in _app.tsx
export async function getStaticProps() {
  return {
    props: {
      pageTitle: 'About Us',
    },
  }
}
