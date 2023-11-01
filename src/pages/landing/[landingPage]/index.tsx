import { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { client } from 'lib/keystoneClient'
import { getSession } from 'lib/session'
import { GET_LANDING_PAGE } from 'operations/cms/queries/getLandingPage'

const LandingPage = ({
  landingPage,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return <div>{landingPage}</div>
}

export default LandingPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { landingPage: slug } = context.query

  const session = await getSession(context.req, context.res)
  const user = session?.passport?.user

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  const {
    data: { landingPage },
  } = await client.query({
    query: GET_LANDING_PAGE,
    variables: { slug },
  })

  if (!landingPage) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      landingPage,
    },
  }
}
