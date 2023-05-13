/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ObjectId } from 'mongodb'
import React from 'react'

import { renderWithModalRoot } from '../../testHelpers'

import CustomCollection from './CustomCollection'
import { Collection } from 'types'
import { cmsBookmarksMock } from '__fixtures__/data/cmsBookmarks'

const exampleCollection: Collection = {
  _id: ObjectId(),
  title: 'Example Collection',
  type: 'Collection',
  bookmarks: [
    {
      _id: ObjectId(),
      url: 'www.example.com/1',
      label: 'MyVector',
      cmsId: '1',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com/2',
      label: 'SURF',
      cmsId: '2',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com/3',
      label: 'Orders',
      cmsId: '3',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com',
      label: 'My Custom Link',
    },
  ],
}

const exampleCollectionWithNine = {
  _id: ObjectId(),
  title: 'Example Collection',
  bookmarks: [
    {
      _id: ObjectId(),
      url: 'www.example.com/1',
      label: 'MyVector',
      cmsId: '1',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com/2',
      label: 'SURF',
      cmsId: '2',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com/3',
      label: 'Orders',
      cmsId: '3',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com',
      label: 'My Custom Link',
    },
  ],
}

const exampleCollectionWithTen = {
  _id: ObjectId(),
  title: 'Example Collection',
  bookmarks: [
    {
      _id: ObjectId(),
      url: 'www.example.com/1',
      label: 'MyVector',
      cmsId: '1',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com/2',
      label: 'SURF',
      cmsId: '2',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com/3',
      label: 'Orders',
      cmsId: '3',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com',
      label: 'My Custom Link',
    },
    {
      _id: ObjectId(),
      url: 'www.example.com',
      label: 'My Custom Link',
    },
  ],
}

describe('CustomCollection component', () => {
  const mockHandlers = {
    handleRemoveBookmark: jest.fn(),
    handleAddBookmark: jest.fn(),
    handleRemoveCollection: jest.fn(),
    handleEditCollection: jest.fn(),
    handleEditBookmark: jest.fn(),
  }

  let scrollSpy: jest.Mock

  beforeAll(() => {
    scrollSpy = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollSpy
  })

  beforeEach(() => {
    jest.clearAllMocks()
    scrollSpy.mockReset()
  })

  it('renders the collection with DragDropContext', async () => {
    const { container } = render(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={cmsBookmarksMock}
      />
    )
    await screen.findByText('Example Collection')
    expect(
      container
        .querySelector('div')
        ?.getAttribute('data-rbd-droppable-context-id')
    ).toEqual('0')
  })

  // TODO this is skipped due to an issue with react-beautiful-dnd and react 18 compatiblity.
  // Seems that `user.keyboard` below is not triggering the change and thus not calling the mockEditCollection.
  // This broke in the browser until disabling `reactStrictMode`. However that is a temporary solution and needs to be revisited
  // Since react-beautiful-dnd is in maintenance only mode and only receiving critical updates we are not sure when this will be fixed.
  // For now to complete react 18 upgrade this is turned off in favor of an e2e test that tests the same functionality.
  // We should revisit it this and the dependency in the future. See https://app.shortcut.com/orbit-truss/story/1347
  it.skip('drags and drops a link', async () => {
    const user = userEvent.setup()
    const mockEditCollection = jest.fn()

    render(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={cmsBookmarksMock}
        handleEditCollection={mockEditCollection}
      />
    )

    await screen.findByText('Example Collection')

    // Get drag handles
    const dragHandle = screen.getAllByLabelText('Drag Handle')
    expect(dragHandle[0]).toHaveAttribute('data-rbd-drag-handle-context-id')
    dragHandle[0].focus()
    expect(dragHandle[0]).toHaveFocus()

    // Use keyboard to simulate drag and drop of a link
    await user.keyboard('[Space][ArrowDown][Space]')

    expect(mockEditCollection).toHaveBeenCalled()
  })

  it('renders the collection with delete or edit buttons', async () => {
    render(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={cmsBookmarksMock}
      />
    )
    await screen.findByText('Example Collection')

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(
      screen.getByRole('heading', {
        level: 3,
      })
    ).toHaveTextContent(exampleCollection.title)

    expect(screen.getAllByRole('listitem')).toHaveLength(
      exampleCollection.bookmarks.length
    )
    expect(screen.getAllByRole('link')).toHaveLength(
      exampleCollection.bookmarks.length
    )

    expect(
      screen.getAllByRole('button', { name: 'Remove this link' })
    ).toHaveLength(3)
    expect(
      screen.getAllByRole('button', { name: 'Edit this link' })
    ).toHaveLength(1)
  })

  it('renders an Add Link toggleable form', async () => {
    const user = userEvent.setup()

    render(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={cmsBookmarksMock}
      />
    )
    await screen.findByText('Example Collection')

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    expect(toggleFormButton).toBeInTheDocument()

    await user.click(toggleFormButton)
    const linkInput = screen.getByLabelText('Select existing link')
    expect(linkInput).toBeInTheDocument()
    expect(linkInput).toBeInvalid()

    await user.click(
      screen.getByRole('button', { name: 'Toggle the dropdown list' })
    )
    await user.click(screen.getByRole('option', { name: 'SURF' }))
    expect(linkInput).toBeValid()
  })

  it('cancels Add Link action and resets form', async () => {
    const user = userEvent.setup()
    render(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={cmsBookmarksMock}
      />
    )
    await screen.findByText('Example Collection')

    await user.click(screen.getByRole('button', { name: '+ Add link' }))
    expect(screen.queryByLabelText('Select existing link')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(
      screen.getByRole('button', {
        name: '+ Add link',
      })
    ).toBeInTheDocument()

    expect(
      screen.queryByLabelText('Select existing link')
    ).not.toBeInTheDocument()
  })

  it('can select Add Custom Link and open the Add Custom Link modal', async () => {
    const user = userEvent.setup()
    const mockAddLink = jest.fn()
    const mockUpdateModalId = jest.fn()
    const mockUpdateModalText = jest.fn()
    const mockUpdateWidget = jest.fn()
    const mockUpdateCustomLinkLabel = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={cmsBookmarksMock}
        handleAddBookmark={mockAddLink}
      />,
      {
        updateModalId: mockUpdateModalId,
        updateModalText: mockUpdateModalText,
        updateWidget: mockUpdateWidget,
        updateCustomLinkLabel: mockUpdateCustomLinkLabel,
      }
    )

    await screen.findByText('Example Collection')
    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    expect(toggleFormButton).toBeInTheDocument()

    await user.click(toggleFormButton)
    const linkInput = screen.getByLabelText('Select existing link')
    expect(linkInput).toBeInTheDocument()
    expect(linkInput).toBeInvalid()

    await user.click(
      screen.getByRole('button', { name: 'Toggle the dropdown list' })
    )

    await user.click(screen.getByRole('option', { name: 'Add custom link' }))

    expect(mockUpdateModalId).toHaveBeenCalledWith('addCustomLinkModal')
    expect(mockUpdateModalText).toHaveBeenCalledWith({
      headingText: 'Add a custom link',
    })
    expect(mockUpdateWidget).toHaveBeenCalledWith({
      _id: exampleCollection._id,
      title: exampleCollection.title,
      type: 'Collection',
    })
    expect(mockUpdateCustomLinkLabel).toHaveBeenCalled()
  })

  it('can add an existing link', async () => {
    const user = userEvent.setup()
    const mockAddLink = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={cmsBookmarksMock}
        handleAddBookmark={mockAddLink}
      />
    )
    await screen.findByText('Example Collection')

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })

    await user.click(toggleFormButton)
    const linkInput = screen.getByLabelText('Select existing link')
    await user.click(linkInput)
    await user.click(screen.getByRole('option', { name: 'SURF' }))

    /* handleAddBookmark(url, label, cmsId) - these values are found in cmsBookmarksMock */
    expect(mockAddLink).toHaveBeenCalledWith('www.example.com/2', 'SURF', '2')
  })

  it('renders the settings dropdown menu', async () => {
    const user = userEvent.setup()
    render(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={cmsBookmarksMock}
      />
    )
    const menuToggleButton = await screen.findByRole('button', {
      name: 'Collection Settings',
    })
    expect(menuToggleButton).toBeInTheDocument()

    await user.click(menuToggleButton)
    const deleteItem = screen.getByRole('button', {
      name: 'Delete this collection',
    })
    expect(deleteItem).toBeInTheDocument()

    const editItem = screen.getByRole('button', {
      name: 'Edit collection title',
    })
    expect(editItem).toBeInTheDocument()
  })

  it('clicking the delete collection button opens the delete modal', async () => {
    const user = userEvent.setup()
    const mockUpdateModalId = jest.fn()
    const mockUpdateModalText = jest.fn()
    const mockUpdateWidget = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={cmsBookmarksMock}
      />,
      {
        updateModalId: mockUpdateModalId,
        updateModalText: mockUpdateModalText,
        updateWidget: mockUpdateWidget,
      }
    )

    const menuToggleButton = await screen.findByRole('button', {
      name: 'Collection Settings',
    })
    expect(menuToggleButton).toBeInTheDocument()

    await user.click(menuToggleButton)
    const deleteCollection = screen.getByRole('button', {
      name: 'Delete this collection',
    })
    expect(deleteCollection).toBeInTheDocument()
    await user.click(deleteCollection)

    expect(mockUpdateModalId).toHaveBeenCalledWith(
      'removeCustomCollectionModal'
    )
    expect(mockUpdateModalText).toHaveBeenCalledWith({
      headingText:
        'Are you sure you’d like to delete this collection from My Space?',
      descriptionText: 'This action cannot be undone.',
    })
    expect(mockUpdateWidget).toHaveBeenCalled()
  })

  it('clicking outside the dropdown menu closes the menu', async () => {
    const user = userEvent.setup()
    const mockRemoveCollection = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={cmsBookmarksMock}
        handleRemoveCollection={mockRemoveCollection}
      />
    )

    const menuToggleButton = await screen.findByRole('button', {
      name: 'Collection Settings',
    })
    // Open the menu
    await user.click(menuToggleButton)

    const deleteCollection = screen.getByRole('button', {
      name: 'Delete this collection',
    })

    expect(deleteCollection).toBeInTheDocument()
    expect(menuToggleButton).toBeInTheDocument()

    // Click outside menu
    const outsideEl = screen.getByRole('button', {
      name: '+ Add link',
    })
    await user.click(outsideEl)

    // Confirm the menu has been closed
    expect(deleteCollection).not.toBeInTheDocument()
  })

  it('clicking the menu button toggles the menu', async () => {
    const user = userEvent.setup()
    const mockRemoveCollection = jest.fn()

    renderWithModalRoot(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={cmsBookmarksMock}
        handleRemoveCollection={mockRemoveCollection}
      />
    )

    const menuToggleButton = await screen.findByRole('button', {
      name: 'Collection Settings',
    })
    // Open the menu
    await user.click(menuToggleButton)

    const deleteCollection = screen.getByRole('button', {
      name: 'Delete this collection',
    })

    expect(deleteCollection).toBeInTheDocument()
    expect(menuToggleButton).toBeInTheDocument()

    // Close the menu
    await user.click(menuToggleButton)

    // Confirm the menu has been closed
    expect(deleteCollection).not.toBeInTheDocument()
  })

  it('renders the collection with links from the CMS', () => {
    const { container } = render(
      <CustomCollection
        {...exampleCollection}
        {...mockHandlers}
        bookmarkOptions={cmsBookmarksMock}
      />
    )

    expect(container.querySelector('a')?.getAttribute('href')).toEqual(
      '/www.example.com/1'
    )
  })

  describe('an empty collection', () => {
    const user = userEvent.setup()
    it('renders a focused input for the title', () => {
      render(<CustomCollection _id={ObjectId()} {...mockHandlers} />)

      expect(screen.getByRole('textbox')).toHaveFocus()
    })

    it('can enter a title', async () => {
      const mockEditCollection = jest.fn()

      render(
        <CustomCollection
          {...mockHandlers}
          _id={ObjectId()}
          bookmarkOptions={cmsBookmarksMock}
          handleEditCollection={mockEditCollection}
        />
      )

      await user.type(screen.getByRole('textbox'), 'My New Collection{enter}')
      expect(mockEditCollection).toHaveBeenCalledWith('My New Collection')
    })

    it('not entering a title deletes the collection', async () => {
      const mockDeleteCollection = jest.fn()

      render(
        <CustomCollection
          {...mockHandlers}
          _id={ObjectId()}
          bookmarkOptions={cmsBookmarksMock}
          handleRemoveCollection={mockDeleteCollection}
        />
      )
      const cancel = screen.getByRole('button', { name: 'Cancel' })

      await user.click(cancel)
      expect(mockDeleteCollection).toHaveBeenCalled()
    })
  })

  describe('with 9 bookmarks', () => {
    it('shows a warning when adding the tenth link', async () => {
      const user = userEvent.setup()
      renderWithModalRoot(
        <CustomCollection
          {...exampleCollectionWithNine}
          {...mockHandlers}
          bookmarkOptions={cmsBookmarksMock}
        />
      )
      await screen.findByText('Example Collection')

      const toggleFormButton = screen.getByRole('button', {
        name: '+ Add link',
      })
      expect(toggleFormButton).toBeInTheDocument()
      await user.click(toggleFormButton)

      expect(screen.queryByRole('tooltip', { hidden: true })).toHaveTextContent(
        `You’re about to hit your link limit — each collection can only have 10 links.`
      )
    })
  })

  describe('with 10 bookmarks', () => {
    it('does not allow adding anymore links', async () => {
      render(
        <CustomCollection
          {...exampleCollectionWithTen}
          {...mockHandlers}
          bookmarkOptions={cmsBookmarksMock}
        />
      )

      await screen.findByText('Example Collection')

      const toggleFormButton = screen.queryByRole('button', {
        name: '+ Add link',
      })
      expect(toggleFormButton).not.toBeInTheDocument()
    })
  })
})
