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
import { useEditBookmarkMutation } from 'operations/mutations/editBookmark'

const MySpace = ({ bookmarks }: { bookmarks: BookmarkRecords }) => {
  const router = useRouter()
  const { loading, error, data } = useCollectionsQuery()
  const [handleRemoveBookmark] = useRemoveBookmarkMutation()
  const [handleAddBookmark] = useAddBookmarkMutation()
  const [handleRemoveCollection] = useRemoveCollectionMutation()
  const [handleEditCollection] = useEditCollectionMutation()
  const [handleAddCollection] = useAddCollectionMutation()
  const [handleEditBookmark] = useEditBookmarkMutation()

  if (error) return <p>Error</p>

  const addNewCollection = () => {
    const newBookmark: BookmarkInput[] = []
    handleAddCollection({
      variables: { title: '', bookmarks: newBookmark },
      refetchQueries: [`getCollections`],
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
                tablet={{ col: 6 }}
                desktop={{ col: 4 }}>
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
                  handleEditBookmark={(id, url, label) => {
                    handleEditBookmark({
                      variables: {
                        _id: id,
                        collectionId: collection._id,
                        url,
                        label,
                      },
                      refetchQueries: [`getCollections`],
                    })
                  }}
                />
              </Grid>
            ))}

          {!loading && (
            <Grid
              key={`collection_addNew`}
              tablet={{ col: 6 }}
              desktop={{ col: 4 }}>
              <AddWidget
                handleCreateCollection={addNewCollection}
                handleSelectCollection={() =>
                  router.push({
                    pathname: '/sites-and-applications',
                    query: { selectMode: 'true' },
                  })
                }
              />
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  )
}

export default MySpace
