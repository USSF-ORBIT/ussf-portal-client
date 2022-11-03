import { InferGetServerSidePropsType, GetServerSideProps } from 'next'

import { GridContainer } from '@trussworks/react-uswds'

import { client } from 'lib/keystoneClient'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'
import { withArticleLayout } from 'layout/DefaultLayout/ArticleLayout'
import PageHeader from 'components/PageHeader/PageHeader'
import { GET_ARTICLE } from 'operations/cms/queries/getArticle'
import { SingleArticle } from 'components/SingleArticle/SingleArticle'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'

const ORBITBlogArticleHeader = () => (
  <PageHeader disableSearch>
    <div>
      <h1>ORBIT Blog</h1>
      <BreadcrumbNav
        navItems={[
          { path: '/', label: <span>Service portal home</span> },
          { path: '/about-us', label: <span>About Us</span> },
          {
            path: '/about-us/orbit-blog',
            label: <span>ORBIT Blog</span>,
            current: true,
          },
        ]}
      />
    </div>
  </PageHeader>
)

const InternalNewsArticleHeader = () => (
  <PageHeader disableSearch>
    <div>
      <h1>News</h1>
      <BreadcrumbNav
        navItems={[
          { path: '/', label: <span>Service portal home</span> },
          {
            path: '/news',
            label: <span>News</span>,
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

  if (!article || article.status !== 'Published') {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      article,
    },
  }
}
