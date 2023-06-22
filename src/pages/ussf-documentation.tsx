import React from 'react'
import { Accordion, Grid } from '@trussworks/react-uswds'
import { InferGetServerSidePropsType } from 'next'
import { client } from '../lib/keystoneClient'
import LinkTo from 'components/util/LinkTo/LinkTo'
import EPubsCard from 'components/EPubsCard/EPubsCard'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import styles from 'styles/pages/ussf-documentation.module.scss'
import { GET_DOCUMENTS_PAGE } from 'operations/cms/queries/getDocumentsPage'
import { DocumentType, DocumentPageType, DocumentSectionType } from 'types'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'

// Export for easier unit testing
// We're leaving these hardcoded docs as a backup until
// the switch to CMS-only content is complete
// #TODO: Remove these links and the documents stored in the repo
export const staticPage: DocumentPageType = {
  id: '',
  pageTitle: 'USSF Documentation',
  sections: [
    {
      id: '17ced46f-9523-4b18-b778-c9e6f9dced3e',
      title: 'Essential Reading',
      document: [
        {
          // Generating random ids so iterator in component is happy
          // These are not stored anywhere and mean nothing.
          id: '16ced46f-9523-4b18-b778-c9e6f9dced3e',
          title:
            'Space Capstone Publication: Spacepower. Doctrine for Space Forces',
          file: {
            url: 'https://www.spaceforce.mil/Portals/1/Space%20Capstone%20Publication_10%20Aug%202020.pdf',
          },
        },
        {
          id: '8d619762-6ecd-47df-92a2-c172d95c488c',
          title: 'CSO’s Planning Guidance',
          file: {
            url: 'https://media.defense.gov/2020/Nov/09/2002531998/-1/-1/0/CSO%20PLANNING%20GUIDANCE.PDF',
          },
        },
        {
          id: '39a31099-e760-4bcb-9726-781ce2a7ac4b',
          title: ' Guardian Ideal',
          file: {
            url: '/uploads/Guardian Ideal - FINAL - 1600 17Sept21.pdf',
          },
        },
        {
          id: '983504a5-e3d1-43aa-af88-28ba0a7345ba',
          title: 'USSF Enlisted Rank and Insignia',
          file: {
            url: '/uploads/US Space Force Enlisted Rank Insig Info Sheet (1).pdf',
          },
        },
        {
          id: '272a5b6b-bc30-4775-887e-eeece78b214d',
          title: ' USSF/S1 Health, Wellness and Fitness Memo (16 MAR 2022)',
          file: {
            url: '/uploads/USSF Health Wellness and Fitness Memo dated 16Mar22.pdf',
          },
        },
        {
          id: '20accc42-3e4a-4d21-9fd8-3fcc2ed4531b',
          title: 'USSF Guardian Commitment Poster',
          file: {
            url: '/uploads/USSF Guardian Commitment Poster.pdf',
          },
        },
      ],
    },
  ],
}
const USSFDocumentation = ({
  documentsPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()
  // LaunchDarkly toggle for cms vs static data
  return !user ? (
    <Loader />
  ) : (
    <div>
      <h2>{documentsPage && documentsPage.pageTitle}</h2>

      <Grid row gap="lg">
        {documentsPage?.sections &&
          documentsPage.sections.map((s: DocumentSectionType, i: number) => (
            <Grid col={12} key={s.id} className={styles.accordionGrid}>
              <Accordion
                className={styles.accordion}
                bordered
                items={[
                  {
                    title: s.title,
                    expanded: i === 0 ? true : false,
                    id: `${s.id}`,
                    headingLevel: 'h3',

                    content: (
                      <div className={styles.accordionContent}>
                        {s.document.map((d: DocumentType) => (
                          <LinkTo
                            key={d.id}
                            target="_blank"
                            rel="noreferrer noopener"
                            href={`${d.file.url}`}>
                            {d.title}
                          </LinkTo>
                        ))}
                      </div>
                    ),
                  },
                ]}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  )
}

const rightSidebar = (
  <EPubsCard title="Looking for a general form or documentation outside of the USSF?" />
)

export default USSFDocumentation

USSFDocumentation.getLayout = (page: React.ReactNode) =>
  withDefaultLayout(page, false, rightSidebar)

export async function getServerSideProps() {
  let pageData = null
  const {
    data: { documentsPages },
  }: { data: { documentsPages: DocumentPageType[] } } = await client.query({
    query: GET_DOCUMENTS_PAGE,
  })

  if (documentsPages.length > 0) {
    pageData = documentsPages[0]
  }

  return {
    props: {
      documentsPage: pageData,
      pageTitle: 'Documentation',
    },
  }
}
