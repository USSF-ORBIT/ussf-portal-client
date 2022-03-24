import { gql, useMutation } from '@apollo/client'
import { ObjectId } from 'bson'

interface AddBookmarkResponse {
  _id: ObjectId
  url: string
  label?: string
  cmsId?: string
}
interface AddBookmarkInput {
  collectionId: ObjectId
  url: string
  label?: string
  cmsId?: string
}

export const ADD_BOOKMARK = gql`
  mutation addBookmark(
    $url: String!
    $label: String
    $collectionId: OID!
    $cmsId: ID
  ) {
    addBookmark(
      url: $url
      label: $label
      collectionId: $collectionId
      cmsId: $cmsId
    ) {
      _id
      url
      label
      cmsId
    }
  }
`
export function useAddBookmarkMutation() {
  return useMutation<AddBookmarkResponse, AddBookmarkInput>(ADD_BOOKMARK)
}
