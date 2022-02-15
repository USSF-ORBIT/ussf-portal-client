import { gql, useMutation } from '@apollo/client'

interface RemoveSectionResponse {
  _id: string
}

interface RemoveSectionInput {
  _id: string
}

export const REMOVE_SECTION = gql`
  mutation removeSection($_id: ID!) {
    removeSection(_id: $_id) {
      _id
    }
  }
`

export function useRemoveSectionMutation() {
  return useMutation<RemoveSectionResponse, RemoveSectionInput>(REMOVE_SECTION)
}
