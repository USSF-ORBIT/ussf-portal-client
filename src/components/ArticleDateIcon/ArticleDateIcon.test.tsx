/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'

import { ArticleDateIcon } from './ArticleDateIcon'

describe('ArticleDateIcon component', () => {
  it('renders the given date', async () => {
    const testDate = new Date('May 16 2022')
    render(<ArticleDateIcon date={testDate} />)

    expect(screen.getByText('May')).toBeInTheDocument()
    expect(screen.getByText('16')).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const testDate = new Date('May 16 2022')
    const { container } = render(<ArticleDateIcon date={testDate} />)
    expect(await axe(container)).toHaveNoViolations()
  })

  it('renders null if the given date is invalid', async () => {
    const invalidDate = 'May 16 2022' as unknown as Date
    render(<ArticleDateIcon date={invalidDate} />)

    expect(screen.queryByText('May')).not.toBeInTheDocument()
  })
})
