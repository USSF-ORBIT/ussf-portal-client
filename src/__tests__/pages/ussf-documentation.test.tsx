/**
 * @jest-environment jsdom
 */

import { screen, act } from '@testing-library/react'
import { axe } from 'jest-axe'
import { gql } from 'apollo-server-core'
import { mockFlags, resetLDMocks } from 'jest-launchdarkly-mock'
import { renderWithAuthAndApollo } from '../../testHelpers'
import { DocumentPageType } from 'types'
import USSFDocumentation, {
  getServerSideProps,
  staticPage,
} from 'pages/ussf-documentation'

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
  describe('when logged in', () => {
    it('renders the documentation page from the cms', () => {
      // If LaunchDarkly flag is passed in, the CMS content will render
      mockFlags({
        documentationPage: true,
      })

      renderWithAuthAndApollo(
        <USSFDocumentation documentsPage={mockTestPage} />,
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

    it('renders the documentation page from static content', () => {
      // If LaunchDarkly flag is *not* passed in, the static content will render
      resetLDMocks()

      renderWithAuthAndApollo(
        <USSFDocumentation documentsPage={mockTestPage} />,
        {},
        cmsDocumentationPageMock
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
      const html = renderWithAuthAndApollo(
        <USSFDocumentation documentsPage={mockTestPage} />,
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
