import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LDProvider } from 'launchdarkly-react-client-sdk'
import localLDFlags from './launchDarklyLocal'

export const LaunchDarkly = ({ children }: { children: React.ReactNode }) => {
  const [clientSideID, setClientSideID] = useState(null)

  useEffect(() => {
    if (clientSideID === null) {
      const fetchClientSideID = async () => {
        const { data } = await axios.get('/api/sysinfo')
        if (data && data.clientSideID) {
          setClientSideID(data.clientSideID)
        } else {
          console.error('issue retrieving the clientSideID')
        }
      }

      fetchClientSideID()
        // Catch error in fetching the id
        .catch(console.error)
    }
  }, [clientSideID])

  if (clientSideID === null) {
    return null
  }

  // This previously contained the urls necessary for using the FedRAMP version
  // of LD. No need to provide any options here since we are no longer using federal version
  const ldCommonOptions = {}

  // if localfile is requested load the flags json and turn off initialization
  // of the LDClient via deferInitialization option
  //
  // otherwise configure the LDProvider to initialize the client and run normally
  return clientSideID === 'localfile' ? (
    <LDProvider
      clientSideID={clientSideID}
      deferInitialization={true}
      options={{
        ...ldCommonOptions,
        bootstrap: localLDFlags,
      }}>
      {children}
    </LDProvider>
  ) : (
    <LDProvider
      clientSideID={clientSideID}
      options={{
        ...ldCommonOptions,
      }}>
      {children}
    </LDProvider>
  )
}
