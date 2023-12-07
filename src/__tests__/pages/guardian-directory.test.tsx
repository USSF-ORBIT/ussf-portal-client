/**
 * @jest-environment jsdom
 */

import { screen, act, waitFor } from '@testing-library/react'
import { axe } from 'jest-axe'
import { renderWithAuthAndApollo } from '../../testHelpers'
import * as useUserHooks from 'hooks/useUser'
import GuardianDirectory from 'pages/guardian-directory'
import { GetGuardianDirectoryDocument } from 'operations/portal/queries/getGuardianDirectory.g'
import { SessionUser } from 'types'
import { GetUserQuery } from 'operations/portal/queries/getUser.g'
import { guardianDirectoryMock } from '__fixtures__/data/guardianDirectory'

type MockedImplementation = {
  user: SessionUser | null
  portalUser: GetUserQuery | undefined
  loading: boolean
}

const mockDirectory = [
  {
    request: {
      query: GetGuardianDirectoryDocument,
    },
    result: jest.fn(() => ({
      data: {
        guardianDirectory: guardianDirectoryMock,
      },
    })),
  },
]

beforeEach(() => {
  jest
    .spyOn(useUserHooks, 'useUser')
    .mockImplementation((): MockedImplementation => {
      return {
        user: null,
        portalUser: undefined,
        loading: false,
      }
    })
})

describe('GuardianDirectory', () => {
  describe('without a user', () => {
    test('renders the loader while fetching the user', () => {
      jest.spyOn(useUserHooks, 'useUser').mockImplementation(() => {
        return {
          user: null,
          portalUser: undefined,
          loading: true,
        }
      })
      renderWithAuthAndApollo(<GuardianDirectory />, {})
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })
  })

  describe('when logged in', () => {
    test('renders the documentation page from the cms', async () => {
      renderWithAuthAndApollo(<GuardianDirectory />, {}, mockDirectory)

      expect(
        screen.getAllByRole('heading', {
          name: 'Guardian Directory',
        })
      )

      await waitFor(() => {
        expect(screen.getByTestId('0')).toBeVisible()
      })

      guardianDirectoryMock.map((value, idx) => {
        expect(screen.getByTestId(idx)).toBeVisible()
        expect(screen.getByTestId(`${idx}_FirstName`)).toHaveTextContent(
          value.FirstName
        )
        expect(screen.getByTestId(`${idx}_LastName`)).toHaveTextContent(
          value.LastName
        )
        expect(screen.getByTestId(`${idx}_Rank`)).toHaveTextContent(value.Rank)
        expect(screen.getByTestId(`${idx}_DutyTitle`)).toHaveTextContent(
          value.DutyTitle.toUpperCase()
        )
        expect(screen.getByTestId(`${idx}_BaseLoc`)).toHaveTextContent(
          value.BaseLoc
        )
        expect(screen.getByTestId(`${idx}_MajCom`)).toHaveTextContent(
          value.MajCom
        )
        expect(screen.getByTestId(`${idx}_Email`)).toHaveTextContent(
          value.Email
        )
      })
    })

    test('has no a11y violations', async () => {
      const html = renderWithAuthAndApollo(
        <GuardianDirectory />,
        {},
        mockDirectory
      )

      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })
  })
})
