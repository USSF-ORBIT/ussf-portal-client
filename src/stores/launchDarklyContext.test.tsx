/**
 * @jest-environment jsdom
 */
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'

import { LaunchDarkly } from './launchDarklyContext'

jest.mock('axios')

const mockedAxios = axios as jest.Mocked<typeof axios>
const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {
  // do nothing since we expect errors don't need to pollute the output
})

const expectedClientSideID = 'example-ld-client-side-id'
const expectedEndpoint = '/api/sysinfo'

describe('LaunchDarkly', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  afterAll(() => {
    consoleSpy.mockRestore()
  })

  it('makes a call to sysinfo to get clientSideID', async () => {
    mockedAxios.get.mockImplementation(() => {
      return Promise.resolve({ data: { clientSideID: expectedClientSideID } })
    })

    render(
      <LaunchDarkly>
        <div data-testid="sample">child</div>
      </LaunchDarkly>
    )

    const childComponent = await screen.findByTestId('sample')
    expect(childComponent).toHaveTextContent('child')
    expect(mockedAxios.get).toHaveBeenCalledWith(expectedEndpoint)
    expect(consoleSpy).not.toHaveBeenCalled()
  })

  it('does not call sysinfo but throws no errors if localfile', async () => {
    mockedAxios.get.mockImplementation(() => {
      return Promise.resolve({ data: { clientSideID: 'localfile' } })
    })

    render(
      <LaunchDarkly>
        <div data-testid="sample">child</div>
      </LaunchDarkly>
    )

    const childComponent = await screen.findByTestId('sample')
    expect(childComponent).toHaveTextContent('child')
    expect(mockedAxios.get).toHaveBeenCalledWith(expectedEndpoint)
    expect(consoleSpy).not.toHaveBeenCalled()
  })

  it('logs error if clientSideID is not in response', async () => {
    mockedAxios.get.mockImplementation(() => {
      return Promise.resolve({ data: { something: 'not clientSideID' } })
    })

    render(
      <LaunchDarkly>
        <div data-testid="sample">child</div>
      </LaunchDarkly>
    )

    const childComponent = screen.queryByTestId('sample')
    expect(childComponent).not.toBeInTheDocument()
    expect(mockedAxios.get).toHaveBeenCalledWith(expectedEndpoint)
    await waitFor(() =>
      expect(consoleSpy).toHaveBeenCalledWith(
        'issue retrieving the clientSideID'
      )
    )
  })

  it('logs error axios get fails', async () => {
    const expectedLDError =
      '[LaunchDarkly] Environment not found. Double check that you specified a valid environment/client-side ID. Please see https://docs.launchdarkly.com/sdk/client-side/javascript#initializing-the-client for instructions on SDK initialization.'

    mockedAxios.get.mockImplementation(() => {
      return Promise.reject()
    })

    render(
      <LaunchDarkly>
        <div data-testid="sample">child</div>
      </LaunchDarkly>
    )

    const childComponent = screen.queryByTestId('sample')
    expect(childComponent).not.toBeInTheDocument()
    expect(mockedAxios.get).toHaveBeenCalledWith(expectedEndpoint)
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expectedLDError)
    })
  })
})
