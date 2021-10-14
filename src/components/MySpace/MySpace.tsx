import React from 'react'
import { Grid } from '@trussworks/react-uswds'
import { useRouter } from 'next/router'

import styles from './MySpace.module.scss'

import CustomCollection from 'components/CustomCollection/CustomCollection'
import AddWidget from 'components/AddWidget/AddWidget'
import { useCollectionsQuery } from 'operations/queries/getCollections'
import { useRemoveBookmarkMutation } from 'operations/mutations/removeBookmark'
import { useAddBookmarkMutation } from 'operations/mutations/addBookmark'
import { useRemoveCollectionMutation } from 'operations/mutations/removeCollection'
import { useEditCollectionMutation } from 'operations/mutations/editCollection'

const MySpace = () => {
  const router = useRouter()
  const { loading, error, data } = useCollectionsQuery()
  const [handleRemoveBookmark] = useRemoveBookmarkMutation()
  const [handleAddBookmark] = useAddBookmarkMutation()
  const [handleRemoveCollection] = useRemoveCollectionMutation()
  const [handleEditCollection] = useEditCollectionMutation()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div className={styles.mySpace}>
      <h2>My Space</h2>
      <div className={styles.widgetContainer}>
        <Grid row gap>
          {data &&
            data.collections.map((collection) => (
              <Grid
                key={`collection_${collection.id}`}
                tablet={{ col: 6 }}
                desktop={{ col: 3 }}>
                <CustomCollection
                  title={collection.title}
                  bookmarks={collection.bookmarks}
                  handleRemoveCollection={() => {
                    handleRemoveCollection({
                      variables: {
                        id: collection.id,
                      },
                    })
                  }}
                  handleEditCollection={(title: string) => {
                    handleEditCollection({
                      variables: {
                        id: collection.id,
                        title,
                      },
                    })
                  }}
                  handleRemoveBookmark={(id) =>
                    handleRemoveBookmark({
                      variables: { id, collectionId: collection.id },
                    })
                  }
                  handleAddBookmark={(url, label) => {
                    handleAddBookmark({
                      variables: {
                        collectionId: collection.id,
                        url,
                        label,
                      },
                    })
                  }}
                />
              </Grid>
            ))}

          <Grid
            key={`collection_addNew`}
            tablet={{ col: 6 }}
            desktop={{ col: 3 }}>
            <AddWidget
              handleSelectCollection={() =>
                router.push({
                  pathname: '/sites-and-applications',
                  query: { selectMode: 'true' },
                })
              }
            />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default MySpace
