import { useQuery } from '@apollo/client'
import type { GetCollectionsQuery } from 'types'
import { GetCollectionsDocument } from 'types'

export function useCollectionsQuery() {
  return useQuery<GetCollectionsQuery>(GetCollectionsDocument)
}
