import React from 'react'
import { Meta } from '@storybook/react'
import { v4 } from 'uuid'
import MySpace from './MySpace'
import type { Collection } from 'types'
import { GET_COLLECTIONS } from 'operations/queries/getCollections'

export default {
  title: 'Beta/Components/My Space',
  component: MySpace,
} as Meta

const exampleCollection: Collection[] = [
  {
    id: v4(),
    title: 'Storybook Collection',
    bookmarks: [
      {
        id: v4(),
        url: 'https://google.com',
        label: 'Webmail',
        description: 'Lorem ipsum',
      },
      {
        id: v4(),
        url: 'https://mypay.dfas.mil/#/',
        label: 'MyPay',
        description: 'Lorem ipsum',
      },
      {
        id: v4(),
        url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
        label: 'vMPF',
        description: 'Lorem ipsum',
      },
      {
        id: v4(),
        url: 'https://leave.af.mil/profile',
        label: 'LeaveWeb',
        description: 'Lorem ipsum',
      },
      {
        id: v4(),
        url: 'https://www.e-publishing.af.mil/',
        label: 'e-Publications',
        description: 'Lorem ipsum',
      },
    ],
  },
]

export const ExampleMySpace = () => <MySpace bookmarks={[]} />

ExampleMySpace.parameters = {
  apolloClient: {
    mocks: [
      {
        request: {
          query: GET_COLLECTIONS,
        },
        result: {
          data: {
            collections: exampleCollection,
          },
        },
      },
    ],
  },
}
