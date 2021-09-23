import React from 'react'
import { Grid } from '@trussworks/react-uswds'
import styles from './MySpace.module.scss'
import Bookmark from 'components/Bookmark/Bookmark'
import Collection from 'components/Collection/Collection'
import type { Bookmark as BookmarkType } from 'types'
import { useCollectionsQuery } from '../../operations/queries/getCollections'

const MySpace = () => {
  const { loading, error, data } = useCollectionsQuery()

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>
  console.log('MySpace component, collections query?')
  console.log(data)
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
                <Collection title={collection.title}>
                  {collection.bookmarks.map((bookmark: BookmarkType) => (
                    <Bookmark
                      key={`bookmark_${bookmark.id}`}
                      href={bookmark.url}>
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
