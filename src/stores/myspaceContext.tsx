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
  draggableWidgets: MySpaceWidget[]
  initializeMySpace: (mySpace: MySpace) => void
  updateMySpace: (widget: Widget) => void
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
  draggableWidgets: [],
  initializeMySpace: /* istanbul ignore next */ () => {
    return
  },
  updateMySpace: /* istanbul ignore next */ () => {
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
  const [draggableWidgets, setDraggableWidgets] = useState<MySpaceWidget[]>([])
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
    setMySpace(mySpace)
    setDraggableWidgets(
      mySpace
        .filter(
          (w) => w.type !== 'FeaturedShortcuts' && w.type !== 'GuardianIdeal'
        )
        .map((c) => {
          return { id: c._id.toString(), ...c }
        })
    )
  }

  // Rather than passing in the entire mySpace array, I think we can
  // just pass in the updated widget and update the mySpace array at that widget's index
  const updateMySpace = (widget: Widget) => {
    // setMySpace(mySpace)
    console.log('updateMySpace called with widget: ', widget)
  }

  const addNewsWidget = () => {
    trackEvent('Add section', 'Add news')

    handleAddWidget({
      variables: { title: 'Recent news', type: AddWidgetType.News },
      // This actually works and causes the mySpace value in this context to update. I also need to change out
      // the render logic in the MySpace component
      //   refetchQueries: ['getUser'],
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
      // refetchQueries: ['getUser'],
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
      // refetchQueries: ['getUser'],
    })
  }

  const addNewCollection = () => {
    trackEvent('Add section', 'Create new collection')

    handleAddCollection({
      variables: { title: '', bookmarks: [] },
      // refetchQueries: [`getUser`],
    })
  }

  const handleOnDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    // If a draggable item is active, and it is over a droppable area when dropped
    if (over && active.id !== over.id) {
      const oldIndex = draggableWidgets.findIndex((w) => w.id === active.id)
      const newIndex = draggableWidgets.findIndex((w) => w.id === over.id)

      const sortedWidgets = arrayMove(draggableWidgets, oldIndex, newIndex)
      setDraggableWidgets(sortedWidgets)

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

      // If mySpace contains a GuardianIdeal widget, add it to the beginning of the array
      const guardianIdealWidget = mySpace.find(
        (w) => w.type === WIDGET_TYPES.GUARDIANIDEAL
      )
      if (guardianIdealWidget) {
        const { _id, title, type } = guardianIdealWidget
        updatedMySpace.unshift({ _id, title, type })
      }

      // If mySpace contains a FeaturedShortcuts widget, add it to the beginning of the array
      const featuredShortcutsWidget = mySpace.find(
        (w) => w.type === WIDGET_TYPES.FEATUREDSHORTCUTS
      )
      if (featuredShortcutsWidget) {
        const { _id, title, type } = featuredShortcutsWidget
        updatedMySpace.unshift({ _id, title, type })
      }

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
    draggableWidgets,
    initializeMySpace,
    updateMySpace,
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
