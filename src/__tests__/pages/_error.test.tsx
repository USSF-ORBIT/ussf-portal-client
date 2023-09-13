/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/router'
import * as analyticsHooks from 'stores/analyticsContext'
import CustomError from 'pages/_error'

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

describe('custom error page', () => {
  beforeEach(() => {
    render(<CustomError statusCode={1024} />)
  })

  it('renders the custom error page,', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('1024')
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'Houston, we have a problem'
    )
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'That’s an internal server error. While we work on fixing that, let’s get you back to business. You may also submit a report to us at'
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
      'USSF portal feedback -- 1024 page error'
    )

    const reportBugLink = screen.getByText('Report a bug')
    expect(reportBugLink).toBeVisible()
    expect(reportBugLink).toHaveAttribute('href')
    expect(reportBugLink.getAttribute('href')).toContain(
      'feedback@ussforbit.us'
    )
    expect(reportBugLink.getAttribute('href')).toContain(
      'USSF portal feedback -- 1024 page error'
    )
  })

  it('tests getInitialProps', async () => {
    const getInitialProps = CustomError.getInitialProps
    expect(getInitialProps).toBeDefined()
    expect(getInitialProps).toBeInstanceOf(Function)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ignore getInitialProps being possibly undefined because we just checked it
    const result = await getInitialProps({ res: { statusCode: 404 } })
    expect(result).toBeDefined()
    expect(result).toEqual({ statusCode: 404 })
  })

  it('tests getInitialProps with no statusCode', async () => {
    const getInitialProps = CustomError.getInitialProps
    expect(getInitialProps).toBeDefined()
    expect(getInitialProps).toBeInstanceOf(Function)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ignore getInitialProps being possibly undefined because we just checked it
    const result = await getInitialProps({})
    expect(result).toBeDefined()
    expect(result).toEqual({ statusCode: 404 })
  })

  test('calls trackEvent with the correct arguments', async () => {
    const mockTrackEvents = jest.fn()
    jest.spyOn(analyticsHooks, 'useAnalytics').mockImplementation(() => {
      return {
        push: jest.fn(),
        setUserIdFn: jest.fn(),
        unsetUserIdFn: jest.fn(),
        trackEvent: mockTrackEvents,
        trackBaseLocation: jest.fn(),
      }
    })
    render(<CustomError />)
    await waitFor(() => {
      expect(mockTrackEvents).toHaveBeenCalledWith(
        'Error page',
        'Internal error',
        '500',
        window.location.pathname
      )
    })
  })

  test('calls trackEvent with the correct arguments', async () => {
    const mockTrackEvents = jest.fn()
    jest.spyOn(analyticsHooks, 'useAnalytics').mockImplementation(() => {
      return {
        push: jest.fn(),
        setUserIdFn: jest.fn(),
        unsetUserIdFn: jest.fn(),
        trackEvent: mockTrackEvents,
        trackBaseLocation: jest.fn(),
      }
    })
    render(<CustomError statusCode={404} />)
    await waitFor(() => {
      expect(mockTrackEvents).toHaveBeenCalledWith(
        'Error page',
        'Internal error',
        '404',
        window.location.pathname
      )
    })
  })
})

describe('custom error page without status code', () => {
  beforeEach(() => {
    render(<CustomError />)
  })

  it('renders the custom error page,', () => {
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('500')
  })
})
