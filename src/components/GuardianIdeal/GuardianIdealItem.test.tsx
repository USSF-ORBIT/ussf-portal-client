/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'
import GuardianIdealItem from './GuardianIdealItem'
import { IdealListItem } from 'types'

const mockIdeal: IdealListItem = {
  id: '849eb02a-ac3d-4dfd-a95d-5a4868d9d9b5',
  title: 'Connect in a Collaborative Environment',
  labels: [
    {
      id: 'label1',
      name: 'Guardian Ideal',
      type: 'Source',
    },
  ],
  publishedDate: '',
  body: 'The purpose of this objective is to set the conditions to create a fearless organizational culture so all individuals can contribute to their full potential.',
}

const mockIdealWithHero: IdealListItem = {
  ...mockIdeal,
  hero: {
    url: 'url/to/an/image',
  },
}

describe('GuardianIdealItem component', () => {
  test('renders the GuardianIdealItem component', () => {
    render(<GuardianIdealItem ideal={mockIdeal} />)

    expect(
      screen.getByText('Connect in a Collaborative Environment')
    ).toBeInTheDocument()
    expect(screen.getByText('Guardian Ideal')).toBeInTheDocument()
  })

  test('renders the GuardianIdealItem component with an image', () => {
    render(<GuardianIdealItem ideal={mockIdealWithHero} />)

    expect(
      screen.getByAltText('guardian ideal hero graphic')
    ).toBeInTheDocument()
  })
})
