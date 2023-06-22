import React, { createContext, useContext, useState } from 'react'
import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { WidgetType as AddWidgetType, WidgetReorderInput } from '../graphql.g'
import { useAnalytics } from 'stores/analyticsContext'
import { WIDGET_TYPES } from 'constants/index'
import { MySpace, MySpaceWidget, Collection, Widget } from 'types'
import { useAddCollectionMutation } from 'operations/portal/mutations/addCollection.g'
import { useAddWidgetMutation } from 'operations/portal/mutations/addWidget.g'
import { useEditMySpaceMutation } from 'operations/portal/mutations/editMySpace.g'

export type MySpaceContextType = {
  mySpace: MySpace
  initializeMySpace: (mySpace: MySpace) => void
  isCollection: (widget: MySpaceWidget) => boolean
  isGuardianIdeal: (widget: Widget) => boolean
  isNewsWidget: (widget: Widget) => boolean
  isFeaturedShortcuts: (widget: Widget) => boolean
  addNewsWidget: () => void
  addGuardianIdeal: () => void
  addFeaturedShortcuts: () => void
  addNewCollection: () => void
  handleOnDragEnd?: (event: DragEndEvent) => void
}

export const MySpaceContext = createContext<MySpaceContextType>({
  mySpace: [],
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
  const { trackEvent } = useAnalytics()

  const [handleAddCollection] = useAddCollectionMutation()
  const [handleAddWidget] = useAddWidgetMutation()
  const [handleEditMySpace] = useEditMySpaceMutation()

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

  const initializeMySpace = (mySpace: MySpace) => {
    // Give each widget an id field by default so that we can use it for drag-and-drop.
    // None of our mutations/queries use an id field, so this should be safe for use only on
    // the client.
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

  const handleOnDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    // If a draggable item is active, and it is over a droppable area when dropped
    if (over && active.id !== over.id) {
      const oldIndex = mySpace.findIndex((w) => w.id === active.id)
      const newIndex = mySpace.findIndex((w) => w.id === over.id)

      const sortedWidgets = arrayMove(mySpace, oldIndex, newIndex)
      setMySpace(sortedWidgets)

      // Prepare widgets for mutation by removing the id field
      // TO DO: fix this type
      const updatedMySpace: MySpace = sortedWidgets.map(
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
    initializeMySpace,
    isCollection,
    isGuardianIdeal,
    isNewsWidget,
    isFeaturedShortcuts,
    addNewsWidget,
    addGuardianIdeal,
    addFeaturedShortcuts,
    addNewCollection,
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
