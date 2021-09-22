import { createSchema, list } from '@keystone-next/keystone'
import { text, relationship } from '@keystone-next/keystone/fields'

const Bookmark = list({
  fields: {
    url: text({
      isRequired: true,
    }),
    label: text({
      isOrderable: true,
    }),
    description: text({ ui: { displayMode: 'textarea' } }),
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

export default createSchema({ Bookmark, Collection })
