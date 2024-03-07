/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import React from 'react'

import ModalPortal from './ModalPortal'

describe('ModalPortal', () => {
  test('renders nothing if there is no modal root', () => {
    render(
      <ModalPortal>
        <div role="dialog">Test Modal</div>
      </ModalPortal>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('renders children into the modal root once mounted', () => {
    const modalContainer = document.createElement('div')
    modalContainer.setAttribute('id', 'modal-root')

    render(
      <ModalPortal>
        <div role="dialog">Test Modal</div>
      </ModalPortal>,
      { container: document.body.appendChild(modalContainer) }
    )

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
