import { useState, useEffect } from 'react'
import { Button, Grid, Alert, IconInfo } from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import type { ObjectId } from 'bson'
import { gql, useQuery } from '@apollo/client'
import type {
  BookmarkRecords,
  CollectionRecords,
  BookmarkRecord,
  NewBookmarkInput,
  MySpaceWidget,
  Collection as CollectionType,
  CollectionRecordInput,
} from 'types/index'

import { WIDGET_TYPES, MAXIMUM_COLLECTIONS } from 'constants/index'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import Loader from 'components/Loader/Loader'
import Flash from 'components/util/Flash/Flash'
import LoadingWidget from 'components/LoadingWidget/LoadingWidget'
import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'
import BookmarkList from 'components/BookmarkList/BookmarkList'
import SelectableCollection from 'components/SelectableCollection/SelectableCollection'
import Tooltip from 'components/Tooltip/Tooltip'
import styles from 'styles/pages/sitesAndApplications.module.scss'

import { useUser } from 'hooks/useUser'
import { useMySpaceQuery } from 'operations/queries/getMySpace'
import {
  useAddCollectionsMutation,
  addCollectionsInput,
} from 'operations/mutations/addCollections'
import { useAddBookmarkMutation } from 'operations/mutations/addBookmark'
import { useAddCollectionMutation } from 'operations/mutations/addCollection'
import { useAnalytics } from 'stores/analyticsContext'

type SortBy = 'SORT_TYPE' | 'SORT_ALPHA'

type SelectedCollections = string[]

/** Type guards */
function isCollection(widget: MySpaceWidget): widget is CollectionType {
  return widget.type === WIDGET_TYPES.COLLECTION
}

const KeystoneTest = () => {
  let collections: CollectionRecords = []
  const router = useRouter()
  const { user } = useUser()
  const { loading, error, data } = useMySpaceQuery()
  const { trackEvent } = useAnalytics()

  const [sortBy, setSort] = useState<SortBy>('SORT_TYPE')
  const [selectMode, setSelectMode] = useState<boolean>(false)
  const [selectedCollections, setSelectedCollections] =
    useState<SelectedCollections>([])
  const [flash, setFlash] = useState<React.ReactNode>(null)

  const [handleAddCollections] = useAddCollectionsMutation()
  const [handleAddCollection] = useAddCollectionMutation()
  const [handleAddBookmark] = useAddBookmarkMutation()
  const {
    loading: cmsCollectionsLoading,
    error: cmsCollectionsError,
    data: cmsCollections,
  } = useQuery(GET_KEYSTONE_COLLECTIONS, {
    context: {
      clientName: 'cms',
    },
  })

  if (!cmsCollectionsLoading) {
    collections = cmsCollections?.collections as CollectionRecords
  }

  const {
    loading: cmsBookmarksLoading,
    error: cmsBookmarksError,
    data: cmsBookmarks,
  } = useQuery(GET_KEYSTONE_BOOKMARKS, {
    context: {
      clientName: 'cms',
    },
  })

  let bookmarks: BookmarkRecords = []
  if (!cmsBookmarksLoading) {
    bookmarks = cmsBookmarks?.bookmarks as BookmarkRecords
  }
  useEffect(() => {
    if (router.query.selectMode == 'true') {
      setSelectMode(true)
    }
  }, [router.query])

  if (error || cmsCollectionsError || cmsBookmarksError) return <p>Error</p>

  const userCollections: CollectionType[] =
    (data &&
      data.mySpace.filter((w): w is CollectionType => isCollection(w))) ||
    []
  const collectionsLength = userCollections.length || 0

  const remainingSections =
    MAXIMUM_COLLECTIONS - (collectionsLength + selectedCollections.length)

  const canAddSections = collectionsLength < MAXIMUM_COLLECTIONS

  const handleSortClick = (sortType: SortBy) => {
    const sortTypeAction =
      sortType === 'SORT_TYPE' ? 'Sort by type' : 'Sort alphabetically'
    trackEvent('S&A sort', sortTypeAction)
    setSort(sortType)
  }

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
    // Find selected collections in the array of all CMS collections
    const collectionObjs = selectedCollections.map((id) =>
      collections.find((i) => i.id === id)
    ) as CollectionRecordInput[]

    const collectionTitles = collectionObjs.map((c) => c.title).join(',')
    trackEvent('S&A add collection', 'Add selected', collectionTitles)

    handleAddCollections({
      variables: {
        collections: addCollectionsInput(collectionObjs),
      },

      refetchQueries: [`getMySpace`],
    })
    setSelectMode(false)
    setSelectedCollections([])
    router.push('/')
  }

  const handleAddToCollection = (
    bookmark: BookmarkRecord,
    collectionId?: ObjectId
  ) => {
    if (collectionId) {
      handleAddBookmark({
        variables: {
          collectionId,
          cmsId: bookmark.id,
          ...bookmark,
        },
        refetchQueries: [`getMySpace`],
      })

      const collection = userCollections.find((c) => c._id === collectionId)

      setFlash(
        <Alert type="success" slim role="alert">
          You have successfully added “{bookmark.label}” to the “
          {collection?.title}” section.
        </Alert>
      )
    } else {
      // Create a new collection and add the bookmark to it
      const bookmarkInput: NewBookmarkInput = {
        url: bookmark.url,
        label: bookmark.label,
        cmsId: bookmark.id,
      }

      handleAddCollection({
        variables: { title: '', bookmarks: [bookmarkInput] },
        refetchQueries: [`getMySpace`],
      })
      router.push('/')
    }
  }

  return !user ? (
    <Loader />
  ) : (
    <>
      <h2 className={styles.pageTitle}>Keystone CMS Test Page</h2>

      {!loading && (
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
      )}

      {flash && (
        <div className={styles.flash}>
          <Flash handleClear={() => setFlash(null)}>{flash}</Flash>
        </div>
      )}

      {loading && (
        <Grid row gap className={styles.widgets}>
          <Grid
            key={`collection_loading`}
            tablet={{ col: 6 }}
            desktop={{ col: 4 }}>
            <LoadingWidget />
          </Grid>
        </Grid>
      )}

      {!loading && !cmsBookmarksLoading && sortBy === 'SORT_ALPHA' && (
        <>
          {userCollections.some(
            (c) => c.bookmarks.filter((b) => !b.isRemoved).length >= 10
          ) && (
            <Alert type="warning" role="alert">
              At least one collection on your My Space has reached the maximum
              number of links allowed (10).
            </Alert>
          )}

          {!canAddSections && (
            <Alert type="warning" role="alert">
              You have reached the maximum number of collections allowed on your
              My Space (25).
            </Alert>
          )}

          <BookmarkList
            bookmarks={bookmarks}
            userCollectionOptions={userCollections}
            handleAddToCollection={handleAddToCollection}
            canAddNewCollection={canAddSections}
          />
        </>
      )}

      {!loading && !cmsCollectionsLoading && sortBy === 'SORT_TYPE' && (
        <div className={widgetClasses}>
          <div className={styles.widgetToolbar}>
            {selectMode ? (
              <>
                {remainingSections < 3 && (
                  <Tooltip
                    position="top"
                    label={
                      remainingSections > 0
                        ? `You’re approaching the maximum number of collections (25) you can add to your My Space page.`
                        : `You can only add up to 25 collections to your My Space page.\nTo add a new collection, please remove an existing one.`
                    }>
                    <IconInfo size={3} />
                  </Tooltip>
                )}
                <span>
                  <strong>
                    {selectedCollections.length} collection
                    {selectedCollections.length !== 1 && 's'} selected
                  </strong>{' '}
                  ({remainingSections} of {MAXIMUM_COLLECTIONS} possible
                  remaining)
                </span>
                <Button
                  type="button"
                  secondary
                  disabled={selectedCollections.length < 1}
                  onClick={handleAddSelected}>
                  Add selected
                </Button>
                <Button
                  type="button"
                  outline
                  inverse
                  onClick={() => {
                    trackEvent('S&A add collection', 'Cancel')
                    handleToggleSelectMode()
                  }}>
                  Cancel
                </Button>
              </>
            ) : (
              <>
                {!canAddSections && (
                  <Tooltip
                    position="top"
                    label={`You can only add up to 25 collections to your My Space page.\nTo add a new collection, please remove an existing one.`}>
                    <IconInfo size={3} />
                  </Tooltip>
                )}
                <Button
                  type="button"
                  onClick={() => {
                    trackEvent(
                      'S&A add collection',
                      'Select multiple collections'
                    )
                    handleToggleSelectMode()
                  }}
                  disabled={!canAddSections}>
                  Select multiple collections
                </Button>
              </>
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
                      disabled={
                        !isSelected(collection.id) && remainingSections < 1
                      }
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

export default KeystoneTest

KeystoneTest.getLayout = withDefaultLayout

const GET_KEYSTONE_COLLECTIONS = gql`
  query GetKeystoneCollections {
    collections {
      id
      title
      bookmarks {
        id
        url
        label
      }
    }
  }
`

const GET_KEYSTONE_BOOKMARKS = gql`
  query GetKeystoneBookmarks {
    bookmarks {
      id
      url
      label
    }
  }
`
