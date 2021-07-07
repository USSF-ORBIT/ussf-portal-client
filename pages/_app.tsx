import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'

const USSFPortalApp = ({ Component, pageProps }: AppProps) => {
  const canonicalUrl = process.env.NEXT_PUBLIC_SITE_URL || ''
  const { asPath } = useRouter()

  return (
    <>
      <Head>
        <meta charSet="utf-8" key="charset" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" key="edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
          key="viewport"
        />

        <link rel="canonical" href={canonicalUrl + asPath} />
        <title>Space Force Portal</title>

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
      <Component {...pageProps} />
    </>
  )
}

export default USSFPortalApp
