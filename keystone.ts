import { createSchema, config, list } from '@keystone-next/keystone'
import { text, relationship } from '@keystone-next/keystone/fields'

const Bookmark = list({
  fields: {
    url: text({
      isRequired: true,
    }),
    label: text(),
  },
})

const Collection = list({
  fields: {
    title: text({
      isRequired: true,
    }),
    bookmarks: relationship({ ref: 'Bookmark', many: true }),
  },
})

export default config({
  db: { provider: 'sqlite', url: 'file:./cms.db' },
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true,
  },
  lists: createSchema({ Bookmark, Collection }),
})
