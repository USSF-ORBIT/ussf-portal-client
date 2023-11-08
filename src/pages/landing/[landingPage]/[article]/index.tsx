import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { withArticleLayout } from 'layout/DefaultLayout/ArticleLayout'
import { client } from 'lib/keystoneClient'
import { getSession } from 'lib/session'
import { GET_ARTICLE } from 'operations/cms/queries/getArticle'
import { isCmsUser, isPublished } from 'helpers/index'
import { SingleArticle } from 'components/SingleArticle/SingleArticle'

const LandingPageArticle = ({
  article,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <SingleArticle article={article} />
}

export default LandingPageArticle

LandingPageArticle.getLayout = (page: JSX.Element) => withArticleLayout(page)

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
      article,
      pageTitle: article.title,
    },
  }
}
