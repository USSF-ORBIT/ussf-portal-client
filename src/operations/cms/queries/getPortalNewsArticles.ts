import { gql } from '@apollo/client'

// TODO - pagination
export const GET_PORTAL_NEWS_ARTICLES = gql`
  query GetPortalNewsArticles {
    articles(
      where: { status: { equals: Published }, category: { equals: ORBITBlog } }
      orderBy: [{ publishedDate: desc }]
    ) {
      id
      slug
      title
      preview
      publishedDate
    }
  }
`
