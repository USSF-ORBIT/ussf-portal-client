import { useState } from 'react'
import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { GridContainer } from '@trussworks/react-uswds'
import PageHeader from 'components/PageHeader/PageHeader'
import BreadcrumbNav from 'components/BreadcrumbNav/BreadcrumbNav'
import { withArticleLayout } from 'layout/DefaultLayout/ArticleLayout'
import { client } from 'lib/keystoneClient'
import { getSession } from 'lib/session'
import { GET_ARTICLE } from 'operations/cms/queries/getArticle'
import { isCmsUser, isPublished } from 'helpers/index'
import { SingleArticle } from 'components/SingleArticle/SingleArticle'

const LandingPageArticle = ({
  article,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [breadcrumbNavItems] = useState(window.location.pathname.split('/'))

  return (
    <>
      <PageHeader searchDisplay={false}>
        <h1>{breadcrumbNavItems[2].toUpperCase()}</h1>
        <BreadcrumbNav
          navItems={[
            { path: '/', label: 'Service portal home' },
            { path: '/landing', label: 'Landing pages' },
            {
              path: `/landing/${breadcrumbNavItems[2]}`,
              label: `${breadcrumbNavItems[2].toUpperCase()}`,
            },
            {
              path: `/landing/${breadcrumbNavItems[2]}/${breadcrumbNavItems[3]}`,
              label: `${breadcrumbNavItems[3]}`,
              current: true,
            },
          ]}
        />
      </PageHeader>
      <GridContainer>
        <SingleArticle article={article} />
      </GridContainer>
    </>
  )
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
