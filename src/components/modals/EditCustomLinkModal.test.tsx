/**
 * @jest-environment jsdom
 */

import { screen, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { createRef } from 'react'
import { ModalRef } from '@trussworks/react-uswds'
import { ObjectId } from 'mongodb'
import { renderWithModalRoot } from '../../testHelpers'

import EditCustomLinkModal from './EditCustomLinkModal'

describe('EditCustomLinkModal', () => {
  const mockOnSave = jest.fn()
  const mockOnCancel = jest.fn()
  const mockOnDelete = jest.fn()

  describe('with bookmark filled in', () => {
    const mockBookmark = {
      _id: ObjectId(),
      label: 'My Custom Link',
      url: 'http://www.example.com',
    }

    beforeEach(() => {
      const modalRef = createRef<ModalRef>()
      renderWithModalRoot(
        <EditCustomLinkModal
          bookmark={mockBookmark}
          modalRef={modalRef}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
          onDelete={mockOnDelete}
        />
      )
    })

    it('renders a form to edit a custom link', async () => {
      expect(screen.getByRole('heading')).toHaveTextContent('Edit custom link')

      const labelInput = screen.getByLabelText('Name')
      expect(labelInput).toHaveValue(mockBookmark.label)
      userEvent.clear(labelInput)
      userEvent.type(labelInput, 'Edited link')

      const urlInput = screen.getByLabelText('URL')
      expect(urlInput).toHaveValue(mockBookmark.url)

      await act(async () => {
        userEvent.click(
          screen.getByRole('button', { name: 'Save custom link' })
        )
      })

      expect(mockOnSave).toHaveBeenCalledWith(mockBookmark.url, 'Edited link')
    })

    it('can delete the custom link', () => {
      userEvent.click(screen.getByRole('button', { name: 'Delete' }))
      expect(mockOnDelete).toHaveBeenCalled()
    })

    it('can cancel out of the modal', () => {
      userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
      expect(mockOnCancel).toHaveBeenCalled()
    })

    it('cancelling reverts the value of the text inputs', async () => {
      expect(screen.getByRole('heading')).toHaveTextContent('Edit custom link')

      const labelInput = screen.getByLabelText('Name')
      userEvent.type(labelInput, 'My Custom Link')
      const urlInput = screen.getByLabelText('URL')
      await act(async () => {
        userEvent.type(urlInput, 'http://www.example.com')
        userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
      })

      userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
      expect(mockOnCancel).toHaveBeenCalled()
      expect(screen.getByLabelText('Name')).toHaveValue('')
      expect(screen.getByLabelText('URL')).toHaveValue('')
    })
  })

  describe('without bookmark filled in', () => {
    const mockBookmark = {
      _id: ObjectId(),
      url: '',
    }

    beforeEach(() => {
      const modalRef = createRef<ModalRef>()
      renderWithModalRoot(
        <EditCustomLinkModal
          bookmark={mockBookmark}
          modalRef={modalRef}
          onSave={mockOnSave}
          onCancel={mockOnCancel}
          onDelete={mockOnDelete}
        />
      )
    })

    it('cancelling reverts the value of the text inputs', () => {
      expect(screen.getByRole('heading')).toHaveTextContent('Edit custom link')

      userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
      expect(mockOnCancel).toHaveBeenCalled()
      expect(screen.getByLabelText('Name')).toHaveValue('')
      expect(screen.getByLabelText('URL')).toHaveValue('')
    })
  })
})
