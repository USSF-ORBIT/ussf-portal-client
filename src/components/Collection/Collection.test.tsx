/**
 * @jest-environment jsdom
 */

import { act, render, screen } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'
import { axe } from 'jest-axe'
import React from 'react'
import Collection from './Collection'
import Bookmark from 'components/Bookmark/Bookmark'

describe('Collection component', () => {
  let html: RenderResult

  describe('with multiple children', () => {
    beforeEach(() => {
      html = render(
        <Collection title="Example collection">
          <Bookmark key="link1" href="#">
            Link 1
          </Bookmark>
          <Bookmark key="link2" href="#">
            Link 2
          </Bookmark>
          <Bookmark key="link3" href="#">
            Link 3
          </Bookmark>
        </Collection>
      )
    })

    test('renders a title', () => {
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toHaveTextContent('Example collection')
    })

    test('renders its children in a list', () => {
      expect(screen.getByRole('list')).toBeInTheDocument()
      expect(screen.getAllByRole('listitem')).toHaveLength(3)
      expect(screen.getAllByRole('link')).toHaveLength(3)
    })

    test('has no a11y violations', async () => {
      // Bug with NextJS Link + axe :(
      // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
      await act(async () => {
        expect(await axe(html.container)).toHaveNoViolations()
      })
    })
  })

  test('can render a single child', async () => {
    html = render(
      <Collection title="Example collection">
        <Bookmark key="link1" href="#">
          Link 1
        </Bookmark>
      </Collection>
    )

    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(1)
    expect(screen.getAllByRole('link')).toHaveLength(1)

    await act(async () => {
      expect(await axe(html.container)).toHaveNoViolations()
    })
  })

  test('can render a footer node', async () => {
    const testFooter = <p>Collection footer</p>

    html = render(
      <Collection title="Example collection" footer={testFooter}>
        <Bookmark key="link1" href="#">
          Link 1
        </Bookmark>
      </Collection>
    )

    expect(screen.getByText('Collection footer')).toBeInTheDocument()
  })
})
