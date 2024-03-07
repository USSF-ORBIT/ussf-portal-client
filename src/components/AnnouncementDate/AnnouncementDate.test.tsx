/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'

import React from 'react'

import AnnouncementDate from './AnnouncementDate'

describe('AnnouncementDate component', () => {
  test('renders the component', () => {
    render(<AnnouncementDate date="2022-05-17T13:44:39.796Z" />)

    expect(screen.getByText('17 MAY')).toBeInTheDocument()
    expect(screen.getByText('2022 at')).toBeInTheDocument()
    expect(screen.getByText('13:44 GMT')).toBeInTheDocument()
  })
})
