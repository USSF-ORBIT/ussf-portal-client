import { ObjectId } from 'mongodb'
import { AddBookmarkDocument } from 'operations/portal/mutations/addBookmark.g'

const mockBookmark = {
  url: 'example.com',
  label: 'My Custom Label',
  cmsId: null,
  isRemoved: null,
}

export const mockCollectionId = ObjectId()

export const addBookmarkMock = [
  {
    request: {
      query: AddBookmarkDocument,
      variables: {
        collectionId: mockCollectionId,
        url: mockBookmark.url,
        label: mockBookmark.label,
      },
    },
    result: {
      data: {
        _id: ObjectId(),
        url: mockBookmark.url,
        label: mockBookmark.label,
      },
    },
  },
]
