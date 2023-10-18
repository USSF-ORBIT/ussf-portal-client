/**
 * @jest-environment jsdom
 */

import { screen, act } from '@testing-library/react'
import { axe } from 'jest-axe'
import { gql } from 'graphql-tag'
import { renderWithAuthAndApollo } from '../../testHelpers'
import * as useUserHooks from 'hooks/useUser'
import { testPortalUser1, testUser1 } from '__fixtures__/authUsers'
import { DocumentPageType, SessionUser } from 'types'
import USSFDocumentation, { getServerSideProps } from 'pages/ussf-documentation'
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

const mockTestPage: DocumentPageType = {
  id: 'any',
  pageTitle: 'Test Documentation',
  sections: [
    {
      id: '12345678',
      title: 'Section 1',
      document: [
        {
          id: '87654321',
          title: 'Document 1',
          file: {
            url: 'http://localhost:3000/test.pdf',
          },
        },
      ],
    },
  ],
}

jest.mock('../../lib/keystoneClient', () => ({
  client: {
    query: () => {
      return {
        data: {
          documentsPages: [mockTestPage],
        },
      }
    },
  },
}))

// Mock the Apollo Client query response to test getServerSideProps
const cmsDocumentationPageMock = [
  {
    request: {
      query: gql`
        query getDocumentsPage {
          documentsPages {
            id
            pageTitle
            sections {
              id
              title
              document {
                title
                file {
                  url
                }
              }
            }
          }
        }
      `,
    },
    result: {
      data: {
        documentPages: [
          {
            id: '1',
            pageTitle: 'Test Documentation',
            sections: [
              {
                id: '12345678',
                title: 'Section 1',
                document: [
                  {
                    id: '87654321',
                    title: 'Document 1',
                    file: {
                      url: 'http://localhost:3000/test.pdf',
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  },
]

describe('USSF Documentation page', () => {
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
      renderWithAuthAndApollo(
        <USSFDocumentation
          documentsPage={mockTestPage}
          pageTitle={'Documentation'}
        />,
        {},
        cmsDocumentationPageMock
      )
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })
  })

  describe('when logged in', () => {
    test('renders the documentation page from the cms', () => {
      renderWithAuthAndApollo(
        <USSFDocumentation
          documentsPage={mockTestPage}
          pageTitle={'Documentation'}
        />,
        {},
        cmsDocumentationPageMock
      )

      expect(screen.getAllByText(`${mockTestPage.pageTitle}`)).toHaveLength(1)

      expect(
        screen.getAllByText(`${mockTestPage.sections[0].title}`)
      ).toHaveLength(1)
      expect(
        screen.getAllByText(`${mockTestPage.sections[0].document[0].title}`)
      ).toHaveLength(1)
    })

    test('has no a11y violations', async () => {
      const html = renderWithAuthAndApollo(
        <USSFDocumentation
          documentsPage={mockTestPage}
          pageTitle={'Documentation'}
        />,
        {},
        cmsDocumentationPageMock
      )

      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })
  })
})

describe('getServerSideProps', () => {
  test('should call cms api for documents page', async () => {
    const response = await getServerSideProps()
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          documentsPage: mockTestPage,
          pageTitle: 'Documentation',
        },
      })
    )
  })
})
