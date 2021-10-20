/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { axe } from 'jest-axe'
import userEvent from '@testing-library/user-event'
import React from 'react'

import AddWidget from './AddWidget'

describe('AddWidget component', () => {
  it('renders an add widget menu', () => {
    const testProps = {
      handleSelectCollection: jest.fn(),
      handleCreateCollection: jest.fn(),
    }

    render(<AddWidget {...testProps} />)

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()
  })

  it('can toggle the menu', () => {
    const testProps = {
      handleSelectCollection: jest.fn(),
      handleCreateCollection: jest.fn(),
    }

    render(
      <>
        <AddWidget {...testProps} />
        <button type="button">Another element</button>
      </>
    )

    expect(
      screen.queryByRole('button', { name: 'Select collection from template' })
    ).not.toBeInTheDocument()

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()
    userEvent.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Select collection from template' })
    ).toBeInTheDocument()

    userEvent.click(screen.getByRole('button', { name: 'Another element' }))
    expect(
      screen.queryByRole('button', { name: 'Select collection from template' })
    ).not.toBeInTheDocument()
  })

  it('handles the select collection button', () => {
    const mockHandleSelect = jest.fn()

    render(
      <AddWidget
        handleSelectCollection={mockHandleSelect}
        handleCreateCollection={jest.fn()}
      />
    )

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()

    userEvent.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Select collection from template' })
    ).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('button', { name: 'Select collection from template' })
    )

    expect(mockHandleSelect).toHaveBeenCalled()
    expect(
      screen.queryByRole('button', {
        name: 'Select collection from template',
      })
    ).not.toBeInTheDocument()
  })

  it('handles the create collection button', () => {
    const mockHandleCreate = jest.fn()

    render(
      <AddWidget
        handleSelectCollection={jest.fn()}
        handleCreateCollection={mockHandleCreate}
      />
    )

    const menuButton = screen.getByRole('button', { name: 'Add section' })
    expect(menuButton).toBeInTheDocument()

    userEvent.click(menuButton)

    expect(
      screen.getByRole('button', { name: 'Create new collection' })
    ).toBeInTheDocument()
    userEvent.click(
      screen.getByRole('button', { name: 'Create new collection' })
    )

    expect(mockHandleCreate).toHaveBeenCalled()
    expect(
      screen.queryByRole('button', { name: 'Create new collection' })
    ).not.toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const testProps = {
      handleSelectCollection: jest.fn(),
      handleCreateCollection: jest.fn(),
    }

    const { container } = render(<AddWidget {...testProps} />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
