import { InferGetStaticPropsType } from 'next'
import { Grid } from '@trussworks/react-uswds'

import { lists } from '.keystone/api'

import { withBetaLayout } from 'layout/Beta/DefaultLayout/DefaultLayout'
import Collection from 'components/Collection/Collection'
import Bookmark from 'components/Bookmark/Bookmark'

type Bookmark = {
  id: string
  url: string
  label?: string
  description?: string
}

const SitesAndApplications = ({
  collections,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <h2>Sites and Applications</h2>

      <Grid row>
        {collections.map((collection) => (
          <Grid key={`collection_${collection.id}`} tablet={{ col: 3 }}>
            <Collection title={collection.title}>
              {collection.bookmarks.map((bookmark: Bookmark) => (
                <Bookmark key={`bookmark_${bookmark.id}`} href={bookmark.url}>
                  {bookmark.label}
                </Bookmark>
              ))}
            </Collection>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default SitesAndApplications

SitesAndApplications.getLayout = withBetaLayout

export async function getStaticProps() {
  const collections = await lists.Collection.findMany({
    query: 'id title bookmarks { id url label }',
  })

  return { props: { collections } }
}
