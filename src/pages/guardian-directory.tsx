import { useEffect, useState } from 'react'
import { useFlags } from 'launchdarkly-react-client-sdk'
import { useRouter } from 'next/router'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import styles from 'styles/pages/guardianDirectory.module.scss'
import { GuardianDirectoryTable } from 'components/GuardianDirectoryTable/GuardianDirectoryTable'
import { useGetGuardianDirectoryQuery } from 'operations/portal/queries/getGuardianDirectory.g'
import { GuardianDirectory as GuardianDirectoryType } from 'types'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'

const GuardianDirectory = () => {
  const flags = useFlags()
  const router = useRouter()
  const { loading } = useUser()
  const [directory, setDirectory] = useState(Array<GuardianDirectoryType>)
  const { data } = useGetGuardianDirectoryQuery()

  useEffect(() => {
    if (data) {
      setDirectory(data.guardianDirectory as GuardianDirectoryType[])
    }
  }, [data])

  // TODO: remove once released
  // If guardian directory is off return 404
  if (flags.guardianDirectory === false) {
    router.replace('/404')
  }

  return loading ? (
    <Loader />
  ) : (
    <div className={styles.guardianDirectory}>
      <h1>Guardian Directory</h1>
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
    </div>
  )
}

export default GuardianDirectory

GuardianDirectory.getLayout = withDefaultLayout
