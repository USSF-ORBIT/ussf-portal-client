import { gql, useMutation } from '@apollo/client'

interface EditCollectionResponse {
  id: string
  title: string
}

interface EditCollectionInput {
  title: string
  id: string
}

export const EDIT_COLLECTION = gql`
  mutation editCollection($title: String) {
    editCollection(title: $title) @client
  }
`

export function useEditCollectionMutation() {
  return useMutation<EditCollectionResponse, EditCollectionInput>(
    EDIT_COLLECTION
  )
}
