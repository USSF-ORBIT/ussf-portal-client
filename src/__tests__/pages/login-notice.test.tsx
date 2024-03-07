/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import LoginNotice, { getStaticProps } from 'pages/login-notice'
import LoginLayout from 'layout/LoginLayout/LoginLayout'

describe('LoginNotice page', () => {
  beforeEach(() => {
    render(<LoginNotice />)
  })

  test('renders the login notice', () => {
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Notice'
    )
  })

  test('renders the agree button', () => {
    expect(screen.getByRole('link')).toHaveTextContent('I agree')
  })

  test('returns the LoginLayout in getLayout', () => {
    const page = 'page'
    expect(LoginNotice.getLayout(page)).toEqual(<LoginLayout>page</LoginLayout>)
  })

  test('returns the expected props in getServerSideProps', async () => {
    const response = await getStaticProps()
    expect(response).toEqual({
      props: {
        pageTitle: 'Login Notice',
      },
    })
  })
})
