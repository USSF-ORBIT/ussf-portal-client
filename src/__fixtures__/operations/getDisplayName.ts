import { GetDisplayNameDocument } from 'operations/portal/queries/getDisplayName.g'

export const getDisplayNameMock = [
  {
    request: {
      query: GetDisplayNameDocument,
      variables: {},
    },
    result: () => {
      return {
        data: {
          displayName: 'BERNADETTE CAMPBELL',
        },
      }
    },
  },
]
