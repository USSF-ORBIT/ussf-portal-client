import type { KeyValueCache } from '@apollo/utils.keyvaluecache'
import { DateTime } from 'luxon'
import { cmsInternalNewsArticleTaggedCNote as cNote } from '__fixtures__/data/cmsInternalNewsArticle'
import ThirdPartyKeystoneAPI from './thirdPartyKeystone'

describe('KeystoneAPI', () => {
  test('call getArticles with publishedDate and tag', async () => {
    const mockData = {
      data: {
        articles: [cNote],
      },
    }
    const mockCache = {} as KeyValueCache
    const keystoneAPI = new ThirdPartyKeystoneAPI({ cache: mockCache })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockPost = jest.spyOn(ThirdPartyKeystoneAPI.prototype as any, 'post')
    mockPost.mockResolvedValue(mockData)

    const now = DateTime.now()
    const result = await keystoneAPI.getPublicArticles(now, 'CNOTE')

    expect(result).toEqual(mockData)
  })
})
