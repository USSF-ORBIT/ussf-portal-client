import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from 'styles/pages/settings.module.scss'
import EditDisplayName from 'components/EditDisplayName/EditDisplayName'
import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import { useEditDisplayNameMutation } from 'operations/portal/mutations/editDisplayName.g'
import { useUser } from 'hooks/useUser'
import Loader from 'components/Loader/Loader'

const Settings = () => {
  const { loading, portalUser, user } = useUser()
  const [isCopied, setIsCopied] = useState(false)

  const [handleEditDisplayName] = useEditDisplayNameMutation()

  const userDisplayName = (portalUser?.displayName || '') as string

  const copyTextToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(user?.userId || '')
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 3000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return loading ? (
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
                refetchQueries: [`getUser`],
              })
            }}
          />
        </section>
        <hr />
        <span className={styles.copyClipboard}>
          Your user id is: {user?.userId}
        </span>
        <button
          type="button"
          className={`usa-button usa-button--unstyled ${styles.copyButton}`}
          onClick={copyTextToClipboard}>
          <FontAwesomeIcon
            className={styles.copyIcon}
            icon={isCopied ? 'check' : 'copy'}
          />
          {isCopied ? 'Copied!' : 'Copy To Clipboard'}
        </button>
      </div>
    </div>
  )
}

export default Settings

Settings.getLayout = withDefaultLayout

// The page title is parsed and displayed in _app.tsx
export async function getStaticProps() {
  return {
    props: {
      pageTitle: 'Settings',
    },
  }
}
