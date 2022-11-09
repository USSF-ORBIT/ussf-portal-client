import React from 'react'
import { Accordion } from '@trussworks/react-uswds'
import { AccordionItemProps } from '@trussworks/react-uswds/lib/components/Accordion/Accordion'
import LinkTo from 'components/util/LinkTo/LinkTo'
import EPubsCard from 'components/EPubsCard/EPubsCard'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import styles from 'styles/pages/ussf-documentation.module.scss'

const USSFDocumentation = () => {
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
        </div>
      ),
      expanded: false,
      id: 'essential-reading',
      headingLevel: 'h3',
    },
  ]

  return (
    <div>
      <h2>Official USSF documentation</h2>
      <div className={styles.documentation}>
        <Accordion bordered={true} items={testItems} />
        <EPubsCard query={'query'} />
      </div>
    </div>
  )
}

export default USSFDocumentation

USSFDocumentation.getLayout = (page: React.ReactNode) =>
  withDefaultLayout(page, false)
