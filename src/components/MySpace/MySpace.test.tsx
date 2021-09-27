/**
 * @jest-environment jsdom
 */

import { act, screen, render, waitFor } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { v4 } from 'uuid'
import { axe } from 'jest-axe'
import { MockedProvider } from '@apollo/client/testing'
import MySpace from './MySpace'
import { GET_COLLECTIONS } from 'operations/queries/getCollections'
import { REMOVE_BOOKMARK } from 'operations/mutations/removeBookmark'

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
  describe('default state', () => {
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

    it('has no a11y violations', async () => {
      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })
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

  // TODO - something is up with mocking the @client mutation
  it.skip('handles the remove bookmark operation', async () => {
    let bookmarkRemoved = false

    jest.useFakeTimers()

    const mocksWithRemove = [
      ...mocks,
      {
        request: {
          query: REMOVE_BOOKMARK,
          variables: {
            id: mocks[0].result.data.collections[0].bookmarks[0].id,
            collectionId: mocks[0].result.data.collections[0].id,
          },
        },
        result: () => {
          console.log('RESULT')
          bookmarkRemoved = true
          return { data: { removeBookmark: {} } }
        },
      },
    ]

    render(
      <MockedProvider mocks={mocksWithRemove} addTypename={false}>
        <MySpace />
      </MockedProvider>
    )

    const buttons = await screen.findAllByRole('button', {
      name: 'Remove this bookmark',
    })

    userEvent.click(buttons[0])

    // Wrapping this in act due to https://github.com/apollographql/apollo-client/issues/5920
    await act(async () => {
      jest.runAllTimers()
    })

    jest.useRealTimers()

    await waitFor(() => expect(bookmarkRemoved).toEqual(true), {
      timeout: 7000,
    })
  })
})
