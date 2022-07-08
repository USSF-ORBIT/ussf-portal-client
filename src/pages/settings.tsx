import styles from 'styles/pages/settings.module.scss'
import Loader from 'components/Loader/Loader'
import SettingsContainer from 'components/SettingsContainer/SettingsContainer'
import { useUser } from 'hooks/useUser'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'

const Settings = () => {
  const { user } = useUser()

  return !user ? (
    <Loader />
  ) : (
    <div className={styles.settings}>
      <section>
        <SettingsContainer />
      </section>
    </div>
  )
}

export default Settings

Settings.getLayout = withDefaultLayout
