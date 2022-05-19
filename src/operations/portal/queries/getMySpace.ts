import { useQuery } from '@apollo/client'
import { GetMySpaceDocument, GetMySpaceQuery } from 'generated/graphql'

export function useMySpaceQuery() {
  return useQuery<GetMySpaceQuery>(GetMySpaceDocument)
}
