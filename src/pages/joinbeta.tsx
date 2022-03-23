import { ReactNode } from 'react'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'

const BetaEntrypoint = () => {
  return <></>
}

export default BetaEntrypoint

const BetaLayout = (page: ReactNode) => <Layout>{page}</Layout>

BetaLayout.displayName = 'BetaLayout'
BetaEntrypoint.getLayout = BetaLayout
