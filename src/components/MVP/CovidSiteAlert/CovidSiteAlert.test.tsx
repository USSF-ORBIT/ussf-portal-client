/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import CovidSiteAlert from './CovidSiteAlert'

expect.extend(toHaveNoViolations)
describe('Covid Site Alert component', () => {
  const html = render(<CovidSiteAlert />)
  it('renders the covid guidelines link', () => {
    const link = screen.getByRole('link', {
      name: 'general guidance from the Air Force',
    })

    expect(link).toBeInstanceOf(HTMLAnchorElement)

    expect(link).toHaveAttribute(
      'href',
      'https://www.af.mil/News/Coronavirus-Disease-2019/'
    )
  })
  it('has no axe violations', async () => {
    const results = await axe(html.container)
    expect(results).toHaveNoViolations()
  })
})
