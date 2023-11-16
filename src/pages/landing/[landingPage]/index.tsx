import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Link from 'next/link'
import {
  Accordion,
  Grid,
  GridContainer,
  InPageNavigation,
} from '@trussworks/react-uswds'
import styles from '../../../styles/pages/landingPage.module.scss'
import docStyles from '../../../styles/pages/ussf-documentation.module.scss'
import { ArticleList } from 'components/ArticleList/ArticleList'
import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'
import { withLandingPageLayout } from 'layout/DefaultLayout/LandingPageLayout'
import { client } from 'lib/keystoneClient'
import { getSession } from 'lib/session'
import { GET_LANDING_PAGE } from 'operations/cms/queries/getLandingPage'
import { CMSBookmark, CollectionRecord } from 'types'
import { isPdf, handleOpenPdfLink } from 'helpers/openDocumentLink'

type DocumentsType = {
  title: string
  document: {
    title: string
    file: {
      url: string
    }
  }[]
}

const LandingPage = ({
  landingPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { pageTitle, pageDescription, documents, collections, articles } =
    landingPage

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pageContent = (): any => {
    return (
      <>
        <h1 className={styles.pageTitle}>{pageTitle}</h1>
        <p className={styles.pageDescription}>{pageDescription}</p>
        {documents.length >= 1 && <h2 id="documentation">Documentation</h2>}
        {documents.length >= 1 && (
          <div className={docStyles.accordionGrid}>
            {documents.map((section: DocumentsType, index: number) => {
              return (
                <Accordion
                  key={`${index}__${section}`}
                  bordered
                  className={docStyles.accordion}
                  items={[
                    {
                      title: section.title,
                      expanded: false,
                      id: `${section}__${index}`,
                      headingLevel: 'h3',
                      content: (
                        <div className={styles.accordionContent}>
                          {section.document.map((doc, index) => {
                            return (
                              <Link
                                onClick={(e) => {
                                  if (isPdf(doc.file.url)) {
                                    e.preventDefault()
                                    handleOpenPdfLink(doc.file.url)
                                  } else return
                                }}
                                key={index}
                                rel="noreferrer noopener"
                                href={`${doc.file.url}`}>
                                {doc.title}
                              </Link>
                            )
                          })}
                        </div>
                      ),
                    },
                  ]}
                />
              )
            })}
          </div>
        )}

        {collections.length >= 1 && <h2 id="collections">Collections</h2>}

        {collections.length >= 1 && (
          <div className={styles.collectionContainer}>
            <GridContainer className="grid-container--fill">
              <Grid row gap>
                {collections.map(
                  (collection: CollectionRecord, index: number) => {
                    return (
                      <Grid
                        className={styles.collectionWrapper}
                        key={`${index}__${collection}`}
                        mobile={{ col: 12 }}
                        tablet={{ col: 12 }}
                        desktop={{ col: 6 }}
                        desktopLg={{ col: 4 }}>
                        <Collection title={collection.title}>
                          {collection.bookmarks.map(
                            (bookmark: CMSBookmark, index: number) => {
                              return (
                                <Bookmark
                                  key={`${index}__${bookmark.label}`}
                                  bookmarkDescription={bookmark.description}
                                  href={bookmark.url}>
                                  {bookmark.label}
                                </Bookmark>
                              )
                            }
                          )}
                        </Collection>
                      </Grid>
                    )
                  }
                )}
              </Grid>
            </GridContainer>
          </div>
        )}

        {articles.length >= 1 && <h2 id="articles">Articles</h2>}
        {articles.length >= 1 && (
          <ArticleList articles={articles} landingPage={true} />
        )}
      </>
    )
  }

  return (
    <Grid className={styles.inPageNav}>
      <InPageNavigation scrollOffset="140px" content={pageContent()} />
    </Grid>
  )
}

export default LandingPage

LandingPage.getLayout = (page: JSX.Element) =>
  withLandingPageLayout(page, page.props.landingPage.pageTitle)

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { landingPage: slug } = context.query

  const session = await getSession(context.req, context.res)
  const user = session?.passport?.user

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const {
    data: { landingPage },
  } = await client.query({
    query: GET_LANDING_PAGE,
    variables: { slug },
  })

  if (!landingPage) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      landingPage,
    },
  }
}
