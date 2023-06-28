import React from 'react'
import { screen, renderHook, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithMySpaceAndModalContext } from '../testHelpers'
import { MySpaceProvider, useMySpaceContext } from './myspaceContext'
import { testPortalUser1 } from '__fixtures__/authUsers'

describe('MySpace context', () => {
  afterEach(cleanup)

  test('can initialize MySpace', async () => {
    // const user = userEvent.setup()

    const TestComponent = () => {
      const { initializeMySpace } = useMySpaceContext()

      return (
        <div>
          <div id="modal-root" className="sfds" />
          <button
            type="button"
            onClick={() => initializeMySpace(testPortalUser1.mySpace)}>
            Initialize MySpace
          </button>
        </div>
      )
    }

    renderWithMySpaceAndModalContext(<TestComponent />)

    await userEvent.click(screen.getByText('Initialize MySpace'))

    expect(screen.getByText('Example Collection')).toBeInTheDocument()
  })
})
