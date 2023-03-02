import { GetThemeDocument } from 'operations/portal/queries/getTheme.g'

export const getThemeMock = [
  {
    request: {
      query: GetThemeDocument,
    },
    result: jest.fn(() => ({
      data: {
        theme: 'dark',
      },
    })),
  },
]
