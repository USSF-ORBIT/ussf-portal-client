import React from 'react'
import { Grid } from '@trussworks/react-uswds'
import { useRouter } from 'next/router'

import styles from './MySpace.module.scss'

import type { BookmarkRecords, BookmarkInput } from 'types/index'
import CustomCollection from 'components/CustomCollection/CustomCollection'
import LoadingWidget from 'components/LoadingWidget/LoadingWidget'
import AddWidget from 'components/AddWidget/AddWidget'
import { useCollectionsQuery } from 'operations/queries/getCollections'
import { useRemoveBookmarkMutation } from 'operations/mutations/removeBookmark'
import { useAddBookmarkMutation } from 'operations/mutations/addBookmark'
import { useRemoveCollectionMutation } from 'operations/mutations/removeCollection'
import { useEditCollectionMutation } from 'operations/mutations/editCollection'
import { useAddCollectionMutation } from 'operations/mutations/addCollection'
import { useAnalytics } from 'stores/analyticsContext'

const MAXIMUM_COLLECTIONS = 25

const MySpace = ({ bookmarks }: { bookmarks: BookmarkRecords }) => {
  const router = useRouter()
  const { trackEvent } = useAnalytics()
  const { loading, error, data } = useCollectionsQuery()
  const [handleRemoveBookmark] = useRemoveBookmarkMutation()
  const [handleAddBookmark] = useAddBookmarkMutation()
  const [handleRemoveCollection] = useRemoveCollectionMutation()
  const [handleEditCollection] = useEditCollectionMutation()
  const [handleAddCollection] = useAddCollectionMutation()

  if (error) return <p>Error</p>

  const addNewCollection = () => {
    trackEvent('Add section', 'Create new collection')

    const newBookmark: BookmarkInput[] = []
    handleAddCollection({
      variables: { title: '', bookmarks: newBookmark },
      refetchQueries: [`getCollections`],
    })
  }

  const canAddSections = data && data.collections.length < MAXIMUM_COLLECTIONS

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
            data.collections &&
            data.collections.map((collection) => (
              <Grid
                key={`collection_${collection._id}`}
                tabletLg={{ col: 6 }}
                desktopLg={{ col: 4 }}>
                <CustomCollection
                  _id={collection._id}
                  title={collection.title}
                  bookmarks={collection.bookmarks}
                  bookmarkOptions={bookmarks}
                  handleRemoveCollection={() => {
                    handleRemoveCollection({
                      variables: {
                        _id: collection._id,
                      },
                      refetchQueries: [`getCollections`],
                    })
                  }}
                  handleEditCollection={(title: string) => {
                    handleEditCollection({
                      variables: {
                        _id: collection._id,
                        title,
                      },
                      refetchQueries: [`getCollections`],
                    })
                  }}
                  handleRemoveBookmark={(_id, cmsId) => {
                    handleRemoveBookmark({
                      variables: {
                        _id,
                        collectionId: collection._id,
                        cmsId,
                      },
                      refetchQueries: [`getCollections`],
                    })
                  }}
                  handleAddBookmark={(url, label, id) => {
                    handleAddBookmark({
                      variables: {
                        collectionId: collection._id,
                        url,
                        label,
                        cmsId: id,
                      },
                      refetchQueries: [`getCollections`],
                    })
                  }}
                />
              </Grid>
            ))}

          {!loading && canAddSections && (
            <Grid
              key={`collection_addNew`}
              tablet={{ col: 6 }}
              desktop={{ col: 4 }}>
              <AddWidget
                handleCreateCollection={addNewCollection}
                handleSelectCollection={selectCollections}
              />
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default MySpace
