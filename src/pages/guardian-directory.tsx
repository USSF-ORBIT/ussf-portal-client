import { useEffect, useState } from 'react'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useRouter } from 'next/router'
import { Button, Search } from '@trussworks/react-uswds'
import LoadingWidget from 'components/LoadingWidget/LoadingWidget'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import styles from 'styles/pages/guardianDirectory.module.scss'
import { GuardianDirectoryTable } from 'components/GuardianDirectoryTable/GuardianDirectoryTable'
import { useSearchGuardianDirectoryLazyQuery } from 'operations/portal/queries/searchGuardianDirectory.g'
import { useGetLastModifiedAtQuery } from 'operations/portal/queries/getLastModifiedAt.g'
import { GuardianDirectory as GuardianDirectoryType } from 'types'
import { useGetGuardianDirectoryQuery } from 'operations/portal/queries/getGuardianDirectory.g'

const GuardianDirectory = () => {
  const flags = useFlags()
  const router = useRouter()
  const [directory, setDirectory] = useState(Array<GuardianDirectoryType>)
  const { data: lastModifiedAt } = useGetLastModifiedAtQuery()
  const { data: guardianDirectoryData, loading: loadingGuardianData } =
    useGetGuardianDirectoryQuery()
  const [searchQuery, setSearchQuery] = useState('')
  const [loadSearch, { data: searchData, loading: loadingSearchData }] =
    useSearchGuardianDirectoryLazyQuery({
      variables: { search: searchQuery },
    })

  useEffect(() => {
    if (guardianDirectoryData && !loadingGuardianData) {
      setDirectory(
        guardianDirectoryData.guardianDirectory as GuardianDirectoryType[]
      )
    }
  }, [loadingGuardianData, guardianDirectoryData])

  useEffect(() => {
    if (searchQuery && searchData && !loadingSearchData) {
      setDirectory(
        searchData.searchGuardianDirectory as GuardianDirectoryType[]
      )
    }
  }, [loadingSearchData, searchData, searchQuery])

  useEffect(() => {
    if (searchQuery) {
      loadSearch()
    }
  }, [searchQuery])

  const searchDirectory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const eventArray = e.target as unknown as Array<HTMLInputElement>
    setSearchQuery(eventArray[0].value || ' ')
  }

  const resetSearch = () => {
    // clear the form search input
    const searchInput = document.getElementById(
      'search-field'
    ) as HTMLInputElement
    searchInput.value = ''
    // reset the search query
    setSearchQuery(' ')
  }

  // TODO: remove once released
  // If guardian directory is off return 404
  if (flags.guardianDirectory === false) {
    router.replace('/404')
  }

  return (
    <>
      <div className={styles.guardianDirectory}>
        <div className={styles.guardianDirectoryHeader}>
          <h1>Guardian Directory</h1>
          <Search
            onSubmit={searchDirectory}
            placeholder="Search Guardian Directory"
            aria-label="Search Guardian Directory"
            size="small"
            label="Search Guardian Directory"
          />
        </div>
        <div className={styles.resetSearch}>
          <Button
            type="button"
            unstyled
            onClick={resetSearch}
            aria-label="Reset Search"
            name="Reset Search Button">
            Reset search
          </Button>
        </div>

        {!directory || loadingSearchData || loadingGuardianData ? (
          <LoadingWidget />
        ) : (
          <GuardianDirectoryTable
            headers={[
              'Last Name',
              'First Name',
              'Rank',
              'Title',
              'Base',
              'Field Commands',
              'Email',
            ]}
            keys={[
              'LastName',
              'FirstName',
              'Rank',
              'DutyTitle',
              'BaseLoc',
              'MajCom',
              'Email',
            ]}
            rows={directory}
          />
        )}

        <p>
          Last updated:{' '}
          {lastModifiedAt?.getLastModifiedAt &&
            new Date(lastModifiedAt.getLastModifiedAt).toLocaleDateString(
              'en-US',
              { year: 'numeric', month: 'short', day: 'numeric' }
            )}
        </p>
      </div>
    </>
  )
}

export default GuardianDirectory

GuardianDirectory.getLayout = withDefaultLayout

export async function getServerSideProps() {
  return {
    props: {
      pageTitle: 'Guardian Directory',
    },
  }
}
