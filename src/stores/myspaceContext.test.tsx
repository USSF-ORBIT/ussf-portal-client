/**
 * @jest-environment jsdom
 */
import React from 'react'
import { screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithAuthAndApollo } from '../testHelpers'
import { MySpaceProvider, useMySpaceContext } from './myspaceContext'
import { testPortalUser1 } from '__fixtures__/authUsers'

describe('MySpace context', () => {
  afterEach(cleanup)

  test('can initialize MySpace', async () => {
    const user = userEvent.setup()

    const TestComponent = () => {
      const { mySpace, initializeMySpace } = useMySpaceContext()

      return (
        <>
          <button
            type="button"
            onClick={() => initializeMySpace(testPortalUser1.mySpace)}>
            Initialize MySpace
          </button>

          <div>
            {mySpace.map((w) => {
              return <div key={w._id.toString()}>{w.title}</div>
            })}
          </div>

          {/* <MySpace bookmarks={cmsBookmarksMock} /> */}
        </>
      )
    }

    renderWithAuthAndApollo(
      <MySpaceProvider>
        <TestComponent />
      </MySpaceProvider>
    )

    await user.click(screen.getByText('Initialize MySpace'))

    expect(screen.getByText('Example Collection')).toBeInTheDocument()
  })
})
