import { redirect } from 'next/dist/server/api-utils'
import router from 'next/router'
import { useEffect } from 'react'

const BetaEntrypoint = () => {
  const setCookie = async () => {
    await fetch('http://localhost:3000/api/beta/optin')
  }
  useEffect(() => {
    setCookie()
    router.push('/beta')
  })
  return <h1>beta</h1>
}

export default BetaEntrypoint
