import type { KeyValueCache } from '@apollo/utils.keyvaluecache'
import PersonnelAPI from '../../../../pages/api/dataSources/personnel'

const mockData = {
  FirstName: 'John',
  LastName: 'Doe',
  DOD_ID: '1234567890',
  Grade: 'O-6',
  MajCom: 'ACC',
  DutyTitle: 'Commander',
  Country: 'USA',
  BaseLoc: 'Langley AFB',
  OrgType: 'Squadron',
  Rank: {
    Title: 'Colonel',
    Abbreviation: 'Col',
    Grade: 'O-6',
    GradeId: 'O6',
  },
  EOPDate: '2021-10-01',
  UserType: 'Officer',
  lastModifiedAt: '2021-10-01',
}

const mockLastModifiedAt = '2021-10-01'

describe('Personnel API', () => {
  describe('getUserData', () => {
    test('call getUserData with an id', async () => {
      const mockCache = {} as KeyValueCache
      const personnelAPI = new PersonnelAPI({ cache: mockCache })

      personnelAPI.baseURL = 'https://example.com'

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockPost = jest.spyOn(PersonnelAPI.prototype as any, 'post')
      mockPost.mockResolvedValue({ data: mockData })

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

  describe('getGuardianDirectory', () => {
    test('call getGuardianDirectory with an id', async () => {
      const mockCache = {} as KeyValueCache
      const personnelAPI = new PersonnelAPI({ cache: mockCache })

      personnelAPI.baseURL = 'https://example.com'

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockPost = jest.spyOn(PersonnelAPI.prototype as any, 'post')
      mockPost.mockResolvedValue({ data: mockData })

      const result = await personnelAPI.getGuardianDirectory()

      expect(result).toEqual({ data: mockData })
    })

    test('throw an error when there is no baseURL', async () => {
      const mockCache = {} as KeyValueCache
      const personnelAPI = new PersonnelAPI({ cache: mockCache })

      personnelAPI.baseURL = ''

      await expect(personnelAPI.getGuardianDirectory()).rejects.toThrow(
        'No Personnel API URL found'
      )
    })
  })

  describe('getLastModifiedAt', () => {
    test('call getLastModifiedAt with an id', async () => {
      const mockCache = {} as KeyValueCache
      const personnelAPI = new PersonnelAPI({ cache: mockCache })

      personnelAPI.baseURL = 'https://example.com'

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockPost = jest.spyOn(PersonnelAPI.prototype as any, 'post')
      mockPost.mockResolvedValue({ data: mockLastModifiedAt })

      const result = await personnelAPI.getLastModifiedAt()

      expect(result).toEqual({ data: mockLastModifiedAt })
    })

    test('throw an error when there is no baseURL', async () => {
      const mockCache = {} as KeyValueCache
      const personnelAPI = new PersonnelAPI({ cache: mockCache })

      personnelAPI.baseURL = ''

      await expect(personnelAPI.getLastModifiedAt()).rejects.toThrow(
        'No Personnel API URL found'
      )
    })
  })

  describe('searchGuardianDirectory', () => {
    test('call searchGuardianDirectory with an id', async () => {
      const mockCache = {} as KeyValueCache
      const personnelAPI = new PersonnelAPI({ cache: mockCache })

      personnelAPI.baseURL = 'https://example.com'

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mockPost = jest.spyOn(PersonnelAPI.prototype as any, 'post')
      mockPost.mockResolvedValue({ data: mockData })

      const result = await personnelAPI.searchGuardianDirectory('1234567890')

      expect(result).toEqual({ data: mockData })
    })

    test('throw an error when there is no baseURL', async () => {
      const mockCache = {} as KeyValueCache
      const personnelAPI = new PersonnelAPI({ cache: mockCache })

      personnelAPI.baseURL = ''

      await expect(
        personnelAPI.searchGuardianDirectory('1234567890')
      ).rejects.toThrow('No Personnel API URL found')
    })
  })
})
