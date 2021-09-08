import { config } from '@keystone-next/keystone'

import schema from './src/cms/schema'

export default config({
  db: { provider: 'sqlite', url: 'file:./cms.db' },
  experimental: {
    generateNextGraphqlAPI: true,
    generateNodeAPI: true,
  },
  lists: schema,
})
