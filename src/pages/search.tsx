import { useState } from 'react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import {
  GridContainer,
  Grid,
  Checkbox,
  Dropdown,
  Textarea,
  Button,
} from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { client } from 'lib/keystoneClient'
import { withArticleLayout } from 'layout/DefaultLayout/ArticleLayout'
import PageHeader from 'components/PageHeader/PageHeader'
// import EPubsCard from 'components/EPubsCard/EPubsCard'
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
  labels,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()
  const resultString =
    results.length === 1
      ? `There is 1 result`
      : `There are ${results.length} results`

  const [filteredQuery, setFilteredQuery] = useState<string>('')

  // We are building a query to filter search on. This function runs each time any of the inputs
  // are changed. It looks at the current query and splits it into an array. It checks if the value
  // is already in the array. If it is, it removes it. If it isn't, it
  // adds it. Then it sets the query to the new array joined by spaces.
  const updateCheckedItems = (queryValue: string) => {
    const queryArray = filteredQuery.split(' ')
    if (queryArray.includes(queryValue)) {
      const index = queryArray.indexOf(queryValue)
      queryArray.splice(index, 1)
      setFilteredQuery(queryArray.join(' '))
    } else {
      setFilteredQuery(filteredQuery + ' ' + queryValue)
    }
  }

  const applyFilters = () => {
    console.log('apply filters')
  }

  return !user ? (
    <Loader />
  ) : (
    <>
      <PageHeader
        searchQuery={filteredQuery ? `${filteredQuery} ${query}` : query}>
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

          <Grid row gap="md">
            <Grid col="auto">
              {/* <EPubsCard query={query} /> */}
              <div className={styles.searchFilter}>
                <div className={styles.headerContainer}>
                  <span aria-label="filter icon">
                    <FontAwesomeIcon icon="filter" />
                  </span>
                  <h3>Filter Search</h3>
                </div>

                <Grid col="auto">
                  <h5 className={styles.subHeader}>Categories:</h5>
                  <Checkbox
                    id="application-filter"
                    name="application"
                    label="Application"
                    value="application"
                    className={styles.checkbox}
                    onChange={(e) =>
                      updateCheckedItems(`category:${e.target.value}`)
                    }
                  />
                  <Checkbox
                    id="news-filter"
                    name="news"
                    label="News"
                    value="news"
                    className={styles.checkbox}
                    onChange={(e) =>
                      updateCheckedItems(`category:${e.target.value}`)
                    }
                  />
                  <Checkbox
                    id="documentation-filter"
                    name="documentation"
                    label="Documentation"
                    value="documentation"
                    className={styles.checkbox}
                    onChange={(e) =>
                      updateCheckedItems(`category:${e.target.value}`)
                    }
                  />
                </Grid>
                <Grid col="auto">
                  <h5 className={styles.subHeader}>Labels:</h5>
                  <Dropdown
                    id="label-dropdown"
                    name="label-dropdown"
                    defaultValue={'default'}
                    onChange={(e) => {
                      // Need to remove any previous label and add the newly selected one
                      const labelToAdd = e.target.value
                      const queryArray = filteredQuery.split(' ')

                      // Filter out any previous label from the query
                      const filteredArray = queryArray.filter(
                        (label) => !label.includes('label:')
                      )

                      setFilteredQuery(
                        filteredArray.join(' ') + ` label:${labelToAdd}`
                      )
                    }}>
                    <option value="default" disabled>
                      None applied
                    </option>
                    {labels.map(({ name }) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </Dropdown>
                </Grid>
                <Grid col="auto">
                  <h5 className={styles.subHeader}>Tags:</h5>
                  <Textarea
                    id="tag-input"
                    name="tags"
                    style={{ resize: 'none' }}
                  />
                </Grid>

                <Grid row className={styles.buttonContainer}>
                  <Button type="submit" disabled={false} onClick={applyFilters}>
                    <span className="usa-search__submit-text">Filter</span>
                  </Button>
                  <Button type="submit" outline disabled={false}>
                    <span className="usa-search__submit-text">Reset</span>
                  </Button>
                </Grid>
              </div>
            </Grid>

            {results.length > 0 ? (
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
            ) : (
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
            )}
          </Grid>
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
    data: { labels: { name: string }[] }
  }

  if (!q) {
    return {
      props: {
        query: null,
        results: [],
        labels,
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
