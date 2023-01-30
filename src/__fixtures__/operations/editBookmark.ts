import { ObjectId } from 'mongodb'
import { EditBookmarkDocument } from 'operations/portal/mutations/editBookmark.g'
import { Bookmark } from 'types'

export const mockBookmark: Bookmark = {
  _id: ObjectId(),
  url: 'example.com',
  label: 'Custom Label',
}

export const mockCollectionIdForEditBookmark = ObjectId()

export const editBookmarkMock = [
  {
    request: {
      query: EditBookmarkDocument,
      variables: {
        _id: mockBookmark._id,
        collectionId: mockCollectionIdForEditBookmark,
        url: mockBookmark.url,
        label: mockBookmark.label,
      },
    },
    result: {
      data: {
        _id: mockBookmark._id,
        label: 'Updated Label',
        url: mockBookmark.url,
      },
    },
  },
]
