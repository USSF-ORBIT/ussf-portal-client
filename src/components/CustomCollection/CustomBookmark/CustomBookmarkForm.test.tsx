/**
 * @jest-environment jsdom
 */

import { render, screen, RenderResult, waitFor } from '@testing-library/react'
import React, { createRef } from 'react'
import { axe } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import { CustomBookmarkForm } from './CustomBookmarkForm'

const testHandlers = {
  onSave: jest.fn(),
  onCancel: jest.fn(),
  onDelete: jest.fn(),
}

const mockNameRef = createRef<HTMLInputElement>()
const mockUrlRef = createRef<HTMLInputElement>()

afterEach(() => {
  jest.clearAllMocks()
})

describe('CustomBookmarkForm component', () => {
  it('renders the CustomBookmarkForm component', async () => {
    const html = render(
      <CustomBookmarkForm
        {...testHandlers}
        nameInputRef={mockNameRef}
        urlInputRef={mockUrlRef}
      />
    )
    const label = await screen.findByLabelText('Name')
    expect(label).toBeInTheDocument()
    expect(screen.getByLabelText('URL')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Save custom link' })
    ).toBeInTheDocument()
  })

  it('validates the bookmarkLabel field', async () => {
    const user = userEvent.setup()
    const html = render(
      <CustomBookmarkForm
        {...testHandlers}
        nameInputRef={mockNameRef}
        urlInputRef={mockUrlRef}
      />,
      { legacyRoot: true }
    )

    // Input: On load, empty, untouched
    // Result: Valid
    const labelInput = await screen.findByLabelText('Name')
    expect(labelInput).toBeValid()

    // Input: String
    // Result: Valid
    await user.type(labelInput, 'My Custom Link')
    expect(labelInput).toBeValid()

    // Input: Empty
    // Result: Invalid
    await user.clear(labelInput)
    expect(labelInput).toBeInvalid()
  })

  it('validates the bookmarkUrl field', async () => {
    const user = userEvent.setup()
    const html = render(
      <CustomBookmarkForm
        {...testHandlers}
        nameInputRef={mockNameRef}
        urlInputRef={mockUrlRef}
      />
    )

    // Input: On load, empty, untouched
    // Result: Valid
    const urlInput = await screen.findByLabelText('URL')
    expect(urlInput).toBeValid()

    // Input: String, non-valid URL
    // Result: Invalid
    await user.type(urlInput, 'invalid input')
    expect(urlInput).toBeInvalid()

    await user.clear(urlInput)

    // Input: String, valid url with http://
    // Result: Valid
    await user.type(urlInput, 'http://example.com')
    expect(urlInput).toBeValid()

    await user.clear(urlInput)

    // Input: String, valid url with https://
    // Result: Valid
    await user.type(urlInput, 'https://example.com')
    expect(urlInput).toBeValid()

    await user.clear(urlInput)

    // Input: String, valid url with no scheme
    // Result: Valid
    // Caveat:  Use .toHaveAttribute to check our value is valid
    //          `.toBeValid()` depends on aria-invalid and checkValidity()
    //          Because we have custom validation that does not conform to
    //          built-in url checking, `checkValidity()` returns false in this scenario,
    //          even though aria-invalid is false and our input is valid.
    await user.type(urlInput, 'example.com')
    expect(urlInput).toHaveAttribute('aria-invalid', 'false')
  })

  it('can cancel the form', async () => {
    const user = userEvent.setup()
    const html = render(
      <CustomBookmarkForm
        {...testHandlers}
        nameInputRef={mockNameRef}
        urlInputRef={mockUrlRef}
      />
    )

    // Input:
    //    Name: My Custom Link
    //    URL: example.com
    // Action: Cancel
    // Result: onCancel is called
    const labelInput = await screen.findByLabelText('Name')
    await user.type(labelInput, 'My Custom Link')
    expect(labelInput).toBeValid()

    const urlInput = screen.getByLabelText('URL')
    await user.type(urlInput, 'example.com')
    expect(urlInput).toHaveAttribute('aria-invalid', 'false')

    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(testHandlers.onCancel).toHaveBeenCalledTimes(1)
  })

  it('has no a11y violations', async () => {
    const html = render(
      <CustomBookmarkForm
        {...testHandlers}
        nameInputRef={mockNameRef}
        urlInputRef={mockUrlRef}
      />
    )

    await screen.findByLabelText('Name')
    expect(await axe(html.container)).toHaveNoViolations()
  })
})

describe('CustomBookmarkForm component, Add Custom Link', () => {
  it('can save a valid form', async () => {
    const user = userEvent.setup()
    const html = render(
      <CustomBookmarkForm
        {...testHandlers}
        nameInputRef={mockNameRef}
        urlInputRef={mockUrlRef}
      />
    )
    // Input:
    //    Name: My Custom Link
    //    URL: https://example.com
    // Action: Save
    // Result: onSave is called
    const labelInput = await screen.findByLabelText('Name')
    await user.type(labelInput, 'My Custom Link')
    expect(labelInput).toBeValid()

    const urlInput = screen.getByLabelText('URL')
    await user.type(urlInput, 'https://example.com')
    expect(labelInput).toBeValid()

    await user.click(screen.getByRole('button', { name: 'Save custom link' }))

    expect(testHandlers.onSave).toHaveBeenCalledWith(
      'https://example.com',
      'My Custom Link'
    )
    await waitFor(() => expect(screen.getByLabelText('Name')).toHaveValue(''))
    expect(screen.getByLabelText('URL')).toHaveValue('')
  })

  it('reverts the value of text when cancelling', async () => {
    const user = userEvent.setup()
    const html = render(
      <CustomBookmarkForm
        {...testHandlers}
        nameInputRef={mockNameRef}
        urlInputRef={mockUrlRef}
      />
    )
    const labelInput = await screen.findByLabelText('Name')
    await user.type(labelInput, 'My Custom Link')
    const urlInput = screen.getByLabelText('URL')

    await user.type(urlInput, 'http://www.example.com')
    await user.click(screen.getByRole('button', { name: 'Cancel' }))

    expect(testHandlers.onCancel).toHaveBeenCalled()
    expect(screen.getByLabelText('Name')).toHaveValue('')
    expect(screen.getByLabelText('URL')).toHaveValue('')
  })

  it('has no a11y violations', async () => {
    const html = render(
      <CustomBookmarkForm
        {...testHandlers}
        nameInputRef={mockNameRef}
        urlInputRef={mockUrlRef}
      />
    )
    await screen.findByLabelText('Name')
    expect(await axe(html.container)).toHaveNoViolations()
  })
})

describe('CustomBookmarkForm component, Edit Custom Link', () => {
  it('can delete a bookmark using the form', async () => {
    const user = userEvent.setup()
    const html = render(
      <CustomBookmarkForm
        {...testHandlers}
        nameInputRef={mockNameRef}
        urlInputRef={mockUrlRef}
      />
    )
    // Input: Existing link, no input
    // Action: Delete
    // Result: onDelete is called
    const labelInput = await screen.findByLabelText('Name')
    await user.type(labelInput, 'My Custom Link')
    expect(labelInput).toBeValid()

    const urlInput = screen.getByLabelText('URL')
    await user.type(urlInput, 'https://example.com')
    expect(labelInput).toBeValid()

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(testHandlers.onDelete).toHaveBeenCalledTimes(1)
  })

  it('has no a11y violations', async () => {
    const html = render(
      <CustomBookmarkForm
        {...testHandlers}
        nameInputRef={mockNameRef}
        urlInputRef={mockUrlRef}
      />
    )
    await screen.findByLabelText('Name')
    expect(await axe(html.container)).toHaveNoViolations()
  })
})
