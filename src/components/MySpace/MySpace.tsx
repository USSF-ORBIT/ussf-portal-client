import React from 'react'
import { Grid } from '@trussworks/react-uswds'
import styles from './MySpace.module.scss'
import Bookmark from 'components/Bookmark/Bookmark'
import Collection from 'components/Collection/Collection'
import { useRemoveBookmarkMutation } from 'operations/mutations/removeBookmark'
import { useCollectionsQuery } from 'operations/queries/getCollections'

import type { Bookmark as BookmarkType } from 'types'

const MySpace = () => {
  const { loading, error, data } = useCollectionsQuery()
  const [removeBookmark] = useRemoveBookmarkMutation()
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return (
    <div className={styles.mySpace}>
      <h2>My Space</h2>
      <div className={styles.widgetContainer}>
        <Grid row gap>
          {data &&
            data.collections.length > 0 &&
            data.collections.map((collection) => (
              <Grid
                key={`collection_${collection.id}`}
                tablet={{ col: 6 }}
                desktop={{ col: 3 }}>
                <Collection title={collection.title}>
                  {collection.bookmarks.map((bookmark: BookmarkType) => (
                    <Bookmark
                      key={`bookmark_${bookmark.id}`}
                      href={bookmark.url}
                      onDelete={() =>
                        removeBookmark({
                          variables: {
                            id: bookmark.id,
                            collectionId: collection.id,
                          },
                        })
                      }>
                      {bookmark.label}
                    </Bookmark>
                  ))}
                </Collection>
              </Grid>
            ))}
        </Grid>
      </div>
    </div>
  )
}

export default MySpace
