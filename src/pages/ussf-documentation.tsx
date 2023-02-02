import React from 'react'
import { Accordion, Grid } from '@trussworks/react-uswds'
import { client } from '../lib/keystoneClient'
import { InferGetServerSidePropsType } from 'next'
import LinkTo from 'components/util/LinkTo/LinkTo'
import EPubsCard from 'components/EPubsCard/EPubsCard'
import { useUser } from 'hooks/useUser'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import styles from 'styles/pages/ussf-documentation.module.scss'
import Loader from 'components/Loader/Loader'
import { GET_DOCUMENTS_PAGE } from 'operations/cms/queries/getDocumentsPage'
import { DocumentType, DocumentPageType } from 'types'

const USSFDocumentation = ({
  documentsPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()
  const sections = documentsPage.sections

  return !user ? (
    <Loader />
  ) : (
    <div>
      <h2>{documentsPage.pageTitle}</h2>
      <Grid row gap="lg">
        {sections &&
          sections.map((s, i) => (
            <Grid col={8} key={s.id} className={styles.accordionGrid}>
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

export async function getServerSideProps() {
  const {
    data: { documentsPages },
  }: { data: { documentsPages: DocumentPageType[] } } = await client.query({
    query: GET_DOCUMENTS_PAGE,
  })

  return {
    props: {
      documentsPage: documentsPages[0],
    },
  }
}
