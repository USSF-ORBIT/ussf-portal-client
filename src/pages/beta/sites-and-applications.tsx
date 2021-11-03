import { useState, useEffect } from 'react'
import { InferGetStaticPropsType } from 'next'
import { Button, Grid, Alert } from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import { useRouter } from 'next/router'

import { lists } from '.keystone/api'

import type {
  BookmarkRecords,
  CollectionRecords,
  Collection as CollectionType,
  Bookmark as BookmarkType,
} from 'types/index'
import { withBetaLayout } from 'layout/Beta/DefaultLayout/DefaultLayout'
import Flash from 'components/util/Flash/Flash'
import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'
import BookmarkList from 'components/BookmarkList/BookmarkList'
import SelectableCollection from 'components/SelectableCollection/SelectableCollection'
import styles from 'styles/pages/sitesAndApplications.module.scss'

import { useCollectionsQuery } from 'operations/queries/getCollections'
import { useAddCollectionsMutation } from 'operations/mutations/addCollections'
import { useAddBookmarkMutation } from 'operations/mutations/addBookmark'
import { useAddCollectionMutation } from 'operations/mutations/addCollection'

type SortBy = 'SORT_TYPE' | 'SORT_ALPHA'

type SelectedCollections = string[]

const SitesAndApplications = ({
  collections,
  bookmarks,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { loading, error, data } = useCollectionsQuery()

  const [sortBy, setSort] = useState<SortBy>('SORT_TYPE')
  const [selectMode, setSelectMode] = useState<boolean>(
    router.query.selectMode == 'true' || false
  )
  const [selectedCollections, setSelectedCollections] =
    useState<SelectedCollections>([])
  const [flash, setFlash] = useState<React.ReactNode>(null)

  const [handleAddCollections] = useAddCollectionsMutation()
  const [handleAddCollection] = useAddCollectionMutation()
  const [handleAddBookmark] = useAddBookmarkMutation()

  useEffect(() => {
    if (router.query.selectMode == 'true') {
      setSelectMode(true)
    }
  }, [router.query])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error</p>

  const handleSortClick = (sortType: SortBy) => setSort(sortType)

  const handleToggleSelectMode = () => {
    setSelectMode((currentMode) => !currentMode)
    setSelectedCollections([])
  }

  const widgetClasses = classnames(styles.widgetContainer, {
    [styles.selectMode]: selectMode,
  })

  const handleSelectCollection = (id: string): void => {
    if (isSelected(id)) {
      setSelectedCollections((state) => {
        const itemIndex = state.indexOf(id)
        const newState = [...state]
        newState.splice(itemIndex, 1)
        return newState
      })
    } else {
      setSelectedCollections((state) => [...state, id])
    }
  }

  const isSelected = (id: string): boolean =>
    selectedCollections.indexOf(id) > -1

  const handleAddSelected = () => {
    const collectionObjs = selectedCollections.map((id) =>
      collections.find((i) => i.id === id)
    ) as CollectionType[]

    handleAddCollections({
      variables: {
        collections: collectionObjs,
      },
    })
    setSelectMode(false)
    setSelectedCollections([])
    router.push('/')
  }

  const handleAddToCollection = (
    bookmark: BookmarkType,
    collectionId?: string
  ) => {
    if (collectionId) {
      handleAddBookmark({
        variables: {
          collectionId,
          ...bookmark,
        },
      })

      const collection = data?.collections.find((c) => c.id === collectionId)

      setFlash(
        <Alert type="success" slim role="alert">
          You have successfully added “{bookmark.label}” to the “
          {collection?.title}” section.
        </Alert>
      )
    } else {
      handleAddCollection({
        variables: {
          title: '',
          bookmarks: [bookmark],
        },
      })

      router.push('/')
    }
  }

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

      {flash && (
        <div className={styles.flash}>
          <Flash handleClear={() => setFlash(null)}>{flash}</Flash>
        </div>
      )}

      {sortBy === 'SORT_ALPHA' && (
        <BookmarkList
          bookmarks={bookmarks}
          userCollectionOptions={data?.collections}
          handleAddToCollection={handleAddToCollection}
        />
      )}

      {sortBy === 'SORT_TYPE' && (
        <div className={widgetClasses}>
          <div className={styles.widgetToolbar}>
            {selectMode ? (
              <>
                <span>
                  {selectedCollections.length} collection
                  {selectedCollections.length !== 1 && 's'} selected
                </span>
                <Button
                  type="button"
                  accentStyle="warm"
                  inverse
                  disabled={selectedCollections.length < 1}
                  onClick={handleAddSelected}>
                  Add selected
                </Button>
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
            {collections.map((collection) => {
              return (
                <Grid
                  key={`collection_${collection.id}`}
                  tablet={{ col: 6 }}
                  desktop={{ col: 4 }}>
                  {selectMode ? (
                    <SelectableCollection
                      id={collection.id}
                      title={collection.title}
                      bookmarks={collection.bookmarks}
                      isSelected={isSelected(collection.id)}
                      onSelect={() => handleSelectCollection(collection.id)}
                    />
                  ) : (
                    <Collection title={collection.title}>
                      {collection.bookmarks?.map((bookmark) => (
                        <Bookmark
                          key={`bookmark_${bookmark.id}`}
                          href={bookmark.url}>
                          {bookmark.label}
                        </Bookmark>
                      ))}
                    </Collection>
                  )}
                </Grid>
              )
            })}
          </Grid>
        </div>
      )}
    </>
  )
}

export default SitesAndApplications

SitesAndApplications.getLayout = withBetaLayout

export async function getStaticProps() {
  const collections: CollectionRecords = (await lists.Collection.findMany({
    query: 'id title bookmarks { id url label }',
  })) as CollectionRecords

  const bookmarks: BookmarkRecords = (await lists.Bookmark.findMany({
    query: 'id url label description',
    orderBy: [{ label: 'asc' }],
  })) as BookmarkRecords

  return { props: { collections, bookmarks } }
}
