import type { KeyValueCache } from '@apollo/utils.keyvaluecache'
import KeystoneAPI from '../../../../pages/api/dataSources/keystone'
import { KeystoneAPIMockData as mockKeystoneAPIData } from '../../../../__fixtures__/data/weatherWidgets'

describe('KeystoneAPI', () => {
  test('call getLatLong with zipcode', async () => {
    const mockCache = {} as KeyValueCache
    const keystoneAPI = new KeystoneAPI({ cache: mockCache })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockPost = jest.spyOn(KeystoneAPI.prototype as any, 'post')
    mockPost.mockResolvedValue(mockKeystoneAPIData)

    const result = await keystoneAPI.getLatLong('90210')

    expect(result).toEqual(mockKeystoneAPIData)
  })
})
