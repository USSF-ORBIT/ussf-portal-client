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

  it('renders a title', () => {
    const title = screen.getByRole('heading', { level: 3 })
    expect(title).toHaveTextContent('Example collection')
  })

  it('renders its children in a list', () => {
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getAllByRole('link')).toHaveLength(3)
  })

  it('has no a11y violations', async () => {
    // Bug with NextJS Link + axe :(
    // https://github.com/nickcolley/jest-axe/issues/95#issuecomment-758921334
    await act(async () => {
      expect(await axe(html.container)).toHaveNoViolations()
    })
  })
})
