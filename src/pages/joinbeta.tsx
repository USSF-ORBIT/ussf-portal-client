import { useEffect, ReactNode } from 'react'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'
import { useBetaContext } from 'stores/betaContext'

const BetaEntrypoint = () => {
  const { joinBeta } = useBetaContext()

  useEffect(() => {
    joinBeta()
  })
  return <></>
}

export default BetaEntrypoint

const BetaLayout = (page: ReactNode) => <Layout>{page}</Layout>

BetaLayout.displayName = 'BetaLayout'
BetaEntrypoint.getLayout = BetaLayout
