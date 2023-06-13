import { useState, useEffect } from 'react'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { InferGetServerSidePropsType } from 'next'
import { Button, Grid, Alert, Icon } from '@trussworks/react-uswds'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classnames from 'classnames'
import { useRouter } from 'next/router'
import type { ObjectId } from 'bson'
import { client } from '../lib/keystoneClient'

import type {
  CMSBookmark,
  CollectionRecord,
  CollectionRecords,
  MySpaceWidget,
  Collection as CollectionType,
} from 'types/index'

import { useAddBookmarkMutation } from 'operations/portal/mutations/addBookmark.g'
import {
  AddCollectionMutationVariables,
  useAddCollectionMutation,
} from 'operations/portal/mutations/addCollection.g'
import { useAddCollectionsMutation } from 'operations/portal/mutations/addCollections.g'
import { addCollectionsInput } from 'operations/helpers'

import { WIDGET_TYPES, MAXIMUM_COLLECTIONS } from 'constants/index'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import Flash from 'components/util/Flash/Flash'
import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'
import ApplicationsTable from 'components/ApplicationsTable/ApplicationsTable'
import SelectableCollection from 'components/SelectableCollection/SelectableCollection'
import Tooltip from 'components/Tooltip/Tooltip'
import styles from 'styles/pages/sitesAndApplications.module.scss'

import { useAnalytics } from 'stores/analyticsContext'
import { useUser } from 'hooks/useUser'
import { useAuthContext } from 'stores/authContext'

import { GET_KEYSTONE_BOOKMARKS } from 'operations/cms/queries/getKeystoneBookmarks'
import { GET_KEYSTONE_COLLECTIONS } from 'operations/cms/queries/getKeystoneCollections'
import Loader from 'components/Loader/Loader'
import { DropdownFilter } from 'components/DropdownFilter/DropdownFilter'
type SortBy = 'SORT_TYPE' | 'SORT_ALPHA'

type SelectedCollections = string[]

/** Type guards */
function isCollection(widget: MySpaceWidget): widget is CollectionType {
  return widget.type === WIDGET_TYPES.COLLECTION
}

const SitesAndApplications = ({
  collections,
  bookmarks,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter()
  const { user } = useUser()
  const { portalUser } = useAuthContext()
  const { trackEvent } = useAnalytics()

  // Handling the menu views toggle
  // LaunchDarkly flag to determine if the user's default view is by type or alpha
  // If no flag is set, default to sort by type
  const flags = useFlags()
  const defaultSort =
    flags?.sitesAppsSortView === 'sortAlpha' ? 'SORT_ALPHA' : 'SORT_TYPE'
  const [sortBy, setSort] = useState<SortBy>(defaultSort)

  const [selectedOption, setSelectedOption] = useState(defaultSort)
  const [isOpen, setIsOpen] = useState(false)

  const [selectMode, setSelectMode] = useState<boolean>(false)
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

  const mySpace = (portalUser?.mySpace || []) as MySpaceWidget[]

  const userCollections =
    ((mySpace && mySpace.filter((w) => isCollection(w))) as CollectionType[]) ||
    []
  const collectionsLength = userCollections.length || 0

  const remainingCollections =
    MAXIMUM_COLLECTIONS - (collectionsLength + selectedCollections.length)

  const canAddCollections = collectionsLength < MAXIMUM_COLLECTIONS

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
    const collectionObjs: CollectionRecord[] =
      selectedCollections
        .map((id) => collections.find((i) => i.id === id))
        .filter((c): c is CollectionRecord => c !== undefined) || []

    const collectionTitles = collectionObjs.map((c) => c.title).join(',')
    trackEvent('S&A add collection', 'Add selected', collectionTitles)

    handleAddCollections({
      variables: addCollectionsInput(collectionObjs),
      refetchQueries: [`getUser`],
    })
    setSelectMode(false)
    setSelectedCollections([])
    router.push('/')
  }

  const handleAddToCollection = (
    bookmark: CMSBookmark,
    collectionId?: ObjectId
  ) => {
    if (collectionId) {
      handleAddBookmark({
        variables: {
          url: bookmark.url,
          label: bookmark.label,
          collectionId,
          cmsId: bookmark.id,
        },
        refetchQueries: [`getUser`],
      })

      const collection = userCollections.find((c) => c._id === collectionId)

      setFlash(
        <Alert type="success" slim role="alert" headingLevel="h4">
          You have successfully added “{bookmark.label}” to the “
          {collection?.title}” collection.
        </Alert>
      )
    } else {
      // Create a new collection and add the bookmark to it
      const newCollection: AddCollectionMutationVariables = {
        title: '',
        bookmarks: [
          {
            url: bookmark.url,
            label: bookmark.label,
            cmsId: bookmark.id,
          },
        ],
      }

      handleAddCollection({
        variables: newCollection,
        refetchQueries: [`getUser`],
      })
      router.push('/')
    }
  }

  const handleSortClick = (sortType: SortBy) => {
    const sortTypeAction =
      sortType === 'SORT_TYPE' ? 'By Type' : 'Alphabetically'
    trackEvent('S&A sort', sortTypeAction)
    setSort(sortType)
    setIsOpen(!isOpen)
    setSelectedOption(sortType)
  }

  const handleMenuToggle = (isOpen: boolean) => {
    setIsOpen(isOpen)
  }

  // Buttons to sort applications by type or alpha
  const viewOptions = [
    <button
      key="SORT_ALPHA"
      value="SORT_ALPHA"
      name="SORT_ALPHA"
      type="button"
      onClick={() => handleSortClick('SORT_ALPHA')}>
      <FontAwesomeIcon icon="list" /> Alphabetically
    </button>,
    <button
      key="SORT_TYPE"
      value="SORT_TYPE"
      name="SORT_TYPE"
      type="button"
      disabled={selectMode}
      onClick={() => handleSortClick('SORT_TYPE')}>
      <FontAwesomeIcon icon="th-large" />
      By Type
    </button>,
  ]

  const toolbar = (
    <div className={`${styles.toolbar} ${styles.widgetToolbar}`}>
      <div className={styles.toolbarLeft}>
        {!selectMode && (
          <DropdownFilter
            handleClick={handleMenuToggle}
            menuOptions={viewOptions}
            selectedOption={selectedOption}
            isMenuOpen={isOpen}
            disabled={selectMode}
          />
        )}
      </div>

      {sortBy === 'SORT_TYPE' && (
        <div className={styles.selectCollectionsInfo}>
          {selectMode ? (
            <>
              {remainingCollections < 3 && (
                <Tooltip
                  position="top"
                  label={
                    remainingCollections > 0
                      ? `You’re approaching the maximum number of collections (25) you can add to your My Space page.`
                      : `You can only add up to 25 collections to your My Space page.\nTo add a new collection, please remove an existing one.`
                  }>
                  <Icon.Info size={3} />
                </Tooltip>
              )}
              <span>
                <strong>
                  {selectedCollections.length} collection
                  {selectedCollections.length !== 1 && 's'} selected
                </strong>{' '}
                ({remainingCollections} of {MAXIMUM_COLLECTIONS} possible
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
              {!canAddCollections && (
                <Tooltip
                  position="top"
                  label={`You can only add up to 25 collections to your My Space page.\nTo add a new collection, please remove an existing one.`}>
                  <Icon.Info size={3} />
                </Tooltip>
              )}
              <Button
                type="button"
                className={styles.selectCollectionsButton}
                onClick={() => {
                  trackEvent(
                    'S&A add collection',
                    'Select multiple collections'
                  )
                  handleToggleSelectMode()
                }}
                disabled={!canAddCollections}>
                Select multiple collections
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  )

  return !user ? (
    <Loader />
  ) : (
    <>
      <h2 className={styles.pageTitle}>
        Sites &amp; Applications{' '}
        <span className="sr-only">
          {sortBy === 'SORT_TYPE' ? ' By type' : ' Alphabetically'}{' '}
        </span>
      </h2>

      <div className={widgetClasses}>
        {/* Toolbar for toggling views and selecting multiple collections at once */}
        {toolbar}

        {flash && (
          <div className={styles.flash}>
            <Flash handleClear={() => setFlash(null)}>{flash}</Flash>
          </div>
        )}

        {/* Alphabetical Sort View */}

        {sortBy === 'SORT_ALPHA' && (
          <div className={styles.sortAlpha}>
            {userCollections.some(
              (c) => c.bookmarks.filter((b) => !b.isRemoved).length >= 10
            ) && (
              <Alert type="warning" role="alert" headingLevel="h4">
                At least one collection on your My Space has reached the maximum
                number of links allowed (10).
              </Alert>
            )}

            {!canAddCollections && (
              <Alert type="warning" role="alert" headingLevel="h4">
                You have reached the maximum number of collections allowed on
                your My Space (25).
              </Alert>
            )}

            <ApplicationsTable
              className={'sitesAndAppsApplicationsTable'}
              bookmarks={bookmarks}
              userCollectionOptions={userCollections}
              handleAddToCollection={handleAddToCollection}
              canAddNewCollection={canAddCollections}
            />
          </div>
        )}

        {/* Type Sort View */}
        {sortBy === 'SORT_TYPE' && (
          <div>
            <Grid row gap className={styles.widgets}>
              {collections.map((collection) => {
                return (
                  <Grid
                    key={`collection_${collection.id}`}
                    tablet={{ col: 6 }}
                    desktop={{ col: 4 }}>
                    {selectMode ? (
                      <SelectableCollection
                        className={'sitesAndAppsCollection'}
                        id={collection.id}
                        title={collection.title}
                        bookmarks={collection.bookmarks}
                        isSelected={isSelected(collection.id)}
                        onSelect={() => handleSelectCollection(collection.id)}
                        disabled={
                          !isSelected(collection.id) && remainingCollections < 1
                        }
                      />
                    ) : (
                      <Collection
                        title={collection.title}
                        className={'sitesAndAppsCollection'}>
                        {collection.bookmarks?.map((bookmark) => (
                          <Bookmark
                            className={'sitesAndAppsBookmark'}
                            key={`bookmark_${bookmark.id}`}
                            bookmarkDescription={bookmark.description}
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
      </div>
    </>
  )
}

export default SitesAndApplications

SitesAndApplications.getLayout = withDefaultLayout

export async function getServerSideProps() {
  const { data: cmsCollections } = await client.query({
    query: GET_KEYSTONE_COLLECTIONS,
    fetchPolicy: 'no-cache',
  })

  const collections = cmsCollections?.collections as CollectionRecords

  const { data: cmsBookmarks } = await client.query({
    query: GET_KEYSTONE_BOOKMARKS,
    fetchPolicy: 'no-cache',
  })

  const bookmarks = cmsBookmarks?.bookmarks as CMSBookmark[]

  return {
    props: {
      collections,
      bookmarks,
      pageTitle: 'Sites & Applications',
    },
  }
}
