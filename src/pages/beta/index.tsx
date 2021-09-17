import { ReactNode, useEffect } from 'react'
import { Alert, Button, Form } from '@trussworks/react-uswds'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'
import { useBetaContext } from 'stores/betaContext'
import { useMutation } from '@apollo/client'
import { Bookmark, Collection } from 'types/index'
import { ADD_COLLECTION } from 'operations/mutations/addCollection'
import { REMOVE_COLLECTION } from 'operations/mutations/removeCollection'
import { v4 } from 'uuid'
import { ADD_BOOKMARK } from 'operations/mutations/addBookmark'
import { REMOVE_BOOKMARK } from 'operations/mutations/removeBookmark'

const Home = () => {
  const { leaveBeta } = useBetaContext()
  const [addCollection] = useMutation(ADD_COLLECTION)
  const [removeCollection] = useMutation(REMOVE_COLLECTION)
  // const [addBookmark] = useMutation(ADD_BOOKMARK, {
  //   update(cache, mutationResult){
  //     console.log('mutation result is ', mutationResult)
  //     // cache.modify({
  //     //   id: mutationResult.cacheId,
  //     //   fields: {
  //     //     bookmarks: mutationResult.bookmarks
  //     //   }
  //     // })
  //   }})
  const [removeBookmark] = useMutation(REMOVE_BOOKMARK)

  return (
    <>
      <section className={`usa-section padding-top-0`}>
        <div className="grid-container">
          <Alert type="success" heading="Success">
            Welcome to the Beta USSF Portal. This site is under development and
            is subject to change without notice.
          </Alert>
          <div className="grid-row grid-gap">
            <div className="tablet:grid-col-4">
              <div className="padding-top-2">
                <Button
                  type="button"
                  accentStyle="warm"
                  className="usa-button"
                  onClick={leaveBeta}>
                  Leave Beta
                </Button>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </section>
    </>
  )
}

export default Home

const BetaLayout = (page: ReactNode) => <Layout>{page}</Layout>

BetaLayout.displayName = 'BetaLayout'
Home.getLayout = BetaLayout
