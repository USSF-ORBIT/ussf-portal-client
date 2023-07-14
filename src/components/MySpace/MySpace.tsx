import React from 'react'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { Grid } from '@trussworks/react-uswds'
import { gql } from '@apollo/client'
import { useRouter } from 'next/router'
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import styles from './MySpace.module.scss'

import DraggableCollection from 'components/util/DraggableCollection/DraggableCollection'
import Droppable from 'components/util/Droppable/Droppable'

import { useAddBookmarkMutation } from 'operations/portal/mutations/addBookmark.g'
import { useEditCollectionMutation } from 'operations/portal/mutations/editCollection.g'
import { useRemoveBookmarkMutation } from 'operations/portal/mutations/removeBookmark.g'
import { useRemoveCollectionMutation } from 'operations/portal/mutations/removeCollection.g'

import CustomCollection from 'components/CustomCollection/CustomCollection'
import GuardianIdealCarousel from 'components/GuardianIdeal/GuardianIdealCarousel'
import NewsWidget from 'components/NewsWidget/NewsWidget'
import { GuardianIdealPillars } from 'components/GuardianIdeal/GuardianIdealPillars'
import FeaturedShortcuts from 'components/FeaturedShortcuts/FeaturedShorcuts'
import { featuredShortcutItems } from 'components/FeaturedShortcuts/FeaturedShortcutItems'

import { CMSBookmark, Widget, Bookmark } from 'types/index'
import AddWidget from 'components/AddWidget/AddWidget'
import { useAnalytics } from 'stores/analyticsContext'
import { useMySpaceContext } from 'stores/myspaceContext'

const MySpace = ({ bookmarks }: { bookmarks: CMSBookmark[] }) => {
  const router = useRouter()
  const { trackEvent } = useAnalytics()
  const {
    mySpace,
    isCollection,
    isGuardianIdeal,
    isNewsWidget,
    isFeaturedShortcuts,
    canAddCollections,
    canAddNews,
    canAddGuardianIdeal,
    canAddFeaturedShortcuts,
    addNewCollection,
    handleOnDragEnd,
  } = useMySpaceContext()
  const flags = useFlags()

  const [handleRemoveBookmark] = useRemoveBookmarkMutation()
  const [handleAddBookmark] = useAddBookmarkMutation()
  const [handleRemoveCollection] = useRemoveCollectionMutation()
  const [handleEditCollection] = useEditCollectionMutation()

  // Distance tells the sensor how far the pointer must move (in pixels) before it is activated. This is
  // needed so that other click events, like opening a collections's menu, can be triggered.
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const selectCollections = () => {
    trackEvent('Add section', 'Select collection from template')

    router.push({
      pathname: '/sites-and-applications',
      query: { selectMode: 'true' },
    })
  }

  return (
    <div id="skip-announcements-carousel" className={styles.mySpace}>
      <div className={styles.widgetContainer}>
        <h2 className={styles.pageTitle}>My Space</h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleOnDragEnd}>
          <Droppable dropId={'mySpaceDroppableArea'}>
            <SortableContext
              // Ignoring the following line because an id field has already been added to the Widget type to accomodate
              // the unique identifier necessary for @dnd-kit.
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              items={mySpace}
              strategy={rectSortingStrategy}>
              <Grid row gap={2}>
                {mySpace.map((widget: Widget) => {
                  if (isFeaturedShortcuts(widget) && flags?.featuredShortcuts) {
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

                  if (isGuardianIdeal(widget) && flags?.guardianIdealCarousel) {
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

                  if (isNewsWidget(widget)) {
                    return (
                      <Grid
                        key={`widget_${widget._id}`}
                        tabletLg={{ col: 6 }}
                        desktopLg={{ col: 4 }}>
                        <DraggableCollection id={widget._id.toString()}>
                          <NewsWidget widget={widget} />
                        </DraggableCollection>
                      </Grid>
                    )
                  }

                  if (isCollection(widget)) {
                    return (
                      <Grid
                        key={`widget_${widget._id}`}
                        tabletLg={{ col: 6 }}
                        desktopLg={{ col: 4 }}>
                        <DraggableCollection id={widget._id.toString()}>
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
                                refetchQueries: [`getUser`],
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
                                refetchQueries: [`getUser`],
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
                                refetchQueries: [`getUser`],
                              })
                            }}
                          />
                        </DraggableCollection>
                      </Grid>
                    )
                  }

                  return null
                })}

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
                    />
                  </Grid>
                )}
              </Grid>
            </SortableContext>
          </Droppable>
        </DndContext>
      </div>
    </div>
  )
}

export default MySpace
