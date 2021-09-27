import React from 'react'
import { Grid } from '@trussworks/react-uswds'
import styles from './MySpace.module.scss'
import CustomCollection from 'components/CustomCollection/CustomCollection'
import { useCollectionsQuery } from 'operations/queries/getCollections'
import { useRemoveBookmarkMutation } from 'operations/mutations/removeBookmark'

const MySpace = () => {
  const { loading, error, data } = useCollectionsQuery()
  const [handleRemoveBookmark] = useRemoveBookmarkMutation()

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
                  handleRemoveBookmark={(id) =>
                    handleRemoveBookmark({
                      variables: { id, collectionId: collection.id },
                    })
                  }
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  )
}

export default MySpace
