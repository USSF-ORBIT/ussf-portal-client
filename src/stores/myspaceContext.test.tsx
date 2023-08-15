/**
 * @jest-environment jsdom
 */
import React from 'react'
import { ObjectId } from 'bson'
import { screen, cleanup } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'
import userEvent from '@testing-library/user-event'
import { renderWithAuthAndApollo } from '../testHelpers'
import { MySpaceProvider, useMySpaceContext } from './myspaceContext'
import { testPortalUser1 } from '__fixtures__/authUsers'
import { MySpaceWidget, WeatherWidget, Widget } from 'types'

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

  test('can disable drag and drop', async () => {
    const user = userEvent.setup()

    const TestComponent = () => {
      const { disableDragAndDrop, setDisableDragAndDrop } = useMySpaceContext()

      return (
        <>
          <button type="button" onClick={() => setDisableDragAndDrop(true)}>
            Toggle disableDragAndDrop
          </button>

          <div>{disableDragAndDrop ? 'true' : 'false'}</div>
        </>
      )
    }

    renderWithAuthAndApollo(
      <MySpaceProvider>
        <TestComponent />
      </MySpaceProvider>
    )

    await user.click(screen.getByText('Toggle disableDragAndDrop'))

    expect(screen.getByText('true')).toBeInTheDocument()
  })

  test('can get widget types', async () => {
    const mockCollection: MySpaceWidget = {
      _id: new ObjectId(),
      title: 'Example Collection',
      type: 'Collection',
      bookmarks: [
        {
          _id: new ObjectId(),
          url: 'www.example.com/1',
          label: 'MyVector',
          cmsId: '1',
        },
      ],
    }

    const mockFeaturedShortcuts: Widget = {
      _id: new ObjectId(),
      title: 'Featured Shortcuts',
      type: 'FeaturedShortcuts',
    }

    const mockWeather: WeatherWidget = {
      _id: new ObjectId(),
      title: 'Weather',
      type: 'Weather',
      coords: {
        lat: 34.0901,
        long: -118.4065,
        forecastUrl: 'https://api.weather.gov/gridpoints/LOX/149,48/forecast',
        hourlyForecastUrl:
          'https://api.weather.gov/gridpoints/LOX/149,48/forecast/hourly',
        city: 'Beverly Hills',
        state: 'CA',
        zipcode: '90210',
      },
    }

    const mockGuardianIdeal: Widget = {
      _id: new ObjectId(),
      title: 'Guardian Ideal',
      type: 'GuardianIdeal',
    }

    const mockNews: Widget = {
      _id: new ObjectId(),
      title: 'Recent News',
      type: 'News',
    }

    const TestComponent = () => {
      const {
        isCollection,
        isFeaturedShortcuts,
        isWeather,
        isGuardianIdeal,
        isNewsWidget,
      } = useMySpaceContext()

      return (
        <>
          <div>
            <span>{isCollection(mockCollection) ? 'collection' : 'false'}</span>
            <span>
              {isFeaturedShortcuts(mockFeaturedShortcuts)
                ? 'featuredShortcuts'
                : 'false'}
            </span>
            <span>{isWeather(mockWeather) ? 'weather' : 'false'}</span>
            <span>
              {isGuardianIdeal(mockGuardianIdeal) ? 'guardianIdeal' : 'false'}
            </span>
            <span>{isNewsWidget(mockNews) ? 'news' : 'false'}</span>
          </div>
        </>
      )
    }

    renderWithAuthAndApollo(
      <MySpaceProvider>
        <TestComponent />
      </MySpaceProvider>
    )

    expect(screen.getByText('collection')).toBeInTheDocument()
    expect(screen.getByText('featuredShortcuts')).toBeInTheDocument()
    expect(screen.getByText('weather')).toBeInTheDocument()
    expect(screen.getByText('guardianIdeal')).toBeInTheDocument()
    expect(screen.getByText('news')).toBeInTheDocument()
  })
})

describe('useMySpaceContext', () => {
  test('returns the created context', () => {
    const { result } = renderHook(() => useMySpaceContext())
    expect(result.current).toBeTruthy()
  })
})
