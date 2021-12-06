/**
 * @jest-environment jsdom
 */
import { screen, waitFor } from '@testing-library/react'
import axios from 'axios'

import { renderWithAuth } from '../../../testHelpers'

import Accomplishments from 'pages/about-us/accomplishments'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockImplementationOnce(() => {
  return Promise.reject()
})

describe('Accomplishments page', () => {
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
      renderWithAuth(<Accomplishments />, { user: null })
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
      renderWithAuth(<Accomplishments />)
    })

    it('renders the page title', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Things we’re proud of'
      )
    })

    it.each([
      [
        'October 20, 2020',
        'June, 2020',
        'March 26, 2020',
        'December 20th, 2019',
        'February 19, 2019',
      ],
    ])('renders the %s item', (header) => {
      expect(screen.getByRole('heading', { name: header })).toBeInTheDocument()
    })
  })
})
