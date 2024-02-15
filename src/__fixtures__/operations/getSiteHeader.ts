import { GetSiteHeaderDocument } from 'operations/portal/queries/getSiteHeader.g'

export const getSiteHeaderMock = {
  request: {
    query: GetSiteHeaderDocument,
  },
  result: jest.fn(
    /* istanbul ignore next */ () => ({
      data: {
        getSiteHeader: {
          buttonLabel: 'buttonLabel',
          buttonSource: 'buttonSource',
          dropdownLabel: 'dropdownLabel',
          dropdownItem1Label: 'dropdownItem1Label',
          dropdownItem1Source: 'dropdownItem1Source',
          dropdownItem2Label: 'dropdownItem2Label',
          dropdownItem2Source: 'dropdownItem2Source',
          dropdownItem3Label: 'dropdownItem3Label',
          dropdownItem3Source: 'dropdownItem3Source',
          dropdownItem4Label: 'dropdownItem4Label',
          dropdownItem4Source: 'dropdownItem4Source',
        },
      },
    })
  ),
}
