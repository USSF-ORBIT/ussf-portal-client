import React from 'react'
import { Grid } from '@trussworks/react-uswds'
import { useRouter } from 'next/router'

import styles from './MySpace.module.scss'

import type {
  MySpaceWidget,
  BookmarkRecords,
  BookmarkInput,
  Collection,
} from 'types/index'

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

const MAXIMUM_COLLECTIONS = 25

/** Type guards */
function isCollection(widget: MySpaceWidget): widget is Collection {
  return 'bookmarks' in widget
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
    trackEvent('Add section', 'Add News section')

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

  // TODO
  const canAddWidgets = data && data.widgets.length < MAXIMUM_COLLECTIONS

  const selectCollections = () => {
    trackEvent('Add section', 'Select collection from template')

    router.push({
      pathname: '/sites-and-applications',
      query: { selectMode: 'true' },
    })
  }

  return (
    <div className={styles.mySpace}>
      <h2 className={styles.pageTitle}>My Space</h2>
      <div className={styles.widgetContainer}>
        <Grid row gap={2}>
          {loading && (
            <Grid
              key={`collection_loading`}
              tablet={{ col: 6 }}
              desktop={{ col: 4 }}>
              <LoadingWidget />
            </Grid>
          )}

          {data &&
            data.mySpace &&
            data.mySpace.map((widget) => (
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
                    handleEditCollection={(title: string) => {
                      handleEditCollection({
                        variables: {
                          _id: widget._id,
                          title,
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

          {!loading && canAddWidgets && (
            <Grid
              key={`collection_addNew`}
              tablet={{ col: 6 }}
              desktop={{ col: 4 }}>
              <AddWidget
                handleCreateCollection={addNewCollection}
                handleSelectCollection={selectCollections}
                handleAddNews={addNewsWidget}
              />
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default MySpace
