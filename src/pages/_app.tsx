import type { NextPage } from 'next'
import App from 'next/app'
import Head from 'next/head'
import type { AppProps, AppContext } from 'next/app'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import { config } from '@fortawesome/fontawesome-svg-core'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'next-themes'

import '@fortawesome/fontawesome-svg-core/styles.css'
import 'styles/index.scss'
import 'styles/sfds/index.scss'
import '../initIcons'

import { client } from 'apolloClient'
import { AnalyticsProvider } from 'stores/analyticsContext'
import { AuthProvider } from 'stores/authContext'
import { MySpaceProvider } from 'stores/myspaceContext'
import { SearchProvider } from 'stores/searchContext'
import { ModalProvider } from 'stores/modalContext'
import DefaultLayout from 'layout/DefaultLayout/DefaultLayout'

import { LaunchDarkly } from 'stores/launchDarklyContext'

config.autoAddCss = false

type Page<P = Record<string, never>> = NextPage<P> & {
  getLayout?: (page: ReactNode) => ReactNode
}

type Props = AppProps & {
  Component: Page
  canonicalUrl: string
  pageProps: Record<string, never>
}

const USSFPortalApp = ({ Component, pageProps, canonicalUrl }: Props) => {
  const { asPath } = useRouter()

  const pageTitle = pageProps.pageTitle
    ? `${pageProps.pageTitle} - USSF Portal`
    : 'USSF Portal'
  const getLayout =
    Component.getLayout ||
    ((page: ReactNode) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <ApolloProvider client={client}>
      <AnalyticsProvider>
        <AuthProvider>
          <MySpaceProvider>
            <SearchProvider>
              <LaunchDarkly>
                <ThemeProvider
                  enableSystem={false}
                  attribute={'data-color-theme'}>
                  <ModalProvider>
                    <Head>
                      <meta charSet="utf-8" key="charset" />
                      <meta
                        httpEquiv="X-UA-Compatible"
                        content="IE=edge"
                        key="edge"
                      />
                      <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                        key="viewport"
                      />
                      <link rel="canonical" href={canonicalUrl + asPath} />
                      <title>{pageTitle}</title>
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
                      <link
                        rel="mask-icon"
                        href="/safari-pinned-tab.svg"
                        color="#5bbad5"
                      />
                      <link
                        rel="preload"
                        href="/assets/fonts/SharpSans-Book.woff"
                        as="font"
                        crossOrigin=""
                      />
                      <link
                        rel="preload"
                        href="/assets/fonts/SharpSans-Book.woff2"
                        as="font"
                        crossOrigin=""
                      />
                      <link
                        rel="preload"
                        href="/assets/fonts/SharpSans-BookItalic.woff"
                        as="font"
                        crossOrigin=""
                      />
                      <link
                        rel="preload"
                        href="/assets/fonts/SharpSans-BookItalic.woff2"
                        as="font"
                        crossOrigin=""
                      />
                      <link
                        rel="preload"
                        href="/assets/fonts/SharpSans-Medium.woff"
                        as="font"
                        crossOrigin=""
                      />
                      <link
                        rel="preload"
                        href="/assets/fonts/SharpSans-Medium.woff2"
                        as="font"
                        crossOrigin=""
                      />
                      <link
                        rel="preload"
                        href="/assets/fonts/SharpSans-MediumItalic.woff"
                        as="font"
                        crossOrigin=""
                      />
                      <link
                        rel="preload"
                        href="/assets/fonts/SharpSans-MediumItalic.woff2"
                        as="font"
                        crossOrigin=""
                      />
                      <link
                        rel="preload"
                        href="/assets/fonts/SharpSans-Bold.woff"
                        as="font"
                        crossOrigin=""
                      />
                      <link
                        rel="preload"
                        href="/assets/fonts/SharpSans-Bold.woff2"
                        as="font"
                        crossOrigin=""
                      />
                      <link
                        rel="preload"
                        href="/assets/fonts/SharpSans-BoldItalic.woff"
                        as="font"
                        crossOrigin=""
                      />
                      <link
                        rel="preload"
                        href="/assets/fonts/SharpSans-BoldItalic.woff2"
                        as="font"
                        crossOrigin=""
                      />

                      <meta name="msapplication-TileColor" content="#da532c" />
                      <meta name="theme-color" content="#ffffff" />
                    </Head>
                    {getLayout(<Component {...pageProps} />)}
                  </ModalProvider>
                </ThemeProvider>
              </LaunchDarkly>
            </SearchProvider>
          </MySpaceProvider>
        </AuthProvider>
      </AnalyticsProvider>
    </ApolloProvider>
  )
}

USSFPortalApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)
  const canonicalUrl = process.env.NEXT_PUBLIC_PORTAL_URL
  return { ...appProps, canonicalUrl }
}

export default USSFPortalApp
