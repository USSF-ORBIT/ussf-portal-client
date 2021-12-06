/**
 * @jest-environment jsdom
 */
import { screen, waitFor } from '@testing-library/react'
import axios from 'axios'

import { renderWithAuth } from '../../../testHelpers'

import AboutUs from 'pages/about-us/index'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>

mockedAxios.get.mockImplementationOnce(() => {
  return Promise.reject()
})

describe('About Us page', () => {
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
      renderWithAuth(<AboutUs />, { user: null })
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
      renderWithAuth(<AboutUs />)
    })

    it('renders the page title', () => {
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'About the Space Force'
      )
    })

    it('renders the birthday announcement card', () => {
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
        'Happy Birthday! 🎉'
      )
    })

    it.each([
      [
        'Essential Reading',
        'Mission',
        'Activities',
        'Leadership',
        'Rocket launches',
        'Social media',
      ],
    ])('renders the %s section', (header) => {
      expect(screen.getByRole('heading', { name: header })).toBeInTheDocument()
    })

    it.each([
      [
        'Space Capstone Publication: Spacepower. Doctrine for Space Forces',
        'https://www.spaceforce.mil/Portals/1/Space%20Capstone%20Publication_10%20Aug%202020.pdf',
      ],
      [
        'CSO’s Planning Guidance',
        'https://media.defense.gov/2020/Nov/09/2002531998/-1/-1/0/CSO%20PLANNING%20GUIDANCE.PDF',
      ],
      ['Our accomplishments', '/about-us/accomplishments'],
      ['fact sheets', 'https://www.spaceforce.mil/About-Us/Fact-Sheets/'],
      [
        'Space Force Leadership',
        'https://www.spaceforce.mil/About-Us/Leadership/',
      ],
      [
        'SpOC Leadership',
        'https://www.spoc.spaceforce.mil/About-Us/Leadership',
      ],
      [
        'SMC Center Leadership',
        'https://www.losangeles.spaceforce.mil/About-Us/Biographies/',
      ],
      [
        'Space Training and Readiness (STAR) Delta Leadership',
        'https://www.peterson.spaceforce.mil/About/Biographies/',
      ],
    ])('renders the link to %s', (label, url) => {
      const link = screen.getByRole('link', { name: label })
      expect(link).toBeInstanceOf(HTMLAnchorElement)
      expect(link).toHaveAttribute('href', url)
    })
  })
})
