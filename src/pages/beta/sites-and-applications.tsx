import { useState } from 'react'
import { InferGetStaticPropsType } from 'next'
import { Button, Grid } from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'

import { lists } from '.keystone/api'

import type { BookmarkRecords, CollectionRecords } from 'types/index'
import { withBetaLayout } from 'layout/Beta/DefaultLayout/DefaultLayout'
import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'
import BookmarkList from 'components/BookmarkList/BookmarkList'
import styles from 'styles/pages/sitesAndApplications.module.scss'

type SortBy = 'SORT_TYPE' | 'SORT_ALPHA'

const SitesAndApplications = ({
  collections,
  bookmarks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [sortBy, setSort] = useState<SortBy>('SORT_TYPE')
  const [selectMode, setSelectMode] = useState<boolean>(false)

  const handleSortClick = (sortType: SortBy) => setSort(sortType)

  const handleToggleSelectMode = () =>
    setSelectMode((currentMode) => !currentMode)

  const widgetClasses = classnames(styles.widgetContainer, {
    [styles.selectMode]: selectMode,
  })

  return (
    <>
      <h2 className={styles.pageTitle}>Sites &amp; Applications</h2>

      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.sortButton}
          disabled={sortBy === 'SORT_ALPHA' || selectMode}
          onClick={() => handleSortClick('SORT_ALPHA')}>
          <FontAwesomeIcon icon="list" /> Sort alphabetically
        </button>
        <button
          type="button"
          className={styles.sortButton}
          disabled={sortBy === 'SORT_TYPE'}
          onClick={() => handleSortClick('SORT_TYPE')}>
          <FontAwesomeIcon icon="th-large" />
          Sort by type
        </button>
      </div>

      {sortBy === 'SORT_ALPHA' && <BookmarkList bookmarks={bookmarks} />}

      {sortBy === 'SORT_TYPE' && (
        <div className={widgetClasses}>
          <div className={styles.widgetToolbar}>
            {selectMode ? (
              <>
                <Button type="button" outline onClick={handleToggleSelectMode}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button type="button" onClick={handleToggleSelectMode}>
                Select multiple collections
              </Button>
            )}
          </div>

          <Grid row gap className={styles.widgets}>
            {collections.map((collection) => (
              <Grid
                key={`collection_${collection.id}`}
                tablet={{ col: 6 }}
                desktop={{ col: 3 }}>
                <Collection title={collection.title}>
                  {collection.bookmarks?.map((bookmark) => (
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
      )}
    </>
  )
}

export default SitesAndApplications

SitesAndApplications.getLayout = withBetaLayout

export async function getStaticProps() {
  const collections: CollectionRecords = await lists.Collection.findMany({
    query: 'id title bookmarks { id url label }',
  })

  const bookmarks: BookmarkRecords = await lists.Bookmark.findMany({
    query: 'id url label description',
    orderBy: [{ label: 'asc' }],
  })

  return { props: { collections, bookmarks } }
}
