import { useEffect, useState } from 'react'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useRouter } from 'next/router'
import { Button, Search } from '@trussworks/react-uswds'
import LoadingWidget from 'components/LoadingWidget/LoadingWidget'
import { useUser } from 'hooks/useUser'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import styles from 'styles/pages/guardianDirectory.module.scss'
import { GuardianDirectoryTable } from 'components/GuardianDirectoryTable/GuardianDirectoryTable'
import { useGetGuardianDirectoryQuery } from 'operations/portal/queries/getGuardianDirectory.g'
import { useSearchGuardianDirectoryQuery } from 'operations/portal/queries/searchGuardianDirectory.g'
// import { useGetLastModifiedAtQuery } from 'operations/portal/queries/getLastModifiedAt.g'
import { GuardianDirectory as GuardianDirectoryType } from 'types'

const GuardianDirectory = () => {
  const flags = useFlags()
  const router = useRouter()
  const { loading } = useUser()
  const [directory, setDirectory] = useState(Array<GuardianDirectoryType>)
  const { data } = useGetGuardianDirectoryQuery()
  // const { data: lastModifiedAt } = useGetLastModifiedAtQuery()

  const [searchQuery, setSearchQuery] = useState('')
  const { data: searchData, loading: loadingSearch } =
    useSearchGuardianDirectoryQuery({
      variables: { search: searchQuery },
    })

  useEffect(() => {
    if (searchQuery && !loadingSearch) {
      setDirectory(
        searchData?.searchGuardianDirectory as GuardianDirectoryType[]
      )
    }
  }, [searchQuery, loading, searchData])

  useEffect(() => {
    if (data) {
      setDirectory(data.guardianDirectory as GuardianDirectoryType[])
    }
  }, [data])

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

        {!directory.length ? (
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
      </div>
    </>
  )
}

export default GuardianDirectory

GuardianDirectory.getLayout = withDefaultLayout
