import React, { useState } from 'react'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { Grid } from '@trussworks/react-uswds'
import { gql } from '@apollo/client'
import { useRouter } from 'next/router'
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from '@dnd-kit/sortable'
import {
  WidgetType as AddWidgetType,
  WidgetReorderInput,
} from '../../graphql.g'
import styles from './MySpace.module.scss'

import DraggableCollection from 'components/util/DraggableCollection/DraggableCollection'
import Droppable from 'components/util/Droppable/Droppable'

import { useAddBookmarkMutation } from 'operations/portal/mutations/addBookmark.g'
import { useEditCollectionMutation } from 'operations/portal/mutations/editCollection.g'
import { useRemoveBookmarkMutation } from 'operations/portal/mutations/removeBookmark.g'
import { useRemoveCollectionMutation } from 'operations/portal/mutations/removeCollection.g'
import { useEditMySpaceMutation } from 'operations/portal/mutations/editMySpace.g'

import CustomCollection from 'components/CustomCollection/CustomCollection'
import GuardianIdealCarousel from 'components/GuardianIdeal/GuardianIdealCarousel'
import NewsWidget from 'components/NewsWidget/NewsWidget'
import { GuardianIdealPillars } from 'components/GuardianIdeal/GuardianIdealPillars'
import FeaturedShortcuts from 'components/FeaturedShortcuts/FeaturedShorcuts'
import { featuredShortcutItems } from 'components/FeaturedShortcuts/FeaturedShortcutItems'

import { CMSBookmark, Widget } from 'types/index'
import { WIDGET_TYPES, MAXIMUM_COLLECTIONS } from 'constants/index'
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
    addNewsWidget,
    addGuardianIdeal,
    addFeaturedShortcuts,
    addNewCollection,
  } = useMySpaceContext()
  const flags = useFlags()

  const [handleEditMySpace] = useEditMySpaceMutation()
  const [handleRemoveBookmark] = useRemoveBookmarkMutation()
  const [handleAddBookmark] = useAddBookmarkMutation()
  const [handleRemoveCollection] = useRemoveCollectionMutation()
  const [handleEditCollection] = useEditCollectionMutation()

  const [draggableWidgets, setDraggableWidgets] = useState(
    mySpace
      .filter(
        (w) => w.type !== 'FeaturedShortcuts' && w.type !== 'GuardianIdeal'
      )
      .map((c) => {
        return { id: c._id.toString(), ...c }
      })
  )

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

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

  return (
    <div className={styles.mySpace}>
      <div className={styles.widgetContainer}>
        <h2 className={styles.pageTitle}>My Space</h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={handleOnDragEnd}>
          <Droppable dropId={'mySpaceDroppableArea'}>
            <SortableContext
              items={draggableWidgets}
              strategy={rectSortingStrategy}>
              <Grid row gap={2}>
                {mySpace?.map((widget: Widget) => {
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
                  return null
                })}

                {draggableWidgets?.map((widget) => {
                  if (isNewsWidget(widget)) {
                    return (
                      <Grid
                        key={`widget_${widget._id}`}
                        tabletLg={{ col: 6 }}
                        desktopLg={{ col: 4 }}>
                        <DraggableCollection
                          key={widget._id.toString()}
                          id={widget._id.toString()}>
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
                        <DraggableCollection
                          key={widget._id.toString()}
                          id={widget._id.toString()}>
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
            </SortableContext>
          </Droppable>
        </DndContext>
      </div>
    </div>
  )
}

export default MySpace
