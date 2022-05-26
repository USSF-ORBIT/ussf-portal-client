import { useQuery } from '@apollo/client'
import { GetCollectionsDocument, GetCollectionsQuery } from 'types/index'

export function useCollectionsQuery() {
  return useQuery<GetCollectionsQuery>(GetCollectionsDocument)
}
