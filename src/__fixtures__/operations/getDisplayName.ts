import { GetDisplayNameDocument } from 'operations/portal/queries/getDisplayName.g'

export const getDisplayNameMock = [
  {
    request: {
      query: GetDisplayNameDocument,
    },
    result: {
      data: {
        displayName: 'BERNADETTE CAMPBELL',
      },
    },
  },
]
