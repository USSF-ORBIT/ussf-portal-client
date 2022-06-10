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
// import styles from 'styles/pages/news.module.scss'

const Search = ({
  query,
  results,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()

  return (
    <>
      <PageHeader disableSearch>
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
          </BreadcrumbBar>
        </div>
      </PageHeader>
      <GridContainer>
        {!user ? <Loader /> : `Search for ${query}`}

        {JSON.stringify(results)}
      </GridContainer>
    </>
  )
}

export default Search

Search.getLayout = (page: React.ReactNode) => withArticleLayout(page)

export const getServerSideProps: GetServerSideProps = async (context) => {
  // get search terms from URL params
  const { q } = context.query

  const { data } = await client.query({
    query: SEARCH,
    variables: { query: `${q} milmove` },
  })

  console.log('returned', data)

  return {
    props: {
      query: q,
      results: data,
    },
  }
}
