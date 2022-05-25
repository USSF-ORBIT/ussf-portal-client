import { useQuery } from '@apollo/client'
import type { GetCollectionsQuery } from 'types'
import { GetCollectionsDocument } from 'types/index'

export function useCollectionsQuery() {
  return useQuery<GetCollectionsQuery>(GetCollectionsDocument)
}
