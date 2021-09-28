import { useEffect, ReactNode } from 'react'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'
import { useBetaContext } from 'stores/betaContext'

const BetaExit = () => {
  const { leaveBeta } = useBetaContext()

  useEffect(() => {
    leaveBeta()
  })
  return <></>
}

export default BetaExit

const BetaLayout = (page: ReactNode) => <Layout>{page}</Layout>

BetaLayout.displayName = 'BetaLayout'
BetaExit.getLayout = BetaLayout
