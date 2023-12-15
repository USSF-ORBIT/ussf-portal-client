import { useEffect, useState } from 'react'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useRouter } from 'next/router'
import { Button, Search } from '@trussworks/react-uswds'
import { useUser } from 'hooks/useUser'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import styles from 'styles/pages/guardianDirectory.module.scss'
import { GuardianDirectoryTable } from 'components/GuardianDirectoryTable/GuardianDirectoryTable'
import { useGetGuardianDirectoryQuery } from 'operations/portal/queries/getGuardianDirectory.g'
import { useSearchGuardianDirectoryQuery } from 'operations/portal/queries/searchGuardianDirectory.g'
import { GuardianDirectory as GuardianDirectoryType } from 'types'

import Loader from 'components/Loader/Loader'

const GuardianDirectory = () => {
  const flags = useFlags()
  const router = useRouter()
  const { loading } = useUser()
  const [directory, setDirectory] = useState(Array<GuardianDirectoryType>)
  const { data } = useGetGuardianDirectoryQuery()

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

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className={styles.search}>
        <Search
          onSubmit={searchDirectory}
          placeholder="Search Guardian Directory"
          aria-label="Search Guardian Directory"
          className={styles.searchField}
        />
        <Button type="button" unstyled onClick={resetSearch}>
          Reset search
        </Button>
      </div>
      <div className={styles.guardianDirectory}>
        <h1>Guardian Directory</h1>
        <GuardianDirectoryTable
          headers={[
            'First Name',
            'Last Name',
            'Rank',
            'Title',
            'Base',
            'Field Commands',
            'Email',
          ]}
          keys={[
            'FirstName',
            'LastName',
            'Rank',
            'DutyTitle',
            'BaseLoc',
            'MajCom',
            'Email',
          ]}
          rows={directory}
        />
      </div>
    </>
  )
}

export default GuardianDirectory

GuardianDirectory.getLayout = withDefaultLayout
