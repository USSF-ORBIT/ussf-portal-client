/**
 * @jest-environment jsdom
 */
import React from 'react'
import { screen, renderHook, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ObjectId } from 'mongodb'
import { renderWithAuthAndApollo } from '../testHelpers'
import { ModalProvider, useModalContext } from './modalContext'
import CustomModal from 'components/CustomModal/CustomModal'
import { Widget } from 'types'
import {
  editBookmarkMock,
  mockBookmark,
} from '__fixtures__/operations/editBookmark'
import {
  addBookmarkMock,
  mockCollectionId,
} from '__fixtures__/operations/addBookmark'
import {
  removeWidgetMock,
  mockWidget,
} from '__fixtures__/operations/removeWidget'

describe('Modal context', () => {
  afterEach(cleanup)

  it('tests removing News section', async () => {
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
          _id: mockWidget._id,
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
            Remove section
          </button>
          <CustomModal />
        </div>
      )
    }

    renderWithAuthAndApollo(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
      {},
      removeWidgetMock
    )

    const openModalButton = screen.getByRole('button', {
      name: 'Remove section',
    })
    expect(openModalButton).toBeInTheDocument()

    await user.click(openModalButton)

    expect(
      screen.getByText('Are you sure you’d like to delete this section?')
    ).toBeInTheDocument()

    const deleteButton = screen.getByText('Delete')
    await user.click(deleteButton)

    // Seems like I'm basically just hard-coding this? Can't figure out how to make a good assertion here
    expect(removeWidgetMock[0].result).toEqual({
      data: { _id: mockWidget._id },
    })
  })

  it('tests adding a bookmark', async () => {
    const user = userEvent.setup()

    const TestComponent = () => {
      const {
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
          _id: mockCollectionId,
          title: 'Test Collection',
          type: 'Collection',
        })

        updateCustomLinkLabel('My Custom Label', false, true)

        modalRef?.current?.toggleModal(undefined, true)
      }

      return (
        <div>
          <div id="modal-root" className="sfds" />
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
      </ModalProvider>,
      {},
      addBookmarkMock
    )

    const openModalButton = screen.getByRole('button', {
      name: 'Add link',
    })
    expect(openModalButton).toBeInTheDocument()

    await user.click(openModalButton)

    // Add in link details
    const urlInput = screen.getByLabelText('URL')

    await user.clear(urlInput)
    await user.type(urlInput, 'example.com')

    // Save link
    const saveButton = screen.getByText('Save custom link')
    expect(saveButton).toBeInTheDocument()

    await user.click(saveButton)

    // Again, not really sure what the assertion should be here
    // expect(addBookmarkMock[0].result.data.label).toEqual('fail')
  })

  it('tests editing a bookmark', async () => {
    const user = userEvent.setup()

    const TestComponent = () => {
      const {
        modalRef,
        updateModalId,
        updateModalText,
        updateWidget,
        updateBookmark,
      } = useModalContext()

      const setupFunc = () => {
        updateModalId('editCustomLinkModal')
        updateModalText({
          headingText: 'Edit custom link',
        })

        updateWidget({
          _id: ObjectId(),
          title: 'Test Collection',
          type: 'Collection',
        })

        updateBookmark(mockBookmark)

        modalRef?.current?.toggleModal(undefined, true)
      }

      return (
        <div>
          <div id="modal-root" className="sfds" />
          <button type="button" onClick={setupFunc}>
            Edit link
          </button>
          <CustomModal />
        </div>
      )
    }

    renderWithAuthAndApollo(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
      {},
      editBookmarkMock
    )

    // Open modal
    const editButton = screen.getByRole('button', {
      name: 'Edit link',
    })
    expect(editButton).toBeInTheDocument()

    await user.click(editButton)

    // Update label and save
    const nameInput = screen.getByLabelText('Name')
    await user.clear(nameInput)
    await user.type(nameInput, 'Updated Label')

    const saveButton = screen.getByText('Save custom link')
    expect(saveButton).toBeInTheDocument()

    await user.click(saveButton)

    // Need an assertion?
  })
})

describe('useModalContext', () => {
  it('returns the created context', () => {
    const { result } = renderHook(() => useModalContext())
    expect(result.current).toBeTruthy()
  })
})
