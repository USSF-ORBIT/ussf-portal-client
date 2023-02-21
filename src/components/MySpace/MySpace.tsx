import React from 'react'
import { Grid } from '@trussworks/react-uswds'
import { useRouter } from 'next/router'
import { gql } from '@apollo/client'
import { WidgetType as AddWidgetType } from '../../graphql.g'
import styles from './MySpace.module.scss'

import { useAddBookmarkMutation } from 'operations/portal/mutations/addBookmark.g'
import { useAddCollectionMutation } from 'operations/portal/mutations/addCollection.g'
import { useAddWidgetMutation } from 'operations/portal/mutations/addWidget.g'
import { useGetMySpaceQuery } from 'operations/portal/queries/getMySpace.g'
import { useEditCollectionMutation } from 'operations/portal/mutations/editCollection.g'
import { useRemoveBookmarkMutation } from 'operations/portal/mutations/removeBookmark.g'
import { useRemoveCollectionMutation } from 'operations/portal/mutations/removeCollection.g'
import GuardianIdealCarousel from 'components/GuardianIdeal/GuardianIdealCarousel'
import {
  MySpaceWidget,
  BookmarkRecords,
  Collection,
  Widget,
  Bookmark,
} from 'types/index'

import { WIDGET_TYPES, MAXIMUM_COLLECTIONS } from 'constants/index'
import NewsWidget from 'components/NewsWidget/NewsWidget'
import CustomCollection from 'components/CustomCollection/CustomCollection'
import LoadingWidget from 'components/LoadingWidget/LoadingWidget'
import AddWidget from 'components/AddWidget/AddWidget'
import { GuardianIdealPillars } from 'components/GuardianIdeal/GuardianIdealPillars'
import { useAnalytics } from 'stores/analyticsContext'

/** Type guards */
function isCollection(widget: MySpaceWidget): widget is Collection {
  return widget.type === WIDGET_TYPES.COLLECTION
}

const MySpace = ({ bookmarks }: { bookmarks: BookmarkRecords }) => {
  const router = useRouter()
  const { trackEvent } = useAnalytics()
  const { loading, error, data } = useGetMySpaceQuery()

  const mySpace = (data?.mySpace || []) as MySpaceWidget[]

  const [handleAddWidget] = useAddWidgetMutation()
  const [handleRemoveBookmark] = useRemoveBookmarkMutation()
  const [handleAddBookmark] = useAddBookmarkMutation()
  const [handleRemoveCollection] = useRemoveCollectionMutation()
  const [handleEditCollection] = useEditCollectionMutation()
  const [handleAddCollection] = useAddCollectionMutation()

  if (error) return <p>Error</p>

  const addNewsWidget = () => {
    trackEvent('Add section', 'Add news')

    handleAddWidget({
      variables: { title: 'Recent news', type: AddWidgetType.News },
      refetchQueries: ['getMySpace'],
    })
  }

  const addGuardianIdeal = () => {
    // trackEvent('Add section', 'Add Guardian Ideal section')

    handleAddWidget({
      variables: { title: 'Ideal Title', type: AddWidgetType.GuardianIdeal },
      refetchQueries: ['getMySpace'],
    })
  }

  const addNewCollection = () => {
    trackEvent('Add section', 'Create new collection')

    handleAddCollection({
      variables: { title: '', bookmarks: [] },
      refetchQueries: [`getMySpace`],
    })
  }

  const canAddCollections: boolean =
    mySpace &&
    mySpace.filter((w) => isCollection(w)).length < MAXIMUM_COLLECTIONS

  const canAddNews: boolean =
    mySpace && mySpace.filter((w) => w.type === WIDGET_TYPES.NEWS).length < 1

  const canAddGuardianIdeal: boolean =
    mySpace &&
    mySpace.filter((w) => w.type === WIDGET_TYPES.GUARDIANIDEAL).length < 1

  const selectCollections = () => {
    trackEvent('Add section', 'Select collection from template')

    router.push({
      pathname: '/sites-and-applications',
      query: { selectMode: 'true' },
    })
  }

  return (
    <div className={styles.mySpace}>
      <div className={styles.widgetContainer}>
        <h2 className={styles.pageTitle}>My Space</h2>
        <Grid row gap={2}>
          {loading && (
            <Grid
              key={`widget_loading`}
              tabletLg={{ col: 6 }}
              desktopLg={{ col: 4 }}>
              <LoadingWidget />
            </Grid>
          )}

          {data &&
            data.mySpace &&
            data.mySpace.map((widget: Widget) => (
              <React.Fragment key={`widget_${widget._id}`}>
                {widget.type === 'GuardianIdeal' ? (
                  <Grid className={styles.guardianIdeal}>
                    <GuardianIdealCarousel
                      articles={GuardianIdealPillars}
                      widget={widget}
                    />
                  </Grid>
                ) : (
                  <Grid tabletLg={{ col: 6 }} desktopLg={{ col: 4 }}>
                    {widget.type === 'News' && <NewsWidget widget={widget} />}

                    {isCollection(widget) && (
                      <CustomCollection
                        _id={widget._id}
                        title={widget.title}
                        type={widget.type}
                        bookmarks={widget.bookmarks || []}
                        bookmarkOptions={bookmarks}
                        handleRemoveCollection={() => {
                          handleRemoveCollection({
                            variables: {
                              _id: widget._id,
                            },
                            refetchQueries: [`getMySpace`],
                          })
                        }}
                        handleEditCollection={(
                          title: string,
                          bookmarks?: Bookmark[]
                        ) => {
                          handleEditCollection({
                            variables: {
                              _id: widget._id,
                              title,
                              bookmarks,
                            },
                            optimisticResponse: {
                              editCollection: {
                                _id: widget._id,
                                title,
                                bookmarks: bookmarks || widget.bookmarks,
                              },
                            },
                            update(cache, result) {
                              if (result.data?.editCollection) {
                                const { editCollection } = result.data
                                cache.writeFragment({
                                  id: `Collection:${editCollection._id}`,
                                  fragment: gql`
                                    fragment collectionData on Collection {
                                      _id
                                      title
                                      bookmarks {
                                        _id
                                        url
                                        label
                                        cmsId
                                        isRemoved
                                      }
                                    }
                                  `,
                                  data: editCollection,
                                })
                              }
                            },
                          })
                        }}
                        handleRemoveBookmark={(_id, cmsId) => {
                          handleRemoveBookmark({
                            variables: {
                              _id,
                              collectionId: widget._id,
                              cmsId,
                            },
                            refetchQueries: [`getMySpace`],
                          })
                        }}
                        handleAddBookmark={(url, label, id) => {
                          handleAddBookmark({
                            variables: {
                              collectionId: widget._id,
                              url,
                              label,
                              cmsId: id,
                            },
                            refetchQueries: [`getMySpace`],
                          })
                        }}
                      />
                    )}
                  </Grid>
                )}
              </React.Fragment>
            ))}

          {!loading &&
            (canAddCollections || canAddNews || canAddGuardianIdeal) && (
              <Grid
                key={`widget_addNew`}
                tabletLg={{ col: 6 }}
                desktopLg={{ col: 4 }}>
                <AddWidget
                  handleCreateCollection={addNewCollection}
                  handleSelectCollection={selectCollections}
                  handleAddNews={addNewsWidget}
                  handleAddGuardianIdeal={addGuardianIdeal}
                  canAddNews={canAddNews}
                  canAddCollection={canAddCollections}
                  canAddGuardianIdeal={canAddGuardianIdeal}
                />
              </Grid>
            )}
        </Grid>
      </div>
    </div>
  )
}

export default MySpace
