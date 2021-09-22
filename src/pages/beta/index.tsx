import { ReactNode } from 'react'
import { Alert, Button } from '@trussworks/react-uswds'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'
import { useBetaContext } from 'stores/betaContext'
import MySpace from 'components/MySpace/MySpace'

const Home = () => {
  const { leaveBeta } = useBetaContext()

  return (
    <>
      <MySpace />
    </>
  )
}

export default Home

const BetaLayout = (page: ReactNode) => <Layout>{page}</Layout>

BetaLayout.displayName = 'BetaLayout'
Home.getLayout = BetaLayout
