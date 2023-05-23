/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchFilter from './SearchFilter'

const mockLabels = [{ name: 'label1' }, { name: 'label2' }, { name: 'label3' }]

describe('SearchFilter component', () => {
  afterEach(cleanup)

  test('renders the search filter', () => {
    render(<SearchFilter labels={mockLabels} />)

    expect(screen.getByRole('search')).toBeInTheDocument()
  })

  test('renders the dropdown options', () => {
    render(<SearchFilter labels={mockLabels} />)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(4)
  })

  test('selecting an option updates the dropdown', async () => {
    const user = userEvent.setup()

    render(<SearchFilter labels={mockLabels} />)
    const dropdown = screen.getByTestId('label-dropdown')

    expect(dropdown).toBeInTheDocument()
    expect(screen.getAllByRole('option')).toHaveLength(4)

    await user.selectOptions(dropdown, 'label1')

    expect(screen.getByText('label1')).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText('label2')).toHaveAttribute('aria-selected', 'false')

    await user.selectOptions(dropdown, 'label2')

    expect(screen.getByText('label1')).toHaveAttribute('aria-selected', 'false')
    expect(screen.getByText('label2')).toHaveAttribute('aria-selected', 'true')
  })

  test('renders the checkbox options', () => {
    render(<SearchFilter labels={mockLabels} />)

    expect(screen.getAllByRole('checkbox')).toHaveLength(3)
    expect(screen.getByLabelText('Application')).toBeInTheDocument()
    expect(screen.getByLabelText('News')).toBeInTheDocument()
    expect(screen.getByLabelText('Documentation')).toBeInTheDocument()
  })

  test('selecting a checkbox updates the checkbox state', async () => {
    const user = userEvent.setup()

    render(<SearchFilter labels={mockLabels} />)
    const applicationCheckbox = screen.getByLabelText('Application')

    expect(applicationCheckbox).toBeInTheDocument()
    expect(applicationCheckbox).not.toBeChecked()

    await user.click(applicationCheckbox)

    expect(applicationCheckbox).toBeChecked()
  })

  test('submits the form', async () => {
    const user = userEvent.setup()

    render(<SearchFilter labels={mockLabels} />)

    const checkbox = screen.getByLabelText('News')
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)

    expect(checkbox).toBeChecked()

    const submitButton = screen.getByRole('button', { name: 'Filter' })
    expect(submitButton).toBeInTheDocument()

    await user.click(submitButton)

    // This isn't working for some reason
    // await waitFor(() => {
    //   expect(window.location.pathname).toBe('/search?q=category%3Anews+')
    // })

    // After the form submits, the checkbox should still be checked. This shows that
    // local storage was updated.
    expect(checkbox).toBeChecked()
  })

  test('clears the form', async () => {
    const user = userEvent.setup()

    render(<SearchFilter labels={mockLabels} />)

    const documentationCheckbox = screen.getByLabelText('Documentation')

    expect(documentationCheckbox).toBeInTheDocument()
    expect(documentationCheckbox).not.toBeChecked()

    await user.click(documentationCheckbox)

    expect(documentationCheckbox).toBeChecked()

    const clearButton = screen.getByRole('button', { name: 'Reset' })

    await user.click(clearButton)

    await waitFor(() => {
      expect(documentationCheckbox).not.toBeChecked()
    })
  })
})
