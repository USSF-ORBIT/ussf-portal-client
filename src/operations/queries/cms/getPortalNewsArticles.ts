import { gql, useQuery } from '@apollo/client'

// TODO - filter by category
// TODO - pagination
export const GET_PORTAL_NEWS_ARTICLES = gql`
  query GetPortalNewsArticles {
    articles(
      where: { status: { equals: Published } }
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

export function useGetPortalNewsArticlesQuery() {
  return useQuery(GET_PORTAL_NEWS_ARTICLES)
}
