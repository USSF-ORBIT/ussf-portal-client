/**
 * @jest-environment jsdom
 */

import { screen, act, waitFor } from '@testing-library/react'
import { axe } from 'jest-axe'
import { renderWithAuthAndApollo } from '../../testHelpers'
import GuardianDirectory from 'pages/guardian-directory'
import { guardianDirectoryMock } from '__fixtures__/data/guardianDirectory'
import { SearchGuardianDirectoryDocument } from 'operations/portal/queries/searchGuardianDirectory.g'
import { GetLastModifiedAtDocument } from 'operations/portal/queries/getLastModifiedAt.g'
import { GetGuardianDirectoryDocument } from 'operations/portal/queries/getGuardianDirectory.g'

const mockDirectory = [
  {
    request: {
      query: GetLastModifiedAtDocument,
    },
    result: jest.fn(() => ({
      data: {
        getLastModifiedAt: new Date(),
      },
    })),
  },
  {
    request: {
      query: SearchGuardianDirectoryDocument,
      variables: { search: '' },
    },
    result: jest.fn(() => ({
      data: {
        searchGuardianDirectory: guardianDirectoryMock,
      },
    })),
  },
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

describe('GuardianDirectory', () => {
  describe('without a user', () => {
    test('renders the loader while fetching the user', () => {
      renderWithAuthAndApollo(<GuardianDirectory />, {}, mockDirectory)
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
          value.DutyTitle
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

    // TODO: There is an a11y violation in the Search component we are importing from the
    // react-uswds library. We will re-enable this test once the violation is fixed there.
    test.skip('has no a11y violations', async () => {
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
