import { useRouter } from 'next/router'
import Head from 'next/head'

// TODO - description
// TODO - title prop
// TODO icons
// TODO manifest?
// TODO theming

type USSFPortalHeadProps = {
  canonicalUrl: string
}

const USSFPortalHead = ({ canonicalUrl }: USSFPortalHeadProps) => {
  const { asPath } = useRouter()

  return (
    <Head>
      <meta charSet="utf-8" key="charset" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" key="edge" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
        key="viewport"
      />

      <title>Space Force Portal</title>
      <link rel="canonical" href={canonicalUrl + asPath} />
    </Head>
  )
}

export default USSFPortalHead
