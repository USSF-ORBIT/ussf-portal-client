/**
 * @jest-environment jsdom
 */

import { screen, waitFor, act } from '@testing-library/react'
import { MockedProvider } from '@apollo/client/testing'
import { useRouter } from 'next/router'
import { axe } from 'jest-axe'
import axios from 'axios'
import { renderWithAuth } from '../../testHelpers'
import USSFDocumentation from 'pages/ussf-documentation'
import { DocumentPageType } from 'types'
import type { LDFlagSet } from 'launchdarkly-js-client-sdk'
import { getServerSideProps } from 'pages/ussf-documentation'
import { gql } from 'apollo-server-core'
import { staticPage } from 'pages/ussf-documentation'
const mockReplace = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

jest.mock('axios')

const mockedUseRouter = useRouter as jest.Mock

mockedUseRouter.mockReturnValue({
  route: '',
  pathname: '',
  query: '',
  asPath: '',
  push: jest.fn(),
  replace: mockReplace,
})

// LaunchDarkly flag to test correct content display
const mockFlags: LDFlagSet = {
  documentationPage: true,
}

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
    it('renders the loader while fetching the user', () => {
      renderWithAuth(
        <MockedProvider>
          <USSFDocumentation documentsPage={mockTestPage} />
        </MockedProvider>,
        { user: null }
      )

      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })

    it('redirects to the login page if not logged in', async () => {
      renderWithAuth(
        <MockedProvider>
          <USSFDocumentation documentsPage={mockTestPage} />
        </MockedProvider>,
        { user: null }
      )

      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/login')
      })
    })
  })

  describe('when logged in', () => {
    it('renders the documentation page from the cms', () => {
      // If LaunchDarkly flag is passed in, the CMS content will render
      renderWithAuth(
        <MockedProvider mocks={cmsDocumentationPageMock}>
          <USSFDocumentation documentsPage={mockTestPage} flags={mockFlags} />
        </MockedProvider>
      )

      expect(screen.getAllByText(`${mockTestPage.pageTitle}`)).toHaveLength(1)

      expect(
        screen.getAllByText(`${mockTestPage.sections[0].title}`)
      ).toHaveLength(1)
      expect(
        screen.getAllByText(`${mockTestPage.sections[0].document[0].title}`)
      ).toHaveLength(1)
    })

    it('renders the documentation page from static content', () => {
      // If LaunchDarkly flag is *not* passed in, the static content will render
      renderWithAuth(
        <MockedProvider mocks={cmsDocumentationPageMock}>
          <USSFDocumentation documentsPage={mockTestPage} />
        </MockedProvider>
      )

      expect(screen.getAllByText(`${staticPage.pageTitle}`)).toHaveLength(1)
      expect(
        screen.getAllByText(`${staticPage.sections[0].title}`)
      ).toHaveLength(1)
      expect(
        screen.getAllByText(`${staticPage.sections[0].document[0].title}`)
      ).toHaveLength(1)
    })

    it('has no a11y violations', async () => {
      const html = renderWithAuth(
        <MockedProvider mocks={cmsDocumentationPageMock}>
          <USSFDocumentation documentsPage={mockTestPage} />
        </MockedProvider>
      )

      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })

    it('makes the call to get user', () => {
      renderWithAuth(
        <MockedProvider>
          <USSFDocumentation documentsPage={mockTestPage} />
        </MockedProvider>
      )

      expect(axios.get).toHaveBeenCalledWith('/api/auth/user')
    })
  })
})

describe('getServerSideProps', () => {
  it('should call cms api for documents page', async () => {
    const response = await getServerSideProps()
    expect(response).toEqual(
      expect.objectContaining({
        props: {
          documentsPage: mockTestPage,
        },
      })
    )
  })
})
