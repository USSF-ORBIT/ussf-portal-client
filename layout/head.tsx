import { useRouter } from 'next/router'
import Head from 'next/head'

// TODO - description
// TODO - title prop

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

      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link
        rel="manifest"
        href="/site.webmanifest"
        crossOrigin="use-credentials"
      />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />

      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  )
}

export default USSFPortalHead
