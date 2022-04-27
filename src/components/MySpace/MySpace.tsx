import React from 'react'
import { Grid } from '@trussworks/react-uswds'
import { useRouter } from 'next/router'

import styles from './MySpace.module.scss'

import type {
  MySpaceWidget,
  BookmarkRecords,
  BookmarkInput,
  Collection,
  Widget,
  Bookmark,
} from 'types/index'

import { WIDGET_TYPES, MAXIMUM_COLLECTIONS } from 'constants/index'
import NewsWidget from 'components/NewsWidget/NewsWidget'
import CustomCollection from 'components/CustomCollection/CustomCollection'
import LoadingWidget from 'components/LoadingWidget/LoadingWidget'
import AddWidget from 'components/AddWidget/AddWidget'

import { useMySpaceQuery } from 'operations/queries/getMySpace'
import { useAddWidgetMutation } from 'operations/mutations/addWidget'
import { useRemoveWidgetMutation } from 'operations/mutations/removeWidget'
import { useRemoveBookmarkMutation } from 'operations/mutations/removeBookmark'
import { useAddBookmarkMutation } from 'operations/mutations/addBookmark'
import { useRemoveCollectionMutation } from 'operations/mutations/removeCollection'
import { useEditCollectionMutation } from 'operations/mutations/editCollection'
import { useAddCollectionMutation } from 'operations/mutations/addCollection'
import { useEditBookmarkMutation } from 'operations/mutations/editBookmark'
import { useAnalytics } from 'stores/analyticsContext'

/** Type guards */
function isCollection(widget: MySpaceWidget): widget is Collection {
  return widget.type === WIDGET_TYPES.COLLECTION
}

const MySpace = ({ bookmarks }: { bookmarks: BookmarkRecords }) => {
  const router = useRouter()
  const { trackEvent } = useAnalytics()
  const { loading, error, data } = useMySpaceQuery()

  const [handleAddWidget] = useAddWidgetMutation()
  const [handleRemoveWidget] = useRemoveWidgetMutation()
  const [handleRemoveBookmark] = useRemoveBookmarkMutation()
  const [handleAddBookmark] = useAddBookmarkMutation()
  const [handleRemoveCollection] = useRemoveCollectionMutation()
  const [handleEditCollection] = useEditCollectionMutation()
  const [handleAddCollection] = useAddCollectionMutation()
  const [handleEditBookmark] = useEditBookmarkMutation()

  if (error) return <p>Error</p>

  const addNewsWidget = () => {
    trackEvent('Add section', 'Add news')

    handleAddWidget({
      variables: { title: 'Recent news', type: 'News' },
      refetchQueries: ['getMySpace'],
    })
  }

  const addNewCollection = () => {
    trackEvent('Add section', 'Create new collection')

    const newBookmark: BookmarkInput[] = []
    handleAddCollection({
      variables: { title: '', bookmarks: newBookmark },
      refetchQueries: [`getMySpace`],
    })
  }

  const canAddCollections =
    data &&
    data.mySpace.filter((w) => isCollection(w)).length < MAXIMUM_COLLECTIONS

  const canAddNews =
    data && data.mySpace.filter((w) => w.type === WIDGET_TYPES.NEWS).length < 1

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
            data.mySpace.map((widget: Widget) => (
              <Grid
                key={`widget_${widget._id}`}
                tabletLg={{ col: 6 }}
                desktopLg={{ col: 4 }}>
                {widget.type === 'News' && (
                  <NewsWidget
                    onRemove={() => {
                      handleRemoveWidget({
                        variables: { _id: widget._id },
                        refetchQueries: [`getMySpace`],
                      })
                    }}
                  />
                )}

                {isCollection(widget) && (
                  <CustomCollection
                    _id={widget._id}
                    title={widget.title}
                    bookmarks={widget.bookmarks}
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
                        refetchQueries: [`getMySpace`],
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
                    handleEditBookmark={(id, url, label) => {
                      handleEditBookmark({
                        variables: {
                          _id: id,
                          collectionId: widget._id,
                          url,
                          label,
                        },
                        refetchQueries: [`getMySpace`],
                      })
                    }}
                  />
                )}
              </Grid>
            ))}

          {!loading && (canAddCollections || canAddNews) && (
            <Grid
              key={`widget_addNew`}
              tabletLg={{ col: 6 }}
              desktopLg={{ col: 4 }}>
              <AddWidget
                handleCreateCollection={addNewCollection}
                handleSelectCollection={selectCollections}
                handleAddNews={addNewsWidget}
                canAddNews={canAddNews}
                canAddCollection={canAddCollections}
              />
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default MySpace
