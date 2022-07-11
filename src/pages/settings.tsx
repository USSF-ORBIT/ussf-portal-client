import styles from 'styles/pages/settings.module.scss'
import Loader from 'components/Loader/Loader'
import EditDisplayName from 'components/EditDisplayName/EditDisplayName'
import { useUser } from 'hooks/useUser'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'

const Settings = () => {
  const { user } = useUser()

  return !user ? (
    <Loader />
  ) : (
    <div className={styles.settings}>
      <div className={styles.widgetContainer}>
        <h2 className={styles.pageTitle}>Settings</h2>
        <section>
          <EditDisplayName />
        </section>
      </div>
    </div>
  )
}

export default Settings

Settings.getLayout = withDefaultLayout
