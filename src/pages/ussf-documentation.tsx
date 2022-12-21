import React from 'react'
import { Accordion, Grid } from '@trussworks/react-uswds'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'
import LinkTo from 'components/util/LinkTo/LinkTo'
import EPubsCard from 'components/EPubsCard/EPubsCard'
import { useUser } from 'hooks/useUser'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import styles from 'styles/pages/ussf-documentation.module.scss'
import Loader from 'components/Loader/Loader'

const USSFDocumentation = () => {
  const { user } = useUser()

  const testItems: AccordionItemProps[] = [
    {
      title: 'Essential Reading',
      content: (
        <div className={styles.accordionContent}>
          <LinkTo
            target="_blank"
            rel="noreferrer noopener"
            href="https://www.spaceforce.mil/Portals/1/Space%20Capstone%20Publication_10%20Aug%202020.pdf">
            Space Capstone Publication: Spacepower. Doctrine for Space Forces
          </LinkTo>

          <LinkTo
            target="_blank"
            rel="noreferrer noopener"
            href="https://media.defense.gov/2020/Nov/09/2002531998/-1/-1/0/CSO%20PLANNING%20GUIDANCE.PDF">
            CSO’s Planning Guidance
          </LinkTo>

          <LinkTo
            target="_blank"
            rel="noreferrer noopener"
            href="/uploads/Guardian Ideal - FINAL - 1600 17Sept21.pdf">
            Guardian Ideal
          </LinkTo>

          <LinkTo
            target="_blank"
            rel="noreferrer noopener"
            href="/uploads/US Space Force Enlisted Rank Insig Info Sheet (1).pdf">
            USSF Enlisted Rank and Insignia
          </LinkTo>

          <LinkTo
            target="_blank"
            rel="noreferrer noopener"
            href="/uploads/USSF Health Wellness and Fitness Memo dated 16Mar22.pdf">
            USSF/S1 Health, Wellness and Fitness Memo (16 MAR 2022)
          </LinkTo>

          <LinkTo
            target="_blank"
            rel="noreferrer noopener"
            href="/uploads/USSF Guardian Commitment Poster.pdf">
            USSF Guardian Commitment Poster
          </LinkTo>
        </div>
      ),
      expanded: true,
      id: 'essential-reading',
      headingLevel: 'h3',
    },
  ]

  return !user ? (
    <Loader />
  ) : (
    <div>
      <h2>Official USSF documentation</h2>
      <Grid row gap="lg">
        <Grid col={8}>
          <Accordion
            bordered={true}
            items={testItems}
            className={styles.accordion}
          />
        </Grid>
        <Grid col={4}>
          <EPubsCard title="Looking for a general form or documentation outside of the USSF?" />
        </Grid>
      </Grid>
    </div>
  )
}

export default USSFDocumentation

USSFDocumentation.getLayout = (page: React.ReactNode) =>
  withDefaultLayout(page, false)
