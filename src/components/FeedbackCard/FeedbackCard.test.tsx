/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'

import React from 'react'

import FeedbackCard from './FeedbackCard'

describe('Feedback Card component', () => {
  it('renders a feedback card', () => {
    render(<FeedbackCard />)

    expect(
      screen.getByRole('heading', { level: 3, name: 'Got feedback?' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'feedback@ussforbit.us' })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Send us feedback' })
    ).toBeInTheDocument()
  })
})
