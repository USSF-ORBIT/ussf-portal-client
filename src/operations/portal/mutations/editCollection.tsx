import { gql, useMutation } from '@apollo/client'
import { EditCollectionMutationVariables } from 'generated/graphql'
export const EDIT_COLLECTION = gql`
  mutation editCollection(
    $_id: OID!
    $title: String!
    $bookmarks: [BookmarkReorderInput]
  ) {
    editCollection(_id: $_id, title: $title, bookmarks: $bookmarks) {
      _id
      title
      bookmarks {
        _id
        url
        label
        cmsId
        isRemoved
      }
    }
  }
`

export function useEditCollectionMutation() {
  // #TODO review with suz, result type not accepted
  return useMutation<
    { editCollection: EditCollectionMutationVariables },
    EditCollectionMutationVariables
  >(EDIT_COLLECTION)
}
