import { useEffect, useState } from 'react'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import { GetGuardianDirectoryDocument } from 'operations/portal/queries/getGuardianDirectory.g'
import styles from 'styles/pages/guardianDirectory.module.scss'
import StripedTable from 'components/StripedTable/StripedTable'
import { client } from 'apolloClient'

const GuardianDirectory = () => {
  const [directory, setDirectory] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await client.query({
        query: GetGuardianDirectoryDocument,
      })
      setDirectory(res.data.guardianDirectory)
    }
    fetchData()
  }, [])

  return (
    <div className={styles.guardianDirectory}>
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
        title={'Guardian Directory'}
      />
    </div>
  )
}

export default GuardianDirectory

GuardianDirectory.getLayout = withDefaultLayout
