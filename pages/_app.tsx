import type { AppProps } from 'next/app'

const USSFPortalApp = ({ Component, pageProps }: AppProps) => {
  pageProps.canonicalDomain = process.env.NEXT_PUBLIC_SITE_URL || ''

  return <Component {...pageProps} />
}

export default USSFPortalApp
