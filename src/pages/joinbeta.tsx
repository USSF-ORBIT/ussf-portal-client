import router from 'next/router'
import { useEffect } from 'react'

const BetaEntrypoint = () => {
  const setCookie = async () => {
    await fetch('http://localhost:3000/api/beta/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  useEffect(() => {
    setCookie()
    router.push('/beta')
  })
  return <></>
}

export default BetaEntrypoint
