import React, { createContext, useState } from 'react'
import { useCookies } from 'react-cookie'
import router from 'next/router'

const BetaContext = createContext({
  joinBeta: () => {
    return
  },
  leaveBeta: () => {
    return
  },
  betaOptIn: false,
})

export const BetaContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [betaOptIn, setBetaOptIn] = useState(false)
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const [cookies, setCookie, removeCookie] = useCookies(['betaOptIn'])

  const joinBeta = () => {
    setCookie('betaOptIn', 'true')
    setBetaOptIn(true)
    router.push('/')
  }

  const leaveBeta = () => {
    removeCookie('betaOptIn')
    setBetaOptIn(false)
    router.push('/')
  }

  const context = {
    betaOptIn,
    joinBeta,
    leaveBeta,
  }
  return <BetaContext.Provider value={context}>{children}</BetaContext.Provider>
}

export default BetaContext
