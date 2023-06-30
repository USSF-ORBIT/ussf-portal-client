/**
 * @jest-environment jsdom
 */
import React from 'react'
import { screen, renderHook, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithAuthAndApollo } from '../testHelpers'
import { ModalProvider, useModalContext } from './modalContext'
import CustomModal from 'components/CustomModal/CustomModal'
import { Widget } from 'types'
import {
  editBookmarkMock,
  mockBookmark,
  mockCollectionIdForEditBookmark,
} from '__fixtures__/operations/editBookmark'
import {
  addBookmarkMock,
  mockCollectionId,
} from '__fixtures__/operations/addBookmark'
import {
  removeWidgetMock,
  mockWidget,
} from '__fixtures__/operations/removeWidget'
import {
  removeCollectionMock,
  mockCollection,
} from '__fixtures__/operations/removeCollection'
import {
  removeBookmarkMock,
  mockRemoveBookmark,
  mockRemoveBookmarkCollectionId,
} from '__fixtures__/operations/removeBookmark'

describe('Modal context', () => {
  afterEach(cleanup)

  test('tests removing News widget', async () => {
    const user = userEvent.setup()

    const TestComponent = () => {
      const { modalRef, updateModalId, updateModalText, updateWidget } =
        useModalContext()

      const setupFunc = () => {
        updateModalId('removeWidgetModal')
        updateModalText({
          headingText: 'Are you sure you’d like to delete this widget?',
          descriptionText:
            'You can re-add it to your My Space from the Add Widget menu.',
        })

        const widgetState: Widget = {
          _id: mockWidget._id,
          title: 'Recent News',
          type: 'News',
        }

        updateWidget(widgetState)

        // NOTE: This was causing an error when modal button was clicked
        // during the test after the storybook upgrade. Once this context
        // is refactored it should be revisited
        // modalRef?.current?.toggleModal(undefined, true)
      }

      return (
        <div>
          <div id="modal-root" className="sfds" />
          <button type="button" onClick={setupFunc}>
            Remove widget
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
      name: 'Remove widget',
    })
    expect(openModalButton).toBeInTheDocument()

    await user.click(openModalButton)

    expect(
      screen.getByText('Are you sure you’d like to delete this widget?')
    ).toBeInTheDocument()

    const deleteButton = screen.getByText('Delete')
    await user.click(deleteButton)

    expect(removeWidgetMock[0].result).toEqual({
      data: { _id: mockWidget._id },
    })
  })

  test('tests adding a bookmark', async () => {
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

        // NOTE: This was causing an error when modal button was clicked
        // during the test after the storybook upgrade. Once this context
        // is refactored it should be revisited
        // modalRef?.current?.toggleModal(undefined, true)
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

    expect(addBookmarkMock[0].result.data.label).toEqual('My Custom Label')
  })

  test('tests editing a bookmark', async () => {
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
          _id: mockCollectionIdForEditBookmark,
          title: 'Test Collection',
          type: 'Collection',
        })

        updateBookmark(mockBookmark)

        // NOTE: This was causing an error when modal button was clicked
        // during the test after the storybook upgrade. Once this context
        // is refactored it should be revisited
        // modalRef?.current?.toggleModal(undefined, true)
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
    const openModalButton = screen.getByRole('button', {
      name: 'Edit link',
    })
    expect(openModalButton).toBeInTheDocument()

    await user.click(openModalButton)

    // Update label and save
    const nameInput = screen.getByLabelText('Name')
    await user.clear(nameInput)
    await user.type(nameInput, 'Custom Label')

    const saveButton = screen.getByText('Save custom link')
    expect(saveButton).toBeInTheDocument()

    await user.click(saveButton)

    expect(editBookmarkMock[0].result.data.label).toEqual('Updated Label')
  })

  test('tests removing a bookmark while editing', async () => {
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
          _id: mockRemoveBookmarkCollectionId,
          title: 'Test Collection',
          type: 'Collection',
        })

        updateBookmark(mockRemoveBookmark)

        // NOTE: This was causing an error when modal button was clicked
        // during the test after the storybook upgrade. Once this context
        // is refactored it should be revisited
        // modalRef?.current?.toggleModal(undefined, true)
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
      removeBookmarkMock
    )

    // Open modal
    const openModalButton = screen.getByRole('button', {
      name: 'Edit link',
    })
    expect(openModalButton).toBeInTheDocument()

    await user.click(openModalButton)

    // Delete bookmark
    const deleteButton = screen.getByText('Delete')
    expect(deleteButton).toBeInTheDocument()

    await user.click(deleteButton)

    expect(removeBookmarkMock[0].result.data._id).toEqual(
      mockRemoveBookmark._id
    )
  })

  test('tests removing a custom collection', async () => {
    const user = userEvent.setup()

    const TestComponent = () => {
      const { modalRef, updateModalId, updateModalText, updateWidget } =
        useModalContext()

      const setupFunc = () => {
        updateModalId('removeCustomCollectionModal')
        updateModalText({
          headingText:
            'Are you sure you’d like to delete this collection from My Space?',
          descriptionText: 'This action cannot be undone.',
        })

        updateWidget(mockCollection)

        // NOTE: This was causing an error when modal button was clicked
        // during the test after the storybook upgrade. Once this context
        // is refactored it should be revisited
        // modalRef?.current?.toggleModal(undefined, true)
      }

      return (
        <div>
          <div id="modal-root" className="sfds" />
          <button type="button" onClick={setupFunc}>
            Remove collection
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
      removeCollectionMock
    )

    // Open modal
    const openModalButton = screen.getByRole('button', {
      name: 'Remove collection',
    })
    expect(openModalButton).toBeInTheDocument()

    await user.click(openModalButton)

    const deleteButton = screen.getByText('Delete')
    expect(deleteButton).toBeInTheDocument()

    await user.click(deleteButton)

    expect(removeCollectionMock[0].result.data._id).toEqual(mockCollection._id)
  })
})

describe('useModalContext', () => {
  test('returns the created context', () => {
    const { result } = renderHook(() => useModalContext())
    expect(result.current).toBeTruthy()
  })
})
