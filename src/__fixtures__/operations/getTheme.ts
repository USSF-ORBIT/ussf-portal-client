import { GetThemeDocument } from 'operations/portal/queries/getTheme.g'

export const getThemeMock = {
  request: {
    query: GetThemeDocument,
  },
  result: jest.fn(
    /* istanbul ignore next */ () => ({
      data: {
        theme: 'dark',
      },
    })
  ),
}
