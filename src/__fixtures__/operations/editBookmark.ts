import { ObjectId } from 'mongodb'
import { EditBookmarkDocument } from 'operations/portal/mutations/editBookmark.g'
import { Bookmark } from 'types'

export const mockBookmark: Bookmark = {
  _id: ObjectId(),
  url: 'example.com',
  label: 'Updated Label',
}

export const editBookmarkMock = [
  {
    request: {
      query: EditBookmarkDocument,
      variables: {
        _id: mockBookmark._id,
        label: mockBookmark.label,
        url: mockBookmark.url,
        collectionId: ObjectId(),
      },
    },
    result: {
      data: {
        _id: mockBookmark._id,
        label: mockBookmark.label,
        url: mockBookmark.url,
      },
    },
  },
]
