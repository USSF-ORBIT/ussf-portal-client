import { ObjectId } from 'mongodb'
import { RemoveBookmarkDocument } from 'operations/portal/mutations/removeBookmark.g'

export const mockRemoveBookmark = {
  _id: ObjectId(),
  url: 'example.com',
  label: 'Remove me',
}

export const mockRemoveBookmarkCollectionId = ObjectId()

export const removeBookmarkMock = [
  {
    request: {
      query: RemoveBookmarkDocument,
      variables: {
        _id: mockRemoveBookmark._id,
        collectionId: mockRemoveBookmarkCollectionId,
        // cmsId: null,
      },
    },
    result: {
      data: {
        _id: mockRemoveBookmark._id,
      },
    },
  },
]
