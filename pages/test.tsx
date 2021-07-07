import Head from 'layout/head'

export const config = {
  unstable_runtimeJS: false,
}

type TestProps = {
  canonicalDomain: string
}

const Test = (props: TestProps) => {
  const { canonicalDomain } = props

  return (
    <>
      <Head canonicalUrl={canonicalDomain} />

      <main>USSF Portal test page!</main>
    </>
  )
}

export default Test
