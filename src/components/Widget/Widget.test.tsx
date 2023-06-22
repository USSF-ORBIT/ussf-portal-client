/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import React from 'react'

import Widget, { WidgetWithSettings } from './Widget'

describe('Widget component', () => {
  it('renders Widget', () => {
    render(<Widget header="Example widget">Example widget contents</Widget>)

    const heading = screen.getByRole('heading', { level: 3 })

    expect(heading).toHaveTextContent('Example widget')
    expect(screen.getByText('Example widget contents')).toBeInTheDocument()
  })

  test('renders Widget without heading', () => {
    render(<Widget>Example widget contents</Widget>)

    expect(screen.getByText('Example widget contents')).toBeInTheDocument()
  })

  test('has no a11y violations', async () => {
    const html = render(
      <Widget header="Example widget">Example widget contents</Widget>
    )
    expect(await axe(html.container)).toHaveNoViolations()
  })
})

describe('WidgetWithSettings component', () => {
  let html: RenderResult

  const handleSettingsItemClick = jest.fn()

  beforeEach(() => {
    html = render(
      <WidgetWithSettings
        header="Example widget"
        settingsMenuLabel="Widget Settings menu"
        settingsItems={[
          <button
            key="settingsMenu_item1"
            type="button"
            onClick={handleSettingsItemClick}>
            Widget settings handler
          </button>,
        ]}>
        Example widget contents
      </WidgetWithSettings>
    )
  })

  test('renders a heading', () => {
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Example widget'
    )
  })

  test('render its children', () => {
    expect(screen.getByText('Example widget contents')).toBeInTheDocument()
  })

  test('renders the settings dropdown menu', async () => {
    const user = userEvent.setup()
    const menuToggleButton = screen.getByRole('button', {
      name: 'Widget Settings menu',
    })
    expect(menuToggleButton).toBeInTheDocument()

    await user.click(menuToggleButton)
    const settingsItem = screen.getByRole('button', {
      name: 'Widget settings handler',
    })
    expect(settingsItem).toBeInTheDocument()

    expect(await axe(html.container)).toHaveNoViolations()

    await user.click(settingsItem)
    expect(handleSettingsItemClick).toHaveBeenCalled()
  })

  test('clicking outside the dropdown menu closes the menu', async () => {
    const user = userEvent.setup()
    const menuToggleButton = screen.getByRole('button', {
      name: 'Widget Settings menu',
    })
    expect(menuToggleButton).toBeInTheDocument()

    await user.click(menuToggleButton)
    const settingsItem = screen.getByRole('button', {
      name: 'Widget settings handler',
    })
    expect(settingsItem).toBeInTheDocument()

    // Click outside menu
    await user.click(screen.getByRole('heading'))

    // Confirm the menu has been closed
    expect(
      screen.queryByRole('button', {
        name: 'Widget settings handler',
      })
    ).not.toBeInTheDocument()
  })

  test('clicking the menu button toggles the menu', async () => {
    const user = userEvent.setup()
    const menuToggleButton = screen.getByRole('button', {
      name: 'Widget Settings menu',
    })

    // Open the menu
    await user.click(menuToggleButton)

    expect(
      screen.getByRole('button', {
        name: 'Widget settings handler',
      })
    ).toBeInTheDocument()

    // Close the menu
    await user.click(menuToggleButton)

    // Confirm the menu has been closed
    expect(
      screen.queryByRole('button', {
        name: 'Widget settings handler',
      })
    ).not.toBeInTheDocument()
  })

  test('has no a11y violations', async () => {
    expect(await axe(html.container)).toHaveNoViolations()
  })
})
