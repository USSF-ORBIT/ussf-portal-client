import { ObjectId } from 'mongodb'
import { RemoveCollectionDocument } from 'operations/portal/mutations/removeCollection.g'
import { Collection } from 'types'

export const mockCollection: Collection = {
  _id: ObjectId(),
  title: 'Test Collection',
  type: 'Collection',
  bookmarks: [],
}

export const removeCollectionMock = [
  {
    request: {
      query: RemoveCollectionDocument,
      variables: {
        _id: mockCollection._id,
      },
    },
    result: {
      data: {
        _id: mockCollection._id,
      },
    },
  },
]
