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
    expect(screen.getByTestId('gridContainer')).toHaveTextContent(
      'Houston, we have a problem'
    )
    expect(screen.getByTestId('gridContainer')).toHaveTextContent(
      'That’s an internal server error. While we work on fixing that, let’s get you back to business.You may also submit a report to us at'
    )
  })

  it('renders a back button', async () => {
    const user = userEvent.setup()

    const backButton = screen.getByRole('button', {
      name: 'Return to previous page',
    })
    expect(backButton).toBeInTheDocument()

    await user.click(backButton)
    expect(mockBack).toHaveBeenCalled()
  })

  it('renders feedback links', async () => {
    const feedbackLink = screen.getByText('feedback@ussforbit.us')
    expect(feedbackLink).toBeVisible()
    expect(feedbackLink).toHaveAttribute('href')
    expect(feedbackLink.getAttribute('href')).toContain('feedback@ussforbit.us')
    expect(feedbackLink.getAttribute('href')).toContain(
      'USSF portal feedback -- 500 page error'
    )

    const reportBugLink = screen.getByText('Report a bug')
    expect(reportBugLink).toBeVisible()
    expect(reportBugLink).toHaveAttribute('href')
    expect(reportBugLink.getAttribute('href')).toContain(
      'feedback@ussforbit.us'
    )
    expect(reportBugLink.getAttribute('href')).toContain(
      'USSF portal feedback -- 500 page error'
    )
  })
})
