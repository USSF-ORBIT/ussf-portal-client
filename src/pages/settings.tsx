import styles from 'styles/pages/settings.module.scss'
import EditDisplayName from 'components/EditDisplayName/EditDisplayName'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import { useEditDisplayNameMutation } from 'operations/portal/mutations/editDisplayName.g'
import { useAuthContext } from 'stores/authContext'

const Settings = () => {
  const { portalUser } = useAuthContext()

  const [handleEditDisplayName] = useEditDisplayNameMutation()

  const userDisplayName = (portalUser?.displayName || '') as string

  return (
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
                refetchQueries: [`getUser`],
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
