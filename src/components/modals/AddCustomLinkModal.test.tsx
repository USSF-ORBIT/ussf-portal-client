/**
 * @jest-environment jsdom
 */

import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { createRef } from 'react'
import { ModalRef } from '@trussworks/react-uswds'
import { renderWithModalRoot } from '../../testHelpers'

import AddCustomLinkModal from './AddCustomLinkModal'

describe('AddCustomLinkModal', () => {
  const mockOnSave = jest.fn()
  const mockOnCancel = jest.fn()

  beforeEach(() => {
    const modalRef = createRef<ModalRef>()
    renderWithModalRoot(
      <AddCustomLinkModal
        modalRef={modalRef}
        onSave={mockOnSave}
        onCancel={mockOnCancel}
      />
    )
  })

  it('renders a form to add a custom link', async () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Add a custom link')

    const labelInput = screen.getByLabelText('Name')
    // expect(labelInput).toBeInvalid()
    userEvent.type(labelInput, 'My Custom Link')
    // expect(labelInput).toBeValid()

    const urlInput = screen.getByLabelText('URL')
    expect(urlInput).toBeInTheDocument()
    // expect(urlInput).toBeInvalid()

    userEvent.type(urlInput, 'example')
    // expect(urlInput).toBeInvalid()
    userEvent.clear(urlInput)
    userEvent.type(urlInput, 'http://www.example.com')
    // expect(urlInput).toBeValid()

    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: 'Save custom link' }))
    )
    // TODO look into usefulness or how to handle
    // aria-invalid with formik
    expect(mockOnSave).toHaveBeenCalled()
  })

  it('can cancel out of the modal', () => {
    userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(mockOnCancel).toHaveBeenCalled()
  })

  it('saving reinitializes the value of the text inputs', async () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Add a custom link')

    const labelInput = screen.getByLabelText('Name')
    userEvent.type(labelInput, 'My Custom Link')
    const urlInput = screen.getByLabelText('URL')
    userEvent.type(urlInput, 'http://www.example.com')

    await act(async () =>
      userEvent.click(screen.getByRole('button', { name: 'Save custom link' }))
    )

    expect(mockOnSave).toHaveBeenCalled()
    expect(screen.getByLabelText('Name')).toHaveValue('My Custom Link')
    expect(screen.getByLabelText('URL')).toHaveValue('http://www.example.com')
  })

  it('cancelling reverts the value of the text inputs', () => {
    expect(screen.getByRole('heading')).toHaveTextContent('Add a custom link')

    const labelInput = screen.getByLabelText('Name')
    userEvent.type(labelInput, 'My Custom Link')
    const urlInput = screen.getByLabelText('URL')
    userEvent.type(urlInput, 'http://www.example.com')

    userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(mockOnCancel).toHaveBeenCalled()
    expect(screen.getByLabelText('Name')).toHaveValue('')
    expect(screen.getByLabelText('URL')).toHaveValue('')
  })
})
