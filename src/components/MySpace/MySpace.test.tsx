/**
 * @jest-environment jsdom
 */

import { act, screen, render } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import React from 'react'
import { v4 } from 'uuid'
import { MockedProvider } from '@apollo/client/testing'
import {
  CollectionsQueryResponse,
  GET_COLLECTIONS,
} from '../../operations/queries/getCollections'
import MySpace from './MySpace'
import type { Collection } from 'types'

const mocks = [
  {
    request: {
      query: GET_COLLECTIONS,
    },
    result: {
      data: {
        collections: [
          {
            id: v4(),
            title: 'Cat Collection',
            bookmarks: [
              {
                id: v4(),
                url: 'cat.com',
                label: 'A Good Cat',
              },
            ],
          },
        ],
      },
    },
  },
]
const getStaticData = () => {
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
      ],
    },
  ]

  const staticData: CollectionsQueryResponse = {
    collections: exampleCollection,
  }

  return staticData
}
describe('My Space component', () => {
  let html: RenderResult
  describe('with static data', () => {
    beforeEach(() => {
      // Create a small static collection

      html = render(
        <MockedProvider mocks={mocks}>
          <MySpace />
        </MockedProvider>
      )
    })

    it('renders a Collection', () => {
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toHaveTextContent('Storybook Collection')
    })
  })
})
