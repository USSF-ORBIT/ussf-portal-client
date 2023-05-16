import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { GridContainer, Grid } from '@trussworks/react-uswds'

import { client } from 'lib/keystoneClient'
import { withArticleLayout } from 'layout/DefaultLayout/ArticleLayout'
import PageHeader from 'components/PageHeader/PageHeader'
// import EPubsCard from 'components/EPubsCard/EPubsCard'
import SearchFilter from 'components/SearchFilter/SearchFilter'
import { SEARCH } from 'operations/cms/queries/search'
import { GET_LABELS } from 'operations/cms/queries/getLabels'
import { SearchBanner } from 'components/SearchBanner/SearchBanner'
import { SearchResultItem } from 'components/SearchResultItem/SearchResultItem'
import { SearchResultRecord } from 'types/index'
import { getAbsoluteUrl } from 'lib/getAbsoluteUrl'
import styles from 'styles/pages/search.module.scss'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'

// TODO - empty state (need design)

const Search = ({
  query,
  results = [],
  labels = [],
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()
  const resultString =
    results.length === 1
      ? `There is 1 result`
      : `There are ${results.length} results`

  return !user ? (
    <Loader />
  ) : (
    <>
      <PageHeader searchQuery={query}>
        <div>
          <h1>Search</h1>
          <BreadcrumbNav
            navItems={[
              {
                path: '/',
                label: 'Service portal home',
              },
              {
                path: '/search',
                label: 'Search',
                current: true,
              },
              {
                path: `/search?q=${query}`,
                label: <span>{query}</span>,
                current: true,
              },
            ]}
          />
        </div>
      </PageHeader>
      <GridContainer>
        <>
          <div className={styles.pageTitle}>
            <h2>
              {resultString} for ‘{query}’
            </h2>
          </div>

          {results.length > 0 ? (
            <>
              <Grid row gap="md">
                <Grid col="auto">
                  {/* <EPubsCard query={query} /> */}
                  <SearchFilter labels={labels} />
                </Grid>

                <Grid col="fill">
                  <ol className={styles.searchResults}>
                    {results.map((i: SearchResultRecord) => {
                      return (
                        <li key={`result_${i.id}`}>
                          <SearchResultItem item={i} />
                        </li>
                      )
                    })}
                  </ol>
                </Grid>
              </Grid>

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
                    using different keywords.
                  </p>
                </div>
              </SearchBanner>
            </>
          ) : (
            <Grid row gap="md">
              <Grid col="auto">
                {/* <EPubsCard query={query} /> */}
                <SearchFilter labels={labels} />
              </Grid>
              <Grid col="fill">
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
                      search again with different keywords.
                    </p>
                  </div>
                </SearchBanner>
              </Grid>
            </Grid>
          )}
        </>
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

  // Get labels
  const {
    data: { labels },
  } = (await client.query({
    query: GET_LABELS,
  })) as unknown as {
    data: { labels: { __typename: 'Label'; name: string }[] }
  }

  if (!q && labels) {
    return {
      props: {
        query: null,
        results: [],
        labels,
      },
    }
  }

  if (!q && !labels) {
    return {
      props: {
        query: null,
        results: [],
        labels: [],
      },
    }
  }

  const {
    data: { search },
  } = (await client.query({
    query: SEARCH,
    variables: { query: q },
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
      labels,
    },
  }
}
