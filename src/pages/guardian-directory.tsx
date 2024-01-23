import { useEffect, useState } from 'react'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useRouter } from 'next/router'
import { Button, Search } from '@trussworks/react-uswds'
import LoadingWidget from 'components/LoadingWidget/LoadingWidget'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import styles from 'styles/pages/guardianDirectory.module.scss'
import { GuardianDirectoryTable } from 'components/GuardianDirectoryTable/GuardianDirectoryTable'
import { useSearchGuardianDirectoryQuery } from 'operations/portal/queries/searchGuardianDirectory.g'
import { useGetLastModifiedAtQuery } from 'operations/portal/queries/getLastModifiedAt.g'
import { GuardianDirectory as GuardianDirectoryType } from 'types'

const GuardianDirectory = () => {
  const flags = useFlags()
  const router = useRouter()
  const [directory, setDirectory] = useState(Array<GuardianDirectoryType>)
  const { data: lastModifiedAt } = useGetLastModifiedAtQuery()
  const [searchQuery, setSearchQuery] = useState('')
  const { data: searchData, loading } = useSearchGuardianDirectoryQuery({
    variables: { search: searchQuery },
  })

  useEffect(() => {
    if (searchData && !loading) {
      setDirectory(
        searchData.searchGuardianDirectory as GuardianDirectoryType[]
      )
    }
  }, [searchQuery, loading, searchData])

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

        {loading ? (
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
