import { GetUserDocument } from 'operations/portal/queries/getUser.g'

export const getUserMock = [
  {
    request: {
      query: GetUserDocument,
    },
    result: jest.fn(() => ({
      data: {
        displayName: 'BERNADETTE CAMPBELL',
        mySpace: [],
        theme: 'light',
      },
    })),
  },
]
