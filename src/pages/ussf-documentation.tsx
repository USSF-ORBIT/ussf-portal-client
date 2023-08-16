import React from 'react'
import { Accordion, Grid } from '@trussworks/react-uswds'
import { InferGetServerSidePropsType } from 'next'
import { client } from '../lib/keystoneClient'
import Link from 'next/link'
import EPubsCard from 'components/EPubsCard/EPubsCard'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import styles from 'styles/pages/ussf-documentation.module.scss'
import { GET_DOCUMENTS_PAGE } from 'operations/cms/queries/getDocumentsPage'
import { DocumentType, DocumentPageType, DocumentSectionType } from 'types'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'
import { isPdf, handleOpenPdfLink } from 'helpers/openDocumentLink'

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
                          <Link
                            // We need to use the default Next Link component
                            // with legacyBehavior=false, so we can pass in an onClick
                            // that will open PDFs in the browser
                            legacyBehavior={false}
                            onClick={(e) => {
                              e.preventDefault()
                              handleOpenPdfLink(d.file.url)
                            }}
                            key={d.id}
                            rel="noreferrer noopener"
                            href={`${d.file.url}`}>
                            {d.title}
                          </Link>
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
