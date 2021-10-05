/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { v4 } from 'uuid'

import CustomCollection from './CustomCollection'

const exampleCollection = {
  id: v4(),
  title: 'Example Collection',
  bookmarks: [
    {
      id: v4(),
      url: 'https://google.com',
      label: 'Webmail',
      description: 'Lorem ipsum',
    },
    {
      id: v4(),
      url: 'https://mypay.dfas.mil/#/',
      label: 'MyPay',
      description: 'Lorem ipsum',
    },
    {
      id: v4(),
      url: 'https://afpcsecure.us.af.mil/PKI/MainMenu1.aspx',
      label: 'vMPF',
      description: 'Lorem ipsum',
    },
  ],
}

describe('CustomCollection component', () => {
  it('renders the collection with delete buttons', () => {
    render(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={jest.fn()}
      />
    )
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      exampleCollection.title
    )
    expect(screen.getAllByRole('listitem')).toHaveLength(
      exampleCollection.bookmarks.length
    )
    expect(screen.getAllByRole('link')).toHaveLength(
      exampleCollection.bookmarks.length
    )
    expect(
      screen.getAllByRole('button', { name: 'Remove this bookmark' })
    ).toHaveLength(exampleCollection.bookmarks.length)
  })

  it('renders an Add Link toggleable form', () => {
    render(
      <CustomCollection
        {...exampleCollection}
        handleRemoveBookmark={jest.fn()}
        handleAddBookmark={jest.fn()}
      />
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    expect(toggleFormButton).toBeInTheDocument()

    userEvent.click(toggleFormButton)
    const urlInput = screen.getByLabelText('URL')
    expect(urlInput).toBeInTheDocument()
    expect(urlInput).toBeInvalid()

    userEvent.type(urlInput, 'example')
    expect(urlInput).toBeInvalid()
    userEvent.type(urlInput, 'http://www.example.com')
    expect(urlInput).toBeValid()
  })

  it('entering a new link opens the modal', () => {
    const mockAddLink = jest.fn()

    const modalContainer = document.createElement('div')
    modalContainer.setAttribute('id', 'modal-root')

    render(
      <>
        <CustomCollection
          {...exampleCollection}
          handleRemoveBookmark={jest.fn()}
          handleAddBookmark={mockAddLink}
        />
        <div id="modal-root" />
      </>,
      { container: document.body.appendChild(modalContainer) }
    )

    const toggleFormButton = screen.getByRole('button', { name: '+ Add link' })
    userEvent.click(toggleFormButton)
    const urlInput = screen.getByLabelText('URL')
    userEvent.type(urlInput, 'http://www.example.com')
    userEvent.click(screen.getByRole('button', { name: 'Add site' }))

    // Open modal
    expect(screen.getByRole('dialog')).toHaveClass('is-visible')

    const labelInput = screen.getByLabelText('Label')
    expect(labelInput).toBeInvalid()
    userEvent.type(labelInput, 'My Custom Link')
    expect(labelInput).toBeValid()

    userEvent.click(screen.getByRole('button', { name: 'Save link name' }))

    expect(mockAddLink).toHaveBeenCalled()
  })

  it.only('adding a link closes the modal and resets the form', () => {
    const mockAddLink = jest.fn()

    const modalContainer = document.createElement('div')
    modalContainer.setAttribute('id', 'modal-root')

    render(
      <>
        <CustomCollection
          {...exampleCollection}
          handleRemoveBookmark={jest.fn()}
          handleAddBookmark={mockAddLink}
        />
        <div id="modal-root" />
      </>,
      { container: document.body.appendChild(modalContainer) }
    )

    userEvent.click(screen.getByRole('button', { name: '+ Add link' }))
    userEvent.type(screen.getByLabelText('URL'), 'http://www.example.com')
    userEvent.click(screen.getByRole('button', { name: 'Add site' }))

    // Open modal
    expect(screen.getByRole('dialog')).toHaveClass('is-visible')

    const labelInput = screen.getByLabelText('Label')
    expect(labelInput).toBeInvalid()
    userEvent.type(labelInput, 'My Custom Link')
    expect(labelInput).toBeValid()

    userEvent.click(screen.getByRole('button', { name: 'Save link name' }))
    expect(mockAddLink).toHaveBeenCalledTimes(1)

    // Modal closed
    expect(screen.queryByRole('dialog')).toHaveClass('is-hidden')
    userEvent.click(screen.getByRole('button', { name: '+ Add link' }))

    // Modal is still closed, form is reset
    expect(screen.queryByRole('dialog')).toHaveClass('is-hidden')
    expect(screen.getByLabelText('URL')).toBeInvalid()
    userEvent.type(screen.getByLabelText('URL'), 'http://www.example.com')
    userEvent.click(screen.getByRole('button', { name: 'Add site' }))
    expect(screen.getByRole('dialog')).toHaveClass('is-visible')

    expect(screen.getByLabelText('Label')).toBeInvalid()
    userEvent.type(screen.getByLabelText('Label'), 'Another Custom Link')
    userEvent.click(screen.getByRole('button', { name: 'Save link name' }))
    expect(mockAddLink).toHaveBeenCalledTimes(2)
  })
})
