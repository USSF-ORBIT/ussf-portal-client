/**
 * @jest-environment jsdom
 */
import { screen, waitFor } from '@testing-library/react'
import axios from 'axios'

import { renderWithAuth } from '../../../testHelpers'

import TrainingAndEducation from 'pages/training-and-education/index'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockImplementationOnce(() => {
  return Promise.reject()
})

describe('Training and Education page', () => {
  describe('without a user', () => {
    const { location } = window

    beforeAll((): void => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      delete window.location
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.location = {
        href: '',
      }
    })

    afterAll((): void => {
      window.location = location
    })

    beforeEach(() => {
      renderWithAuth(<TrainingAndEducation />, { user: null })
    })

    it('renders the loader while fetching the user', () => {
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('redirects to the login page if not logged in', async () => {
      await waitFor(() => {
        expect(window.location.href).toEqual('/login')
      })
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      renderWithAuth(<TrainingAndEducation />)
    })

    it('renders the page title', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Learn and Grow'
      )
    })

    it('renders the force multiplier announcement card', () => {
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Start your journey in digital fluency with our Force Multiplier program.'
      )
    })

    it.each([['Digital Fluency', 'Other Training']])(
      'renders the %s section',
      (header) => {
        expect(
          screen.getByRole('heading', { name: header })
        ).toBeInTheDocument()
      }
    )

    it.each([
      [
        'Digital University Force Multiplier Program',
        '/training-and-education/force-multiplier-program',
      ],
      ['Digital Innovation from Space CAMP', 'https://spacecamp.il2.dsop.io/'],
      ['Defense Acquisition University', 'https://www.dau.edu/'],
      [
        'National Security Space Institute',
        'https://www2.peterson.af.mil/nssi/',
      ],
    ])('renders the link to %s', (label, url) => {
      const link = screen.getByRole('link', { name: label })
      expect(link).toBeInstanceOf(HTMLAnchorElement)
      expect(link).toHaveAttribute('href', url)
    })
  })
})
