import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { Accordion, Grid } from '@trussworks/react-uswds'
import styles from '../../../styles/pages/landingPage.module.scss'
import { ArticleList } from 'components/ArticleList/ArticleList'
import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'
import { withLandingPageLayout } from 'layout/DefaultLayout/LandingPageLayout'
import { client } from 'lib/keystoneClient'
import { getSession } from 'lib/session'
import { GET_LANDING_PAGE } from 'operations/cms/queries/getLandingPage'
import { CMSBookmark, CollectionRecord } from 'types'

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

  return (
    <>
      <h1 className={styles.pageTitle}>{pageTitle}</h1>
      <p className={styles.pageDescription}>{pageDescription}</p>

      <div className={styles.contentContainer}>
        {documents.length >= 1 && <h2 id="documents">Documents</h2>}
        {documents.length >= 1 && (
          <div>
            {documents.map((section: DocumentsType, index: number) => {
              return (
                <Accordion
                  key={`${index}__${section}`}
                  bordered
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
                              <p key={`${doc.title}__${index}`}>
                                <a href={doc.file.url}>{doc.title}</a>
                              </p>
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
            {collections.map((collection: CollectionRecord, index: number) => {
              return (
                <Grid
                  key={`${index}__${collection}`}
                  tablet={{ col: 6 }}
                  desktop={{ col: 4 }}>
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
            })}
          </div>
        )}

        {articles.length >= 1 && <h2 id="articles">Articles</h2>}
        {articles.length >= 1 && <ArticleList articles={articles} />}
      </div>
    </>
  )
}

export default LandingPage

LandingPage.getLayout = (page: JSX.Element) => withLandingPageLayout(page)

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
