/**
 * @jest-environment jsdom
 */

import { act, screen, render } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import React from 'react'
import { v4 } from 'uuid'
import { axe } from 'jest-axe'
import { MockedProvider } from '@apollo/client/testing'
import { GET_COLLECTIONS } from '../../operations/queries/getCollections'
import MySpace from './MySpace'

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
            title: 'Example Collection',
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
            ],
          },
        ],
      },
    },
  },
]

describe('My Space Component', () => {
  let html: RenderResult

  beforeEach(() => {
    html = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MySpace />
      </MockedProvider>
    )
  })

  it('renders without error ', async () => {
    // Because MockedProvider is async/promise-based,
    // the test always completes when in the loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should render the collection', async () => {
    const collection = await screen.findByRole('heading', { level: 3 })
    expect(collection).toHaveTextContent(
      mocks[0].result.data.collections[0].title
    )

    expect(await screen.findByRole('list')).toBeInTheDocument()
    expect(await screen.findAllByRole('listitem')).toHaveLength(3)
    expect(await screen.findAllByRole('link')).toHaveLength(3)
  })

  it('shows an error state', async () => {
    const errorMock = [
      {
        request: {
          query: GET_COLLECTIONS,
        },
        error: new Error(),
      },
    ]

    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <MySpace />
      </MockedProvider>
    )

    expect(await screen.findByText('Error')).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      expect(await axe(html.container)).toHaveNoViolations()
    })
  })
})
