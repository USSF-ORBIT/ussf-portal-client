import { useState, useEffect } from 'react'

import { withDefaultLayout } from 'layout/DefaultLayout/DefaultLayout'
import styles from 'styles/pages/sitesAndApplications.module.scss'

const KeystoneTest = () => {
  const [keystoneUrl, setKeystoneUrl] = useState<any>(null)
  const [keystoneInfo, setKeystoneInfo] = useState<any>(null)
  const [showBadInfo, setShowBadInfo] = useState<boolean>(false)

  useEffect(() => {
    const getKeystoneUrl = async () => {
      const { keystoneUrl } = await fetch(`/api/sysinfo`).then((resp) =>
        resp.json()
      )

      setKeystoneUrl(keystoneUrl)
    }

    getKeystoneUrl()
  }, [])

  const getKeystoneInfo = async () => {
    if (!keystoneUrl) {
      throw new Error('Error fetching Keystone info: missing URL')
    }
    const infoUrl = `${keystoneUrl}/api/sysinfo`
    const keystoneData = await fetch(infoUrl).then((resp) => resp.json())
    setKeystoneInfo(JSON.stringify(keystoneData))
  }

  const causeError = () => {
    setShowBadInfo(true)
  }

  return (
    <>
      <h2 className={styles.pageTitle}>Keystone CMS - Client Test Page</h2>
      <button type="button" onClick={getKeystoneInfo}>
        Get info
      </button>
      <strong>URL:</strong> {keystoneUrl}
      <strong>Info:</strong> {keystoneInfo}
      <button type="button" onClick={causeError}>
        Cause an error!
      </button>
      {showBadInfo && keystoneInfo && keystoneInfo.map((i: string) => `${i}`)}
    </>
  )
}

export default KeystoneTest

KeystoneTest.getLayout = withDefaultLayout

/*
const GET_KEYSTONE_COLLECTIONS = gql`
  query GetKeystoneCollections {
    collections {
      id
      title
      bookmarks {
        id
        url
        label
      }
    }
  }
`

const GET_KEYSTONE_BOOKMARKS = gql`
  query GetKeystoneBookmarks {
    bookmarks {
      id
      url
      label
    }
  }
`
*/
