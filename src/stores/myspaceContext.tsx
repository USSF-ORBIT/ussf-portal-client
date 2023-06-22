import React, { createContext, useContext, useState } from 'react'
import { WidgetType as AddWidgetType } from '../graphql.g'
import { useAnalytics } from 'stores/analyticsContext'
import { WIDGET_TYPES } from 'constants/index'
import { MySpace, MySpaceWidget, Collection, Widget } from 'types'
import { useAddCollectionMutation } from 'operations/portal/mutations/addCollection.g'
import { useAddWidgetMutation } from 'operations/portal/mutations/addWidget.g'

export type MySpaceContextType = {
  mySpace: MySpace
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
}

export const MySpaceContext = createContext<MySpaceContextType>({
  mySpace: [],
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

  const context = {
    mySpace,
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
