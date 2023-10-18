import { useEffect, useState } from 'react'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import styles from 'styles/pages/guardianDirectory.module.scss'
import { StripedTable } from 'components/StripedTable/StripedTable'
import { useGetGuardianDirectoryQuery } from 'operations/portal/queries/getGuardianDirectory.g'
import { GuardianDirectory as GuardianDirectoryType } from 'types'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'

const GuardianDirectory = () => {
  const { loading } = useUser()
  const [directory, setDirectory] = useState(Array<GuardianDirectoryType>)
  const { data } = useGetGuardianDirectoryQuery()

  useEffect(() => {
    if (data) {
      setDirectory(data.guardianDirectory as GuardianDirectoryType[])
    }
  }, [data])

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.guardianDirectory}>
      <h1>Guardian Directory</h1>
      <StripedTable
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
  )
}

export default GuardianDirectory

GuardianDirectory.getLayout = withDefaultLayout
