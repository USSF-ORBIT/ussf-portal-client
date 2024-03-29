/**
 * @jest-environment jsdom
 */

import { screen, act } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { axe } from 'jest-axe'
import { renderWithAuthAndApollo } from '../../testHelpers'
import * as useUserHooks from 'hooks/useUser'
import { testPortalUser1, testUser1 } from '__fixtures__/authUsers'
import Settings, { getStaticProps } from 'pages/settings'
import { SessionUser } from 'types'
import { GetUserQuery } from 'operations/portal/queries/getUser.g'

type MockedImplementation = {
  user: SessionUser | null
  portalUser: GetUserQuery | undefined
  loading: boolean
}

beforeEach(() => {
  jest
    .spyOn(useUserHooks, 'useUser')
    .mockImplementation((): MockedImplementation => {
      return {
        user: testUser1,
        portalUser: testPortalUser1 as GetUserQuery,
        loading: false,
      }
    })
})

describe('Settings page', () => {
  describe('without a user', () => {
    test('renders the loader while fetching the user', () => {
      jest
        .spyOn(useUserHooks, 'useUser')
        .mockImplementation((): MockedImplementation => {
          return {
            user: null,
            portalUser: undefined,
            loading: true,
          }
        })
      renderWithAuthAndApollo(<Settings />)

      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })
  })

  describe('when logged in', () => {
    let html: RenderResult

    beforeEach(() => {
      html = renderWithAuthAndApollo(<Settings />)
    })

    test('renders the settings page', () => {
      expect(screen.getAllByText('Settings')).toHaveLength(1)
    })

    test('has no a11y violations', async () => {
      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })

    test('returns the expected props in getServerSideProps', async () => {
      const response = await getStaticProps()
      expect(response).toEqual({
        props: {
          pageTitle: 'Settings',
        },
      })
    })
  })
})
