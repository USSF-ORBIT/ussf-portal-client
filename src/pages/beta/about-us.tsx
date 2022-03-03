import {
  BreadcrumbBar,
  Breadcrumb,
  BreadcrumbLink,
  Grid,
} from '@trussworks/react-uswds'
import { withPageLayout } from 'layout/Beta/DefaultLayout/PageLayout'
import LinkTo from 'components/util/LinkTo/LinkTo'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import styles from 'styles/pages/aboutUs.module.scss'
import NavLink, { NavLinkProps } from 'components/util/NavLink/NavLink'
const AboutUs = () => {
  const { user } = useUser()

  return !user ? (
    <Loader />
  ) : (
    <div className={styles.aboutUsPage}>
      <div className={styles.pageTitle}>
        <h2>About the Space Force</h2>
      </div>

      <Grid row gap>
        <Grid tablet={{ col: 8 }}>
          <div>
            <h2 id="essential-reading">Essential Reading</h2>

            <ul>
              <li>
                <LinkTo
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://www.spaceforce.mil/Portals/1/Space%20Capstone%20Publication_10%20Aug%202020.pdf">
                  Space Capstone Publication: Spacepower. Doctrine for Space
                  Forces
                </LinkTo>
                <span> (June 2020)</span>
              </li>
              <li>
                <LinkTo
                  target="_blank"
                  rel="noreferrer noopener"
                  href="https://media.defense.gov/2020/Nov/09/2002531998/-1/-1/0/CSO%20PLANNING%20GUIDANCE.PDF">
                  CSO’s Planning Guidance
                </LinkTo>
                <span> (November 2020)</span>
              </li>

              <li>
                <LinkTo href="/uploads/Guardian Ideal - FINAL - 1600 17Sept21.pdf">
                  Guardian Ideal
                </LinkTo>
              </li>
              <li>
                <LinkTo href="/uploads/US Space Force Enlisted Rank Insig Info Sheet (1).pdf">
                  USSF Enlisted Rank and Insignia
                </LinkTo>
              </li>
            </ul>
          </div>
          <div>
            <h2 id="mission">Mission</h2>
            <p>
              The USSF is a military service that organizes, trains, and equips
              space forces in order to protect U.S. and allied interests in
              space and to provide space capabilities to the joint force. USSF
              responsibilities include developing military space professionals,
              acquiring military space systems, maturing the military doctrine
              for space power, and organizing space forces to present to our
              Combatant Commands.
            </p>
          </div>

          <div>
            <h2 id="leadership">Leadership</h2>
            <ul>
              <li>
                <LinkTo href="https://www.spaceforce.mil/About-Us/Leadership/">
                  Space Force Leadership
                </LinkTo>
              </li>
              <li>
                <LinkTo href="https://www.spoc.spaceforce.mil/About-Us/Leadership">
                  SpOC Leadership
                </LinkTo>
              </li>
              <li>
                <LinkTo href="https://www.losangeles.spaceforce.mil/About-Us/Biographies/">
                  SMC Center Leadership
                </LinkTo>
              </li>
              <li>
                <LinkTo href="https://www.peterson.spaceforce.mil/About/Biographies/">
                  Space Training and Readiness (STAR) Delta Leadership
                </LinkTo>
              </li>
            </ul>
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
            <h2>Social media</h2>
            <ul>
              <li>
                <LinkTo
                  href="https://twitter.com/SpaceForceDoD?ref_src=twsrc%5Etfw"
                  data-height="500">
                  Tweets by SpaceForceDoD
                </LinkTo>
              </li>
            </ul>

            <script
              async
              src="https://platform.twitter.com/widgets.js"
              charSet="utf-8"></script>
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
      <BreadcrumbBar>
        <Breadcrumb>
          <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/">
            Service portal home
          </BreadcrumbLink>
        </Breadcrumb>
        <Breadcrumb current>About us</Breadcrumb>
      </BreadcrumbBar>
    </div>,
    page
  )
