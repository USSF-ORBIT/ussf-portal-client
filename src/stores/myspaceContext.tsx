import React, { createContext, useContext, useState } from 'react'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { WidgetType as AddWidgetType, WidgetReorderInput } from '../graphql.g'
import { useAnalytics } from 'stores/analyticsContext'
import { WIDGET_TYPES, MAXIMUM_COLLECTIONS } from 'constants/index'
import {
  MySpace,
  MySpaceWidget,
  Collection,
  Widget,
  WeatherWidget,
} from 'types'
import { useAddCollectionMutation } from 'operations/portal/mutations/addCollection.g'
import { useAddWidgetMutation } from 'operations/portal/mutations/addWidget.g'
import { useEditMySpaceMutation } from 'operations/portal/mutations/editMySpace.g'
import { useAddWeatherWidgetMutation } from 'operations/portal/mutations/addWeatherWidget.g'
import { useEditWeatherWidgetMutation } from 'operations/portal/mutations/editWeatherWidget.g'

export type MySpaceContextType = {
  mySpace: MySpace
  disableDragAndDrop: boolean
  setDisableDragAndDrop: React.Dispatch<React.SetStateAction<boolean>>
  initializeMySpace: (mySpace: MySpace) => void
  isCollection: (widget: MySpaceWidget) => boolean
  isGuardianIdeal: (widget: Widget) => boolean
  isNewsWidget: (widget: Widget) => boolean
  isFeaturedShortcuts: (widget: Widget) => boolean
  isWeather: (widget: Widget) => boolean
  canAddCollections: boolean
  canAddNews: boolean
  canAddWeather: boolean
  canAddGuardianIdeal: boolean
  canAddFeaturedShortcuts: boolean
  addNewsWidget: () => void
  addGuardianIdeal: () => void
  addFeaturedShortcuts: () => void
  addNewCollection: () => void
  addNewWeatherWidget: (zipcode: string) => void
  editWeatherWidget: (w: WeatherWidget) => void
  handleOnDragEnd?: (event: DragEndEvent) => void
}

export const MySpaceContext = createContext<MySpaceContextType>({
  mySpace: [],
  disableDragAndDrop: false,
  setDisableDragAndDrop: /* istanbul ignore next */ () => {
    return
  },
  initializeMySpace: /* istanbul ignore next */ () => {
    return
  },
  isCollection: /* istanbul ignore next */ () => {
    return true || false
  },
  isGuardianIdeal: /* istanbul ignore next */ () => {
    return true || false
  },
  isNewsWidget: /* istanbul ignore next */ () => {
    return true || false
  },
  isFeaturedShortcuts: /* istanbul ignore next */ () => {
    return true || false
  },
  isWeather: /* istanbul ignore next */ () => {
    return true || false
  },
  canAddCollections: true,
  canAddNews: true,
  canAddWeather: true,
  canAddGuardianIdeal: true,
  canAddFeaturedShortcuts: true,
  addNewsWidget: /* istanbul ignore next */ () => {
    return
  },
  addGuardianIdeal: /* istanbul ignore next */ () => {
    return
  },
  addFeaturedShortcuts: /* istanbul ignore next */ () => {
    return
  },
  addNewCollection: /* istanbul ignore next */ () => {
    return
  },
  addNewWeatherWidget: /* istanbul ignore next */ () => {
    return
  },
  editWeatherWidget: /* istanbul ignore next */ () => {
    return
  },
  handleOnDragEnd: /* istanbul ignore next */ () => {
    return
  },
})

export const MySpaceProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [mySpace, setMySpace] = useState<MySpace>([])
  const [disableDragAndDrop, setDisableDragAndDrop] = useState<boolean>(false)
  const { trackEvent } = useAnalytics()

  const [handleAddCollection] = useAddCollectionMutation()
  const [handleAddWidget] = useAddWidgetMutation()
  const [handleEditMySpace] = useEditMySpaceMutation()
  const [handleAddWeatherWidget] = useAddWeatherWidgetMutation()
  const [handleEditWeatherWidget] = useEditWeatherWidgetMutation()

  function isCollection(widget: MySpaceWidget): widget is Collection {
    return widget.type === WIDGET_TYPES.COLLECTION
  }

  function isGuardianIdeal(widget: Widget): widget is Collection {
    return widget.type === WIDGET_TYPES.GUARDIANIDEAL
  }

  function isNewsWidget(widget: Widget): widget is Collection {
    return widget.type === WIDGET_TYPES.NEWS
  }

  function isFeaturedShortcuts(widget: Widget): widget is Collection {
    return widget.type === WIDGET_TYPES.FEATUREDSHORTCUTS
  }

  function isWeather(widget: MySpaceWidget): widget is Collection {
    return widget.type === WIDGET_TYPES.WEATHER
  }

  const canAddCollections: boolean =
    mySpace &&
    mySpace.filter((w) => isCollection(w)).length < MAXIMUM_COLLECTIONS

  const canAddNews: boolean =
    mySpace && mySpace.filter((w) => w.type === WIDGET_TYPES.NEWS).length < 1

  const canAddWeather: boolean =
    mySpace && mySpace.filter((w) => w.type === WIDGET_TYPES.WEATHER).length < 1

  const canAddGuardianIdeal: boolean =
    mySpace &&
    mySpace.filter((w) => w.type === WIDGET_TYPES.GUARDIANIDEAL).length < 1

  const canAddFeaturedShortcuts: boolean =
    mySpace &&
    mySpace.filter((w) => w.type === WIDGET_TYPES.FEATUREDSHORTCUTS).length < 1

  const initializeMySpace = (mySpace: MySpace) => {
    // Give each widget an id field by default so that we can use it for drag-and-drop.
    // None of our mutations/queries use an id field, and we can give this additional
    // field to any item in the mySpace array without any issue, so this should be safe
    // for use only on the client.
    setMySpace(mySpace.map((w) => ({ ...w, id: w._id.toString() })))
  }

  const addNewsWidget = () => {
    trackEvent('Add section', 'Add news')

    handleAddWidget({
      variables: { title: 'Recent news', type: AddWidgetType.News },
      refetchQueries: ['getUser'],
    })
  }

  const addGuardianIdeal = () => {
    trackEvent(
      'Guardian Ideal Carousel',
      'Click on add Ideal carousel',
      'Add Ideal'
    )

    handleAddWidget({
      variables: {
        title: 'Guardian Ideal',
        type: AddWidgetType.GuardianIdeal,
      },
      refetchQueries: ['getUser'],
    })
  }

  const addFeaturedShortcuts = () => {
    trackEvent(
      'Featured Shortcuts',
      'Click on add Featured Shortcuts',
      'Add Featured Shortcuts'
    )

    handleAddWidget({
      variables: {
        title: 'Featured Shortcuts',
        type: AddWidgetType.FeaturedShortcuts,
      },
      refetchQueries: ['getUser'],
    })
  }

  const addNewCollection = () => {
    trackEvent('Add section', 'Create new collection')

    handleAddCollection({
      variables: { title: '', bookmarks: [] },
      refetchQueries: [`getUser`],
    })
  }

  const addNewWeatherWidget = (zipcode: string) => {
    trackEvent('Add weather widget', 'Create new weather widget')

    handleAddWeatherWidget({
      variables: {
        title: 'Weather',
        type: AddWidgetType.Weather,
        zipcode,
      },
      refetchQueries: ['getUser'],
    })
  }

  const editWeatherWidget = (w: WeatherWidget) => {
    trackEvent('Edit weather widget', 'Edit weather widget')

    handleEditWeatherWidget({
      variables: {
        _id: w._id,
        title: w.title,
        coords: {
          lat: w.coords.lat,
          long: w.coords.long,
          forecastUrl: w.coords.forecastUrl,
          hourlyForecastUrl: w.coords.hourlyForecastUrl,
          city: w.coords.city,
          state: w.coords.state,
          zipcode: w.coords.zipcode,
        },
      },
      refetchQueries: ['getUser'],
    })
  }

  const handleOnDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    // If a draggable item is active, and it is over a droppable area when dropped
    if (over && active.id !== over.id) {
      const oldIndex = mySpace.findIndex(
        (w: Widget) => w._id.toString() === active.id
      )
      const newIndex = mySpace.findIndex(
        (w: Widget) => w._id.toString() === over.id
      )

      const sortedWidgets = arrayMove(mySpace, oldIndex, newIndex)
      setMySpace(sortedWidgets)

      // Prepare widgets for mutation by removing the id field
      const updatedMySpace = sortedWidgets.map(
        ({ _id, title, type, bookmarks }) => {
          const updatedBookmarks = bookmarks?.map(
            ({ _id, url, label, cmsId, isRemoved }) => ({
              _id,
              url,
              label,
              cmsId,
              isRemoved,
            })
          )
          return { _id, title, type, bookmarks: updatedBookmarks }
        }
      )

      // Perform mutation to update mySpace
      handleEditMySpace({
        variables: {
          mySpace: updatedMySpace as WidgetReorderInput[],
        },
      })
    }
  }

  const context = {
    mySpace,
    disableDragAndDrop,
    setDisableDragAndDrop,
    initializeMySpace,
    isCollection,
    isGuardianIdeal,
    isNewsWidget,
    isFeaturedShortcuts,
    isWeather,
    canAddCollections,
    canAddNews,
    canAddWeather,
    canAddGuardianIdeal,
    canAddFeaturedShortcuts,
    addNewsWidget,
    addGuardianIdeal,
    addFeaturedShortcuts,
    addNewCollection,
    addNewWeatherWidget,
    editWeatherWidget,
    handleOnDragEnd,
  }

  return (
    <MySpaceContext.Provider value={context}>
      {children}
    </MySpaceContext.Provider>
  )
}

export const useMySpaceContext = () => {
  const context = useContext(MySpaceContext)
  if (context === undefined) {
    throw new Error('useMySpaceContext must be used within a MySpaceProvider')
  }
  return context
}
