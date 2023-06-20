import React, { useMemo, useState, useEffect } from 'react'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { Grid } from '@trussworks/react-uswds'
import { gql } from '@apollo/client'
import { WidgetReorderInput } from '../../graphql.g'
import styles from './MySpace.module.scss'
import {
  GetMySpaceDocument,
  GetMySpaceQuery,
} from 'operations/portal/queries/getMySpace.g'

import { useAddBookmarkMutation } from 'operations/portal/mutations/addBookmark.g'
import { useAddCollectionMutation } from 'operations/portal/mutations/addCollection.g'
import { useEditCollectionMutation } from 'operations/portal/mutations/editCollection.g'
import { useRemoveBookmarkMutation } from 'operations/portal/mutations/removeBookmark.g'
import { useRemoveCollectionMutation } from 'operations/portal/mutations/removeCollection.g'
import { useEditMySpaceMutation } from 'operations/portal/mutations/editMySpace.g'
import { useGetMySpaceQuery } from 'operations/portal/queries/getMySpace.g'
import GuardianIdealCarousel from 'components/GuardianIdeal/GuardianIdealCarousel'
import {
  MySpaceWidget,
  CMSBookmark,
  Collection,
  Widget,
  Bookmark,
  MongoBookmark,
} from 'types/index'

import { WIDGET_TYPES } from 'constants/index'
import NewsWidget from 'components/NewsWidget/NewsWidget'
import CustomCollection from 'components/CustomCollection/CustomCollection'
import { GuardianIdealPillars } from 'components/GuardianIdeal/GuardianIdealPillars'
import FeaturedShortcuts from 'components/FeaturedShortcuts/FeaturedShorcuts'
import { featuredShortcutItems } from 'components/FeaturedShortcuts/FeaturedShortcutItems'
import { DateTime } from 'luxon'
import { ObjectId } from 'bson'

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
  rectSwappingStrategy,
} from '@dnd-kit/sortable'

import DraggableBookmark from 'components/util/DraggableBookmark/DraggableBookmark'
import Droppable from 'components/util/Droppable/Droppable'

type DraggableWidget = {
  _id: ObjectId
  id: string
  type: string
  title: string
  bookmarks?: MongoBookmark[]
  cmsId?: string
}

const DraggableWidgets = ({
  bookmarks,
  mySpace,
}: {
  bookmarks: CMSBookmark[]
  mySpace: MySpaceWidget[]
}) => {
  // console.log('Draggable Widgets Component')
  const [handleEditMySpace] = useEditMySpaceMutation()

  // const { loading, data, error } = useGetMySpaceQuery()

  // const [preparedWidgets, setDraggableWidgets] = useState<DraggableWidget[]>([])

  // Wait until the data is loaded to set the draggable widgets
  // useEffect(() => {
  //   if (data?.mySpace) {
  //     const widgets = data?.mySpace
  //     const draggable = data?.mySpace.filter(
  //       (b) => b.type !== 'FeaturedShortcuts' || 'GuardianIdeal'
  //     )
  //     let preparedWidgets: DraggableWidget[] = []
  //     // Prepare draggable widgets with id field that dnd-kit needs
  //     if (draggable && draggable.length > 0) {
  //       preparedWidgets = widgets.map((w) => {
  //         return { id: w._id.toString(), ...w }
  //       })
  //       setDraggableWidgets(preparedWidgets)
  //     }
  //   }
  // }, [data])

  // const preparedWidgets = () => {
  //   if (mySpace) {
  //     const widgets = mySpace
  //     const draggable = mySpace.filter(
  //       (b) => b.type !== 'FeaturedShortcuts' || 'GuardianIdeal'
  //     )
  //     let preparedWidgets: DraggableWidget[] = []
  //     // Prepare draggable widgets with id field that dnd-kit needs
  //     if (draggable && draggable.length > 0) {
  //       preparedWidgets = widgets.map((w) => {
  //         return { id: w._id.toString(), ...w }
  //       })
  //       return preparedWidgets
  //     }
  //   }
  //   return []
  // }

  const [draggableWidgets, setDraggableWidgets] = useState(
    mySpace
      .filter((w) => w.type !== 'FeaturedShortcuts' || 'GuardianIdeal')
      .map((c) => {
        return { id: c._id.toString(), ...c }
      })
  )

  // const preparedWidgets = useMemo(() => {
  //   if (data?.mySpace) {
  //     const widgets = data?.mySpace
  //     const draggable = data?.mySpace.filter(
  //       (b) => b.type !== 'FeaturedShortcuts' || 'GuardianIdeal'
  //     )
  //     // let preparedWidgets: DraggableWidget[] = []
  //     let preparedWidgets = []
  //     // Prepare draggable widgets with id field that dnd-kit needs
  //     if (draggable && draggable.length > 0) {
  //       preparedWidgets = widgets.map((w) => {
  //         return { id: w._id.toString(), ...w }
  //       })
  //       //   setDraggableWidgets(preparedWidgets)
  //       // console.log(
  //       //   'Prepared Widgets for DND, setting state ' +
  //       //     preparedWidgets +
  //       //     DateTime.now()
  //       // )
  //       // setDraggableWidgets(preparedWidgets)
  //       return preparedWidgets
  //     }
  //   }
  //   return []
  // }, [data])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )
  const flags = useFlags()

  const handleOnDragEnd = async (event: DragEndEvent) => {
    // console.log('Handle on drag end ' + DateTime.now())
    const { active, over } = event

    // If a draggable item is active, and it is over a droppable area when dropped
    if (over && active.id !== over.id) {
      const oldIndex = draggableWidgets.findIndex((w) => w.id === active.id)
      const newIndex = draggableWidgets.findIndex((w) => w.id === over.id)

      const sortedWidgets = arrayMove(draggableWidgets, oldIndex, newIndex)
      setDraggableWidgets(sortedWidgets)

      // Prepare widgets for mutation
      // const updatedWidgets: MySpaceWidget[] = sortedWidgets.map((w) => {
      //   if (w.type === WIDGET_TYPES.COLLECTION) {
      //     return {
      //       _id: w._id,
      //       title: w.title,
      //       type: enumWidgetType(w.type),
      //       cmsId: w.cmsId,
      //       bookmarks: w.bookmarks?.map(
      //         ({ _id, url, label, cmsId, isRemoved }) => ({
      //           _id,
      //           url,
      //           label,
      //           cmsId,
      //           isRemoved,
      //         })
      //       ),
      //     } as Collection
      //   } else {
      //     return {
      //       _id: w._id,
      //       title: w.title,
      //       type: enumWidgetType(w.type),
      //     } as Widget
      //   }
      // })

      // console.log('updatedWidgets', updatedWidgets)

      // const editMySpaceInput = updatedWidgets as WidgetReorderInput[]

      // convert updatedWidgets to correct format for getMySpace query cache update
      // const updatedMySpace: Widget[] | Collection[] = updatedWidgets.map(
      //   (w) => {
      //     if (w.type === WIDGET_TYPES.COLLECTION) {
      //       return {
      //         __typename: 'Collection',
      //         _id: w._id,
      //         title: w.title,
      //         type: enumWidgetType(w.type),
      //         bookmarks: w.bookmarks?.map(
      //           ({ _id, url, label, cmsId, isRemoved }) => ({
      //             __typename: 'Bookmark',
      //             _id,
      //             url,
      //             label,
      //             cmsId,
      //             isRemoved,
      //           })
      //         ),
      //       } as Collection
      //     } else {
      //       return {
      //         __typename: w.type,
      //         _id: w._id,
      //         title: w.title,
      //         type: enumWidgetType(w.type),
      //       } as Widget
      //     }
      //   }
      // )

      // handleEditMySpace({
      //   variables: {
      //     mySpace: editMySpaceInput,
      //   },
      //   // ignoreResults: true,
      //   // refetchQueries: [`getMySpace`],

      //   // Updating the cache works, but this optimistic response isn't
      //   // returning any data that can be accessed by the update function
      //   optimisticResponse: {
      //     editMySpace: {
      //       mySpace: updatedMySpace as any,
      //     },
      //   },
      //   update: (cache, { data }) => {
      //     // the data here is null, so we can't use it to update the cache
      //     // #TODO why is it null?
      //     // console.log('update cache', data)
      //     const existingMySpace = cache.readQuery<GetMySpaceQuery>({
      //       query: GetMySpaceDocument,
      //     })
      //     // console.log('existingMySpace', existingMySpace)
      //     const newMySpace = data?.editMySpace?.mySpace
      //     // console.log('newMySpace', newMySpace)
      //     // console.log('updated myspace', updatedMySpace)

      //     cache.writeQuery<GetMySpaceQuery>({
      //       query: GetMySpaceDocument,
      //       data: {
      //         mySpace: updatedMySpace,
      //       },
      //     })
      //   },
      // })
    }
  }

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

  const [handleRemoveBookmark] = useRemoveBookmarkMutation()
  const [handleAddBookmark] = useAddBookmarkMutation()
  const [handleRemoveCollection] = useRemoveCollectionMutation()
  const [handleEditCollection] = useEditCollectionMutation()

  return (
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

            {draggableWidgets?.map((widget: Widget) => {
              if (isNewsWidget(widget)) {
                return (
                  <Grid
                    key={`widget_${widget._id}`}
                    tabletLg={{ col: 6 }}
                    desktopLg={{ col: 4 }}>
                    <DraggableBookmark
                      key={widget._id.toString()}
                      id={widget._id.toString()}>
                      <NewsWidget widget={widget} />
                    </DraggableBookmark>
                  </Grid>
                )
              }

              if (isCollection(widget)) {
                return (
                  <Grid
                    key={`widget_${widget._id}`}
                    tabletLg={{ col: 6 }}
                    desktopLg={{ col: 4 }}
                    // #TODO remove, this is for debugging
                    // the active draggable with css
                    // className={
                    //   active === widget._id.toString()
                    //     ? styles.draggableActive
                    //     : ``
                    // }
                  >
                    <DraggableBookmark
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
                    </DraggableBookmark>
                  </Grid>
                )
              }

              return null
            })}
          </Grid>
        </SortableContext>
      </Droppable>
    </DndContext>
  )
}

const enumWidgetType = (type: string) => {
  switch (type) {
    case 'Collection':
      return WIDGET_TYPES.COLLECTION
    case 'News':
      return WIDGET_TYPES.NEWS
    case 'GuardianIdeal':
      return WIDGET_TYPES.GUARDIANIDEAL
    case 'FeaturedShortcuts':
      return WIDGET_TYPES.FEATUREDSHORTCUTS
    default:
      return WIDGET_TYPES.COLLECTION
  }
}

export default DraggableWidgets
