import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LDProvider } from 'launchdarkly-react-client-sdk'

export const LaunchDarkly = ({ children }: { children: React.ReactNode }) => {
  const [clientSideID, setClientSideID] = useState(null)

  useEffect(() => {
    if (clientSideID === null) {
      const fetchClientSideID = async () => {
        const { data } = await axios.get('/api/sysinfo')
        if (data && data.clientSideID) {
          setClientSideID(data.clientSideID)
        } else {
          // eslint-disable-next-line no-console
          console.error('issue retrieving the clientSideID')
        }
      }

      fetchClientSideID()
        // Catch error in fetching the id
        // eslint-disable-next-line no-console
        .catch(console.error)
    }
  }, [clientSideID])

  if (clientSideID === null) {
    return null
  }

  return (
    <LDProvider
      clientSideID={clientSideID}
      options={{
        baseUrl: 'https://sdk.launchdarkly.us',
        streamUrl: 'https://clientstream.launchdarkly.us',
        eventsUrl: 'https://events.launchdarkly.us',
      }}>
      {children}
    </LDProvider>
  )
}
