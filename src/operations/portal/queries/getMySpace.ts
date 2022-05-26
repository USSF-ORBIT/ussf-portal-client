import { useQuery } from '@apollo/client'
import { GetMySpaceDocument, GetMySpaceQuery } from 'types/index'

export function useMySpaceQuery() {
  return useQuery<GetMySpaceQuery>(GetMySpaceDocument)
}
