/**
 * @jest-environment jsdom
 */

import { render, screen, RenderResult } from '@testing-library/react'
import React, { createRef } from 'react'
import { axe } from 'jest-axe'
import { CustomBookmarkForm } from './CustomBookmarkForm'

describe('CustomBookmarkForm component', () => {
  const testHandlers = {
    onSave: jest.fn(),
    onCancel: jest.fn(),
  }

  let html: RenderResult

  beforeEach(() => {
    const mockNameRef = createRef<HTMLInputElement>()
    const mockUrlRef = createRef<HTMLInputElement>()

    html = render(
      <CustomBookmarkForm
        onSave={testHandlers.onSave}
        onCancel={testHandlers.onCancel}
        nameInputRef={mockNameRef}
        urlInputRef={mockUrlRef}
      />
    )
  })

  it('renders the CustomBookmarkForm component', () => {
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('URL')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Save custom link' })
    ).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    expect(await axe(html.container)).toHaveNoViolations()
  })
})
