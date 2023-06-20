import React from 'react'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { Grid } from '@trussworks/react-uswds'
import { useRouter } from 'next/router'
import { WidgetType as AddWidgetType } from '../../graphql.g'
import styles from './MySpace.module.scss'
import DraggableWidgets from './DraggableWidgets'
import { useAddCollectionMutation } from 'operations/portal/mutations/addCollection.g'
import { useAddWidgetMutation } from 'operations/portal/mutations/addWidget.g'
import { MySpaceWidget, CMSBookmark, Collection, Widget } from 'types/index'
import { WIDGET_TYPES, MAXIMUM_COLLECTIONS } from 'constants/index'
import AddWidget from 'components/AddWidget/AddWidget'
import { useAnalytics } from 'stores/analyticsContext'
import { useAuthContext } from 'stores/authContext'

/** Type guards */
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

const MySpace = ({ bookmarks }: { bookmarks: CMSBookmark[] }) => {
  const router = useRouter()
  const { trackEvent } = useAnalytics()
  const { portalUser } = useAuthContext()
  const flags = useFlags()

  const mySpace = (portalUser?.mySpace || []) as MySpaceWidget[]

  const [handleAddWidget] = useAddWidgetMutation()

  const [handleAddCollection] = useAddCollectionMutation()

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

  const canAddCollections: boolean =
    mySpace &&
    mySpace.filter((w) => isCollection(w)).length < MAXIMUM_COLLECTIONS

  const canAddNews: boolean =
    mySpace && mySpace.filter((w) => w.type === WIDGET_TYPES.NEWS).length < 1

  const canAddGuardianIdeal: boolean =
    mySpace &&
    mySpace.filter((w) => w.type === WIDGET_TYPES.GUARDIANIDEAL).length < 1

  const canAddFeaturedShortcuts: boolean =
    mySpace &&
    mySpace.filter((w) => w.type === WIDGET_TYPES.FEATUREDSHORTCUTS).length < 1

  const selectCollections = () => {
    trackEvent('Add section', 'Select collection from template')

    router.push({
      pathname: '/sites-and-applications',
      query: { selectMode: 'true' },
    })
  }

  return (
    <div className={styles.mySpace}>
      <div className={styles.widgetContainer}>
        <h2 className={styles.pageTitle}>My Space</h2>
        {portalUser && portalUser.mySpace && (
          <DraggableWidgets bookmarks={bookmarks} mySpace={mySpace} />
        )}

        {(canAddCollections ||
          canAddNews ||
          canAddGuardianIdeal ||
          canAddFeaturedShortcuts) && (
          <Grid
            key={`widget_addNew`}
            tabletLg={{ col: 6 }}
            desktopLg={{ col: 4 }}>
            <AddWidget
              handleCreateCollection={addNewCollection}
              handleSelectCollection={selectCollections}
              handleAddNews={addNewsWidget}
              handleAddGuardianIdeal={addGuardianIdeal}
              handleAddFeaturedShortcuts={addFeaturedShortcuts}
              canAddNews={canAddNews}
              canAddCollection={canAddCollections}
              canAddGuardianIdeal={canAddGuardianIdeal}
              canAddFeaturedShortcuts={canAddFeaturedShortcuts}
            />
          </Grid>
        )}
      </div>
    </div>
  )
}

export default MySpace
