import type { KeyValueCache } from '@apollo/utils.keyvaluecache'
import PersonnelAPI from '../../../../pages/api/dataSources/personnel'

const mockData = {
  First_name: 'John',
  Last_Name: 'Doe',
  DOD_ID: '1234567890',
  Grade: 'O-6',
  MAJCOM: 'ACC',
  DUTYTITLE: 'Commander',
  Country: 'USA',
  BASE_LOC: 'Langley AFB',
  Org_type: 'Squadron',
  Rank: {
    Title: 'Colonel',
    Abbreviation: 'Col',
    Grade: 'O-6',
    GradeId: 'O6',
  },
  EOPDate: '2021-10-01',
  userType: 'U',
  lastModifiedAt: '2021-10-01',
}

describe('Personnel API', () => {
  test('call getUserData with an id', async () => {
    const mockCache = {} as KeyValueCache
    const personnelAPI = new PersonnelAPI({ cache: mockCache })

    personnelAPI.baseURL = 'https://example.com'

    const mockFunc = jest.fn().mockResolvedValue({ data: mockData })
    personnelAPI.getUserData = mockFunc

    const result = await personnelAPI.getUserData('1234567890')

    expect(result).toEqual({ data: mockData })
  })

  test('throw an error when there is no baseURL', async () => {
    const mockCache = {} as KeyValueCache
    const personnelAPI = new PersonnelAPI({ cache: mockCache })

    personnelAPI.baseURL = ''

    await expect(personnelAPI.getUserData('1234567890')).rejects.toThrow(
      'No Personnel API URL found'
    )
  })
})
