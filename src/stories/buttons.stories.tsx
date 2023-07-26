import React from 'react'
import type { Meta } from '@storybook/react'

export default {
  title: 'Base/Buttons',
} as Meta

export const Buttons = () => {
  return (
    <>
      <h2>Buttons</h2>
      <h3 className="site-preview-heading">Default</h3>
      <button type="button" className="usa-button">
        Default
      </button>
      <button type="button" className="usa-button usa-button--hover">
        Hover
      </button>
      <button type="button" className="usa-button usa-button--active">
        Active
      </button>
      <button type="button" className="usa-button usa-focus">
        Focus
      </button>
      <button type="button" className="usa-button" disabled>
        Disabled
      </button>
      <button type="button" className="usa-button usa-button--unstyled">
        Unstyled button
      </button>

      <h3 className="site-preview-heading">Secondary color</h3>
      <button type="button" className="usa-button usa-button--secondary">
        Default
      </button>
      <button
        type="button"
        className="usa-button usa-button--secondary usa-button--hover">
        Hover
      </button>
      <button
        type="button"
        className="usa-button usa-button--secondary usa-button--active">
        Active
      </button>
      <button
        type="button"
        className="usa-button usa-button--secondary usa-focus">
        Focus
      </button>
      <button
        type="button"
        className="usa-button usa-button--secondary"
        disabled>
        Disabled
      </button>
      <button
        type="button"
        className="usa-button usa-button--secondary usa-button--unstyled">
        Unstyled button
      </button>

      <h3 className="site-preview-heading">Accent cool color</h3>
      <button type="button" className="usa-button usa-button--accent-cool">
        Default
      </button>
      <button
        type="button"
        className="usa-button usa-button--accent-cool usa-button--hover">
        Hover
      </button>
      <button
        type="button"
        className="usa-button usa-button--accent-cool usa-button--active">
        Active
      </button>
      <button
        type="button"
        className="usa-button usa-button--accent-cool usa-focus">
        Focus
      </button>
      <button
        type="button"
        className="usa-button usa-button--accent-cool"
        disabled>
        Disabled
      </button>
      <button
        type="button"
        className="usa-button usa-button--accent-cool usa-button--unstyled">
        Unstyled button
      </button>

      <h3 className="site-preview-heading">Primary (muted) color</h3>
      <button type="button" className="usa-button usa-button--muted">
        Default
      </button>
      <button
        type="button"
        className="usa-button usa-button--muted usa-button--hover">
        Hover
      </button>
      <button
        type="button"
        className="usa-button usa-button--muted usa-button--active">
        Active
      </button>
      <button type="button" className="usa-button usa-button--muted usa-focus">
        Focus
      </button>
      <button type="button" className="usa-button usa-button--muted" disabled>
        Disabled
      </button>
      <button
        type="button"
        className="usa-button usa-button--muted usa-button--unstyled">
        Unstyled button
      </button>

      <h3 className="site-preview-heading">Outline</h3>
      <button type="button" className="usa-button usa-button--outline">
        Default
      </button>
      <button
        type="button"
        className="usa-button usa-button--outline usa-button--hover">
        Hover
      </button>
      <button
        type="button"
        className="usa-button usa-button--outline usa-button--active">
        Active
      </button>
      <button
        type="button"
        className="usa-button usa-button--outline usa-focus">
        Focus
      </button>
      <button type="button" className="usa-button usa-button--outline" disabled>
        Disabled
      </button>
      <button
        type="button"
        className="usa-button usa-button--outline usa-button--unstyled">
        Unstyled button
      </button>

      <h3 className="site-preview-heading">Outline inverse</h3>
      <div
        className="usa-dark-background padding-1"
        style={{ maxWidth: 'fit-content' }}>
        <button
          type="button"
          className="usa-button usa-button--outline usa-button--inverse">
          Default
        </button>
        <button
          type="button"
          className="usa-button usa-button--outline usa-button--inverse usa-button--hover">
          Hover
        </button>
        <button
          type="button"
          className="
      usa-button usa-button--outline usa-button--inverse usa-button--active
    ">
          Active
        </button>
        <button
          type="button"
          className="usa-button usa-button--outline usa-button--inverse usa-focus">
          Focus
        </button>
        <button
          type="button"
          className="usa-button usa-button--outline usa-button--inverse"
          disabled>
          Disabled
        </button>
        <button
          type="button"
          className="
      usa-button usa-button--outline usa-button--inverse usa-button--unstyled
    ">
          Unstyled button
        </button>
      </div>

      <h3 className="site-preview-heading">Big button</h3>
      <button type="button" className="usa-button usa-button--big">
        Default
      </button>
      <button
        type="button"
        className="usa-button usa-button--big usa-button--unstyled">
        Unstyled button
      </button>
    </>
  )
}
