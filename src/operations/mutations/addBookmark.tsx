import { gql, useMutation } from '@apollo/client'

interface AddBookmarkResponse {
  _id: string
  url: string
  label?: string
}
interface AddBookmarkInput {
  collectionId: string
  url: string
  label?: string
}

export const ADD_BOOKMARK = gql`
  mutation addBookmark($url: String!, $label: String, $collectionId: ID!) {
    addBookmark(url: $url, label: $label, collectionId: $collectionId) {
      _id
      url
      label
    }
  }
`
export function useAddBookmarkMutation() {
  return useMutation<AddBookmarkResponse, AddBookmarkInput>(ADD_BOOKMARK)
}
