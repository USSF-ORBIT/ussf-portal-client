import { useQuery } from '@apollo/client'
import type { GetMySpaceQuery } from 'types'
import { GetMySpaceDocument } from 'types'

export function useMySpaceQuery() {
  return useQuery<GetMySpaceQuery>(GetMySpaceDocument)
}
