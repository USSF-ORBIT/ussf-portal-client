import { InferGetServerSidePropsType, GetServerSideProps } from 'next'

import {
  BreadcrumbBar,
  Breadcrumb,
  BreadcrumbLink,
  GridContainer,
} from '@trussworks/react-uswds'

import { client } from 'lib/keystoneClient'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'
import { withArticleLayout } from 'layout/DefaultLayout/ArticleLayout'
import NavLink, { NavLinkProps } from 'components/util/NavLink/NavLink'
import PageHeader from 'components/PageHeader/PageHeader'
import { GET_ARTICLE } from 'operations/queries/cms/getArticle'
import { SingleArticle } from 'components/SingleArticle/SingleArticle'

const ORBITBlogArticleHeader = () => (
  <PageHeader disableSearch>
    <div>
      <h1>ORBIT Blog</h1>
      <BreadcrumbBar>
        <Breadcrumb>
          <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/">
            Service portal home
          </BreadcrumbLink>
        </Breadcrumb>
        <Breadcrumb>
          <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/about-us">
            About us
          </BreadcrumbLink>
        </Breadcrumb>
        <Breadcrumb current>
          <BreadcrumbLink<NavLinkProps>
            asCustom={NavLink}
            href="/about-us/orbit-blog">
            ORBIT Blog
          </BreadcrumbLink>
        </Breadcrumb>
      </BreadcrumbBar>
    </div>
  </PageHeader>
)

const InternalNewsArticleHeader = () => (
  <PageHeader disableSearch>
    <div>
      <h1>News</h1>
      <BreadcrumbBar>
        <Breadcrumb>
          <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/">
            Service portal home
          </BreadcrumbLink>
        </Breadcrumb>
        <Breadcrumb current>
          <BreadcrumbLink<NavLinkProps> asCustom={NavLink} href="/news">
            News
          </BreadcrumbLink>
        </Breadcrumb>
      </BreadcrumbBar>
    </div>
  </PageHeader>
)

const SingleArticlePage = ({
  article,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()
  const { category } = article

  return (
    <>
      {category === 'ORBITBlog' ? (
        <ORBITBlogArticleHeader />
      ) : (
        <InternalNewsArticleHeader />
      )}
      <GridContainer>
        {!user ? <Loader /> : <SingleArticle article={article} />}
      </GridContainer>
    </>
  )
}

export default SingleArticlePage

SingleArticlePage.getLayout = (page: React.ReactNode) => withArticleLayout(page)

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
