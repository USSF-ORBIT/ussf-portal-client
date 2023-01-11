/**
 * @jest-environment jsdom
 */
import React from 'react'
import { screen, renderHook } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ObjectId } from 'mongodb'
import { renderWithAuthAndApollo } from '../testHelpers'
import { ModalProvider, useModalContext } from './modalContext'
import CustomModal from 'components/CustomModal/CustomModal'
import { Widget } from 'types'

describe('Modal context', () => {
  it('tests removing News section', async () => {
    const user = userEvent.setup()

    const TestComponent = () => {
      const {
        modalId,
        modalRef,
        updateModalId,
        updateModalText,
        updateWidget,
      } = useModalContext()

      const setupFunc = () => {
        updateModalId('removeSectionModal')
        updateModalText({
          headingText: 'Are you sure you’d like to delete this section?',
          descriptionText:
            'You can re-add it to your My Space from the Add Section menu.',
        })

        const widgetState: Widget = {
          _id: ObjectId(),
          title: 'Recent News',
          type: 'News',
        }

        updateWidget(widgetState)

        modalRef?.current?.toggleModal(undefined, true)
      }

      return (
        <div>
          <div id="modal-root" className="sfds" />
          <h1>{modalId || 'No modalId'}</h1>
          <button type="button" onClick={setupFunc}>
            Remove section
          </button>
          <CustomModal />
        </div>
      )
    }

    renderWithAuthAndApollo(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    )

    const openModalButton = screen.getByRole('button', {
      name: 'Remove section',
    })
    expect(openModalButton).toBeInTheDocument()

    await user.click(openModalButton)

    expect(
      screen.getByText('Are you sure you’d like to delete this section?')
    ).toBeInTheDocument()

    const cancelButton = screen.getByText('Cancel')

    // Clicking the cancel button in the modal runs the closeModal()
    // function, which clears out the state. So, we expect that modalId has been
    // removed.
    await user.click(cancelButton)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'No modalId'
    )
  })

  it('tests adding a bookmark', async () => {
    const user = userEvent.setup()

    const TestComponent = () => {
      const {
        modalId,
        modalRef,
        updateModalId,
        updateModalText,
        updateWidget,
        updateCustomLinkLabel,
      } = useModalContext()

      const setupFunc = () => {
        updateModalId('addCustomLinkModal')
        updateModalText({
          headingText: 'Add a custom link',
        })

        updateWidget({
          _id: ObjectId(),
          title: 'Test Collection',
          type: 'Collection',
        })

        updateCustomLinkLabel('My Custom Label', false, true)

        modalRef?.current?.toggleModal(undefined, true)
      }

      return (
        <div>
          <div id="modal-root" className="sfds" />
          <h1>{modalId || 'No modalId'}</h1>
          <button type="button" onClick={setupFunc}>
            Add link
          </button>
          <CustomModal />
        </div>
      )
    }

    renderWithAuthAndApollo(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>
    )

    const openModalButton = screen.getByRole('button', {
      name: 'Add link',
    })
    expect(openModalButton).toBeInTheDocument()

    await user.click(openModalButton)

    // Add in link details
    const nameInput = screen.getByLabelText('Name')
    const urlInput = screen.getByLabelText('URL')

    await user.type(nameInput, 'Test Link')
    await user.type(urlInput, 'example.com')

    // Save link
    const saveButton = screen.getByText('Save custom link')
    expect(saveButton).toBeInTheDocument()

    await user.click(saveButton)

    // After saving, closeModal is called, which empties modalId state
    expect(screen.getByText('No modalId')).toBeInTheDocument()
  })
})

describe('useModalContext', () => {
  it('returns the created context', () => {
    const { result } = renderHook(() => useModalContext())
    expect(result.current).toBeTruthy()
  })
})
