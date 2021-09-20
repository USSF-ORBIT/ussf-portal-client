import { gql, useMutation } from '@apollo/client'

interface AddBookmarkResponse {
  collectionId: string
  url: string
  label?: string
  description?: string
}
interface AddBookmarkInput {
  collectionId: string
  url: string
  label?: string
  description?: string
}

export const ADD_BOOKMARK = gql`
  mutation addBookmark(
    $url: String!
    $label: string
    $description: string
    $collectionId: ID!
  ) {
    addBookmark(
      url: $url
      label: $label
      description: $description
      collectionId: $collectionId
    ) @client
  }
`
export function useAddBookmarkMutation() {
  // The Response and Input types are currently the same,
  // but they could change, especially once we introduce a server-side
  // schema. Being verbose in defining to be kind to future self.
  return useMutation<AddBookmarkResponse, AddBookmarkInput>(ADD_BOOKMARK)
}
