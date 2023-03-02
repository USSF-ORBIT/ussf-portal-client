import { GetThemeDocument } from 'operations/portal/queries/getTheme.g'

export const getThemeMock = [
  {
    request: {
      query: GetThemeDocument,
      variables: {},
    },
    result: {
      data: {
        theme: 'dark',
      },
    },
  },
]
