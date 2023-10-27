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

type MockedImplementation = {
  user: SessionUser | null
  portalUser: GetUserQuery | undefined
  loading: boolean
}

const guardianDirectoryMock = [
  {
    DOD_ID: "312969168",
    FirstName: "Ronald",
    LastName: "Boyd",
    DutyTitle: "Engineer",
    Rank: "Spc2/E-2",
    Email: "ronald.boyd@spaceforce.mil",
    BaseLoc: "Vandenberg",
    MajCom: "Space Training And Readiness Command (6T)"
  },
  {
    DOD_ID: "5244446289",
    FirstName: "Bernadette",
    LastName: "Campbell",
    DutyTitle: "Analyst",
    Rank: "Spc1/E-1",
    Email: "bernadette.campbell@spaceforce.mil",
    BaseLoc: "Vandenberg",
    MajCom: "United States Space Force Forces (6F)"
  },
  {
    DOD_ID: "561698119",
    FirstName: "Christina",
    LastName: "Haven",
    DutyTitle: "Space Analysis",
    Rank: "Maj/O-4",
    Email: "christina.haven@spaceforce.mil",
    BaseLoc: "Los Angeles",
    MajCom: "United States Space Force Forces (6F)"
  },
  {
    DOD_ID: "562270783",
    FirstName: "John",
    LastName: "Henke",
    DutyTitle: "Space Engineer",
    Rank: "2nd Lt/O-1",
    Email: "john.henke@spaceforce.mil",
    BaseLoc: "Vandenberg",
    MajCom: "United States Space Force Forces (6F)"
  },
  {
    DOD_ID: "376144527",
    FirstName: "Floyd",
    LastName: "King",
    DutyTitle: "Content Creator",
    Rank: "Spc3/E-3",
    Email: "floyd.king@spaceforce.mil",
    BaseLoc: "Schriever",
    MajCom: "United States Space Force Forces (6F)"
  },
  {
    DOD_ID: "643097412",
    FirstName: "Ethel",
    LastName: "Neal",
    DutyTitle: "Space Combat",
    Rank: "1st Lt/O-2",
    Email: "ethel.neal@spaceforce.mil",
    BaseLoc: "Schriever",
    MajCom: "Space Systems Command (6S)"
  },
  {
    DOD_ID: "402668108",
    FirstName: "Holly",
    LastName: "Okane",
    DutyTitle: "Crew Commander",
    Rank: "2nd Lt/O-1",
    Email: "molly.okane@spaceforce.mil",
    BaseLoc: "Buckley",
    MajCom: "United States Space Force Forces (6F)"
  },
  {
    DOD_ID: "381324635",
    FirstName: "Margaret",
    LastName: "Stivers",
    DutyTitle: "Instructor",
    Rank: "Spc4/E-4",
    Email: "margaret.stivers@spaceforce.mil",
    BaseLoc: "Ft George Mead",
    MajCom: "Space Training And Readiness Command (6T)"
  },
  {
    DOD_ID: "556070539",
    FirstName: "Lindsey",
    LastName: "Wilson",
    DutyTitle: "Designer",
    Rank: "Spc3/E-3",
    Email: "lindsey.wilson@spaceforce.mil",
    BaseLoc: "Buckley",
    MajCom: "United States Space Force Forces (6F)"
  }
]
const mockDirectory = [{
  request: {
    query: GetGuardianDirectoryDocument,
  },
  result: jest.fn(() => ({
    data: {
      guardianDirectory: guardianDirectoryMock
    }
  }))
}]

beforeEach(() => {
  jest.spyOn(useUserHooks, 'useUser').mockImplementation((): MockedImplementation => {
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
        expect(screen.getByTestId("0")).toBeVisible()
      })

      guardianDirectoryMock.map((value, idx) => {
        expect(screen.getByTestId(idx)).toBeVisible()
        expect(screen.getByTestId(`${idx}_FirstName`)).toHaveTextContent(value.FirstName)
        expect(screen.getByTestId(`${idx}_LastName`)).toHaveTextContent(value.LastName)
        expect(screen.getByTestId(`${idx}_Rank`)).toHaveTextContent(value.Rank)
        expect(screen.getByTestId(`${idx}_DutyTitle`)).toHaveTextContent(value.DutyTitle)
        expect(screen.getByTestId(`${idx}_BaseLoc`)).toHaveTextContent(value.BaseLoc)
        expect(screen.getByTestId(`${idx}_MajCom`)).toHaveTextContent(value.MajCom)
        expect(screen.getByTestId(`${idx}_Email`)).toHaveTextContent(value.Email)
      })
    })

    test('has no a11y violations', async () => {
      const html = renderWithAuthAndApollo(<GuardianDirectory />, {}, mockDirectory)

      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })
  })
})
