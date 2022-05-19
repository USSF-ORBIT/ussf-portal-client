import { useQuery } from '@apollo/client'
import { GetCollectionsDocument, GetCollectionsQuery } from 'generated/graphql'

export function useCollectionsQuery() {
  return useQuery<GetCollectionsQuery>(GetCollectionsDocument)
}
