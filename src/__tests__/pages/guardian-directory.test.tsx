/**
 * @jest-environment jsdom
 */

import { screen, act } from '@testing-library/react'
import { axe } from 'jest-axe'
import { renderWithAuthAndApollo } from '../../testHelpers'
import * as useUserHooks from 'hooks/useUser'
import { testPortalUser1, testUser1 } from '__fixtures__/authUsers'
import GuardianDirectory from 'pages/guardian-directory'

beforeEach(() => {
  jest.spyOn(useUserHooks, 'useUser').mockImplementation(() => {
    return {
      user: testUser1,
      portalUser: testPortalUser1,
      loading: false,
    }
  })
})

describe('USSF Documentation page', () => {
  describe('without a user', () => {
    test('renders the loader while fetching the user', () => {
      jest.spyOn(useUserHooks, 'useUser').mockImplementation(() => {
        return {
          user: null,
          portalUser: null,
          loading: true,
        }
      })
      renderWithAuthAndApollo(<GuardianDirectory />, {})
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })
  })

  describe('when logged in', () => {
    test('renders the documentation page from the cms', () => {
      renderWithAuthAndApollo(<GuardianDirectory />, {})

      expect(
        screen.getAllByRole('heading', {
          name: 'Guardian Directory',
        })
      )
    })

    test('has no a11y violations', async () => {
      const html = renderWithAuthAndApollo(<GuardianDirectory />, {})

      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })
  })
})
