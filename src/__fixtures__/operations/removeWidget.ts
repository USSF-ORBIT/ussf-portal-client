import { ObjectId } from 'mongodb'
import { RemoveWidgetDocument } from 'operations/portal/mutations/removeWidget.g'

export const mockWidget = {
  _id: ObjectId(),
}

export const removeWidgetMock = [
  {
    request: {
      query: RemoveWidgetDocument,
      variables: {
        _id: mockWidget._id,
      },
    },
    result: {
      data: {
        _id: mockWidget._id,
      },
    },
  },
]
