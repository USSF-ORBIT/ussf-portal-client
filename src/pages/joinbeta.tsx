import { useEffect, ReactNode, useContext } from 'react'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'
import BetaContext from 'stores/betaContext'

const BetaEntrypoint = () => {
  const { joinBeta } = useContext(BetaContext)

  useEffect(() => {
    joinBeta()
  })
  return <></>
}

export default BetaEntrypoint

const BetaLayout = (page: ReactNode) => <Layout>{page}</Layout>

BetaLayout.displayName = 'BetaLayout'
BetaEntrypoint.getLayout = BetaLayout
