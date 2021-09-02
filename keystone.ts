import { config, list } from '@keystone-next/keystone/schema'
import { text, relationship } from '@keystone-next/fields'

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
  lists: { Bookmark, Collection },
})
