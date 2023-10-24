import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { GridContainer, Grid, Accordion } from '@trussworks/react-uswds'
import Link from 'next/link'
import { client } from 'lib/keystoneClient'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'
import { withLandingPageLayout } from 'layout/DefaultLayout/LandingPageLayout'
import { GET_LANDING_PAGE } from 'operations/cms/queries/getLandingPage'
import { ArticleList } from 'components/ArticleList/ArticleList'
import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'
import {
  DocumentType,
  DocumentSectionType,
  Collection as CollectionType,
} from 'types'
import { isPdf, handleOpenPdfLink } from 'helpers/openDocumentLink'
import styles from 'styles/pages/landingPages.module.scss'

const LandingPage = ({
  pageTitle,
  pageDescription,
  articles,
  collections,
  documents,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()

  return (
    <GridContainer>
      {!user ? (
        <Loader />
      ) : (
        <div>
          <h1>{pageTitle}</h1>
          <p>{pageDescription}</p>
          <h2>Documentation</h2>
          <Grid row gap="lg">
            {documents &&
              documents.map((s: DocumentSectionType, i: number) => (
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
                                onClick={(e) => {
                                  if (isPdf(d.file.url)) {
                                    e.preventDefault()
                                    handleOpenPdfLink(d.file.url)
                                  } else return
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
          <h2>Articles</h2>
          <ArticleList articles={articles} />
          <h2> Collections</h2>
          <Grid row gap>
            {collections.map((collection: CollectionType) => (
              <Collection
                key={`collection_${collection.id}`}
                title={collection.title}
                className={'sitesAndAppsCollection'}>
                {/* TODO Fix type here */}
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {collection.bookmarks?.map((bookmark: any) => (
                  <Bookmark
                    className={'sitesAndAppsBookmark'}
                    key={`bookmark_${bookmark.id}`}
                    bookmarkDescription={bookmark.description}
                    href={bookmark.url}>
                    {bookmark.label}
                  </Bookmark>
                ))}
              </Collection>
            ))}
          </Grid>
        </div>
      )}
    </GridContainer>
  )
}

export default LandingPage

LandingPage.getLayout = (page: JSX.Element) => withLandingPageLayout(page)

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { landingPage: slug } = context.query

  const { data: landingPage } = await client.query({
    query: GET_LANDING_PAGE,
    variables: {
      slug: slug,
    },
  })

  const { pageTitle, pageDescription, articles, collections, documents } =
    landingPage.landingPage

  // if landing page is not found return 404
  if (!landingPage) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      pageTitle,
      pageDescription,
      articles: articles || [],
      collections: collections || [],
      documents: documents || [],
    },
  }
}
