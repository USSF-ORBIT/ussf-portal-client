/**
 * @jest-environment jsdom
 */

import {
  render,
  screen,
  RenderResult,
  act,
  waitFor,
} from '@testing-library/react'
import React, { createRef } from 'react'
import { axe } from 'jest-axe'
import { CustomBookmarkForm } from './CustomBookmarkForm'
import userEvent from '@testing-library/user-event'

describe('CustomBookmarkForm component', () => {
  const testHandlers = {
    onSave: jest.fn(),
    onCancel: jest.fn(),
  }

  let html: RenderResult

  beforeEach(async () => {
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
    await screen.findByLabelText('Name')
  })

  it('renders the CustomBookmarkForm component', async () => {
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('URL')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Save custom link' })
    ).toBeInTheDocument()
  })

  it('validates the bookmarkLabel field', async () => {
    // Input: On load, empty
    // Result: Invalid
    const labelInput = screen.getByLabelText('Name')
    expect(labelInput).toBeInvalid()

    // Input: String
    // Result: Valid
    userEvent.type(labelInput, 'My Custom Link')
    await waitFor(() => expect(labelInput).toBeValid())

    // Input: Empty
    // Result: Invalid
    userEvent.clear(labelInput)
    await waitFor(() => expect(labelInput).toBeInvalid())
  })

  it('validates the bookmarkUrl field', async () => {
    // Input: On load, empty
    // Result: Invalid
    const urlInput = screen.getByLabelText('URL')
    expect(urlInput).toBeInvalid()

    // Input: String, non-valid URL
    // Result: Invalid
    userEvent.type(urlInput, 'invalid input')
    await waitFor(() => expect(urlInput).toBeInvalid())

    userEvent.clear(urlInput)

    // Input: String, valid url with http://
    // Result: Valid
    userEvent.type(urlInput, 'http://example.com')
    await waitFor(() => expect(urlInput).toBeValid())

    userEvent.clear(urlInput)

    // Input: String, valid url with https://
    // Result: Valid
    // userEvent.type(urlInput, 'https://example.com')
    // await waitFor(() => expect(urlInput).toBeValid())

    // userEvent.clear(urlInput)

    // Input: String, valid url with no scheme
    // Result: Valid
    // Caveat:  Use .toHaveAttribute to check our value is valid
    //          `.toBeValid()` depends on aria-invalid and checkValidity()
    //          Because we have custom validation that does not conform to
    //          built-in url checking, `checkValidity()` returns false in this scenario,
    //          even though aria-invalid is false and our input is valid.
    userEvent.type(urlInput, 'example.com')
    await waitFor(() =>
      expect(urlInput).toHaveAttribute('aria-invalid', 'false')
    )
  })

  it('can cancel the form', async () => {
    // Input:
    //    Name: My Custom Link
    //    URL: example.com
    // Action: Cancel
    // Result: onCancel is called
    const labelInput = screen.getByLabelText('Name')
    userEvent.type(labelInput, 'My Custom Link')
    await waitFor(() => expect(labelInput).toBeValid())

    const urlInput = screen.getByLabelText('URL')
    userEvent.type(urlInput, 'example.com')
    await waitFor(() =>
      expect(urlInput).toHaveAttribute('aria-invalid', 'false')
    )

    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    )

    expect(testHandlers.onCancel).toHaveBeenCalledTimes(1)
  })

  it('has no a11y violations', async () => {
    expect(await axe(html.container)).toHaveNoViolations()
  })
})

describe('CustomBookmarkForm component, Add Custom Link', () => {
  const testHandlers = {
    onSave: jest.fn(),
    onCancel: jest.fn(),
  }

  let html: RenderResult

  beforeEach(async () => {
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
    await screen.findByLabelText('Name')
  })
  it('can save a valid form', async () => {
    // Input:
    //    Name: My Custom Link
    //    URL: https://example.com
    // Action: Save
    // Result: onSave is called
    const labelInput = screen.getByLabelText('Name')
    userEvent.type(labelInput, 'My Custom Link')
    await waitFor(() => expect(labelInput).toBeValid())

    const urlInput = screen.getByLabelText('URL')
    userEvent.type(urlInput, 'https://example.com')
    await waitFor(() => expect(labelInput).toBeValid())

    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: 'Save custom link' }))
    )

    expect(testHandlers.onSave).toHaveBeenCalledWith(
      'https://example.com',
      'My Custom Link'
    )

    expect(screen.getByLabelText('Name')).toHaveValue('')
    expect(screen.getByLabelText('URL')).toHaveValue('')
  })

  it('reverts the value of text when cancelling', async () => {
    const labelInput = screen.getByLabelText('Name')
    userEvent.type(labelInput, 'My Custom Link')
    const urlInput = screen.getByLabelText('URL')
    await act(async () => {
      userEvent.type(urlInput, 'http://www.example.com')
      userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    })

    expect(testHandlers.onCancel).toHaveBeenCalled()
    expect(screen.getByLabelText('Name')).toHaveValue('')
    expect(screen.getByLabelText('URL')).toHaveValue('')
  })
})

describe('CustomBookmarkForm component, Edit Custom Link', () => {
  const testHandlers = {
    onSave: jest.fn(),
    onCancel: jest.fn(),
    onDelete: jest.fn(),
  }

  let html: RenderResult

  beforeEach(async () => {
    const mockNameRef = createRef<HTMLInputElement>()
    const mockUrlRef = createRef<HTMLInputElement>()

    html = render(
      <CustomBookmarkForm
        onSave={testHandlers.onSave}
        onCancel={testHandlers.onCancel}
        onDelete={testHandlers.onDelete}
        nameInputRef={mockNameRef}
        urlInputRef={mockUrlRef}
      />
    )
    await screen.findByLabelText('Name')
  })
  it('can delete a bookmark using the form', async () => {
    // Input: Existing link, no input
    // Action: Delete
    // Result: onDelete is called
    const labelInput = screen.getByLabelText('Name')
    userEvent.type(labelInput, 'My Custom Link')
    await waitFor(() => expect(labelInput).toBeValid())

    const urlInput = screen.getByLabelText('URL')
    userEvent.type(urlInput, 'https://example.com')
    await waitFor(() => expect(labelInput).toBeValid())

    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: 'Delete' }))
    )

    expect(testHandlers.onDelete).toHaveBeenCalledTimes(1)
  })
})

// check that delete btn is renderes for add but not edit
