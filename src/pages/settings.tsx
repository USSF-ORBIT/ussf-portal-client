import styles from 'styles/pages/settings.module.scss'
import Loader from 'components/Loader/Loader'
import EditDisplayName from 'components/EditDisplayName/EditDisplayName'
import { useUser } from 'hooks/useUser'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import { useEditDisplayNameMutation } from 'operations/portal/mutations/editDisplayName.g'
import { useGetDisplayNameQuery } from 'operations/portal/queries/getDisplayName.g'

const Settings = () => {
  const { user } = useUser()

  const [handleEditDisplayName] = useEditDisplayNameMutation()

  const { error, data } = useGetDisplayNameQuery()
  const userDisplayName = (data?.displayName || '') as string

  if (error) return <p>Error</p>

  return !user ? (
    <Loader />
  ) : (
    <div className={styles.settings}>
      <div className={styles.widgetContainer}>
        <h2 className={styles.pageTitle}>Settings</h2>
        <section>
          <EditDisplayName
            userDisplayName={userDisplayName}
            handleEditDisplayName={(userId: string, displayName: string) => {
              handleEditDisplayName({
                variables: {
                  userId,
                  displayName,
                },
                refetchQueries: [`getDisplayName`],
              })
            }}
          />
        </section>
      </div>
    </div>
  )
}

export default Settings

Settings.getLayout = withDefaultLayout
