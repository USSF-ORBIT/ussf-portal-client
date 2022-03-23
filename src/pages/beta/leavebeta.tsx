import { ReactNode } from 'react'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'

const BetaExit = () => {
  return <></>
}

export default BetaExit

const BetaLayout = (page: ReactNode) => <Layout>{page}</Layout>

BetaLayout.displayName = 'BetaLayout'
BetaExit.getLayout = BetaLayout
