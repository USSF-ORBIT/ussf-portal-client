import { useEffect, ReactNode } from 'react'
import Layout from 'layout/Beta/DefaultLayout/DefaultLayout'
import { InferGetServerSidePropsType } from 'next'
import { connectToDB } from 'utils/mongodb'

const MongoTest = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <h1>MongoDB Testing</h1>
      {data &&
        data.map((item: any) => (
          <div key={item._id}>
            <h2>{item.userId}</h2>
          </div>
        ))}
    </>
  )
}

export default MongoTest

export async function getServerSideProps() {
  const db = await connectToDB()
  const collection = db.collection('users')
  let data = await collection.find({}).toArray()
  // Workaround for getting BSON to play nice
  data = JSON.parse(JSON.stringify(data))

  return {
    props: { data },
  }
}

const BetaLayout = (page: ReactNode) => <Layout>{page}</Layout>

BetaLayout.displayName = 'BetaLayout'
MongoTest.getLayout = BetaLayout
