import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { GridContainer } from '@trussworks/react-uswds'
import { client } from 'lib/keystoneClient'
import { getSession } from 'lib/session'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'
import { withArticleLayout } from 'layout/DefaultLayout/ArticleLayout'
import PageHeader from 'components/PageHeader/PageHeader'
import { GET_ARTICLE } from 'operations/cms/queries/getArticle'
import { SingleArticle } from 'components/SingleArticle/SingleArticle'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'
import { isCmsUser, isPublished } from 'helpers/index'
// TODO add support for dynamic categories pulled in from CMS

const ORBITBlogArticleHeader = () => (
  <PageHeader>
    <div>
      <h1>ORBIT Blog</h1>
      <BreadcrumbNav
        navItems={[
          { path: '/', label: 'Service portal home' },
          { path: '/about-us', label: 'About Us' },
          {
            path: '/about-us/orbit-blog',
            label: 'ORBIT Blog',
            current: true,
          },
        ]}
      />
    </div>
  </PageHeader>
)

const InternalNewsArticleHeader = () => (
  <PageHeader>
    <div>
      <h1>News</h1>
      <BreadcrumbNav
        navItems={[
          { path: '/', label: 'Service portal home' },
          {
            path: '/news',
            label: 'News',
            current: true,
          },
        ]}
      />
    </div>
  </PageHeader>
)

const SingleArticlePage = ({
  article,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { user } = useUser()

  return (
    <>
      {article?.category === 'ORBITBlog' ? (
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

  const session = await getSession(context.req, context.res)
  const user = session?.passport?.user

  const {
    data: { article },
  } = await client.query({
    query: GET_ARTICLE,
    variables: { slug },
  })

  // if article is not published or not found return 404
  // unless the current user is a CMS user or admin
  // then allow them to see any article
  if (!article || (!isPublished(article) && !isCmsUser(user))) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      article: article,
      pageTitle: article.title,
    },
  }
}
