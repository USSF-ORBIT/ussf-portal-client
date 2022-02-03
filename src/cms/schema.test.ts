import { setupTestRunner } from '@keystone-next/keystone/testing'
import { config } from '@keystone-next/keystone'

import schema from './schema'

const testConfig = config({
  db: { provider: 'sqlite', url: 'file:./test-cms.db' },
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true,
  },
  lists: schema,
})

const runner = setupTestRunner({ config: testConfig })

describe('CMS schema', () => {
  describe('Bookmarks', () => {
    it(
      'can create a Bookmark',
      runner(async ({ context }) => {
        const bookmark = await context.query.Bookmark.createOne({
          data: { url: 'www.example.com', label: 'Test Bookmark' },
          query: 'id url label',
        })

        expect(bookmark.id).toBeTruthy()
        expect(bookmark.url).toEqual('www.example.com')
        expect(bookmark.label).toEqual('Test Bookmark')
      })
    )

    it(
      'cannot create a Bookmark without a URL',
      runner(async ({ context }) => {
        const { data, errors } = await context.graphql.raw({
          query: `mutation {
          createBookmark(data: { label: "Bookmark without URL" }) {
            id url label
          }
        }`,
        })

        expect(data?.createBookmark).toBe(null)
        expect(errors).toHaveLength(1)
        if (errors) {
          expect(errors[0].path).toEqual(['createBookmark'])
          expect(errors[0].message).toEqual(
            'You provided invalid data for this operation.\n  - Bookmark.url: Url must not be empty'
          )
        }
      })
    )
  })

  describe('Collections', () => {
    it(
      'can create an empty Collection',
      runner(async ({ context }) => {
        const collection = await context.query.Collection.createOne({
          data: { title: 'Example collection' },
          query: 'id title',
        })

        expect(collection.id).toBeTruthy()
        expect(collection.title).toEqual('Example collection')
      })
    )

    it(
      'can add a Bookmark to a Collection',
      runner(async ({ context }) => {
        const bookmark = await context.query.Bookmark.createOne({
          data: { url: 'www.example.com', label: 'Test Bookmark' },
          query: 'id',
        })

        const collection = await context.query.Collection.createOne({
          data: {
            title: 'Example collection',
            bookmarks: { connect: { id: bookmark.id } },
          },
          query: 'id title bookmarks { id }',
        })

        expect(collection.id).toBeTruthy()
        expect(collection.bookmarks).toHaveLength(1)
        expect(collection.bookmarks[0].id).toEqual(bookmark.id)
      })
    )
  })
})
