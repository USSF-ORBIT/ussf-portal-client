/**
 * @jest-environment jsdom
 */
import { screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { renderWithAuth } from '../../../testHelpers'

import ForceMultiplierProgram from 'pages/training-and-education/force-multiplier-program'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockImplementationOnce(() => {
  return Promise.reject()
})

const mockReplace = jest.fn()

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

const mockedUseRouter = useRouter as jest.Mock

mockedUseRouter.mockReturnValue({
  route: '',
  pathname: '',
  query: '',
  asPath: '',
  push: jest.fn(),
  replace: mockReplace,
})

describe('Force Multiplier Program page', () => {
  describe('without a user', () => {
    beforeEach(() => {
      renderWithAuth(<ForceMultiplierProgram />, { user: null })
    })

    it('renders the loader while fetching the user', () => {
      expect(screen.getByText('Content is loading...')).toBeInTheDocument()
    })

    it('redirects to the login page if not logged in', async () => {
      await waitFor(() => {
        expect(mockReplace).toHaveBeenCalledWith('/login')
      })
    })
  })

  describe('when logged in', () => {
    beforeEach(() => {
      renderWithAuth(<ForceMultiplierProgram />)
    })

    it('renders the page title', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Become Digitally Fluent'
      )
    })

    it.each([
      [
        'Introduction to Modern Infrastructure',
        'Digital Product Development',
        'Data Science and Artificial Intelligence',
        'Cybersecurity in the DOD',
      ],
    ])('renders the %s item', (header) => {
      expect(
        screen.getByRole('heading', { name: header, level: 2 })
      ).toBeInTheDocument()
    })

    it.each([
      ['Register', 'http://digitalu.udemy.com'],
      ['digitalu.udemy.com', 'http://digitalu.udemy.com'],
      ['digitalu@us.af.mil', 'mailto:digitalu@us.af.mil'],
      ['ufbsupport@udemy.com', 'mailto:ufbsupport@udemy.com'],
    ])('renders the link to %s', (label, url) => {
      const link = screen.getByRole('link', { name: label })
      expect(link).toBeInstanceOf(HTMLAnchorElement)
      expect(link).toHaveAttribute('href', url)
    })
  })
})
