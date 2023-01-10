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
  it('test flow for removing News section', async () => {
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
            Update modalId
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
      name: 'Update modalId',
    })
    expect(openModalButton).toBeInTheDocument()

    // screen.debug()

    await user.click(openModalButton)

    expect(
      screen.getByText('Are you sure you’d like to delete this section?')
    ).toBeInTheDocument()

    const cancelButton = screen.getByText('Cancel')

    // Clicking the cancel button in the modal runs the closeModal()
    // function, which clears out the state. Thus, we expect that modalId has been
    // removed, and the text 'No modalId' displays.
    await user.click(cancelButton)

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'No modalId'
    )
  })
})

describe('useModalContext', () => {
  it('returns the created context', () => {
    const { result } = renderHook(() => useModalContext())
    expect(result.current).toBeTruthy()
  })
})
