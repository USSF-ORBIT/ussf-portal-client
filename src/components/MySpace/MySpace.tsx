import React from 'react'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { Grid } from '@trussworks/react-uswds'
import { useRouter } from 'next/router'
import { gql } from '@apollo/client'
import { WidgetType as AddWidgetType } from '../../graphql.g'
import styles from './MySpace.module.scss'

import { useAddBookmarkMutation } from 'operations/portal/mutations/addBookmark.g'
import { useAddCollectionMutation } from 'operations/portal/mutations/addCollection.g'
import { useAddWidgetMutation } from 'operations/portal/mutations/addWidget.g'
import { useGetMySpaceQuery } from 'operations/portal/queries/getMySpace.g'
import { useEditCollectionMutation } from 'operations/portal/mutations/editCollection.g'
import { useRemoveBookmarkMutation } from 'operations/portal/mutations/removeBookmark.g'
import { useRemoveCollectionMutation } from 'operations/portal/mutations/removeCollection.g'
import GuardianIdealCarousel from 'components/GuardianIdeal/GuardianIdealCarousel'
import {
  MySpaceWidget,
  BookmarkRecords,
  Collection,
  Widget,
  Bookmark,
} from 'types/index'

import { WIDGET_TYPES, MAXIMUM_COLLECTIONS } from 'constants/index'
import NewsWidget from 'components/NewsWidget/NewsWidget'
import CustomCollection from 'components/CustomCollection/CustomCollection'
import LoadingWidget from 'components/LoadingWidget/LoadingWidget'
import AddWidget from 'components/AddWidget/AddWidget'
import { GuardianIdealPillars } from 'components/GuardianIdeal/GuardianIdealPillars'
import { useAnalytics } from 'stores/analyticsContext'
import FeaturedShortcuts from 'components/FeaturedShortcuts/FeaturedShorcuts'
import { featuredShortcutItems } from 'components/FeaturedShortcuts/FeaturedShortcutItems'

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
  return widget.type === WIDGET_TYPES.FEATUREDAPPS
}

const MySpace = ({ bookmarks }: { bookmarks: BookmarkRecords }) => {
  const router = useRouter()
  const { trackEvent } = useAnalytics()
  const { loading, error, data } = useGetMySpaceQuery()
  const flags = useFlags()

  const mySpace = (data?.mySpace || []) as MySpaceWidget[]

  const [handleAddWidget] = useAddWidgetMutation()
  const [handleRemoveBookmark] = useRemoveBookmarkMutation()
  const [handleAddBookmark] = useAddBookmarkMutation()
  const [handleRemoveCollection] = useRemoveCollectionMutation()
  const [handleEditCollection] = useEditCollectionMutation()
  const [handleAddCollection] = useAddCollectionMutation()

  if (error) return <p>Error</p>

  const addNewsWidget = () => {
    trackEvent('Add section', 'Add news')

    handleAddWidget({
      variables: { title: 'Recent news', type: AddWidgetType.News },
      refetchQueries: ['getMySpace'],
    })
  }

  const addGuardianIdeal = () => {
    trackEvent(
      'Guardian Ideal Carousel',
      'Click on add Ideal carousel',
      'Add Ideal'
    )

    handleAddWidget({
      variables: { title: 'Ideal Title', type: AddWidgetType.GuardianIdeal },
      refetchQueries: ['getMySpace'],
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
      refetchQueries: ['getMySpace'],
    })
  }

  const addNewCollection = () => {
    trackEvent('Add section', 'Create new collection')

    handleAddCollection({
      variables: { title: '', bookmarks: [] },
      refetchQueries: [`getMySpace`],
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
    mySpace.filter((w) => w.type === WIDGET_TYPES.FEATUREDAPPS).length < 1

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
        <Grid row gap={2}>
          {loading && (
            <Grid
              key={`widget_loading`}
              tabletLg={{ col: 6 }}
              desktopLg={{ col: 4 }}>
              <LoadingWidget />
            </Grid>
          )}

          {data &&
            data.mySpace &&
            data.mySpace.map((widget: Widget) => {
              if (
                isGuardianIdeal(widget) &&
                flags &&
                flags?.guardianIdealCarousel
              ) {
                return (
                  <Grid
                    key={`widget_${widget._id}`}
                    className={styles.guardianIdeal}>
                    <GuardianIdealCarousel
                      ideals={GuardianIdealPillars}
                      widget={widget}
                    />
                  </Grid>
                )
              }

              if (isFeaturedShortcuts(widget)) {
                return (
                  <Grid
                    key={`widget_${widget._id}`}
                    className={styles.featuredShortcuts}>
                    <FeaturedShortcuts
                      featuredShortcuts={featuredShortcutItems}
                      widget={widget}
                    />
                  </Grid>
                )
              }

              if (isNewsWidget(widget)) {
                return (
                  <Grid
                    key={`widget_${widget._id}`}
                    tabletLg={{ col: 6 }}
                    desktopLg={{ col: 4 }}>
                    <NewsWidget widget={widget} />
                  </Grid>
                )
              }

              if (isCollection(widget)) {
                return (
                  <Grid
                    key={`widget_${widget._id}`}
                    tabletLg={{ col: 6 }}
                    desktopLg={{ col: 4 }}>
                    <CustomCollection
                      _id={widget._id}
                      key={`widget_${widget._id}`}
                      title={widget.title}
                      type={widget.type}
                      bookmarks={widget.bookmarks || []}
                      bookmarkOptions={bookmarks}
                      handleRemoveCollection={() => {
                        handleRemoveCollection({
                          variables: {
                            _id: widget._id,
                          },
                          refetchQueries: [`getMySpace`],
                        })
                      }}
                      handleEditCollection={(
                        title: string,
                        bookmarks?: Bookmark[]
                      ) => {
                        handleEditCollection({
                          variables: {
                            _id: widget._id,
                            title,
                            bookmarks,
                          },
                          optimisticResponse: {
                            editCollection: {
                              _id: widget._id,
                              title,
                              bookmarks: bookmarks || widget.bookmarks,
                            },
                          },
                          update(cache, result) {
                            if (result.data?.editCollection) {
                              const { editCollection } = result.data
                              cache.writeFragment({
                                id: `Collection:${editCollection._id}`,
                                fragment: gql`
                                  fragment collectionData on Collection {
                                    _id
                                    title
                                    bookmarks {
                                      _id
                                      url
                                      label
                                      cmsId
                                      isRemoved
                                    }
                                  }
                                `,
                                data: editCollection,
                              })
                            }
                          },
                        })
                      }}
                      handleRemoveBookmark={(_id, cmsId) => {
                        handleRemoveBookmark({
                          variables: {
                            _id,
                            collectionId: widget._id,
                            cmsId,
                          },
                          refetchQueries: [`getMySpace`],
                        })
                      }}
                      handleAddBookmark={(url, label, id) => {
                        handleAddBookmark({
                          variables: {
                            collectionId: widget._id,
                            url,
                            label,
                            cmsId: id,
                          },
                          refetchQueries: [`getMySpace`],
                        })
                      }}
                    />
                  </Grid>
                )
              }
              return null
            })}

          {!loading &&
            (canAddCollections ||
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
        </Grid>
      </div>
    </div>
  )
}

export default MySpace
