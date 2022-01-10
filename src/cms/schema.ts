import { list } from '@keystone-next/keystone'
import { text, relationship, checkbox } from '@keystone-next/keystone/fields'

const Bookmark = list({
  fields: {
    url: text({
      validation: {
        isRequired: true,
      },
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
      validation: {
        isRequired: true,
      },
    }),
    bookmarks: relationship({ ref: 'Bookmark', many: true }),
    showInSitesApps: checkbox({
      defaultValue: false,
      label: 'Show in Sites & Apps',
    }),
  },
})

export default { Bookmark, Collection }
