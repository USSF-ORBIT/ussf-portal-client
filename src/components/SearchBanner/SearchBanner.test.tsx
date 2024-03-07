/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import { SearchBanner } from './SearchBanner'

describe('SearchBanner component', () => {
  test('renders the icon and children with no a11y violations', async () => {
    const { container } = render(
      <SearchBanner icon={<img src="/assets/images/moon-flag.svg" alt=" " />}>
        <div>
          <h3>There are no results that match that query.</h3>
          <p>
            It seems you didn’t find what you were looking for. Please
            re-perform the query with different parameters or click on one of
            the similar suggestions to the right.
          </p>
        </div>
      </SearchBanner>
    )

    expect(screen.queryAllByRole('img')).toHaveLength(2)
    expect(
      screen.queryByText('There are no results that match that query.')
    ).toBeInTheDocument()
    expect(
      await axe(container, {
        rules: {
          'image-alt': { enabled: false },
        },
      })
    ).toHaveNoViolations()
  })
})
