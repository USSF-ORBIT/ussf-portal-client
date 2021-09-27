import { ReactNode } from 'react'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'
import MySpace from 'components/MySpace/MySpace'

const Home = () => <MySpace />

export default Home

const BetaLayout = (page: ReactNode) => <Layout>{page}</Layout>

BetaLayout.displayName = 'BetaLayout'
Home.getLayout = BetaLayout
