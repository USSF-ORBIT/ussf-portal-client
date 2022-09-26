/**
 * @jest-environment jsdom
 */

import { screen, act, RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React, { createRef } from 'react'
import { ModalRef } from '@trussworks/react-uswds'
import { ObjectId } from 'mongodb'
import { axe } from 'jest-axe'
import { renderWithModalRoot } from '../../testHelpers'
import EditCustomLinkModal from './EditCustomLinkModal'

describe('EditCustomLinkModal', () => {
  const testHandlers = {
    onSave: jest.fn(),
    onDelete: jest.fn(),
    onCancel: jest.fn(),
  }
  let html: RenderResult

  describe('with bookmark filled in', () => {
    const mockBookmark = {
      _id: ObjectId(),
      label: 'My Custom Link',
      url: 'http://www.example.com',
    }

    beforeEach(async () => {
      const modalRef = createRef<ModalRef>()

      html = renderWithModalRoot(
        <EditCustomLinkModal
          bookmark={mockBookmark}
          modalRef={modalRef}
          onSave={testHandlers.onSave}
          onCancel={testHandlers.onCancel}
          onDelete={testHandlers.onDelete}
        />
      )

      await screen.findByRole('dialog', { name: 'Edit custom link' })
    })

    it('renders the EditCustomLinkModal component', async () => {
      expect(screen.getByRole('heading')).toHaveTextContent('Edit custom link')
      expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
    })

    it('can cancel out of the modal', () => {
      userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
      expect(testHandlers.onCancel).toHaveBeenCalled()
    })

    it('can delete the custom link', () => {
      userEvent.click(screen.getByRole('button', { name: 'Delete' }))
      expect(testHandlers.onDelete).toHaveBeenCalled()
    })

    it('has no a11y violations', async () => {
      expect(await axe(html.container)).toHaveNoViolations()
    })
  })

  describe('without bookmark filled in', () => {
    const mockBookmark = {
      _id: ObjectId(),
      label: '',
      url: '',
    }

    beforeEach(async () => {
      const modalRef = createRef<ModalRef>()

      html = renderWithModalRoot(
        <EditCustomLinkModal
          bookmark={mockBookmark}
          modalRef={modalRef}
          onSave={testHandlers.onSave}
          onCancel={testHandlers.onCancel}
          onDelete={testHandlers.onDelete}
        />
      )

      await screen.findByRole('dialog', { name: 'Edit custom link' })
    })

    it('cancelling reverts the value of the text inputs', async () => {
      expect(screen.getByRole('heading')).toHaveTextContent('Edit custom link')
      userEvent.click(screen.getByRole('button', { name: 'Cancel' }))
      expect(testHandlers.onCancel).toHaveBeenCalled()
      expect(screen.getByLabelText('Name')).toHaveValue('')
      expect(screen.getByLabelText('URL')).toHaveValue('')
    })

    it('has no a11y violations', async () => {
      expect(await axe(html.container)).toHaveNoViolations()
    })
  })
})
