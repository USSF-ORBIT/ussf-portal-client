import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  BreadcrumbBar,
  Breadcrumb,
  BreadcrumbLink,
  GridContainer,
} from '@trussworks/react-uswds'

import { client } from 'lib/keystoneClient'
import Loader from 'components/Loader/Loader'
import { useUser } from 'hooks/useUser'
import { withArticleLayout } from 'layout/DefaultLayout/ArticleLayout'
import NavLink, { NavLinkProps } from 'components/util/NavLink/NavLink'
import PageHeader from 'components/PageHeader/PageHeader'
import { SEARCH } from 'operations/cms/queries/search'
import { SearchBanner } from 'components/SearchBanner/SearchBanner'
import { SearchResultItem } from 'components/SearchResultItem/SearchResultItem'
import { SearchResultRecord } from 'types/index'
import { getAbsoluteUrl } from 'lib/getAbsoluteUrl'
import styles from 'styles/pages/search.module.scss'

// TODO - empty state (need design)

const Search = ({
  query,
  results,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()

  return (
    <>
      <PageHeader>
        <div>
          <h1>Search</h1>
          <BreadcrumbBar>
            <Breadcrumb>
              <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/">
                Service portal home
              </BreadcrumbLink>
            </Breadcrumb>
            <Breadcrumb current>
              <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/search">
                Search
              </BreadcrumbLink>
            </Breadcrumb>
            <Breadcrumb current>“{query}”</Breadcrumb>
          </BreadcrumbBar>
        </div>
      </PageHeader>
      <GridContainer>
        {!user ? (
          <Loader />
        ) : (
          <>
            <div className={styles.pageTitle}>
              <h2>
                There are {results.length} results for ‘{query}’
              </h2>
            </div>
            {results.length > 0 ? (
              <>
                <ol className={styles.searchResults}>
                  {results.map((i: SearchResultRecord, index: number) => {
                    return (
                      <li key={`result_${index}`}>
                        <SearchResultItem item={i} />
                      </li>
                    )
                  })}
                </ol>
                <SearchBanner
                  icon={
                    <img
                      src="/assets/images/satellite.svg"
                      alt="Icon of a satellite"
                    />
                  }>
                  <div>
                    <h3>You’ve reached the end of your search results.</h3>
                    <p>
                      If you didn’t find what you’re looking for, search again
                      using different parameters, or check out a similar
                      suggestion to the right.
                    </p>
                  </div>
                </SearchBanner>
              </>
            ) : (
              <SearchBanner
                icon={
                  <img
                    src="/assets/images/moon-flag.svg"
                    alt="Icon of the US flag on the moon"
                  />
                }>
                <div>
                  <h3>There are no results that match that query.</h3>
                  <p>
                    It seems you didn’t find what you were looking for. Please
                    re-perform the query with different parameters or click on
                    one of the similar suggestions to the right.
                  </p>
                </div>
              </SearchBanner>
            )}
          </>
        )}
      </GridContainer>
    </>
  )
}

export default Search

Search.getLayout = (page: React.ReactNode) => withArticleLayout(page)

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Need absolute URL
  const { req } = context
  const { origin } = getAbsoluteUrl(req)

  // get search terms from URL params
  const { q } = context.query

  if (!q) {
    return {
      props: {
        query: null,
        results: [],
      },
    }
  }

  const {
    data: { search },
  } = (await client.query({
    query: SEARCH,
    variables: { query: `${q} milmove` },
  })) as unknown as { data: { search: SearchResultRecord[] } }

  // Add full URL to articles (TODO do this on the CMS end by generating permalinks)
  const results =
    search?.map((i) => {
      return {
        ...i,
        permalink:
          i.type === 'Article'
            ? `${origin}/articles/${i.permalink}`
            : i.permalink,
      }
    }) || []

  return {
    props: {
      query: q,
      results,
    },
  }
}
