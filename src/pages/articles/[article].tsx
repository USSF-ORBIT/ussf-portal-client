import { InferGetServerSidePropsType, GetServerSideProps } from 'next'

import {
  BreadcrumbBar,
  Breadcrumb,
  BreadcrumbLink,
} from '@trussworks/react-uswds'

import { client } from 'lib/keystoneClient'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'
import { withPageLayout } from 'layout/DefaultLayout/PageLayout'
import NavLink, { NavLinkProps } from 'components/util/NavLink/NavLink'
import { GET_ARTICLE } from 'operations/queries/cms/getArticle'
import { SingleArticle } from 'components/SingleArticle/SingleArticle'

// TODO - layout with PageHeader included

const SingleArticlePage = ({
  article,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()

  return !user ? <Loader /> : <SingleArticle article={article} />
}

export default SingleArticlePage

SingleArticlePage.getLayout = (page: React.ReactNode) =>
  withPageLayout(
    <div>
      <h1>Portal News</h1>
      <BreadcrumbBar>
        <Breadcrumb>
          <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/">
            Service portal home
          </BreadcrumbLink>
        </Breadcrumb>
        <Breadcrumb current>
          <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/portal-news">
            Portal News
          </BreadcrumbLink>
        </Breadcrumb>
      </BreadcrumbBar>
    </div>,
    page
  )

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { article: slug } = context.query

  const {
    data: { article },
  } = await client.query({
    query: GET_ARTICLE,
    variables: { slug },
  })

  // TODO - 404 if no published article
  // TODO - preview article

  return {
    props: {
      article,
    },
  }
}
