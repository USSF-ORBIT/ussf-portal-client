/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'

import Custom500 from 'pages/500'

const mockBack = jest.fn()

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
  back: mockBack,
})

describe('500 page', () => {
  beforeEach(() => {
    render(<Custom500 />)
  })

  it('renders the custom 500 page,', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('500')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Houston, we have a problem'
    )
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'That’s an internal server error. While we work on fixing that, let’s get you back to business.'
    )
  })

  it('renders a back button', async () => {
    const backButton = screen.getByRole('button', {
      name: 'Return to previous page',
    })
    expect(backButton).toBeInTheDocument()

    await userEvent.click(backButton)
    expect(mockBack).toHaveBeenCalled()
  })
})
