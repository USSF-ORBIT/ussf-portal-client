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
    render(
      <Widget header={<h3>Example section</h3>}>
        Example section contents
      </Widget>
    )

    const heading = screen.getByRole('heading', { level: 3 })

    expect(heading).toHaveTextContent('Example section')
    expect(screen.getByText('Example section contents')).toBeInTheDocument()
  })

  it('renders Widget without heading', () => {
    render(<Widget>Example section contents</Widget>)

    expect(screen.getByText('Example section contents')).toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    const html = render(
      <Widget header={<h3>Example section</h3>}>
        Example section contents
      </Widget>
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
        header={<h3>Example section</h3>}
        settingsMenuLabel="Section Settings menu"
        settingsItems={[
          <button
            key="settingsMenu_item1"
            type="button"
            onClick={handleSettingsItemClick}>
            Section settings handler
          </button>,
        ]}>
        Example section contents
      </WidgetWithSettings>
    )
  })

  it('renders a heading', () => {
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'Example section'
    )
  })

  it('render its children', () => {
    expect(screen.getByText('Example section contents')).toBeInTheDocument()
  })

  it('renders the settings dropdown menu', async () => {
    const user = userEvent.setup()
    const menuToggleButton = screen.getByRole('button', {
      name: 'Section Settings menu',
    })
    expect(menuToggleButton).toBeInTheDocument()

    await user.click(menuToggleButton)
    const settingsItem = screen.getByRole('button', {
      name: 'Section settings handler',
    })
    expect(settingsItem).toBeInTheDocument()

    expect(await axe(html.container)).toHaveNoViolations()

    await user.click(settingsItem)
    expect(handleSettingsItemClick).toHaveBeenCalled()
  })

  it('clicking outside the dropdown menu closes the menu', async () => {
    const user = userEvent.setup()
    const menuToggleButton = screen.getByRole('button', {
      name: 'Section Settings menu',
    })
    expect(menuToggleButton).toBeInTheDocument()

    await user.click(menuToggleButton)
    const settingsItem = screen.getByRole('button', {
      name: 'Section settings handler',
    })
    expect(settingsItem).toBeInTheDocument()

    // Click outside menu
    await user.click(screen.getByRole('heading'))

    // Confirm the menu has been closed
    expect(
      screen.queryByRole('button', {
        name: 'Section settings handler',
      })
    ).not.toBeInTheDocument()
  })

  it('clicking the menu button toggles the menu', async () => {
    const user = userEvent.setup()
    const menuToggleButton = screen.getByRole('button', {
      name: 'Section Settings menu',
    })

    // Open the menu
    await user.click(menuToggleButton)

    expect(
      screen.getByRole('button', {
        name: 'Section settings handler',
      })
    ).toBeInTheDocument()

    // Close the menu
    await user.click(menuToggleButton)

    // Confirm the menu has been closed
    expect(
      screen.queryByRole('button', {
        name: 'Section settings handler',
      })
    ).not.toBeInTheDocument()
  })

  it('has no a11y violations', async () => {
    expect(await axe(html.container)).toHaveNoViolations()
  })
})
