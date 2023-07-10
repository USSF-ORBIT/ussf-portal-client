import { EditThemeDocument } from 'operations/portal/mutations/editTheme.g'
import { testUser1 } from '__fixtures__/authUsers'

export const editThemeMock = [
  {
    request: {
      query: EditThemeDocument,
      variables: {
        userId: testUser1.userId,
        theme: 'dark',
      },
    },
    newData: jest.fn(() => ({
      data: {
        editTheme: {
          theme: 'dark',
        },
      },
    })),
  },
  {
    request: {
      query: EditThemeDocument,
      variables: {
        userId: testUser1.userId,
        theme: 'light',
      },
    },
    newData: jest.fn(
      /* istanbul ignore next */ () => ({
        data: {
          editTheme: {
            theme: 'light',
          },
        },
      })
    ),
  },
]
