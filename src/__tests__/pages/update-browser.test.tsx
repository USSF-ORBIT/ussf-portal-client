/**
 * @jest-environment jsdom
 */
import { render, screen, act } from '@testing-library/react'
import { axe } from 'jest-axe'
import ErrorLayout from 'layout/ErrorLayout/ErrorLayout'
import UpdateBrowser, { getStaticProps } from 'pages/update-browser'

describe('Update browser page', () => {
  const MS_EDGE_DOWNLOAD = 'https://www.microsoft.com/edge'
  const GOOGLE_CHROME_DOWNLOAD = 'https://www.google.com/chrome'
  const FIREFOX_DOWNLOAD = 'https://www.mozilla.org/firefox'

  beforeEach(() => {
    render(<UpdateBrowser />)
  })

  test('renders the update browser page,', () => {
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'I’m sorry, Dave. I’m afraid you can’t use that outdated browser.'
    )
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'For a better experience, please keep your internet browser up to date or choose from one of the options below:'
    )

    expect(
      screen.getByRole('link', { name: 'Download MS Edge' })
    ).toHaveAttribute('href', MS_EDGE_DOWNLOAD)
    expect(
      screen.getByRole('link', { name: 'Download Google Chrome' })
    ).toHaveAttribute('href', GOOGLE_CHROME_DOWNLOAD)
    expect(
      screen.getByRole('link', { name: 'Download Firefox' })
    ).toHaveAttribute('href', FIREFOX_DOWNLOAD)
  })

  test('has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      const { container } = render(<UpdateBrowser />)
      expect(await axe(container)).toHaveNoViolations()
    })
  })

  test('returns the ErrorLayout in getLayout', () => {
    const page = 'page'
    expect(UpdateBrowser.getLayout(page)).toEqual(
      <ErrorLayout hideNav={true} ieCompat={true}>
        page
      </ErrorLayout>
    )
  })

  test('returns the expected props in getServerSideProps', async () => {
    const response = await getStaticProps()
    expect(response).toEqual({
      props: {
        pageTitle: 'Browser Warning',
      },
    })
  })
})
