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
  it('checks updateModalId, updateModalText, and updateWidget', async () => {
    const user = userEvent.setup()

    const TestComponent = () => {
      const { modalRef, updateModalId, updateModalText, updateWidget } =
        useModalContext()

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

    const updateButton = screen.getByRole('button', { name: 'Update modalId' })
    expect(updateButton).toBeInTheDocument()

    await user.click(updateButton)

    expect(
      screen.getByText('Are you sure you’d like to delete this section?')
    ).toBeInTheDocument()
  })
})

describe('useModalContext', () => {
  it('returns the created context', () => {
    const { result } = renderHook(() => useModalContext())
    expect(result.current).toBeTruthy()
  })
})
